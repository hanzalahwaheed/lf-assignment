import { FilterType } from "@/types/filters";
import FilterBadge from "./filter-badge";

type ActiveFiltersProps = {
  activeFilters: {
    category: string[];
    brand: string[];
    priceRange: string | null;
    rating: number | null;
  };
  onClearAll: () => void;
  onFilterRemove: (filterType: FilterType, value: string | number) => void;
};

export function ActiveFilters({
  activeFilters,
  onClearAll,
  onFilterRemove,
}: ActiveFiltersProps) {
  const totalActiveFilters =
    activeFilters.category.length +
    activeFilters.brand.length +
    (activeFilters.priceRange ? 1 : 0) +
    (activeFilters.rating ? 1 : 0);

  if (totalActiveFilters === 0) return null;

  return (
    <div className="animate-fade-in mb-6 rounded-lg border border-neutral-200 bg-white p-4 shadow-sm">
      <div className="mb-2 flex items-center justify-between">
        <h4 className="text-sm font-semibold">
          Active Filters ({totalActiveFilters})
        </h4>
        <button
          onClick={onClearAll}
          className="text-sm font-semibold hover:underline"
        >
          Clear all
        </button>
      </div>
      <div className="flex flex-wrap items-center gap-2 text-sm">
        {activeFilters.category.length > 0 && (
          <span className="text-neutral-500">Category:</span>
        )}
        {activeFilters.category.map((v) => (
          <FilterBadge
            key={`category-${v}`}
            type={FilterType.CATEGORY}
            value={v}
            onRemove={onFilterRemove}
          />
        ))}

        {activeFilters.brand.length > 0 && (
          <span className="text-neutral-500">Brand:</span>
        )}
        {activeFilters.brand.map((v) => (
          <FilterBadge
            key={`brand-${v}`}
            type={FilterType.BRAND}
            value={v}
            onRemove={onFilterRemove}
          />
        ))}

        {activeFilters.priceRange && (
          <span className="text-neutral-500">Price:</span>
        )}
        {activeFilters.priceRange && (
          <FilterBadge
            type={FilterType.PRICE_RANGE}
            value={activeFilters.priceRange}
            onRemove={onFilterRemove}
          />
        )}

        {activeFilters.rating && (
          <span className="text-neutral-500">Rating:</span>
        )}
        {activeFilters.rating && (
          <FilterBadge
            type={FilterType.RATING}
            value={activeFilters.rating}
            onRemove={onFilterRemove}
          />
        )}
      </div>
    </div>
  );
}
