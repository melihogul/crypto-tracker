"use client"

import { useProfit } from "@/hooks/use-profit"
import { cn } from "@/lib/utils"
import { useEffect } from "react"
import { MdArrowDropDown, MdArrowDropUp } from "react-icons/md"

interface ProfitRowProps {
    profit: number
    profitPercentage: number
    isLoss: boolean
}

const ProfitRow = ({profit, profitPercentage, isLoss }: ProfitRowProps) => {
    const {items, updateItems, totalProfit, addProfit} = useProfit(state => state)

    useEffect(() => {
        if(items.length === 0) {
            updateItems({profit: profit})
            addProfit()
        }
    }, [])

    const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
    }).format(profit)

  return (
    <div className="flex flex-col justify-end text-right w-full">
        <p className="">
            {formatted}
        </p>
        <div className="flex justify-end">
            <p className={cn(
                isLoss ? "text-rose-500" : "text-emerald-500",
                "text-xs flex justify-center items-center"
                )}>
                {
                isLoss
                .toLocaleString()
                .startsWith("-")
                ? (
                    <MdArrowDropDown className="h-5 w-5" />
                ) : (
                    <MdArrowDropUp className="h-5 w-5" />
                )
                }
                {profitPercentage.toFixed(2)}%
            </p>
        </div>
    </div>
  )
}

export default ProfitRow