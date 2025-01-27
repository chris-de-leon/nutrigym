import { GraphQLAuthContext } from "@nutrigym/lib/server/api"
import { and, eq, inArray } from "drizzle-orm"
import { schema } from "@nutrigym/lib/server/db/schema"
import { z } from "zod"

export const zInput = z.object({
  ids: z.string().uuid().array(),
  date: z.string().date(),
})

export const handler = async (
  input: z.infer<typeof zInput>,
  ctx: GraphQLAuthContext,
) => {
  return await ctx.providers.db.transaction(async (tx) => {
    const log = await tx.query.userMeasurementLog.findFirst({
      where: and(
        eq(schema.userMeasurementLog.userId, ctx.auth.user.id),
        eq(schema.userMeasurementLog.date, input.date),
      ),
    })
    if (log == null) {
      return []
    }

    if (input.ids.length > 0) {
      return await tx
        .delete(schema.bodyMeasurement)
        .where(
          and(
            eq(schema.bodyMeasurement.logId, log.id),
            inArray(schema.bodyMeasurement.id, input.ids),
          ),
        )
        .returning()
    } else {
      return []
    }
  })
}
