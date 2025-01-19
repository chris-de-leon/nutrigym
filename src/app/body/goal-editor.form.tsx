"use client"

import { CreateGoalDocument, Goal } from "@nutrigym/lib/client"
import { makeRequestOrThrow } from "@nutrigym/lib/client"
import { Button } from "@nutrigym/components/ui/button"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "@nutrigym/components/ui/input"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@nutrigym/components/ui/form"

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
  date: Date
}

export function BodyGoalEditorForm(props: BodyGoalEditorFormProps) {
  const goal = props.goal
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: goal,
  })

  const router = useRouter()
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    makeRequestOrThrow(CreateGoalDocument, {
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
      router.refresh()
      props.onSubmit()
    })
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
                <FormLabel>Weight (lbs)</FormLabel>
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
                <FormLabel>Water (ml)</FormLabel>
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
                <FormLabel>Sleep (hrs)</FormLabel>
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
                <FormLabel>Steps</FormLabel>
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
