"use client"

import { calculatePortion, caloriesToGrams } from "@nutrigym/lib/conversion"
import { FoodMeasurement, Goal } from "@nutrigym/lib/client"
import { GoalChart } from "@nutrigym/components/charts"
import { useMemo } from "react"

export type NutritionChartsProps = {
  measurements: FoodMeasurement[]
  goal: Goal
}

export function NutritionCharts({ measurements, goal }: NutritionChartsProps) {
  const curr = useMemo(() => {
    let [calories, protein, carbs, fat] = [0, 0, 0, 0]
    measurements.forEach((elem) => {
      calories += elem.servingsConsumed * elem.food.calories
      protein += elem.servingsConsumed * (elem.food.totalProteinInGrams ?? 0)
      carbs += elem.servingsConsumed * (elem.food.totalCarbsInGrams ?? 0)
      fat += elem.servingsConsumed * (elem.food.totalFatInGrams ?? 0)
    })
    return {
      calories,
      protein,
      carbs,
      fat,
    }
  }, [measurements])

  const goals = useMemo(() => {
    const totalGrams = caloriesToGrams(goal?.calories ?? 0)
    return {
      calories: Math.round(goal?.calories ?? 0),
      protein: calculatePortion(goal?.proteinPercentage ?? 0, totalGrams),
      carbs: calculatePortion(goal?.carbsPercentage ?? 0, totalGrams),
      fat: calculatePortion(goal?.fatPercentage ?? 0, totalGrams),
    }
  }, [goal])

  return (
    <div className="grid grid-cols-2 gap-2 rounded-lg border p-2">
      <GoalChart title="Calories" goal={goals.calories} curr={curr.calories} />
      <GoalChart title="Protein (g)" goal={goals.protein} curr={curr.protein} />
      <GoalChart title="Fat (g)" goal={goals.fat} curr={curr.fat} />
      <GoalChart title="Carbs (g)" goal={goals.carbs} curr={curr.carbs} />
    </div>
  )
}
