// features/data-table/hooks/useDataTable.ts
import { useState, useMemo, useEffect } from "react";
import { DataTableConfig, DataTableState } from "../types/types";
import { DataTableService } from "../services/data-table.service";
import { DEFAULT_CONFIG } from "../constants";
import { useDataTableFilters } from "./useDataTableFilters";
import { useDataTablePagination } from "./useDataTablePagination";
import { getVisiblePageNumbers } from "../lib/data-table-helpers";
import { Article } from "@/src/lib/types";

export function useDataTable(
  data: Article[],
  config: Partial<DataTableConfig> = {}
) {
  const finalConfig = { ...DEFAULT_CONFIG, ...config };
  const [sortField, setSortField] = useState<DataTableState["sortField"]>();
  const [sortOrder, setSortOrder] = useState<DataTableState["sortOrder"]>();

  const {
    searchTerm,
    debouncedSearchTerm,
    statusFilter,
    setStatusFilter,
    handleSearchChange,
    resetFilters: resetFiltersState,
  } = useDataTableFilters(finalConfig.defaultStatusFilter);

  const service = useMemo(
    () => new DataTableService(data, finalConfig.itemsPerPage),
    [data, finalConfig.itemsPerPage]
  );

  const state: DataTableState = {
    searchTerm: debouncedSearchTerm,
    statusFilter,
    currentPage: 1,
    sortField,
    sortOrder,
  };

  const { data: _processedData, paginationInfo } = service.getProcessedData(state);
  
  const { currentPage, setCurrentPage, goToPage } = useDataTablePagination(
    paginationInfo.totalPages
  );

  // Update state with current page
  const fullState: DataTableState = {
    ...state,
    currentPage,
  };

  const { data: finalData, paginationInfo: finalPaginationInfo } = 
    service.getProcessedData(fullState);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearchTerm, statusFilter, sortField, sortOrder, setCurrentPage]);

  const pageNumbers = getVisiblePageNumbers(
    currentPage,
    finalPaginationInfo.totalPages
  );

  const toggleSort = (field: typeof sortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  const resetAll = () => {
    resetFiltersState();
    setSortField(undefined);
    setSortOrder(undefined);
    setCurrentPage(1);
  };

  return {
    data: finalData,
    paginationInfo: finalPaginationInfo,
    filters: {
      searchTerm,
      statusFilter,
      sortField,
      sortOrder,
    },
    handlers: {
      onSearchChange: handleSearchChange,
      onStatusChange: setStatusFilter,
      onSort: toggleSort,
      onPageChange: goToPage,
      onReset: resetAll,
    },
    pageNumbers,
    isLoading: false,
    config: finalConfig,
  };
}