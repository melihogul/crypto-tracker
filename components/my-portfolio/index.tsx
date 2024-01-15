"use client"

import { GetMarketData } from "@/lib/get-full-data"
import { columns } from "./columns"
import { DataTable } from "./data-table"

export default function MyPortfolio() {
    const { data, isLoading, error } = GetMarketData()

    if(isLoading) {
      return(
        <>
          <DataTable.Skeleton />
        </>
      )
    }
    
  return (
      <DataTable columns={columns} data={[]} />
  )
}