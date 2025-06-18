"use client";
import TableLayout from "@/components/table-layout";
import GridLayout from "@/components/grid-layout";
import type { Product } from "@/types/products";
import { SortConfig } from "@/hooks/useSorting";

interface ProductContentProps {
  data: Product[];
  viewMode: "grid" | "table";
  onSort: (key: keyof Product) => void;
  sortConfig: SortConfig<Product> | null;
  sortConfigs?: SortConfig<Product>[];
  resetSort: () => void;
  visibleColumns: string[];
}

export const ProductContent = ({
  data,
  viewMode,
  onSort,
  sortConfig,
  sortConfigs,
  resetSort,
  visibleColumns,
}: ProductContentProps) => {
  if (data.length === 0) {
    return (
      <div className="rounded-lg border border-neutral-200 bg-white py-16 text-center shadow-sm">
        <h3 className="text-xl font-medium text-neutral-800">
          No Products Found
        </h3>
        <p className="mt-2 text-neutral-500">
          Try adjusting your filters.
        </p>
      </div>
    );
  }

  return viewMode === "grid" ? (
    <GridLayout data={data} />
  ) : (
    <TableLayout
      data={data}
      onSort={onSort}
      sortConfig={sortConfig}
      sortConfigs={sortConfigs}
      resetSort={resetSort}
      visibleColumns={visibleColumns}
    />
  );
};
