"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, Info, Star } from "lucide-react"
import { MdArrowDropUp, MdArrowDropDown } from "react-icons/md";
import {format} from "date-fns"
import { MarketDataType } from "@/types"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"
import { ActionsRow } from "./actions-row";

export const columns: ColumnDef<MarketDataType>[] = [
  {
    accessorKey: "roi",
    header: undefined,
    cell: () => {
      return(
        <div className="flex text-center justify-end">
          <Star className="w-[13px] h-[13px] text-muted-foreground cursor-pointer" />
        </div>
      )
    }
  },
  {
    accessorKey: "market_cap_rank",
    header: ({ column }) => {
        return (
          <div
            className="flex cursor-pointer text-center items-center ml-2 select-none"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            #
          </div>
        )
    },
    cell: ({row}) => {
      return(
        <div className="ml-2 text-gray-800">
          {row.original.market_cap_rank}
        </div>
      )
    }
  },
  {
    accessorKey: "image",
    header: undefined,
    cell: ({row}) => {
        const data = row.original
        return(
            <div className="flex text-center justify-end">
                <Avatar className="flex text-center justify-center items-center bg-gray-200">
                    <AvatarImage className="h-6 w-6" src={data.image} />
                </Avatar>
            </div>
        )
    },
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
        return (
          <div
            className="flex cursor-pointer text-center items-center select-none"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Name
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </div>
        )
    },
    cell: ({row}) => {
      const {name, symbol} = row.original
      return(
        <div className="flex items-center gap-x-2">
          <p>{name}</p>
          <p className="uppercase text-muted-foreground text-xs">{symbol}</p>
        </div>
      )
    }
  },
  {
    accessorKey: "current_price",
    header: ({column}) => {
      return(
        <div
        className="select-none cursor-pointer text-right"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Price
        </div>
      )
    },
    cell: ({ row }) => {
        const price = row.original.current_price
        const formatted = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(price)
        const newPrice = price > 1 ? formatted : `$${price}`

        const isContainMinus = price.toString().search("-") > 0
        
        function formatPrice(oldPrice: string) {
            let [before, after] = oldPrice.split("e-");
            
            let newPrice = before.replace(".", "");
        
            newPrice = "0." + "0".repeat(Number(after) - 1) + newPrice;
            return newPrice;
        }
        
        const lastUpdated = row.original.last_updated

        return(
            <div className="font-medium text-right">
                <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger className="cursor-default">{isContainMinus ? `$${formatPrice(price.toString())}` : newPrice}</TooltipTrigger>
                    <TooltipContent className="flex flex-col justify-center items-center">
                    Last update
                    <div className="flex items-center justify-center flex-col">
                    <p>{format(lastUpdated, "p")}</p>
                    <p>{format(lastUpdated, "P")}</p>
                    </div>
                    </TooltipContent>
                </Tooltip>
                </TooltipProvider>
            </div>
        )
      },
  },
  {
    accessorKey: "price_change_percentage_24h",
    header: ({column}) => {
      return(
        <div
        className="cursor-pointer select-none text-right"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          24h%
        </div>
      )
    },
    cell: ({row}) => {
      const data = row.original
      const price = data.price_change_percentage_24h.toLocaleString().startsWith("-") ? parseFloat(data.price_change_percentage_24h.toString().substring(1)).toFixed(2) : data.price_change_percentage_24h.toFixed(2)
      return(
        <div className="flex justify-end gap-x-1">
          <div className={cn(
                "flex justify-center items-center gap-x-2",
                data.price_change_percentage_24h.toLocaleString().startsWith("-")
                ? "text-rose-500"
                : "text-emerald-500"
          )}>
            <p>
              {
              data.price_change_percentage_24h
              .toLocaleString()
              .startsWith("-")
                ? (
                  <MdArrowDropDown className="h-5 w-5" />
                ) : (
                  <MdArrowDropUp className="h-5 w-5" />
                )
              }
            </p>
            {price}%
          </div>
        </div>
      )
    }
  },
  {
    accessorKey: "market_cap",
    header: ({column}) => {
      return(
        <div className="flex gap-x-1 justify-end">
          <p
          className="select-none cursor-pointer"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
            Market Cap
          </p>
          <div className="hidden lg:flex">
            <TooltipProvider>
              <Tooltip>
                  <TooltipTrigger className="cursor-default">
                    <Info className="w-[14px] h-[14px]" />
                  </TooltipTrigger>
                  <TooltipContent className="flex flex-col justify-center items-center w-80 py-4 gap-y-2 cursor-text bg-gray-200 text-gray-700">
                  <p>The total market value of a cryptocurrency&apos;s circulating supply. It is analogous to the free-float capitalization in the stock market.</p>
                  <p>Market Cap = Current Price x Circulating Supply.</p>
                  </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      )
    },
    cell: ({ row }) => {
        const marketCap = row.original.market_cap
        const formatted = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
          minimumFractionDigits: 0
        }).format(marketCap)

        return(
            <div className="font-medium text-right">
              {formatted}
            </div>
        )
      },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const coin = row.original
      
      return (
        <ActionsRow coin={coin} />
      )
    },
  },

]
