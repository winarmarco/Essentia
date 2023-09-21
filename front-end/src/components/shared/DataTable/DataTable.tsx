"use client";

import React, {useState} from "react";
import {
  ColumnDef,
  FilterFn,
  PaginationState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {filterFns} from "./Filter";
import {DebouncedInput} from "../DebouncedInput/DebouncedInput";
import {AiFillCaretDown, AiFillCaretUp} from "react-icons/ai";

interface ReactTableProps<T extends object> {
  data: T[];
  columns: ColumnDef<T>[];
  showNavigation?: boolean;
  showGlobalFilter?: boolean;
  filterFn?: FilterFn<T>;
  initPageSize?: number;
}

const DataTable = <T extends object>({
  columns,
  data,
  showNavigation = true,
  showGlobalFilter = true,
  filterFn = filterFns.contains,
  initPageSize = 10,
}: ReactTableProps<T>) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: initPageSize,
  });
  const [globalFilter, setGlobalFilter] = useState("");
  const table = useReactTable<T>({
    columns,
    data,
    state: {
      sorting,
      pagination,
      globalFilter,
    },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    onPaginationChange: setPagination,
    globalFilterFn: filterFn,
  });

  return (
    <div className="flex flex-col w-full h-full">
        <div className="">
          {showGlobalFilter ? (
            <DebouncedInput
              value={globalFilter ?? ""}
              onChange={(value) => setGlobalFilter(String(value))}
              className="font-normal text-sm border-block border p-2 mb-4 w-full"
              placeholder="Search all columns..."
            />
          ) : null}
          <table className="min-w-full text-center">
            <thead className="border-b">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className={`px-6 py-4 text-sm font-medium text-gray-900 ${
                        header.column.getCanSort() ? "cursor-pointer" : ""
                      }`}
                      onClick={header.column.getToggleSortingHandler()}
                    >
                      <div className="flex items-center justify-center">
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                        {{
                          asc: <AiFillCaretUp className="h-4 w-4 ml-1" />,
                          desc: <AiFillCaretDown className="h-4 w-4 ml-1" />,
                        }[header.column.getIsSorted() as string] ?? null}
                      </div>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.map((row) => (
                <tr key={row.id} className='border-b" bg-white hover:bg-gray-100 transition-colors duration-500'>
                  {row.getVisibleCells().map((cell) => (
                    <td
                      className="whitespace-nowrap px-6 py-4 text-sm font-light text-gray-900"
                      key={cell.id}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>

          {showNavigation ? (
            <div className="font-normal text-sm">
              <div className="h-2 mt-5" />
              <div className="flex items-center gap-2">
                <button
                  className="cursor-pointer rounded border p-1"
                  onClick={() => table.setPageIndex(0)}
                  disabled={!table.getCanPreviousPage()}
                >
                  {"<<"}
                </button>
                <button
                  className="cursor-pointer rounded border p-1"
                  onClick={() => table.previousPage()}
                  disabled={!table.getCanPreviousPage()}
                >
                  {"<"}
                </button>
                <button
                  className="cursor-pointer rounded border p-1"
                  onClick={() => table.nextPage()}
                  disabled={!table.getCanNextPage()}
                >
                  {">"}
                </button>
                <button
                  className="cursor-pointer rounded border p-1"
                  onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                  disabled={!table.getCanNextPage()}
                >
                  {">>"}
                </button>
                <span className="flex cursor-pointer items-center gap-1">
                  <div>Page</div>
                  <strong>
                    {table.getState().pagination.pageIndex + 1} of{" "}
                    {table.getPageCount()}
                  </strong>
                </span>
                <span className="flex items-center gap-1">
                  | Go to page:
                  <input
                    type="number"
                    defaultValue={table.getState().pagination.pageIndex + 1}
                    onChange={(e) => {
                      const page = e.target.value
                        ? Number(e.target.value) - 1
                        : 0;
                      table.setPageIndex(page);
                    }}
                    className="w-16 rounded border p-1"
                  />
                </span>
                <select
                  value={pagination.pageSize}
                  onChange={(e) => {
                    table.setPageSize(Number(e.target.value));
                  }}
                >
                  {[10, 20, 30, 40, 50].map((pageSize) => (
                    <option key={pageSize} value={pageSize}>
                      Show {pageSize}
                    </option>
                  ))}
                </select>
                <div className="h-4" />
              </div>
            </div>
          ) : null}
        </div>
    </div>
  );
};

export default DataTable;
