import { memo } from "react";
import SortIcon from "@/components/ui/sort-icon";
import { Product } from "@/types/products";
import { Star, RotateCcw } from "lucide-react";
import { SortConfig } from "@/hooks/useSorting";

interface TableLayoutProps {
  data: {
    id: number;
    title: string;
    category: string;
    brand: string;
    price: number;
    rating: number;
    stock: number;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
  }[];
  onSort: (key: keyof Product, event: React.MouseEvent) => void;
  sortConfig: SortConfig<Product> | null;
  sortConfigs?: SortConfig<Product>[];
  visibleColumns?: string[];
  resetSort?: () => void;
}

type HeaderType = {
  key: string;
  label: string;
};

const TableLayout = ({
  data,
  onSort,
  sortConfig,
  sortConfigs = [],
  visibleColumns,
  resetSort,
}: TableLayoutProps) => {
  const headers: HeaderType[] = [
    { key: "title", label: "Product Name" },
    { key: "category", label: "Category" },
    { key: "brand", label: "Brand" },
    { key: "price", label: "Price" },
    { key: "rating", label: "Rating" },
    { key: "stock", label: "Stock" },
  ];

  return (
    <div className="animate-fade-in overflow-x-auto rounded-lg border border-neutral-200 bg-white shadow-sm">
      {resetSort && sortConfigs.length > 0 && (
        <div className="flex justify-end border-b border-neutral-100 px-6 py-2">
          <button
            onClick={resetSort}
            className="flex items-center text-xs font-medium text-neutral-500 transition-colors hover:text-neutral-700"
            title="Reset sorting"
          >
            <RotateCcw className="mr-1 h-3.5 w-3.5" />
            <span>Reset sort</span>
          </button>
        </div>
      )}
      <table className="w-full text-sm">
        <thead className="border-b border-neutral-200 bg-neutral-50">
          <tr>
            {headers.map(({ key, label }) =>
              visibleColumns ? (
                visibleColumns.includes(key) && (
                  <th
                    key={key}
                    className="px-6 py-3 text-left text-xs font-medium tracking-wider text-neutral-500 uppercase"
                  >
                    <div
                      className="flex cursor-pointer items-center select-none"
                      onClick={(e) => onSort(key as keyof Product, e)}
                    >
                      <span className="mr-1">{label}</span>
                      {sortConfigs &&
                      sortConfigs.length > 0 &&
                      sortConfigs.some((config) => config.key === key) ? (
                        <span className="ml-1 flex items-center">
                          <span className="mr-1 text-xs">
                            {sortConfigs.findIndex(
                              (config) => config.key === key,
                            ) + 1}
                          </span>
                          <SortIcon
                            direction={
                              sortConfigs.find((config) => config.key === key)
                                ?.direction || "ascending"
                            }
                          />
                        </span>
                      ) : sortConfig?.key === key ? (
                        <SortIcon direction={sortConfig.direction} />
                      ) : (
                        <span className="ml-1 text-neutral-300">
                          <SortIcon direction={null} />
                        </span>
                      )}
                    </div>
                  </th>
                )
              ) : (
                <th
                  key={key}
                  className="px-6 py-3 text-left text-xs font-medium tracking-wider text-neutral-500 uppercase"
                >
                  <div
                    className="flex cursor-pointer items-center select-none"
                    onClick={(e) => onSort(key as keyof Product, e)}
                  >
                    <span className="mr-1">{label}</span>
                    {sortConfigs &&
                    sortConfigs.length > 0 &&
                    sortConfigs.some((config) => config.key === key) ? (
                      <span className="ml-1 flex items-center">
                        <span className="mr-1 text-xs">
                          {sortConfigs.findIndex(
                            (config) => config.key === key,
                          ) + 1}
                        </span>
                        <SortIcon
                          direction={
                            sortConfigs.find((config) => config.key === key)
                              ?.direction || "ascending"
                          }
                        />
                      </span>
                    ) : sortConfig?.key === key ? (
                      <SortIcon direction={sortConfig.direction} />
                    ) : (
                      <span className="ml-1 text-neutral-300">
                        <SortIcon direction={null} />
                      </span>
                    )}
                  </div>
                </th>
              ),
            )}
          </tr>
        </thead>
        <tbody className="divide-y divide-neutral-200">
          {data.map((product) => (
            <tr
              key={product.id}
              className="transition-colors hover:bg-neutral-50"
            >
              {(!visibleColumns || visibleColumns.includes("title")) && (
                <td className="px-6 py-3 whitespace-nowrap">
                  <div className="font-medium text-neutral-900">
                    {product.title}
                  </div>
                </td>
              )}
              {(!visibleColumns || visibleColumns.includes("category")) && (
                <td className="px-6 py-3 whitespace-nowrap text-neutral-600 capitalize">
                  {product.category.replace("-", " ")}
                </td>
              )}
              {(!visibleColumns || visibleColumns.includes("brand")) && (
                <td className="px-6 py-3 whitespace-nowrap text-neutral-600">
                  {product.brand}
                </td>
              )}
              {(!visibleColumns || visibleColumns.includes("price")) && (
                <td className="px-6 py-3 font-medium whitespace-nowrap text-neutral-700">
                  ${product.price.toFixed(2)}
                </td>
              )}
              {(!visibleColumns || visibleColumns.includes("rating")) && (
                <td className="px-6 py-3 whitespace-nowrap">
                  <span className="flex items-center gap-2">
                    <Star className="h-3.5 w-3.5" /> {product.rating.toFixed(1)}
                  </span>
                </td>
              )}
              {(!visibleColumns || visibleColumns.includes("stock")) && (
                <td className="px-6 py-3 whitespace-nowrap">{product.stock}</td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const MemoizedTableLayout = memo(TableLayout);
MemoizedTableLayout.displayName = "TableLayout";

export default MemoizedTableLayout;
