"use client"

import * as z from "zod"
import { useForm } from "react-hook-form"
import { CardWrapper } from "./card-wrapper"
import { RegisterSchema } from "@/schemas"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { FormError } from "../form-error"
import { FormSuccess } from "../form-success"
import { register } from "@/actions/register"
import { useState, useTransition } from "react"
import { Loader2, PartyPopper } from "lucide-react"

export const RegisterForm = () => {
  const [error, setError] = useState<string | undefined>("")
  const [success, setSuccess] = useState<string | undefined>("")
  const [isPending, startTransition] = useTransition()
  
  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
    }
  })

  const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
    setError("")
    setSuccess("")
    
    startTransition(() => {
      register(values)
      .then((data) => {
        setError(data.error)
        setSuccess(data.success)
      })
    })
  }
  
  return (
    <CardWrapper
    headerLabel="Create an account"
    showSocial
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
            <FormField
            control={form.control}
            name="name"
            render={({field}) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                  disabled={isPending}
                  {...field}
                  placeholder="John Doe"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
            />
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
                  placeholder="********"
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
            {isPending ? <Loader2 className="text-muted-foreground animate-spin" /> : "Register"}
          </Button>
        </form>
      </Form>
    </CardWrapper>
  )
}