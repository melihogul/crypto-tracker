"use client"

import { columns } from "./columns"
import { DataTable } from "./data-table"
import { AuditLogsType } from "@/types"
import { GetMarketData } from "@/lib/get-data"

interface AuditLogsProps {
  data: AuditLogsType
}

export default function Assets({data: auditLogs}: AuditLogsProps) {
  
  const auditLogsIds = auditLogs.map(al => al.coinId)

  const filteredId = auditLogsIds.filter((item, index) => auditLogsIds.indexOf(item) === index)

  const { data, isLoading, error } = GetMarketData()
  
  const filteredArray = data?.filter(item => filteredId.includes(item.id))

  const emptyAuditLog = {
    id: null as any,
    action: null as any,
    quantity: null as any,
    price: null as any,
    userId: null as any,
    coinId: null as any,
    coinName: null as any,
    createdAt: null as any,
    updatedAt: null as any,
  };

  const newArray = filteredArray?.map(item => ({ ...item, auditLogs: [emptyAuditLog] }));
  
  const mergedArray = newArray?.map(filtered => {
    const matchingItems = auditLogs.filter(item => item.coinId === filtered.id);
    return matchingItems.length > 0 ? { ...filtered, auditLogs: matchingItems } : filtered;
  });

  if(isLoading) {
    return(
      <>
        <DataTable.Skeleton />
      </>
    )
  }

  return (
      <DataTable columns={columns} data={mergedArray || []} />
  )
}