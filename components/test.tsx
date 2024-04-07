"use client"

import { useProfit } from "@/hooks/use-profit"
import { GetMarketData } from "@/lib/get-data";

export const TestComp = () => {
  const {items, updateItems, totalProfit, addProfit} = useProfit(state => state)
  const { isLoading } = GetMarketData()

  if(isLoading) {
      return (
          <div>selam</div>
      )
  }

  const formatted = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(totalProfit)

  
  return (
    <div className="flex flex-col gap-y-2 bg-muted color w-fit p-4 rounded-md my-2">
      <p>All time profit</p>
      <div className="flex flex-col gap-y-2">
        <p className="text-xl">{formatted}</p>
        <p className="text-base text-emerald-500">10.20%</p>
      </div>
    </div>
  )
}