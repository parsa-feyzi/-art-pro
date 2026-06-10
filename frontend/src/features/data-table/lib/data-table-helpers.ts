import { SortField, SortOrder, StatusFilter, PaginationInfo } from "../types/types";
import { Article, User } from "@/src/lib/types"

export const filterData = (
  data: Article[],
  searchTerm: string,
  statusFilter: StatusFilter
): Article[] => {
  return data.filter((item) => {
    const matchesSearch = searchTerm === "" || searchDataItem(item, searchTerm);
    const matchesStatus = statusFilter === "all" || item.status === statusFilter;
    return matchesSearch && matchesStatus;
  });
};

export const searchDataItem = (item: Article, searchTerm: string): boolean => {
  const term = searchTerm.toLowerCase();
  return (
    item.title.toLowerCase().includes(term) ||
    item.category.toLowerCase().includes(term) ||
    item.authors.some((author) => author.userName.toLowerCase().includes(term))
  );
};

export const sortData = (
  data: Article[],
  sortField?: SortField,
  sortOrder?: SortOrder
): Article[] => {
  if (!sortField || !sortOrder) return data;

  return [...data].sort((a, b) => {
    let aValue: any = a[sortField];
    let bValue: any = b[sortField];

    // Handle authors specially
    if (sortField === "authors") {
      aValue = a.authors.map((author) => author.userName).join(", ");
      bValue = b.authors.map((author) => author.userName).join(", ");
    }

    if (sortOrder === "asc") {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });
};

export const paginateData = (
  data: Article[],
  currentPage: number,
  itemsPerPage: number
): Article[] => {
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  return data.slice(startIndex, endIndex);
};

export const calculatePaginationInfo = (
  totalItems: number,
  currentPage: number,
  itemsPerPage: number
): PaginationInfo => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);

  return {
    currentPage,
    totalPages,
    totalItems,
    itemsPerPage,
    startIndex,
    endIndex,
    hasNextPage: currentPage < totalPages,
    hasPreviousPage: currentPage > 1,
  };
};

export const getVisiblePageNumbers = (
  currentPage: number,
  totalPages: number,
  maxVisible: number = 5
): (number | "ellipsis")[] => {
  const pages: (number | "ellipsis")[] = [];

  if (totalPages <= maxVisible) {
    for (let i = 1; i <= totalPages; i++) pages.push(i);
    return pages;
  }

  if (currentPage <= 3) {
    for (let i = 1; i <= 4; i++) pages.push(i);
    pages.push("ellipsis");
    pages.push(totalPages);
  } else if (currentPage >= totalPages - 2) {
    pages.push(1);
    pages.push("ellipsis");
    for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
  } else {
    pages.push(1);
    pages.push("ellipsis");
    for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i);
    pages.push("ellipsis");
    pages.push(totalPages);
  }

  return pages;
};

export const formatAuthors = (authors: User[]): string => {
  return authors.map((author) => author.userName).join(", ");
};