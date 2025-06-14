import { useCallback, useState } from "react";

export type SortDirection = "ascending" | "descending";

export interface SortConfig<T> {
  key: keyof T;
  direction: SortDirection;
}

export function useSorting<T>(initialSortConfig: SortConfig<T>) {
  const [sortConfig, setSortConfig] =
    useState<SortConfig<T>>(initialSortConfig);

  const handleSort = useCallback((key: keyof T) => {
    setSortConfig((prev) => ({
      key,
      direction:
        prev.key === key && prev.direction === "ascending"
          ? "descending"
          : "ascending",
    }));
  }, []);

  const sortItems = useCallback(
    (items: T[]) => {
      if (!sortConfig.key) return items;

      return [...items].sort((a, b) => {
        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];

        // Handle null/undefined values
        if (aValue == null || bValue == null) {
          if (aValue == null && bValue == null) return 0;
          return aValue == null ? 1 : -1;
        }

        // Handle string comparison
        if (typeof aValue === "string" && typeof bValue === "string") {
          return sortConfig.direction === "ascending"
            ? aValue.localeCompare(bValue)
            : bValue.localeCompare(aValue);
        }

        // Handle number comparison
        if (typeof aValue === "number" && typeof bValue === "number") {
          return sortConfig.direction === "ascending"
            ? aValue - bValue
            : bValue - aValue;
        }

        // Fallback for other types
        if (aValue < bValue)
          return sortConfig.direction === "ascending" ? -1 : 1;
        if (aValue > bValue)
          return sortConfig.direction === "ascending" ? 1 : -1;
        return 0;
      });
    },
    [sortConfig],
  );

  return {
    sortConfig,
    handleSort,
    sortItems,
  };
}

export default useSorting;
