"use client"

import { ColumnDef } from "@tanstack/react-table"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { OneAuditLogType } from "@/types"
import { TransactionsItem } from "./transactions-item"

export const columns: ColumnDef<OneAuditLogType>[] = [
  {
    accessorKey: "action",
    header: ({ column }) => {
        return (
          <div
            className="cursor-pointer select-none px-3"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Type
          </div>
        )
    },
    cell: ({row}) => {
      const data = row.original
      return(
        <div className="flex items-center gap-x-2 p-2">
            <p className={cn(
                "flex text-center justify-center items-center select-none h-8 w-8 shrink-0 overflow-hidden rounded-full",
                data.action === "BUY" ? "bg-emerald-400" : "bg-rose-400"
            )}>
                {data.action === "BUY" ? "B" : "S"}
            </p>
            <div>
                <p className="text-sm">{data.action}</p>
                <p className="text-xs text-muted-foreground">{format(data.createdAt, "PPpp")}</p>
            </div>
        </div>
      )
    }
  },
  {
    accessorKey: "price",
    header: ({column}) => {
      return(
        <div
        className="cursor-pointer select-none"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Price
        </div>
      )
    },
    cell: ({ row }) => {
      const price = row.original.price
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
      
        return(
            <div className="font-medium">
                {isContainMinus ? `$${formatPrice(price.toString())}` : newPrice}
            </div>
        )
      },
  },
  {
    accessorKey: "quantity",
    header: ({column}) => {
      return(
        <div
        className="cursor-pointer select-none"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Amount
        </div>
      )
    },
    cell: ({ row }) => {
      const data = row.original
      const quantity = parseFloat(row.getValue("quantity"))
      const amount = data.quantity * data.price
      
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount)
      return(
          <div className="font-medium">
              <p>{data.action === "BUY" ? "+" : "-"}{
                amount > 1 ? formatted : `$${amount.toFixed(10)}`
              }</p>
              <p className={cn(
                "text-xs",
                data.action === "BUY" ? "text-emerald-400" : "text-rose-400",
              )}>
                {data.action === "BUY" ? "+" : "-"}{quantity} {data.coinName.toUpperCase()}
              </p>
          </div>
      )
    },
  },
  {
    id: "actions",
    cell: ({row}) => {
        return(
          <TransactionsItem data={row.original} />
        )
      },
  },
]
