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
import React from "react"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { ScanSearch } from "lucide-react"

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
    },
    initialState: {
      pagination: {
        pageSize: 5
      }
    },
  })

  return (
    <div>
        <div className="flex gap-x-2 bg-muted p-4 rounded-md mb-2 select-none">
          <ScanSearch />
          <p>View Transactions</p>
        </div>
        <div className="rounded-md bg-muted">
        <Table>
            <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id} className="border-none">
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
                    className="hover:bg-gray-300 cursor-pointer rounded-2xl border-none"
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
        <div className="flex items-center justify-center space-x-2 py-4">
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
      <div className="flex flex-col gap-y-[2px] mt-4 relative w-full justify-center items-center">
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