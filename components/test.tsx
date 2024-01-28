"use client"

import { useProfit } from "@/hooks/use-profit"

export const TestComp = () => {
    const {totalProfit} = useProfit(state => state)
  return (
    <div>
        {totalProfit}
    </div>
  )
}