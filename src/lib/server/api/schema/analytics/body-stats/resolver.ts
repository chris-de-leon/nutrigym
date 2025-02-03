import { schema } from "@nutrigym/lib/server/db/schema"
import { and, eq, sql } from "drizzle-orm"
import { z } from "zod"
import {
  defineOperationResolver,
  GraphQLAuthContext,
  parseZodDateString,
  asFatalZodError,
  hashGqlParams,
  compareDates,
  countDays,
} from "@nutrigym/lib/server/api"

const zInput = z
  .object({
    date: z.object({
      start: z.string().date(),
      final: z.string().date(),
    }),
  })
  .superRefine((arg, ctx) => {
    const start = parseZodDateString(arg.date.start)
    const final = parseZodDateString(arg.date.final)
    if (compareDates(start, final) > 0) {
      return asFatalZodError(
        ctx,
        new Error("start date cannot be greater than final date"),
      )
    }
  })

const handler = async (
  input: z.infer<typeof zInput>,
  ctx: GraphQLAuthContext,
) => {
  const opStatsID = hashGqlParams(ctx.yoga.params)
  const startDate = parseZodDateString(input.date.start)
  const finalDate = parseZodDateString(input.date.final)
  const totalDays = countDays(startDate, finalDate)
  if (totalDays === 0) {
    return {
      id: opStatsID,
      data: [],
    }
  }

  const totalsByDay = ctx.providers.db.$with("sq").as(
    ctx.providers.db
      .select({
        date: schema.userMeasurementLog.date,
        weight: schema.bodyMeasurement.weightInPounds,
        water: schema.bodyMeasurement.waterInMilliliters,
        sleep: schema.bodyMeasurement.sleepInHours,
        steps: schema.bodyMeasurement.steps,
      })
      .from(schema.userMeasurementLog)
      .leftJoin(
        schema.bodyMeasurement,
        eq(schema.userMeasurementLog.id, schema.bodyMeasurement.logId),
      )
      .where(
        and(
          eq(schema.userMeasurementLog.userId, ctx.auth.user.id),
          sql`strftime('%s', ${schema.userMeasurementLog.date}) BETWEEN strftime('%s', ${input.date.start}) AND strftime('%s', ${input.date.final})`,
        ),
      )
      .groupBy(schema.userMeasurementLog.date),
  )

  const [result] = await ctx.providers.db
    .with(totalsByDay)
    .select({
      avgWeight: sql<number>`AVG(${totalsByDay.weight})`,
      avgWater: sql<number>`AVG(${totalsByDay.water})`,
      avgSleep: sql<number>`AVG(${totalsByDay.sleep})`,
      avgSteps: sql<number>`AVG(${totalsByDay.steps})`,
      mCount: sql<number>`COUNT(*)`,
    })
    .from(totalsByDay)
    .limit(1)

  return {
    id: opStatsID,
    data: [
      {
        key: "Total Number of Measurements",
        value: result.mCount,
      },
      {
        key: "Consistency %",
        value: (result.mCount / totalDays) * 100,
      },
      {
        key: "Avg. Weight (lbs)",
        value: result.avgWeight,
      },
      {
        key: "Avg. Water (ml) Intake",
        value: result.avgWater,
      },
      {
        key: "Avg. Sleep (hrs)",
        value: result.avgSleep,
      },
      {
        key: "Avg. Number of Steps",
        value: result.avgSteps,
      },
    ],
  }
}

export const resolver = defineOperationResolver({
  input: zInput,
  handler,
})
