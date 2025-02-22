"use client"

import { CreateFoodDocument, ServingUnit } from "@nutrigym/lib/client/graphql"
import { makeRequestOrThrow } from "@nutrigym/lib/server"
import { Button } from "@nutrigym/components/ui/button"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "@nutrigym/components/ui/input"
import { NutritionLabels } from "../../_lib"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
  SelectContent,
  SelectValue,
  Select,
  SelectGroup,
  SelectItem,
  SelectTrigger,
} from "@nutrigym/components/ui/select"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@nutrigym/components/ui/form"

// TODO: allow null to be sent as a value to the API
const formSchema = z.object({
  name: z.string().min(1),
  brand: z.string().min(1),
  calories: z.coerce.number().min(0),
  servingSize: z.coerce.number().min(0),
  servingUnit: z.nativeEnum(ServingUnit),
  totalProteinInGrams: z.coerce.number().min(0).optional(),
  totalCarbsInGrams: z.coerce.number().min(0).optional(),
  totalFatInGrams: z.coerce.number().min(0).optional(),
  polyunsaturatedFatInGrams: z.coerce.number().min(0).optional(),
  monounsaturatedFatInGrams: z.coerce.number().min(0).optional(),
  saturatedFatInGrams: z.coerce.number().min(0).optional(),
  potassiumInMilligrams: z.coerce.number().min(0).optional(),
  sodiumInMilligrams: z.coerce.number().min(0).optional(),
  dietaryFiberInGrams: z.coerce.number().min(0).optional(),
  sugarsInGrams: z.coerce.number().min(0).optional(),
  cholesterolInMilligrams: z.coerce.number().min(0).optional(),
  calciumInMilligrams: z.coerce.number().min(0).optional(),
  ironInMilligrams: z.coerce.number().min(0).optional(),
})

export type AddFoodFormProps = {
  onSubmit: () => void
}

export function AddFoodForm(props: AddFoodFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      brand: "",
      calories: 0,
      servingSize: 1,
      servingUnit: ServingUnit.Grams,
      totalProteinInGrams: 0,
      totalCarbsInGrams: 0,
      totalFatInGrams: 0,
      polyunsaturatedFatInGrams: 0,
      monounsaturatedFatInGrams: 0,
      saturatedFatInGrams: 0,
      potassiumInMilligrams: 0,
      sodiumInMilligrams: 0,
      dietaryFiberInGrams: 0,
      sugarsInGrams: 0,
      cholesterolInMilligrams: 0,
      calciumInMilligrams: 0,
      ironInMilligrams: 0,
    },
  })

  const router = useRouter()
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    makeRequestOrThrow(CreateFoodDocument, {
      data: values,
    }).then(() => {
      props.onSubmit()
      router.refresh()
    })
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-y-2"
      >
        <div className="grid grid-cols-2 gap-2">
          {Array.from(NutritionLabels.entries()).map(([k, label], i) => {
            if (k === "servingUnit") {
              return (
                <FormField
                  key={i}
                  control={form.control}
                  name={k}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{label}</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          value={field.value}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder={field.value} />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              {Object.values(ServingUnit).map((v, i) => (
                                <SelectItem key={i} value={v}>
                                  {v}
                                </SelectItem>
                              ))}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )
            } else {
              return (
                <FormField
                  key={i}
                  control={form.control}
                  name={k}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{label}</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )
            }
          })}
        </div>
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
