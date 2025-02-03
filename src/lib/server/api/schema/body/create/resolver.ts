import { schema } from "@nutrigym/lib/server/db/schema"
import { Gender } from "@nutrigym/lib/server/enums"
import { isBirthdayInFuture } from "../utils"
import { randomUUID } from "node:crypto"
import { types } from "../types"
import { z } from "zod"
import {
  defineOperationResolver,
  ERR_BIRTHDAY_IN_FUTURE,
  GraphQLAuthContext,
  parseZodDateString,
} from "@nutrigym/lib/server/api"

const zInput = z.object({
  data: z.object({
    birthday: z.string().date(),
    gender: z.nativeEnum(Gender),
  }),
})

const handler = async (
  input: z.infer<typeof zInput>,
  ctx: GraphQLAuthContext,
) => {
  const birthday = parseZodDateString(input.data.birthday)
  if (isBirthdayInFuture(ctx.date, birthday)) {
    throw ERR_BIRTHDAY_IN_FUTURE
  } else {
    ctx.providers.invalidator.registerInvalidation({
      request: ctx.yoga.request,
      invalidations: [{ typename: types.objects.body.name }],
    })
  }

  return await ctx.providers.db.transaction(async (tx) => {
    return await tx
      .insert(schema.userBody)
      .values({
        birthday: input.data.birthday,
        gender: input.data.gender,
        userId: ctx.auth.user.id,
        id: randomUUID(),
      })
      .onConflictDoUpdate({
        target: schema.userBody.userId,
        set: {
          birthday: input.data.birthday,
          gender: input.data.gender,
        },
      })
      .returning()
  })
}

export const resolver = defineOperationResolver({
  input: zInput,
  handler,
})
