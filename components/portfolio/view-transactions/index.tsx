"use client"

import { AuditLogsType } from "@/types"
import { columns } from "./columns"
import { DataTable } from "./data-table"

interface AuditLogsProps {
  data: AuditLogsType
}

export default function ViewTransActions({data}: AuditLogsProps) {

  if(data === undefined) {
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