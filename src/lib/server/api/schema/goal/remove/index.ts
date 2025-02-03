import { defineOperation } from "@nutrigym/lib/server/api"
import { resolver } from "./resolver"
import { schema } from "./schema"

export const remove = defineOperation({
  resolver,
  schema,
})
