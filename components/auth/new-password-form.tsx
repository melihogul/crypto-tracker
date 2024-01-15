"use client"

import * as z from "zod"
import { useForm } from "react-hook-form"
import { CardWrapper } from "./card-wrapper"
import { NewPasswordSchema } from "@/schemas"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { FormError } from "../form-error"
import { FormSuccess } from "../form-success"
import { newPassword } from "@/actions/new-password"
import { useState, useTransition } from "react"
import { Loader2 } from "lucide-react"
import { useSearchParams } from "next/navigation"

export const NewPasswordForm = () => {
  const searchParams = useSearchParams()
  const token = searchParams.get("token")
  
  const [error, setError] = useState<string | undefined>("")
  const [success, setSuccess] = useState<string | undefined>("")
  const [isPending, startTransition] = useTransition()
  
  const form = useForm<z.infer<typeof NewPasswordSchema>>({
    resolver: zodResolver(NewPasswordSchema),
    defaultValues: {
      password: "",
    }
  })

  const onSubmit = (values: z.infer<typeof NewPasswordSchema>) => {
    setError("")
    setSuccess("")
    
    startTransition(() => {
      newPassword(values, token)
      .then((data) => {
        setError(data?.error)
        setSuccess(data?.success)
      })
    })
  }
  
  return (
    <CardWrapper
    headerLabel="Enter a new password"
    >
      <Form {...form}>
        <form
        className="space-y-6"
        onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <FormField
            control={form.control}
            name="password"
            render={({field}) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                  disabled={isPending}
                  {...field}
                  placeholder="******"
                  type="password"
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
            ) : "Reset password"}
          </Button>
        </form>
      </Form>
    </CardWrapper>
  )
}