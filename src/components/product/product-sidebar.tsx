"use client";
import { FilterSection } from "@/components/filter/filter-section";
import { FilterType } from "@/types/filters";
import { FilterOptions, ActiveFiltersType } from "@/hooks/product-filters";

interface ProductSidebarProps {
  filterOptions: FilterOptions;
  activeFilters: ActiveFiltersType;
  onFilterChange: (type: FilterType, value: string | number) => void;
}

export const ProductSidebar = ({
  filterOptions,
  activeFilters,
  onFilterChange,
}: ProductSidebarProps) => {
  return (
    <aside className="sticky top-0 h-screen w-full flex-shrink-0 lg:w-64 xl:w-72">
      <div className="h-full overflow-y-auto border border-neutral-200 bg-white px-4 pt-4 pb-6">
        <h3 className="text-lg font-medium text-neutral-900">Filters</h3>
        <FilterSection
          title="Category"
          type="checkbox"
          options={filterOptions.category}
          selected={activeFilters.category}
          onChange={(val) => onFilterChange(FilterType.CATEGORY, val)}
          open={true}
        />
        <FilterSection
          title="Brand"
          type="checkbox"
          options={filterOptions.brand}
          selected={activeFilters.brand}
          onChange={(val) => onFilterChange(FilterType.BRAND, val)}
          open={false}
        />
        <FilterSection
          title="Price Range"
          type="radio"
          options={filterOptions.priceRange}
          selected={activeFilters.priceRange}
          onChange={(val) => onFilterChange(FilterType.PRICE_RANGE, val)}
          open={false}
        />
        <FilterSection
          title="Rating"
          type="radio"
          options={filterOptions.rating}
          selected={activeFilters.rating}
          onChange={(val) => onFilterChange(FilterType.RATING, val)}
          open={false}
        />
      </div>
    </aside>
  );
};
