"use client";
import { useMemo, useState, useEffect } from "react";
import { ListIcon, LayoutGrid, Search } from "lucide-react";
import { DebouncedInput } from "@/components/ui/debounced-input";
import TableLayout from "@/components/table-layout";
import GridLayout from "@/components/grid-layout";
import { FilterSection } from "@/components/filter-section";
import FilterBadge from "@/components/filter-badge";
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

  const totalActiveFilters =
    activeFilters.category.length +
    activeFilters.brand.length +
    (activeFilters.priceRange ? 1 : 0) +
    (activeFilters.rating ? 1 : 0);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
      <style>{`.animate-fade-in { animation: fade-in 0.3s ease-out; } details > summary { list-style: none; } details > summary::-webkit-details-marker { display: none; }`}</style>
      <div className="mx-auto max-w-screen-2xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 lg:flex-row">
          <main className="min-w-0 flex-1">
            <div className="mb-6 flex flex-col items-center gap-4 rounded-lg border border-slate-200 bg-white p-4 shadow-sm sm:flex-row">
              <div className="flex w-full items-center gap-2 rounded-md border border-slate-300 bg-white px-4">
                <Search className="h-3.5 w-3.5 text-slate-400" />
                <DebouncedInput
                  type="text"
                  value={searchTerm}
                  onChange={handleSearch}
                  placeholder="Search products by category, brand or product. "
                  className="w-full border-none bg-transparent text-sm focus:ring-0 focus:outline-none"
                />
              </div>
              <div className="flex items-center rounded-md bg-slate-100 p-1">
                <button
                  onClick={() => handleViewModeChange("grid")}
                  className={`rounded p-2 ${
                    viewMode === "grid"
                      ? "bg-white text-slate-900 shadow-sm"
                      : "text-slate-500 hover:bg-slate-200"
                  }`}
                >
                  <LayoutGrid className="h-5 w-5" />
                </button>
                <button
                  onClick={() => handleViewModeChange("table")}
                  className={`rounded p-2 ${
                    viewMode === "table"
                      ? "bg-white text-slate-900 shadow-sm"
                      : "text-slate-500 hover:bg-slate-200"
                  }`}
                >
                  <ListIcon className="h-5 w-5" />
                </button>
              </div>
            </div>
            {totalActiveFilters > 0 && (
              <div className="animate-fade-in mb-6 rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
                <div className="mb-2 flex items-center justify-between">
                  <h4 className="text-sm font-semibold">
                    Active Filters ({totalActiveFilters})
                  </h4>
                  <button
                    onClick={handleClearAllFilters}
                    className="text-sm font-semibold hover:underline"
                  >
                    Clear all
                  </button>
                </div>
                <div className="flex flex-wrap gap-2 text-sm">
                  {activeFilters.category &&
                    activeFilters.category.length != 0 && <div>Category:</div>}
                  {activeFilters.category.map((v) => (
                    <FilterBadge
                      key={v}
                      type={FilterType.CATEGORY}
                      value={v}
                      onRemove={handleFilterBadgeRemove}
                    />
                  ))}
                  {activeFilters.brand && activeFilters.brand.length != 0 && (
                    <div>Brand:</div>
                  )}
                  {activeFilters.brand.map((v) => (
                    <FilterBadge
                      key={v}
                      type={FilterType.BRAND}
                      value={v}
                      onRemove={handleFilterBadgeRemove}
                    />
                  ))}

                  {activeFilters.priceRange && (
                    <>
                      <div>Price Range:</div>
                      <FilterBadge
                        type={FilterType.PRICE_RANGE}
                        value={activeFilters.priceRange}
                        label={
                          filterOptions.priceRange.find(
                            (o) => o.key === activeFilters.priceRange,
                          )?.label
                        }
                        onRemove={handleFilterBadgeRemove}
                      />
                    </>
                  )}
                  {activeFilters.rating && <div>Rating:</div>}
                  {activeFilters.rating && (
                    <FilterBadge
                      type={FilterType.RATING}
                      value={activeFilters.rating}
                      label={
                        filterOptions.rating.find(
                          (o) => o.key === activeFilters.rating,
                        )?.label
                      }
                      onRemove={handleFilterBadgeRemove}
                    />
                  )}
                </div>
              </div>
            )}
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
              <div className="rounded-lg border border-slate-200 bg-white py-16 text-center shadow-sm">
                <h3 className="text-xl font-semibold text-slate-800">
                  No Products Found
                </h3>
                <p className="mt-2 text-slate-500">
                  Try adjusting your filters.
                </p>
              </div>
            )}
            <div className="mt-8 flex items-center justify-between text-sm text-slate-600">
              <button
                onClick={goToPreviousPage}
                disabled={currentPage === 1}
                className="rounded-md border border-slate-300 bg-white px-4 py-2 font-semibold transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
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
                className="rounded-md border border-slate-300 bg-white px-4 py-2 font-semibold transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </main>
          <aside className="w-full flex-shrink-0 lg:w-64 xl:w-72">
            <div className="sticky top-8 rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
              <h3 className="mb-4 text-lg font-semibold text-slate-900">
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
