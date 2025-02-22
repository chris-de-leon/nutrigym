"use client"

import { makeRequestOrThrow } from "@nutrigym/lib/server"
import { Button } from "@nutrigym/components/ui/button"
import { DateTime } from "@nutrigym/lib/client/common"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "@nutrigym/components/ui/input"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { BodyLabels } from "../../_lib"
import { z } from "zod"
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
} from "@nutrigym/lib/client/graphql"

// TODO: calorie target should offer "shortcuts" which auto-compute the
// calories based on a specific goal (e.g. lose weight, gain weight, etc.)

const formSchema = z.object({
  waterInMilliliters: z.coerce.number().min(0),
  weightInPounds: z.coerce.number().min(0),
  sleepInHours: z.coerce.number().min(0).max(24),
  steps: z.coerce.number().min(0),
})

export type BodyGoalEditorFormProps = {
  onSubmit: () => void
  goal: Goal
  date: string
}

export function BodyGoalEditorForm(props: BodyGoalEditorFormProps) {
  const goal = props.goal
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: goal,
  })

  const router = useRouter()
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const currDate = DateTime.parseApiDateString(props.date)
    const goalDate = DateTime.parseApiDateString(goal.date)
    if (DateTime.isSameDay(goalDate, currDate)) {
      makeRequestOrThrow(UpdateGoalDocument, {
        id: goal.id,
        data: {
          waterInMilliliters: values.waterInMilliliters,
          proteinPercentage: goal.proteinPercentage,
          carbsPercentage: goal.carbsPercentage,
          fatPercentage: goal.fatPercentage,
          weightInPounds: values.weightInPounds,
          sleepInHours: values.sleepInHours,
          calories: goal.calories,
          steps: values.steps,
        },
      }).then(() => {
        props.onSubmit()
        router.refresh()
      })
    } else {
      makeRequestOrThrow(CreateGoalDocument, {
        date: props.date,
        data: {
          waterInMilliliters: values.waterInMilliliters,
          proteinPercentage: goal.proteinPercentage,
          carbsPercentage: goal.carbsPercentage,
          fatPercentage: goal.fatPercentage,
          weightInPounds: values.weightInPounds,
          sleepInHours: values.sleepInHours,
          calories: goal.calories,
          steps: values.steps,
        },
      }).then(() => {
        props.onSubmit()
        router.refresh()
      })
    }
  }

  return (
    <div className="flex flex-col gap-y-5 rounded-lg border p-4">
      <Form {...form}>
        <form
          className="flex flex-col gap-y-5"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name="weightInPounds"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{BodyLabels.get("weightInPounds")}</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="waterInMilliliters"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{BodyLabels.get("waterInMilliliters")}</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="sleepInHours"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{BodyLabels.get("sleepInHours")}</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="steps"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{BodyLabels.get("steps")}</FormLabel>
                <FormControl>
                  <Input {...field} />
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
