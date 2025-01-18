import { builder, withAuth } from "@nutrigym/lib/server/api"
import { handler, zInput } from "./resolver"
import { objects } from "../../../objects"
import { scalars } from "../../../scalars"
import { input } from "./types"

builder.mutationField("createFoodMeasurementFromFoodID", (t) =>
  t.field({
    type: objects.id,
    args: {
      date: t.arg({ type: scalars.date, required: true }),
      data: t.arg({ type: input, required: true }),
    },
    validate: {
      schema: zInput,
    },
    resolve: async (_, args, ctx) => {
      return await withAuth(ctx, async (auth) => {
        return await handler(args, { ...ctx, ...auth })
      })
    },
  }),
)
