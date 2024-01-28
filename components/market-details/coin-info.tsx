import { MarketDataType } from "@/types"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { UseDetails } from "@/hooks/use-details"
import { useQuery } from "@tanstack/react-query"
import { format } from "date-fns"
import Image from "next/image"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion"
import { cn } from "@/lib/utils"
import { ArrowDown, ArrowUp, Medal } from "lucide-react"

const CoinInfo = ({data}: {data: MarketDataType}) => {
  return (
    <div className="select-none">
        <div className="text-lg font-semibold leading-none tracking-tight">
            Coin Details
            <div className="flex gap-x-1 text-xs mt-1 text-muted-foreground">
            <p className="">Last Update:</p>
            <div className="flex gap-x-1">
                <p>{format(data.last_updated, "p")}</p> -
                <p>{format(data.last_updated, "P")}</p>
            </div>
            </div>
        </div>
        <div className="mt-3 text-sm text-muted-foreground">
            <div className="flex gap-x-1">
                <p className="font-bold select-none">Name:</p>
                <Image alt="img" src={data.image} height={20} width={20} />
                {data.name}
                <kbd className="h-5 items-center gap-1 rounded border bg-muted px-1.5 font-mono text-xs font-medium text-muted-foreground opacity-100">
                    {data.symbol.toUpperCase()}
                </kbd>
            </div>
            <div className="flex gap-x-1">
                <p className="font-bold select-none">Current Price:</p>
                ${data.current_price}
            </div>
            <div className="flex gap-x-1">
                <p className="font-bold select-none">24H Price Change:</p>
                <p className={cn(
                      data.price_change_percentage_24h.toLocaleString().startsWith("-")
                      ? "text-rose-500"
                      : "text-emerald-500"
                )}>
                    {data.price_change_percentage_24h}%
                </p>
            </div>
            <div className="flex gap-x-1 mt-2">
                <p className="flex text-center justify-center items-center font-bold select-none">
                    <ArrowUp className="w-4 h-4" />
                    24H High:
                </p>
                ${data.high_24h}
            </div>
            <div className="flex gap-x-1">
                <p className="flex text-center justify-center items-center font-bold select-none">
                    <ArrowDown className="w-4 h-4" />
                    24H Low:
                </p>
                ${data.low_24h}
            </div>
            <div className="flex gap-x-1 mt-3">
                <p className="font-bold select-none">All Time High:</p>
                ${data.ath}
            </div>
            <div className="flex gap-x-1 mt-2">
                <Accordion type="single" collapsible>
                    <AccordionItem value="item-1">
                        <AccordionTrigger>Other Details</AccordionTrigger>
                        <AccordionContent>
                        <div className="flex gap-x-1 select-none">
                            <p className="font-semibold">Market Cap:</p>
                            ${data.market_cap}
                        </div>
                        <div className="flex gap-x-1 select-none">
                            <p className="font-semibold">24H Market Cap Change:</p>
                            <p className={cn(
                                data.market_cap_change_percentage_24h.toLocaleString().startsWith("-")
                                ? "text-rose-500"
                                : "text-emerald-500"
                            )}>
                                {data.market_cap_change_percentage_24h}%
                            </p>
                        </div>
                        <div className="flex text-center gap-x-1 select-none">
                            <p className="font-semibold">Market Cap Rank:</p>
                            <p className="flex items-center justify-center gap-x-1">{data.market_cap_rank}<Medal className="h-4 w-4" /></p>
                        </div>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </div>
        </div>
    </div>
  )
}

export default CoinInfo