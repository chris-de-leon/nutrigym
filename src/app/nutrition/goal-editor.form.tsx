"use client"

import { calculatePortion, caloriesToGrams } from "@nutrigym/lib/conversion"
import { makeRequestOrThrow } from "@nutrigym/lib/server"
import { Slider } from "@nutrigym/components/ui/slider"
import { Button } from "@nutrigym/components/ui/button"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "@nutrigym/components/ui/input"
import { useForm, useWatch } from "react-hook-form"
import { DateTime } from "@nutrigym/lib/datetime"
import { TriangleAlertIcon } from "lucide-react"
import { useRouter } from "next/navigation"
import { useMemo } from "react"
import { z } from "zod"
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@nutrigym/components/ui/alert"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@nutrigym/components/ui/form"
import {
  CreateGoalDocument,
  UpdateGoalDocument,
  Goal,
} from "@nutrigym/lib/client"

const formSchema = z.object({
  proteinPercentage: z.coerce.number().min(0).max(100),
  carbsPercentage: z.coerce.number().min(0).max(100),
  fatPercentage: z.coerce.number().min(0).max(100),
  calories: z.coerce.number().min(0),
})

export type NutritionGoalEditorFormProps = {
  onSubmit: () => void
  goal: Goal
  date: Date
}

export function NutritionGoalEditorForm(props: NutritionGoalEditorFormProps) {
  const goal = props.goal
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: goal,
  })

  const data = useWatch({ control: form.control })
  const stat = useMemo(() => {
    const calories = data.calories ?? 0
    const p = data.proteinPercentage ?? 0
    const c = data.carbsPercentage ?? 0
    const f = data.fatPercentage ?? 0
    return {
      macrosPercentageSum: p + c + f,
      proteinInGrams: caloriesToGrams(calculatePortion(calories, p)),
      carbsInGrams: caloriesToGrams(calculatePortion(calories, c)),
      fatInGrams: caloriesToGrams(calculatePortion(calories, f)),
      calories,
    }
  }, [data])

  const router = useRouter()
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const goalDate = DateTime.parseApiDateString(goal.date)
    if (DateTime.isSameDay(goalDate, props.date)) {
      makeRequestOrThrow(UpdateGoalDocument, {
        id: goal.id,
        data: {
          waterInMilliliters: goal.waterInMilliliters,
          proteinPercentage: values.proteinPercentage,
          carbsPercentage: values.carbsPercentage,
          fatPercentage: values.fatPercentage,
          weightInPounds: goal.weightInPounds,
          sleepInHours: goal.sleepInHours,
          calories: values.calories,
          steps: goal.steps,
        },
      }).then(() => {
        router.refresh()
        props.onSubmit()
      })
    } else {
      makeRequestOrThrow(CreateGoalDocument, {
        date: DateTime.asApiDateString(props.date),
        data: {
          waterInMilliliters: goal.waterInMilliliters,
          proteinPercentage: values.proteinPercentage,
          carbsPercentage: values.carbsPercentage,
          fatPercentage: values.fatPercentage,
          weightInPounds: goal.weightInPounds,
          sleepInHours: goal.sleepInHours,
          calories: values.calories,
          steps: goal.steps,
        },
      }).then(() => {
        router.refresh()
        props.onSubmit()
      })
    }
  }

  return (
    <div className="flex flex-col gap-y-5 rounded-lg border p-4">
      {stat.macrosPercentageSum !== 100 && (
        <Alert variant="destructive">
          <TriangleAlertIcon />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>Percentages must sum to 100%</AlertDescription>
        </Alert>
      )}
      <Form {...form}>
        <form
          className="flex flex-col gap-y-5"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name="calories"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Calories</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="proteinPercentage"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Protein ({field.value}%, {stat.proteinInGrams}g)
                </FormLabel>
                <FormControl>
                  <Slider
                    defaultValue={[field.value]}
                    value={[field.value]}
                    min={0}
                    max={100}
                    step={0.5}
                    onValueChange={([val]) =>
                      form.setValue("proteinPercentage", val)
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="carbsPercentage"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Carbs ({field.value}%, {stat.carbsInGrams}g)
                </FormLabel>
                <FormControl>
                  <Slider
                    defaultValue={[field.value]}
                    value={[field.value]}
                    min={0}
                    max={100}
                    step={0.5}
                    onValueChange={([val]) =>
                      form.setValue("carbsPercentage", val)
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="fatPercentage"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Fat ({field.value}%, {stat.fatInGrams}g)
                </FormLabel>
                <FormControl>
                  <Slider
                    defaultValue={[field.value]}
                    value={[field.value]}
                    min={0}
                    max={100}
                    step={0.5}
                    onValueChange={([val]) =>
                      form.setValue("fatPercentage", val)
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  )
}
