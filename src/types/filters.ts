export enum FilterType {
  CATEGORY = "category",
  BRAND = "brand",
  PRICE_RANGE = "priceRange",
  RATING = "rating",
}

export enum PriceRange {
  UNDER_100 = "0-100",
  ONE_TO_FIVE_HUNDRED = "100-500",
  FIVE_HUNDRED_TO_THOUSAND = "500-1000",
  OVER_1000 = "1000",
}

export enum Rating {
  FOUR_STARS = 4,
  THREE_STARS = 3,
  TWO_STARS = 2,
  ONE_STAR = 1,
}

export type FilterValue = string | number;

export interface FilterOption {
  key: FilterValue;
  label: string;
}

export interface ActiveFilters {
  [FilterType.CATEGORY]: string[];
  [FilterType.BRAND]: string[];
  [FilterType.PRICE_RANGE]: string | null;
  [FilterType.RATING]: number | null;
}

export const PRICE_RANGE_OPTIONS: FilterOption[] = [
  { key: PriceRange.UNDER_100, label: "$0 - $100" },
  { key: PriceRange.ONE_TO_FIVE_HUNDRED, label: "$100 - $500" },
  { key: PriceRange.FIVE_HUNDRED_TO_THOUSAND, label: "$500 - $1000" },
  { key: PriceRange.OVER_1000, label: "Over $1000" },
];

export const RATING_OPTIONS: FilterOption[] = [
  { key: Rating.FOUR_STARS, label: "4 Stars & Above" },
  { key: Rating.THREE_STARS, label: "3 Stars & Above" },
  { key: Rating.TWO_STARS, label: "2 Stars & Above" },
  { key: Rating.ONE_STAR, label: "1 Star & Above" },
];
