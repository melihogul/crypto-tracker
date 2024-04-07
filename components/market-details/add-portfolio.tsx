import * as z from "zod"
import { MarketDataType } from "@/types"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { AddPortfolioSchema } from "@/schemas";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useState, useTransition } from "react";
import { Loader2 } from "lucide-react";
import { addPortfolio } from "@/actions/add-portfolio";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { useProfit } from "@/hooks/use-profit";

export const AddPortfolio = ({data}: {data: MarketDataType}) => {
    const coinId = data.id
    const coinName = data.symbol
    const [isPending, startTransition] = useTransition()
    const {deleteEverything} = useProfit(state => state)
    
    const form = useForm<z.infer<typeof AddPortfolioSchema>>({
        resolver: zodResolver(AddPortfolioSchema),
        defaultValues: {
            quantity: undefined,
            price: data.current_price,
        }
    })
    
    const onBuy = (values: z.infer<typeof AddPortfolioSchema>) => {
        startTransition(() => {
            addPortfolio(values, coinId, coinName, "BUY")
            .then(() => toast.success("You have successfully added!"))
            .catch(() => toast.error("Something went wrong!"))
        })
    }

    const onSell = (values: z.infer<typeof AddPortfolioSchema>) => {
        startTransition(() => {
            addPortfolio(values, coinId, coinName, "SELL")
            .then(() => toast.success("You have successfully added!"))
            .catch(() => toast.error("Something went wrong!"))
        })
    }
    
  return (
    <Tabs defaultValue="buy">
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
                        value={data.name + ` (${data.symbol})`}
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
                        {isPending ? <Loader2 className="text-muted-foreground animate-spin" /> : "Add"}
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
                        value={data.name + ` (${data.symbol})`}
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
                        {isPending ? <Loader2 className="text-muted-foreground animate-spin" /> : "Add"}
                    </Button>
                </div>
            </form>
        </Form>
        </TabsContent>
    </Tabs>
  )
}