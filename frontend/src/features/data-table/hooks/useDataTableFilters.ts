// features/data-table/hooks/useDataTableFilters.ts
import { useState, useCallback } from "react";
import { StatusFilter } from "../types/types";
import { SEARCH_DEBOUNCE_DELAY } from "../constants";

export function useDataTableFilters(initialStatusFilter: StatusFilter = "all") {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>(initialStatusFilter);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

  const handleSearchChange = useCallback((value: string) => {
    setSearchTerm(value);
    const timeoutId = setTimeout(() => {
      setDebouncedSearchTerm(value);
    }, SEARCH_DEBOUNCE_DELAY);

    return () => clearTimeout(timeoutId);
  }, []);

  const resetFilters = useCallback(() => {
    setSearchTerm("");
    setDebouncedSearchTerm("");
    setStatusFilter(initialStatusFilter);
  }, [initialStatusFilter]);

  return {
    searchTerm,
    debouncedSearchTerm,
    statusFilter,
    setStatusFilter,
    handleSearchChange,
    resetFilters,
  };
}