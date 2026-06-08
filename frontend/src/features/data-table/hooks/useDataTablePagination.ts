import { useState, useCallback } from "react";

export function useDataTablePagination(totalPages: number, initialPage: number = 1) {
  const [currentPage, setCurrentPage] = useState(initialPage);

  const goToPage = useCallback((page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  }, [totalPages]);

  const nextPage = useCallback(() => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  }, [totalPages]);

  const previousPage = useCallback(() => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  }, []);

  return {
    currentPage,
    goToPage,
    nextPage,
    previousPage,
    setCurrentPage,
  };
}