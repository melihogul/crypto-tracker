"use client"

import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "../ui/button"
import React from "react"
import { Input } from "../ui/input"
import { Skeleton } from "../ui/skeleton"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
    const [rowSelection, setRowSelection] = React.useState({})
    
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      rowSelection,
    }
  })

  return (
    <div>
        <div className="flex items-center py-4">
            <Input
            placeholder="Filter coins..."
            value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
                table.getColumn("name")?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
            />
        </div>
        <div className="rounded-md border">
        <Table>
            <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                    return (
                    <TableHead key={header.id}>
                        {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                            )}
                    </TableHead>
                    )
                })}
                </TableRow>
            ))}
            </TableHeader>
            <TableBody>
            {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                >
                    {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                    ))}
                </TableRow>
                ))
            ) : (
                <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                    No results.
                </TableCell>
                </TableRow>
            )}
            </TableBody>
        </Table>
        </div>
        <div className="flex items-center justify-end space-x-2 py-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
    </div>
  )
}

DataTable.Skeleton = function DataTableSkeleton() {
  return(
      <div className="flex flex-col gap-y-[2px] mt-6 relative w-full justify-center items-center">
          <div className="w-full max-w-[1335px]">
            <Skeleton className="h-[38px] max-w-[383px] mb-[11px] rounded-md place-self-start" />
          </div>
          <Skeleton className="h-[42px] w-full max-w-[1335px] rounded-md" />
          <Skeleton className="h-[55px] w-full max-w-[1335px] rounded-md" />
          <Skeleton className="h-[55px] w-full max-w-[1335px] rounded-md" />
          <Skeleton className="h-[55px] w-full max-w-[1335px] rounded-md" />
          <Skeleton className="h-[55px] w-full max-w-[1335px] rounded-md" />
          <Skeleton className="h-[55px] w-full max-w-[1335px] rounded-md" />
          <Skeleton className="h-[55px] w-full max-w-[1335px] rounded-md" />
          <Skeleton className="h-[55px] w-full max-w-[1335px] rounded-md" />
          <Skeleton className="h-[55px] w-full max-w-[1335px] rounded-md" />
          <Skeleton className="h-[55px] w-full max-w-[1335px] rounded-md" />
          <Skeleton className="h-[55px] w-full max-w-[1335px] rounded-md" />
      </div>
  )
}