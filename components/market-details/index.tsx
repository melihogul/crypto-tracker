"use client"

import { GetMarketData } from "@/lib/get-full-data"
import { columns } from "./columns"
import { DataTable } from "./data-table"

export default function MarketDataTable() {
    const { data: PureData, isLoading, error } = GetMarketData()

    const data = PureData?.map((dt) => dt)

    if(isLoading) {
      return(
        <>
          <DataTable.Skeleton />
        </>
      )
    }
    
  return (
      <DataTable columns={columns} data={data || []} />
  )
}