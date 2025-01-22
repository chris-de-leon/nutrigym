import { requireAuth } from "@nutrigym/lib/server/api/auth"
import { builder } from "@nutrigym/lib/server/api"
import { handler, zInput } from "./resolver"
import { scalars } from "../../../scalars"
import { types } from "../types"

builder.mutationField("removeBodyMeasurements", (t) =>
  t.field({
    type: [types.bodyMeasurement],
    args: {
      ids: t.arg({ type: [scalars.uuid], required: true }),
      date: t.arg({ type: scalars.date, required: true }),
    },
    validate: {
      schema: zInput,
    },
    resolve: async (_, args, ctx) => {
      return await requireAuth(ctx, async (auth) => {
        return await handler(args, auth)
      })
    },
  }),
)
