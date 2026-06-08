import { Article, ArticleStatus } from "@/src/lib/types";

  export type StatusFilter = "all" | ArticleStatus;
  
  export type SortField = "title" | "category" | "status" | "authors";
  export type SortOrder = "asc" | "desc";
  
  export type DataTableConfig = {
    itemsPerPage: number;
    enableSorting?: boolean;
    enableFiltering?: boolean;
    enablePagination?: boolean;
    defaultStatusFilter?: StatusFilter;
  };
  
  export type DataTableState = {
    searchTerm: string;
    statusFilter: StatusFilter;
    currentPage: number;
    sortField?: SortField;
    sortOrder?: SortOrder;
  };
  
  export type DataTableActions = {
    onEdit: (id: string, title: string) => void;
    onDelete: (id: string, title: string) => void;
    onPublish: (id: string, title: string) => void;
    onView?: (id: string, title: string) => void;
    onExport?: (items: Article[]) => void;
  };
  
  export type DataTableProps = DataTableActions & {
    data: Article[];
    config?: Partial<DataTableConfig>;
    className?: string;
    isLoading?: boolean;
    emptyStateMessage?: string;
  };
  
  export type PaginationInfo = {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
    startIndex: number;
    endIndex: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };