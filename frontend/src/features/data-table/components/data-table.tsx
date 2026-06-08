"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/src/components/ui/table";
import Skeleton from "@/src/components/ui/skeleton";
import { DataTableFilters } from "./data-table-filters";
import { DataTablePagination } from "./data-table-pagination";
import { DataTableActions } from "./data-table-actions";
import { DataTableStatusBadge } from "./data-table-status-badge";
import { useDataTable } from "../hooks/useDataTable";
import { DataTableProps } from "../types/types";
import { formatAuthors } from "../lib/data-table-helpers";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { Badge } from "@/src/components/ui/badge";
import DataTableSkeleton from "./skeletons/data-table-skeleton";

export function DataTable({
  data,
  onEdit,
  onDelete,
  onPublish,
  config = {},
  className = "",
  isLoading = false,
  emptyStateMessage = "No results found. Try adjusting your filters.",
}: DataTableProps) {
  const {
    data: tableData,
    paginationInfo,
    filters,
    handlers,
    pageNumbers,
  } = useDataTable(data, config);

  if (isLoading) {
    return <DataTableSkeleton />;
  }

  return (
    <div className={`space-y-4 ${className}`}>
      <DataTableFilters
        searchTerm={filters.searchTerm}
        statusFilter={filters.statusFilter}
        onSearchChange={handlers.onSearchChange}
        onStatusChange={handlers.onStatusChange}
        onReset={handlers.onReset}
      />
      <div className="rounded-md border">
        <Table className="max-w-full">
          <TableHeader className="bg-sidebar">
            <TableRow>
              <TableHead className="w-[30%]">
                <Button
                  variant="ghost"
                  onClick={() => handlers.onSort("title")}
                  className="h-8 font-semibold"
                >
                  Title
                  <ArrowUpDown className="ml-1 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead className="w-[20%]">
                <Button
                  variant="ghost"
                  onClick={() => handlers.onSort("category")}
                  className="h-8 font-semibold"
                >
                  Category
                  <ArrowUpDown className="ml-1 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead className="w-[25%]">
                <Button
                  variant="ghost"
                  onClick={() => handlers.onSort("authors")}
                  className="h-8 font-semibold"
                >
                  Authors
                  <ArrowUpDown className="ml-1 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead className="w-[10%]">
                <Button
                  variant="ghost"
                  onClick={() => handlers.onSort("status")}
                  className="h-8 font-semibold"
                >
                  Status
                  <ArrowUpDown className="ml-1 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead className="w-[15%] text-right"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tableData.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                  {emptyStateMessage}
                </TableCell>
              </TableRow>
            ) : (
              tableData.map((item) => (
                <TableRow key={item._id}>
                  <TableCell className="font-medium">{item.title}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{item.category}</Badge>
                  </TableCell>
                  <TableCell>{formatAuthors(item.authors)}</TableCell>
                  <TableCell>
                    <DataTableStatusBadge status={item.status} />
                  </TableCell>
                  <TableCell>
                    <DataTableActions
                      item={item}
                      onEdit={onEdit}
                      onDelete={onDelete}
                      onPublish={onPublish}
                    />
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {paginationInfo.totalPages > 1 && (
        <DataTablePagination
          paginationInfo={paginationInfo}
          pageNumbers={pageNumbers}
          onPageChange={handlers.onPageChange}
        />
      )}
    </div>
  );
}