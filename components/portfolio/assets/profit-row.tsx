"use client"

import { useProfit } from "@/hooks/use-profit"
import { cn } from "@/lib/utils"
import { useEffect } from "react"

interface ProfitRowProps {
    profit: number
    isLoss: boolean
}

const ProfitRow = ({profit, isLoss}: ProfitRowProps) => {
    const {increment} = useProfit(state => state)

    useEffect(() => {
       increment(profit)
    }, [increment, profit])

    const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
    }).format(profit)

  return (
    <div className="flex flex-col justify-end text-right w-full">
        <p className={cn(
            isLoss ? "text-rose-500" : "text-emerald-500"
            )}>
            {formatted}
        </p>
        <p className="text-xs text-muted-foreground uppercase">
            --%
        </p>
    </div>
  )
}

export default ProfitRow