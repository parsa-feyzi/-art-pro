import { Article } from "@/src/lib/types";
import { DataTableState, PaginationInfo } from "../types/types";
//
import {
  filterData,
  sortData,
  paginateData,
  calculatePaginationInfo,
} from "../lib/data-table-helpers";
//

export class DataTableService {
  private data: Article[];
  private itemsPerPage: number;

  constructor(data: Article[], itemsPerPage: number = 5) {
    this.data = data;
    this.itemsPerPage = itemsPerPage;
  }

  updateData(data: Article[]) {
    this.data = data;
  }

  getProcessedData(state: DataTableState): {
    data: Article[];
    paginationInfo: PaginationInfo;
  } {
    let processedData = this.data;

    // Apply filters
    processedData = filterData(
      processedData,
      state.searchTerm,
      state.statusFilter,
    );

    // Apply sorting
    if (state.sortField && state.sortOrder) {
      processedData = sortData(processedData, state.sortField, state.sortOrder);
    }

    // Calculate pagination info
    const paginationInfo = calculatePaginationInfo(
      processedData.length,
      state.currentPage,
      this.itemsPerPage,
    );

    // Apply pagination
    processedData = paginateData(
      processedData,
      state.currentPage,
      this.itemsPerPage,
    );

    return {
      data: processedData,
      paginationInfo,
    };
  }

  getTotalItems(state: DataTableState): number {
    const filtered = filterData(
      this.data,
      state.searchTerm,
      state.statusFilter,
    );
    return filtered.length;
  }

  validatePage(currentPage: number, totalPages: number): number {
    if (currentPage < 1) return 1;
    if (currentPage > totalPages) return Math.max(1, totalPages);
    return currentPage;
  }
}
