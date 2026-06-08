import { DataTableConfig } from "../types/types";

export const DEFAULT_CONFIG: Required<DataTableConfig> = {
    itemsPerPage: 5,
    enableSorting: true,
    enableFiltering: true,
    enablePagination: true,
    defaultStatusFilter: "all",
  };
  
  export const STATUS_OPTIONS = {
    all: { label: "All Articles", value: "all" },
    published: { label: "Published Only", value: "published" },
    draft: { label: "Draft Only", value: "draft" },
  } as const;
  
  export const STATUS_COLORS = {
    published: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
    draft: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
  } as const;
  
  export const PAGINATION_CONFIG = {
    MAX_VISIBLE_PAGES: 5,
    DEFAULT_ITEMS_PER_PAGE: 5,
  } as const;
  
  export const SEARCH_DEBOUNCE_DELAY = 300;