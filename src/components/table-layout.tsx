import SortIcon from "@/components/ui/sort-icon";
import { Star } from "lucide-react";

interface TableLayoutProps {
  data: Array<{
    id: number;
    title: string;
    category: string;
    brand: string;
    price: number;
    rating: number;
    stock: number;
    [key: string]: any;
  }>;
  onSort: (key: string) => void;
  sortConfig: { key: string; direction: "ascending" | "descending" };
}

type HeaderType = {
  key: string;
  label: string;
};

const TableLayout = ({ data, onSort, sortConfig }: TableLayoutProps) => {
  const headers: HeaderType[] = [
    { key: "title", label: "Product Name" },
    { key: "category", label: "Category" },
    { key: "brand", label: "Brand" },
    { key: "price", label: "Price" },
    { key: "rating", label: "Rating" },
    { key: "stock", label: "Stock" },
  ];

  return (
    <div className="animate-fade-in overflow-x-auto rounded-lg border border-slate-200 bg-white shadow-sm">
      <table className="w-full text-sm">
        <thead className="border-b border-slate-200 bg-slate-50">
          <tr>
            {headers.map(({ key, label }) => (
              <th
                key={key}
                className="px-6 py-3 text-left text-xs font-medium tracking-wider text-slate-500 uppercase"
              >
                <div
                  className="flex cursor-pointer items-center select-none"
                  onClick={() => onSort(key)}
                >
                  {label}
                  <SortIcon
                    direction={
                      sortConfig.key === key ? sortConfig.direction : null
                    }
                  />
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200">
          {data.map((product) => (
            <tr
              key={product.id}
              className="transition-colors hover:bg-slate-50"
            >
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="font-medium text-slate-900">
                  {product.title}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-slate-600 capitalize">
                {product.category}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-slate-600">
                {product.brand}
              </td>
              <td className="px-6 py-4 font-semibold whitespace-nowrap text-slate-700">
                ${product.price.toFixed(2)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="flex items-center gap-2">
                  <Star className="h-3.5 w-3.5" /> {product.rating.toFixed(1)}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">{product.stock}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableLayout;
