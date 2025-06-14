"use client";
import React, { useMemo, useState, useEffect, act } from "react";
import { ListIcon, LayoutGrid, Filter } from "lucide-react";
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
            .includes(lowercasedTerm)
        )
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

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterBadgeRemove = (
    filterType: FilterType,
    value: string | number
  ) => {
    handleFilterChange(filterType, value);
  };

  const totalActiveFilters =
    activeFilters.category.length +
    activeFilters.brand.length +
    (activeFilters.priceRange ? 1 : 0) +
    (activeFilters.rating ? 1 : 0);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans">
      <style>{`.animate-fade-in { animation: fade-in 0.3s ease-out; } details > summary { list-style: none; } details > summary::-webkit-details-marker { display: none; }`}</style>
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <header className="mb-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-2">
            Product Catalog
          </h1>
        </header>
        <div className="flex flex-col lg:flex-row gap-8">
          <main className="flex-1 min-w-0">
            <div className="p-4 mb-6 bg-white rounded-lg shadow-sm border border-slate-200 flex flex-col sm:flex-row items-center gap-4">
              <input
                type="text"
                placeholder="🔍 Search products..."
                value={searchTerm}
                onChange={handleSearch}
                className="w-full sm:flex-1 px-4 py-2 bg-white border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-slate-900 transition"
              />
              <div className="flex items-center bg-slate-100 p-1 rounded-md">
                <button
                  onClick={() => handleViewModeChange("grid")}
                  className={`p-2 rounded ${
                    viewMode === "grid"
                      ? "bg-white text-slate-900 shadow-sm"
                      : "text-slate-500 hover:bg-slate-200"
                  }`}
                >
                  <LayoutGrid className="h-5 w-5" />
                </button>
                <button
                  onClick={() => handleViewModeChange("table")}
                  className={`p-2 rounded ${
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
              <div className="p-4 mb-6 bg-white rounded-lg shadow-sm border border-slate-200 animate-fade-in">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="text-sm font-semibold">
                    Active Filters ({totalActiveFilters})
                  </h4>
                  <button
                    onClick={handleClearAllFilters}
                    className="text-sm font-semibold text-blue-600 hover:underline"
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
                      type="category"
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
                      type="brand"
                      value={v}
                      onRemove={handleFilterBadgeRemove}
                    />
                  ))}

                  {activeFilters.priceRange && (
                    <>
                      <div>Price Range:</div>
                      <FilterBadge
                        type="priceRange"
                        value={activeFilters.priceRange}
                        label={
                          filterOptions.priceRange.find(
                            (o) => o.key === activeFilters.priceRange
                          )?.label
                        }
                        onRemove={handleFilterBadgeRemove}
                      />
                    </>
                  )}
                  {activeFilters.rating && <div>Rating:</div>}
                  {activeFilters.rating && (
                    <FilterBadge
                      type="rating"
                      value={activeFilters.rating}
                      label={
                        filterOptions.rating.find(
                          (o) => o.key === activeFilters.rating
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
              <div className="text-center py-16 bg-white rounded-lg shadow-sm border border-slate-200">
                <h3 className="text-xl font-semibold text-slate-800">
                  No Products Found
                </h3>
                <p className="mt-2 text-slate-500">
                  Try adjusting your filters.
                </p>
              </div>
            )}
            <div className="flex items-center justify-between mt-8 text-sm text-slate-600">
              <button
                onClick={goToPreviousPage}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-white border border-slate-300 rounded-md font-semibold hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed transition"
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
                className="px-4 py-2 bg-white border border-slate-300 rounded-md font-semibold hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed transition"
              >
                Next
              </button>
            </div>
          </main>
          <aside className="w-full lg:w-64 xl:w-72 flex-shrink-0">
            <div className="p-4 bg-white rounded-lg shadow-sm border border-slate-200 sticky top-8">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">
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
