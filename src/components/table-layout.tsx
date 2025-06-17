import { memo } from 'react';
import SortIcon from "@/components/ui/sort-icon";
import { Product } from "@/types/products";
import { Star } from "lucide-react";

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
  sortConfig: { key: string; direction: "ascending" | "descending" } | null;
  sortConfigs?: Array<{ key: string; direction: "ascending" | "descending" }>;
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
      <table className="w-full text-sm">
        <thead className="border-b border-neutral-200 bg-neutral-50">
          <tr>
            {headers.map(({ key, label }) => (
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
                        {sortConfigs.findIndex((config) => config.key === key) +
                          1}
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
                    <SortIcon
                      direction={null}
                      className="ml-1 text-neutral-300"
                    />
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-neutral-200">
          {data.map((product) => (
            <tr
              key={product.id}
              className="transition-colors hover:bg-neutral-50"
            >
              <td className="px-6 py-3 whitespace-nowrap">
                <div className="font-medium text-neutral-900">
                  {product.title}
                </div>
              </td>
              <td className="px-6 py-3 whitespace-nowrap text-neutral-600 capitalize">
                {product.category.replace("-", " ")}
              </td>
              <td className="px-6 py-3 whitespace-nowrap text-neutral-600">
                {product.brand}
              </td>
              <td className="px-6 py-3 font-medium whitespace-nowrap text-neutral-700">
                ${product.price.toFixed(2)}
              </td>
              <td className="px-6 py-3 whitespace-nowrap">
                <span className="flex items-center gap-2">
                  <Star className="h-3.5 w-3.5" /> {product.rating.toFixed(1)}
                </span>
              </td>
              <td className="px-6 py-3 whitespace-nowrap">{product.stock}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const MemoizedTableLayout = memo(TableLayout);
MemoizedTableLayout.displayName = 'TableLayout';

export default MemoizedTableLayout;
