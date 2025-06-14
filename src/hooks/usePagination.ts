import { useState, useMemo, useCallback } from "react";

export interface UsePaginationProps<T> {
  items: T[];
  itemsPerPage: number;
  initialPage?: number;
}

export interface UsePaginationReturn<T> {
  currentPage: number;
  totalPages: number;
  currentItems: T[];
  goToNextPage: () => void;
  goToPreviousPage: () => void;
  goToPage: (page: number) => void;
  setItemsPerPage: (count: number) => void;
}

export function usePagination<T>({
  items,
  itemsPerPage: initialItemsPerPage,
  initialPage = 1,
}: UsePaginationProps<T>): UsePaginationReturn<T> {
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [itemsPerPage, setItemsPerPage] = useState(initialItemsPerPage);

  const totalPages = Math.ceil(items.length / itemsPerPage) || 1;

  // Ensure current page is within valid range when items or itemsPerPage changes
  const safeCurrentPage = Math.min(Math.max(1, currentPage), totalPages);
  if (safeCurrentPage !== currentPage) {
    setCurrentPage(safeCurrentPage);
  }

  const currentItems = useMemo(() => {
    const firstPageIndex = (safeCurrentPage - 1) * itemsPerPage;
    return items.slice(firstPageIndex, firstPageIndex + itemsPerPage);
  }, [items, itemsPerPage, safeCurrentPage]);

  const goToNextPage = useCallback(() => {
    setCurrentPage((prev) => {
      const total = Math.ceil(items.length / itemsPerPage);
      return Math.min(prev + 1, total || 1);
    });
  }, [items.length, itemsPerPage]);

  const goToPreviousPage = useCallback(() => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  }, []);

  const goToPage = useCallback(
    (page: number) => {
      setCurrentPage((prev) => {
        const pageNumber = Math.max(
          1,
          Math.min(page, Math.max(1, Math.ceil(items.length / itemsPerPage)))
        );
        return pageNumber !== prev ? pageNumber : prev;
      });
    },
    [items.length, itemsPerPage]
  );

  return {
    currentPage: safeCurrentPage,
    totalPages,
    currentItems,
    goToNextPage,
    goToPreviousPage,
    goToPage,
    setItemsPerPage: (count: number) => {
      setItemsPerPage(Math.max(1, count));
      setCurrentPage(1); // Reset to first page when changing items per page
    },
  };
}

export default usePagination;
