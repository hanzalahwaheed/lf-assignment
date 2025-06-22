import { useMemo, useState } from "react";
import { Product } from "@/types/products";
import {
  ActiveFilters,
  FilterType,
  PRICE_RANGE_OPTIONS,
  RATING_OPTIONS,
} from "@/types/filters";

export type ActiveFiltersType = ActiveFilters;
export type FilterOptions = {
  [FilterType.CATEGORY]: string[];
  [FilterType.BRAND]: string[];
  [FilterType.PRICE_RANGE]: typeof PRICE_RANGE_OPTIONS;
  [FilterType.RATING]: typeof RATING_OPTIONS;
};

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
    value: string | number,
  ) => {
    setActiveFilters((prevFilters) => {
      const currentFilter = prevFilters[filterType];

      // Category or Brand
      if (Array.isArray(currentFilter)) {
        const values = currentFilter as string[];
        const isAlreadySelected = values.includes(value as string);

        const updatedValues = isAlreadySelected
          ? values.filter((v) => v !== value) // remove value
          : [...values, value as string]; // add value

        return {
          ...prevFilters,
          [filterType]: updatedValues,
        };
      }

      // Price Range or Rating
      const isSameValue = currentFilter === value;
      const updatedValue = isSameValue ? null : value;

      return {
        ...prevFilters,
        [filterType]: updatedValue,
      };
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

    const categories = activeFilters[FilterType.CATEGORY];
    if (categories.length)
      result = result.filter((p) => categories.includes(p.category));

    const brands = activeFilters[FilterType.BRAND];
    if (brands.length) result = result.filter((p) => brands.includes(p.brand));

    const priceRange = activeFilters[FilterType.PRICE_RANGE];
    if (priceRange) {
      const [min, max] = (priceRange as string).split("-").map(Number);
      result = result.filter((p) => {
        if (max) return p.price >= min && p.price <= max;
        return p.price >= min; // 1000+ scenario
      });
    }

    const rating = activeFilters[FilterType.RATING] as number;
    if (rating !== null) {
      result = result.filter((p) => p.rating >= rating);
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
