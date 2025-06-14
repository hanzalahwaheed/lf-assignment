import { useMemo, useState } from "react";
import { Product } from "@/types/products";
import {
  ActiveFilters,
  FilterType,
  PRICE_RANGE_OPTIONS,
  RATING_OPTIONS,
} from "@/types/filters";

export const useProductFilters = (products: Product[]) => {
  const [activeFilters, setActiveFilters] = useState<ActiveFilters>({
    [FilterType.CATEGORY]: [],
    [FilterType.BRAND]: [],
    [FilterType.PRICE_RANGE]: null,
    [FilterType.RATING]: null,
  });

  const filterOptions = useMemo(() => {
    const categories = [
      ...new Set(products.map((p) => p.category).filter(Boolean)),
    ].sort();
    const brands = [
      ...new Set(products.map((p) => p.brand).filter(Boolean)),
    ].sort();

    return {
      [FilterType.CATEGORY]: categories,
      [FilterType.BRAND]: brands,
      [FilterType.PRICE_RANGE]: PRICE_RANGE_OPTIONS,
      [FilterType.RATING]: RATING_OPTIONS,
    };
  }, [products]);

  const handleFilterChange = (
    filterType: FilterType,
    value: string | number
  ) => {
    setActiveFilters((prev) => {
      if (Array.isArray(prev[filterType])) {
        const currentValues = prev[filterType] as string[];
        const newValues = currentValues.includes(value as string)
          ? currentValues.filter((v) => v !== value)
          : [...currentValues, value as string];
        return { ...prev, [filterType]: newValues };
      } else {
        const newValue = prev[filterType] === value ? null : value;
        return { ...prev, [filterType]: newValue };
      }
    });
  };

  const clearAllFilters = () => {
    setActiveFilters({
      [FilterType.CATEGORY]: [],
      [FilterType.BRAND]: [],
      [FilterType.PRICE_RANGE]: null,
      [FilterType.RATING]: null,
    });
  };

  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Apply category filter
    if (activeFilters[FilterType.CATEGORY].length > 0) {
      result = result.filter((p) =>
        activeFilters[FilterType.CATEGORY].includes(p.category)
      );
    }

    // Apply brand filter
    if (activeFilters[FilterType.BRAND].length > 0) {
      result = result.filter((p) =>
        activeFilters[FilterType.BRAND].includes(p.brand)
      );
    }

    // Apply price range filter
    if (activeFilters[FilterType.PRICE_RANGE]) {
      const [min, max] = (activeFilters[FilterType.PRICE_RANGE] as string)
        .split("-")
        .map(Number);

      result = result.filter((p) => {
        if (max) return p.price >= min && p.price <= max;
        return p.price >= min;
      });
    }

    // Apply rating filter
    if (activeFilters[FilterType.RATING] !== null) {
      result = result.filter(
        (p) => p.rating >= (activeFilters[FilterType.RATING] as number)
      );
    }

    return result;
  }, [products, activeFilters]);

  return {
    activeFilters,
    filterOptions,
    filteredProducts,
    handleFilterChange,
    clearAllFilters,
  };
};
