"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, Info, MoreHorizontal, Plus, Star } from "lucide-react"
import {format} from "date-fns"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MarketDataType } from "@/types"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip"
import { Avatar, AvatarImage } from "../ui/avatar"
import { UseDetails } from "@/hooks/use-details"
import { Drawer, DrawerContent, DrawerTrigger } from "../ui/drawer"
import { AddPortfolio } from "./add-portfolio"

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
  },
  {
    accessorKey: "current_price",
    header: () => <div className="select-none">Price</div>,
    cell: ({ row }) => {
        const price = parseFloat(row.getValue("current_price"))
        
        const formatted = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(price)
        
        const data = row.original
        return(
            <div className="font-medium">
                <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger className="cursor-default">${price}</TooltipTrigger>
                    <TooltipContent className="flex flex-col justify-center items-center">
                    Last update
                    <div className="flex items-center justify-center flex-col">
                    <p>{format(data.last_updated, "p")}</p>
                    <p>{format(data.last_updated, "P")}</p>
                    </div>
                    </TooltipContent>
                </Tooltip>
                </TooltipProvider>
            </div>
        )
      },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const coin = row.original
      const details = UseDetails()
      return (
        <Drawer>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Actions</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem className="flex gap-x-1" asChild>
              <DrawerTrigger>
                <Plus className="w-4 h-4 text-muted-foreground" />
                Add portfolio
              </DrawerTrigger>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
            onClick={() => details.onOpen(coin.id)}
            className="flex gap-x-1 text-xs text-muted-foreground cursor-pointer">
              <Info className="w-3 h-3" />
              <p>View Details</p>
            </DropdownMenuItem>
          </DropdownMenuContent>
          <DrawerContent>
            <AddPortfolio data={coin} />
          </DrawerContent>
        </DropdownMenu>
        </Drawer>
      )
    },
  },

]
