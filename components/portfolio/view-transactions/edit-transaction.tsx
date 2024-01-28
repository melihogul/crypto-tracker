import * as z from "zod"
import { MarketDataType, OneAuditLogType } from "@/types"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { AddPortfolioSchema, EditTransactionSchema } from "@/schemas";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState, useTransition } from "react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { editTransaction } from "@/actions/edit-transaction";

export const EditTransaction = ({data}: {data: OneAuditLogType}) => {
    const id = data.id

    const [isPending, startTransition] = useTransition()
    
    const form = useForm<z.infer<typeof EditTransactionSchema>>({
        resolver: zodResolver(EditTransactionSchema),
        defaultValues: {
            quantity: data.quantity,
            price: data.price,
        }
    })
    
    const onBuy = (values: z.infer<typeof EditTransactionSchema>) => {
        startTransition(() => {
            editTransaction(values, id, "BUY")
            .then(() => toast.success("You have successfully updated!"))
            .catch(() => toast.error("Something went wrong!"))
        })
    }

    const onSell = (values: z.infer<typeof EditTransactionSchema>) => {
        startTransition(() => {
            editTransaction(values, id, "SELL")
            .then(() => toast.success("You have successfully updated!"))
            .catch(() => toast.error("Something went wrong!"))
        })
    }
    
  return (
    <Tabs defaultValue={data.action.toLowerCase()}>
        <TabsList className="px-2 w-auto sm:w-[400px] container mx-10 sm:mx-auto flex justify-center items-center mt-3 gap-x-1">
          <TabsTrigger value="buy" className="w-full text-emerald-400">BUY</TabsTrigger>
          <TabsTrigger value="sell" className="w-full text-rose-400">SELL</TabsTrigger>
        </TabsList>
        <TabsContent value="buy">
        <Form {...form}>
            <form
            onSubmit={form.handleSubmit(onBuy)}
            className="flex justify-center items-center"
            >
                <div className="flex flex-col gap-y-4 justify-center items-center m-10 w-[400px]">
                    <FormItem className="w-full">
                        <FormLabel>
                            Name
                        </FormLabel>
                        <Input
                        readOnly
                        value={`${data.coinName.toUpperCase()}`}
                        />
                    </FormItem>
                    <FormField
                    control={form.control}
                    name="quantity"
                    render={({field}) => (
                        <FormItem className="w-full">
                            <FormLabel>
                                Quantity
                            </FormLabel>
                            <FormControl>
                                <Input
                                {...field}
                                placeholder="0.00"
                                />
                            </FormControl>
                        </FormItem>
                    )}
                    />
                    <FormField
                    control={form.control}
                    name="price"
                    render={({field}) => (
                        <FormItem className="w-full">
                            <FormLabel>
                                Price
                            </FormLabel>
                            <FormControl>
                                <Input
                                {...field}
                                />
                            </FormControl>
                        </FormItem>
                    )}
                    />
                    <Button
                    className="w-full"
                    disabled={isPending}
                    type="submit"
                    >
                        {isPending ? <Loader2 className="text-muted-foreground animate-spin" /> : "Confirm Edit"}
                    </Button>
                </div>
            </form>
        </Form>
        </TabsContent>
        <TabsContent value="sell">
        <Form {...form}>
            <form
            onSubmit={form.handleSubmit(onSell)}
            className="flex justify-center items-center"
            >
                <div className="flex flex-col gap-y-4 justify-center items-center m-10 w-[400px]">
                    <FormItem className="w-full">
                        <FormLabel>
                            Name
                        </FormLabel>
                        <Input
                        readOnly
                        value={`${data.coinName.toUpperCase()}`}
                        />
                    </FormItem>
                    <FormField
                    control={form.control}
                    name="quantity"
                    render={({field}) => (
                        <FormItem className="w-full">
                            <FormLabel>
                                Quantity
                            </FormLabel>
                            <FormControl>
                                <Input
                                {...field}
                                placeholder="0.00"
                                />
                            </FormControl>
                        </FormItem>
                    )}
                    />
                    <FormField
                    control={form.control}
                    name="price"
                    render={({field}) => (
                        <FormItem className="w-full">
                            <FormLabel>
                                Price
                            </FormLabel>
                            <FormControl>
                                <Input
                                {...field}
                                />
                            </FormControl>
                        </FormItem>
                    )}
                    />
                    <Button
                    className="w-full"
                    disabled={isPending}
                    type="submit"
                    >
                        {isPending ? <Loader2 className="text-muted-foreground animate-spin" /> : "Confirm Edit"}
                    </Button>
                </div>
            </form>
        </Form>
        </TabsContent>
    </Tabs>
  )
}