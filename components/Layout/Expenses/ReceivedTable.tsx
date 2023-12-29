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
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { useState } from "react";

interface ReceivedTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function ReceivedTable<TData, TValue>({
  columns,
  data,
}: ReceivedTableProps<TData, TValue>) {
  //state for table filtering
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      columnFilters,
    },
  });

  return (
    <section>
      <section className="flex justify-between py-1 px-4 items-center bg-white my-12">
        <div>
          <h3 className="text-xl font-semibold capitalize">Received columns</h3>
        </div>
        <div className="flex items-center py-4">
          <Input
          //@ts-ignore
            placeholder="Filter Product Type"
          //@ts-ignore
            value={
              (table.getColumn("productType")?.getFilterValue() as string) ??
              ""
            }
            onChange={(event) =>
              table
                .getColumn("productType")
                ?.setFilterValue(event.target.value)
            }
            className="w-[300px] py-4"
          />
        </div>
      </section>

      <div className="rounded-md border">
        <Table className="border-spacing-y-8 border-separate bg-clip-padding bg-white px-3">
          <TableHeader className=" bg-gonje font-semibold rounded-md text-black">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="rounded-md">
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
                  );
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
                  className="border-b border-black relative"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="font-medium">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </section>
  );
}
