"use client"

import * as z from "zod"
import { useForm } from "react-hook-form"
import { CardWrapper } from "./card-wrapper"
import { ResetSchema } from "@/schemas"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { FormError } from "../form-error"
import { FormSuccess } from "../form-success"
import { reset } from "@/actions/reset"
import { useState, useTransition } from "react"
import { Loader2 } from "lucide-react"

export const ResetForm = () => {
  const [error, setError] = useState<string | undefined>("")
  const [success, setSuccess] = useState<string | undefined>("")
  const [isPending, startTransition] = useTransition()
  
  const form = useForm<z.infer<typeof ResetSchema>>({
    resolver: zodResolver(ResetSchema),
    defaultValues: {
      email: "",
    }
  })

  const onSubmit = (values: z.infer<typeof ResetSchema>) => {
    setError("")
    setSuccess("")
    
    startTransition(() => {
      reset(values)
      .then((data) => {
        setError(data?.error)
        setSuccess(data?.success)
      })
    })
  }
  
  return (
    <CardWrapper
    headerLabel="Forgot your password?"
    >
      <Form {...form}>
        <form
        className="space-y-6"
        onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <FormField
            control={form.control}
            name="email"
            render={({field}) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                  disabled={isPending}
                  {...field}
                  placeholder="john@example.com"
                  type="email"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
            />
          </div>
          <FormError message={error} />
          <FormSuccess message={success} />
          <Button
          disabled={isPending}
          type="submit"
          className="w-full"
          >
            {isPending ? (
              <Loader2 className="text-muted-foreground animate-spin" />
            ) : "Send reset email"}
          </Button>
        </form>
      </Form>
    </CardWrapper>
  )
}