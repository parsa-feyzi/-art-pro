// features/data-table/components/DataTablePagination.tsx
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
  } from "@/src/components/ui/pagination";
  import { PaginationInfo } from "../types/types";
  
  interface Props {
    paginationInfo: PaginationInfo;
    pageNumbers: (number | "ellipsis")[];
    onPageChange: (page: number) => void;
  }
  
  export function DataTablePagination({ paginationInfo, pageNumbers, onPageChange }: Props) {
    const { currentPage, totalPages, totalItems, startIndex, endIndex } = paginationInfo;
  
    return (
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="text-sm text-muted-foreground order-2 sm:order-1">
          Showing {startIndex + 1} to {endIndex} of {totalItems} results
        </div>
        
        <div className="order-1 sm:order-2">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    if (currentPage > 1) onPageChange(currentPage - 1);
                  }}
                  className={!paginationInfo.hasPreviousPage ? "pointer-events-none opacity-50" : ""}
                />
              </PaginationItem>
  
              {pageNumbers.map((page, index) => (
                <PaginationItem key={index}>
                  {page === "ellipsis" ? (
                    <PaginationEllipsis />
                  ) : (
                    <PaginationLink
                      href="#"
                      isActive={currentPage === page}
                      onClick={(e) => {
                        e.preventDefault();
                        onPageChange(page as number);
                      }}
                    >
                      {page}
                    </PaginationLink>
                  )}
                </PaginationItem>
              ))}
  
              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    if (currentPage < totalPages) onPageChange(currentPage + 1);
                  }}
                  className={!paginationInfo.hasNextPage ? "pointer-events-none opacity-50" : ""}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    );
  }