"use client";
import { useMemo, useState, useEffect } from "react";
import { ListIcon, LayoutGrid, Search } from "lucide-react";
import { ExportAsCSV } from "./export-csv-button";
import { DebouncedInput } from "@/components/ui/debounced-input";
import TableLayout from "@/components/table-layout";
import GridLayout from "@/components/grid-layout";
import { FilterSection } from "@/components/filter-section";
import { ActiveFilters } from "@/components/active-filters";
import { useProductFilters } from "@/hooks/useProductFilters";
import { usePagination } from "@/hooks/usePagination";
import { useSorting } from "@/hooks/useSorting";
import { FilterType } from "@/types/filters";
import type { Product } from "@/types/products";

const ProductBrowser = ({ products }: { products: Product[] }) => {
  const [searchTerm, setSearchTerm] = useState("");
  // Initialize sorting
  const { sortConfig, handleSort, sortItems } = useSorting<Product>({
    key: "price",
    direction: "ascending",
  });

  type ViewMode = "grid" | "list" | "table";
  const [viewMode, setViewMode] = useState<ViewMode>("table");
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
    return sortItems(result);
  }, [filteredItems, searchTerm, sortItems]);

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
      <style>{`.animate-fade-in { animation: fade-in 0.3s ease-out; } details > summary { list-style: none; } details > summary::-webkit-details-marker { display: none; }`}</style>
      <div className="mx-auto max-w-screen-2xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 lg:flex-row">
          <main className="min-w-0 flex-1">
            <div className="mb-6 flex flex-col items-center gap-4 rounded-lg border border-neutral-200 bg-white p-4 shadow-sm sm:flex-row">
              <div className="flex w-full items-center gap-2 rounded-md border border-neutral-300 bg-white">
                <Search className="ml-2 h-3.5 w-3.5 text-neutral-400" />
                <DebouncedInput
                  type="text"
                  value={searchTerm}
                  onChange={handleSearch}
                  placeholder="Search products by category, brand or product. "
                  className="w-full border-none bg-transparent text-sm focus:ring-0 focus:outline-none"
                />
              </div>
              <div className="flex items-center gap-2">
                <ExportAsCSV
                  data={filteredAndSortedProducts}
                  headers={[
                    "Title",
                    "Brand",
                    "Category",
                    "Price",
                    "Rating",
                    "Stock",
                    "Description",
                  ]}
                  filename="products"
                  getRowData={(product) => [
                    product.title,
                    product.brand,
                    product.category,
                    product.price,
                    product.rating,
                    product.stock,
                    product.description,
                  ]}
                  disabled={filteredAndSortedProducts.length === 0}
                />
                <div className="flex items-center rounded-md bg-neutral-100 p-1">
                  <button
                    onClick={() => handleViewModeChange("table")}
                    className={`cursor-pointer rounded p-2 ${
                      viewMode === "table"
                        ? "bg-white text-neutral-900 shadow-sm"
                        : "text-neutral-500 hover:bg-neutral-200"
                    }`}
                  >
                    <ListIcon className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => handleViewModeChange("grid")}
                    className={`cursor-pointer rounded p-2 ${
                      viewMode === "grid"
                        ? "bg-white text-neutral-900 shadow-sm"
                        : "text-neutral-500 hover:bg-neutral-200"
                    }`}
                  >
                    <LayoutGrid className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
            <ActiveFilters
              activeFilters={activeFilters}
              onClearAll={handleClearAllFilters}
              onFilterRemove={handleFilterBadgeRemove}
            />
            {currentData.length > 0 ? (
              viewMode === "grid" ? (
                <GridLayout data={currentData} />
              ) : (
                <TableLayout
                  data={currentData}
                  onSort={handleSort}
                  sortConfig={sortConfig}
                />
              )
            ) : (
              <div className="rounded-lg border border-neutral-200 bg-white py-16 text-center shadow-sm">
                <h3 className="text-xl font-semibold text-neutral-800">
                  No Products Found
                </h3>
                <p className="mt-2 text-neutral-500">
                  Try adjusting your filters.
                </p>
              </div>
            )}
            <div className="mt-8 flex items-center justify-between text-sm text-neutral-600">
              <button
                onClick={goToPreviousPage}
                disabled={currentPage === 1}
                className="cursor-pointer rounded-md border border-neutral-300 bg-white px-4 py-2 font-semibold transition hover:bg-neutral-100 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Previous
              </button>
              <span>
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={goToNextPage}
                disabled={
                  currentPage === totalPages || currentData.length === 0
                }
                className="cursor-pointer rounded-md border border-neutral-300 bg-white px-4 py-2 font-semibold transition hover:bg-neutral-100 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </main>
          <aside className="w-full flex-shrink-0 lg:w-64 xl:w-72">
            <div className="sticky top-8 rounded-lg border border-neutral-200 bg-white px-4 pt-4 shadow-sm">
              <h3 className="text-lg font-semibold text-neutral-900">
                Filters
              </h3>
              <FilterSection
                title="Category"
                type="checkbox"
                options={filterOptions.category}
                selected={activeFilters.category}
                onChange={(val) => handleFilterChange(FilterType.CATEGORY, val)}
              />
              <FilterSection
                title="Brand"
                type="checkbox"
                options={filterOptions.brand}
                selected={activeFilters.brand}
                onChange={(val) => handleFilterChange(FilterType.BRAND, val)}
              />
              <FilterSection
                title="Price Range"
                type="radio"
                options={filterOptions.priceRange}
                selected={activeFilters.priceRange}
                onChange={(val) =>
                  handleFilterChange(FilterType.PRICE_RANGE, val)
                }
              />
              <FilterSection
                title="Rating"
                type="radio"
                options={filterOptions.rating}
                selected={activeFilters.rating}
                onChange={(val) => handleFilterChange(FilterType.RATING, val)}
              />
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default ProductBrowser;
