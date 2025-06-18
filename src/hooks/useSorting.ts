import { useCallback, useState } from "react";

export type SortDirection = "ascending" | "descending";

export interface SortConfig<T> {
  key: keyof T;
  direction: SortDirection;
}

type SortConfigs<T> = SortConfig<T>[];

interface UseSortingReturn<T> {
  sortConfig: SortConfig<T> | null;
  sortConfigs: SortConfigs<T>;
  handleSort: (key: keyof T, event: React.MouseEvent) => void;
  sortItems: (items: T[]) => T[];
}

export function useSorting<T>(
  initialSortConfig?: SortConfig<T>,
): UseSortingReturn<T> {
  const [sortConfigs, setSortConfigs] = useState<SortConfigs<T>>(
    initialSortConfig ? [initialSortConfig] : [],
  );

  const handleSort = useCallback((key: keyof T, event: React.MouseEvent) => {
    event.preventDefault();
    const isShiftKey = event.shiftKey;

    setSortConfigs((prev) => {
      // Check if this key is already in the sort configs
      const existingIndex = prev.findIndex((config) => config.key === key);
      let newConfigs = [...prev];

      if (existingIndex >= 0) {
        // If key exists, toggle its direction or remove it if it's the only one and shift isn't pressed
        if (prev.length === 1 && !isShiftKey) {
          // Toggle direction if it's the only sort
          newConfigs[existingIndex] = {
            ...newConfigs[existingIndex],
            direction:
              newConfigs[existingIndex].direction === "ascending"
                ? "descending"
                : "ascending",
          };
        } else {
          // Remove the sort if shift isn't pressed, or it's not the only sort
          newConfigs.splice(existingIndex, 1);
          // If shift is pressed and it's not the only sort, add it back with toggled direction
          if (isShiftKey) {
            newConfigs.push({
              key,
              direction:
                prev[existingIndex].direction === "ascending"
                  ? "descending"
                  : "ascending",
            });
          }
        }
      } else {
        // Add new sort
        const newSort = { key, direction: "ascending" as const };
        if (isShiftKey) {
          // Add to existing sorts
          newConfigs.push(newSort);
        } else {
          // Replace existing sorts
          newConfigs = [newSort];
        }
      }

      return newConfigs;
    });
  }, []);

  const sortItems = useCallback(
    (items: T[]) => {
      if (sortConfigs.length === 0) return [...items];

      return [...items].sort((a, b) => {
        for (const sortConfig of sortConfigs) {
          const aValue = a[sortConfig.key];
          const bValue = b[sortConfig.key];

          // Handle null/undefined values
          if (aValue == null || bValue == null) {
            if (aValue == null && bValue == null) continue;
            return aValue == null ? 1 : -1;
          }

          let comparison = 0;

          // Handle string comparison
          if (typeof aValue === "string" && typeof bValue === "string") {
            comparison = aValue.localeCompare(bValue);
          }
          // Handle number comparison
          else if (typeof aValue === "number" && typeof bValue === "number") {
            comparison = aValue - bValue;
          }

          // If values are different, return the comparison result
          if (comparison !== 0) {
            return sortConfig.direction === "ascending"
              ? comparison
              : -comparison;
          }
        }

        // If all compared values are equal, maintain original order
        return 0;
      });
    },
    [sortConfigs],
  );

  return {
    sortConfig: sortConfigs[0] || null,
    sortConfigs,
    handleSort,
    sortItems,
  };
}

export default useSorting;

// import { useCallback, useState } from "react";

// export type SortDirection = "ascending" | "descending";

// export interface SortConfig<T> {
//   key: keyof T;
//   direction: SortDirection;
// }

// type SortConfigs<T> = SortConfig<T>[];

// interface UseSortingReturn<T> {
//   sortConfig: SortConfig<T> | null;
//   sortConfigs: SortConfigs<T>;
//   handleSort: (key: keyof T, event: React.MouseEvent) => void;
//   sortItems: (items: T[]) => T[];
// }

// export function useSorting<T>(
//   initialSortConfig?: SortConfig<T>,
// ): UseSortingReturn<T> {
//   const [sortConfigs, setSortConfigs] = useState<SortConfigs<T>>(
//     initialSortConfig ? [initialSortConfig] : [],
//   );

//   const handleSort = useCallback((key: keyof T, event: React.MouseEvent) => {
//     event.preventDefault();
//     const isShiftKey = event.shiftKey;

//     setSortConfigs((prev) => {
//       // Check if this key is already in the sort configs
//       const existingIndex = prev.findIndex((config) => config.key === key);
//       let newConfigs = [...prev];

//       if (existingIndex >= 0) {
//         // If key exists, toggle its direction or remove it if it's the only one and shift isn't pressed
//         if (prev.length === 1 && !isShiftKey) {
//           // Toggle direction if it's the only sort
//           newConfigs[existingIndex] = {
//             ...newConfigs[existingIndex],
//             direction:
//               newConfigs[existingIndex].direction === "ascending"
//                 ? "descending"
//                 : "ascending",
//           };
//         } else {
//           // Remove the sort if shift isn't pressed, or it's not the only sort
//           newConfigs.splice(existingIndex, 1);
//           // If shift is pressed and it's not the only sort, add it back with toggled direction
//           if (isShiftKey) {
//             newConfigs.push({
//               key,
//               direction:
//                 prev[existingIndex].direction === "ascending"
//                   ? "descending"
//                   : "ascending",
//             });
//           }
//         }
//       } else {
//         // Add new sort
//         const newSort = { key, direction: "ascending" as const };
//         if (isShiftKey) {
//           // Add to existing sorts
//           newConfigs.push(newSort);
//         } else {
//           // Replace existing sorts
//           newConfigs = [newSort];
//         }
//       }
//       return newConfigs;
//     });
//   }, []);

//   const sortItems = useCallback(
//     (items: T[]) => {
//       if (sortConfigs.length === 0) {
//         return [...items];
//       }

//       // Use a truly sequential multi-sorting approach
//       // This matches SQL's ORDER BY with multiple columns
//       const sortedItems = [...items];

//       // Important: Start with primary sort (first in sortConfigs) and add secondary sorts
//       for (let i = 0; i < sortConfigs.length; i++) {
//         const { key, direction } = sortConfigs[i];

//         // Sort the array for this specific key
//         sortedItems.sort((a, b) => {
//           // Type-safe access to properties
//           const aValue = a[key];
//           const bValue = b[key];

//           // Handle null/undefined values
//           if (aValue == null && bValue == null) return 0;
//           if (aValue == null) return 1; // null values sort last
//           if (bValue == null) return -1;

//           let result = 0;

//           // Compare based on type
//           if (typeof aValue === "string" && typeof bValue === "string") {
//             result = aValue.localeCompare(bValue);
//           } else if (typeof aValue === "number" && typeof bValue === "number") {
//             result = aValue - bValue;
//           } else {
//             // Fallback for other types - convert to string
//             result = String(aValue).localeCompare(String(bValue));
//           }

//           // Apply direction
//           return direction === "ascending" ? result : -result;
//         });
//       }

//       return sortedItems;
//     },
//     [sortConfigs],
//   );

//   return {
//     sortConfig: sortConfigs[0] || null,
//     sortConfigs,
//     handleSort,
//     sortItems,
//   };
// }

// export default useSorting;
