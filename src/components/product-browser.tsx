"use client";
import { useMemo, useState, useEffect } from "react";
import { ColumnType } from "@/components/column-selector";
import { ActiveFilters } from "@/components/active-filters";
import { useProductFilters } from "@/hooks/useProductFilters";
import { usePagination } from "@/hooks/usePagination";
import { useSorting } from "@/hooks/useSorting";
import { FilterType } from "@/types/filters";
import type { Product } from "@/types/products";
import { ProductContent } from "./product-content";
import { ProductPaginationFooter } from "./product-pagination-footer";
import { ProductToolbar } from "./product-toolbar";
import { ProductSidebar } from "./product-sidebar";

const ProductBrowser = ({ products }: { products: Product[] }) => {
  const [searchTerm, setSearchTerm] = useState("");
  // Initialize sorting with no default sort
  const { sortConfig, sortConfigs, handleSort, sortItems, resetSort } =
    useSorting<Product>();
  const [isInitialSort, setIsInitialSort] = useState(true);

  type ViewMode = "grid" | "table";
  const [viewMode, setViewMode] = useState<ViewMode>("table");

  // Column visibility state
  const [visibleColumns, setVisibleColumns] = useState<string[]>([
    "title",
    "category",
    "brand",
    "price",
    "rating",
    // "stock" // hide stock column by default
  ]);

  const allColumns: ColumnType[] = [
    { key: "title", label: "Product Name" },
    { key: "category", label: "Category" },
    { key: "brand", label: "Brand" },
    { key: "price", label: "Price" },
    { key: "rating", label: "Rating" },
    { key: "stock", label: "Stock" },
  ];

  const toggleColumnVisibility = (columnKey: string) => {
    setVisibleColumns((prev) => {
      if (prev.includes(columnKey)) {
        // Don't allow removing the last visible column
        if (prev.length === 1) return prev;
        return prev.filter((key) => key !== columnKey);
      } else {
        return [...prev, columnKey];
      }
    });
  };
  const {
    activeFilters,
    filterOptions,
    filteredProducts: filteredItems,
    clearAllFilters,
    handleFilterChange,
  } = useProductFilters(products);

  const itemsPerPage = viewMode === "grid" ? 12 : 10;

  const filteredAndSortedProducts = useMemo(() => {
    let result = [...filteredItems];

    if (searchTerm) {
      const lowercasedTerm = searchTerm.toLowerCase();
      const searchableFields: (keyof Product)[] = [
        "title",
        "brand",
        "category",
      ];
      result = result.filter((p) =>
        searchableFields.some((key) =>
          String(p[key] ?? "")
            .toLowerCase()
            .includes(lowercasedTerm),
        ),
      );
    }
    // Only sort if we have a sortConfig
    if (sortConfig) {
      return sortItems(result);
    }
    return result;
  }, [filteredItems, searchTerm, sortItems, sortConfig]);

  // Handle initial sort
  useEffect(() => {
    if (isInitialSort && sortConfig) {
      setIsInitialSort(false);
    }
  }, [sortConfig, isInitialSort]);

  const {
    currentPage,
    totalPages,
    currentItems: currentData,
    goToNextPage,
    goToPreviousPage,
    goToPage,
  } = usePagination({
    items: filteredAndSortedProducts,
    itemsPerPage,
  });

  const handleClearAllFilters = () => {
    clearAllFilters();
    goToPage(1);
  };
  // Reset to first page when filters, search, sort, or view mode changes
  useEffect(() => {
    goToPage(1);
  }, [activeFilters, searchTerm, sortConfig, viewMode, goToPage]);

  const handleViewModeChange = (mode: ViewMode) => {
    setViewMode(mode);
  };

  const handleSearch = (value: string) => {
    setSearchTerm(value);
  };

  const handleFilterBadgeRemove = (
    filterType: FilterType,
    value: string | number,
  ) => {
    handleFilterChange(filterType, value);
  };

  return (
    <div className="min-h-screen bg-neutral-50 font-sans text-neutral-800">
      <div className="mx-auto max-w-screen">
        <div className="flex flex-col lg:flex-row">
          <ProductSidebar
            filterOptions={filterOptions}
            activeFilters={activeFilters}
            onFilterChange={handleFilterChange}
          />
          <main className="flex-1 overflow-x-auto px-4 py-6">
            <ProductToolbar
              searchTerm={searchTerm}
              onSearch={handleSearch}
              viewMode={viewMode}
              onViewModeChange={handleViewModeChange}
              visibleColumns={visibleColumns}
              toggleColumnVisibility={toggleColumnVisibility}
              allColumns={allColumns}
            />
            <ActiveFilters
              activeFilters={activeFilters}
              onClearAll={handleClearAllFilters}
              onFilterRemove={handleFilterBadgeRemove}
            />
            <ProductContent
              data={currentData}
              viewMode={viewMode}
              onSort={handleSort}
              sortConfig={sortConfig}
              sortConfigs={sortConfigs}
              resetSort={resetSort}
              visibleColumns={visibleColumns}
            />
            <ProductPaginationFooter
              currentPage={currentPage}
              totalPages={totalPages}
              hasData={currentData.length > 0}
              onPrevious={goToPreviousPage}
              onNext={goToNextPage}
              exportData={filteredAndSortedProducts}
            />
          </main>
        </div>
      </div>
    </div>
  );
};

export default ProductBrowser;
