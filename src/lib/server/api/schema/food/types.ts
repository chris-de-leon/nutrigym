import { builder, defineTypes } from "@nutrigym/lib/server/api"
import { Food } from "@nutrigym/lib/server/db/schema"
import { scalars } from "../scalars"
import { enums } from "../enums"

const food = builder.objectRef<Food>("Food")

builder.objectType(food, {
  fields: (t) => ({
    id: t.expose("id", { type: scalars.uuid }),
    name: t.exposeString("name"),
    brand: t.exposeString("brand"),
    calories: t.exposeFloat("calories"),
    servingSize: t.exposeFloat("servingSize"),
    servingUnit: t.expose("servingUnit", { type: enums.servingUnit }),
    totalProteinInGrams: t.exposeFloat("totalProteinInGrams", {
      nullable: true,
    }),
    totalCarbsInGrams: t.exposeFloat("totalCarbsInGrams", { nullable: true }),
    totalFatInGrams: t.exposeFloat("totalFatInGrams", { nullable: true }),
    polyunsaturatedFatInGrams: t.exposeFloat("polyunsaturatedFatInGrams", {
      nullable: true,
    }),
    monounsaturatedFatInGrams: t.exposeFloat("monounsaturatedFatInGrams", {
      nullable: true,
    }),
    saturatedFatInGrams: t.exposeFloat("saturatedFatInGrams", {
      nullable: true,
    }),
    potassiumInMilligrams: t.exposeFloat("potassiumInMilligrams", {
      nullable: true,
    }),
    sodiumInMilligrams: t.exposeFloat("sodiumInMilligrams", { nullable: true }),
    dietaryFiberInGrams: t.exposeFloat("dietaryFiberInGrams", {
      nullable: true,
    }),
    sugarsInGrams: t.exposeFloat("sugarsInGrams", { nullable: true }),
    cholesterolInMilligrams: t.exposeFloat("cholesterolInMilligrams", {
      nullable: true,
    }),
    calciumInMilligrams: t.exposeFloat("calciumInMilligrams", {
      nullable: true,
    }),
    ironInMilligrams: t.exposeFloat("ironInMilligrams", { nullable: true }),
  }),
})

export const types = defineTypes({
  inputs: {},
  objects: {
    food,
  },
})
