"use client";
import { PaginationControls } from "./pagination-controls";
import { ExportAsCSV } from "./export-csv-button";
import type { Product } from "@/types/products";

interface ProductPaginationFooterProps {
  currentPage: number;
  totalPages: number;
  hasData: boolean;
  onPrevious: () => void;
  onNext: () => void;
  exportData: Product[];
}

export const ProductPaginationFooter = ({
  currentPage,
  totalPages,
  hasData,
  onPrevious,
  onNext,
  exportData,
}: ProductPaginationFooterProps) => {
  return (
    <div className="mt-4 flex items-center justify-between text-sm text-neutral-600">
      <PaginationControls
        currentPage={currentPage}
        totalPages={totalPages}
        hasData={hasData}
        onPrevious={onPrevious}
        onNext={onNext}
      />
      <ExportAsCSV
        data={exportData}
        headers={[
          "Title",
          "Brand",
          "Category",
          "Price",
          "Rating",
          "Stock",
          "Description",
        ]}
        filename="products"
        getRowData={(product) => [
          product.title,
          product.brand,
          product.category,
          product.price,
          product.rating,
          product.stock,
          product.description,
        ]}
        disabled={exportData.length === 0}
      />
    </div>
  );
};
