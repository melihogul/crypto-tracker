"use client"

import { ColumnDef } from "@tanstack/react-table"
import { AssetsType } from "@/types"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { MdArrowDropDown, MdArrowDropUp } from "react-icons/md"
import { getPercentProfit, getProfitPerCoin } from "@/lib/get-audit-logs"
import ProfitRow from "./profit-row"
import { ActionsRow } from "./actions-row"

export const columns: ColumnDef<AssetsType>[] = [
  {
    accessorKey: "image",
    header: undefined,
    cell: ({row}) => {
      const url = row.original.image

      return(
        <div className="flex text-center justify-end">
          <Avatar className="flex text-center justify-center items-center bg-gray-200">
              <AvatarImage className="h-6 w-6" src={url} />
          </Avatar>
        </div>
      )
    }
  },
  {
    accessorKey: "name",
    header: ({column}) => {
      return(
        <div
        className="cursor-pointer select-none"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
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
        className="cursor-pointer select-none text-right"
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
    id: "holdings",
    header: () => {
      return(
        <div className="select-none text-right">
          Holdings
        </div>
      )
    },
    cell: ({row}) => {
      const buyQuantity = row.original.auditLogs.filter((item) => item.action === "BUY").map((item) => item.quantity).reduce((accumulator, currentValue) => accumulator + currentValue, 0)
      const sellQuantity = row.original.auditLogs.filter((item) => item.action === "SELL").map((item) => item.quantity).reduce((accumulator, currentValue) => accumulator + currentValue, 0)
      const holdings = buyQuantity - sellQuantity
      const holdingsWorth = parseFloat((holdings * row.original.current_price).toFixed(2))

      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(holdingsWorth)

      return(
        <div className="flex flex-col justify-end text-right w-full">
          <p>{formatted}</p>
          <p className="text-xs text-muted-foreground uppercase">{holdings} {row.original.symbol}</p>
        </div>
      )
    }
  },
  {
    id: "avgBuyPrice",
    header: () => {
      return(
        <div className="select-none cursor-pointer text-right">Avg. Buy Price</div>
      )
    },
    cell: ({row}) => {
      const auditLogs = row.original.auditLogs
      const totalPrice = auditLogs.filter((item) => item.action === "BUY").map((item) => (item.price * item.quantity)).reduce((accumulator, currentValue) => accumulator + currentValue, 0)
      const totalAmount = auditLogs.filter((item) => item.action === "BUY").map((item) => item.quantity).reduce((sum, item) => sum + item)
      const avgBuyPrice = totalPrice / totalAmount

      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(avgBuyPrice)
      return(
        <div className="text-right">{formatted}</div>
      )
    }
  },
  {
    id: "profit",
    header: () => {
      return (
        <div className="select-none text-right">
          Profit/Loss
        </div>
      )
    },
    cell: ({row}) => {
      const auditLogs = row.original.auditLogs
      const currentPrice = row.original.current_price

      const profit = getProfitPerCoin(auditLogs, currentPrice)
      const isLoss = profit.toString().startsWith("-")

      const buyQuantity = auditLogs.filter((item) => item.action === "BUY").map((item) => item.quantity).reduce((accumulator, currentValue) => accumulator + currentValue, 0)
      const sellQuantity = auditLogs.filter((item) => item.action === "SELL").map((item) => item.quantity).reduce((accumulator, currentValue) => accumulator + currentValue, 0)
      const holdings = buyQuantity - sellQuantity
      const holdingsWorth = parseFloat((holdings * row.original.current_price).toFixed(2))

      const totalCost = auditLogs.filter((item) => item.action === "BUY").map(item => item.price * item.quantity).reduce((sum, item) => sum + item)
      const profitPercentage = ((holdingsWorth - totalCost) / totalCost) * 100
      console.log("holding", holdingsWorth);
      console.log("totalcost", totalCost);
      console.log("profitpercentage", profitPercentage)
      return(
        <ProfitRow profit={profit} isLoss={isLoss} profitPercentage={profitPercentage} />
      )
    }
  },
  {
    id: "actions",
    cell: ({row}) => {
      const data = row.original
      return(
        <>
          <ActionsRow data={data} />
        </>
      )
      },
  },
]
