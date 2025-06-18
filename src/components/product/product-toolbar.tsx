"use client";
import { ListIcon, LayoutGrid, Search } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { DebouncedInput } from "@/components/ui/debounced-input";
import ColumnSelector, { ColumnType } from "@/components/column-selector";

type ViewMode = "grid" | "table";

interface ProductToolbarProps {
  searchTerm: string;
  onSearch: (value: string) => void;
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  visibleColumns: string[];
  toggleColumnVisibility: (columnKey: string) => void;
  allColumns: ColumnType[];
}

export const ProductToolbar = ({
  searchTerm,
  onSearch,
  viewMode,
  onViewModeChange,
  visibleColumns,
  toggleColumnVisibility,
  allColumns,
}: ProductToolbarProps) => {
  return (
    <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
      <div className="relative flex w-full max-w-sm items-center">
        <Search className="absolute left-2.5 h-4 w-4 text-neutral-500" />
        <DebouncedInput
          id="search"
          placeholder="Search products..."
          value={searchTerm}
          onChange={onSearch}
          className="w-full rounded-md border border-neutral-200 bg-white pl-9 text-sm h-10"
          debounceTime={300}
        />
      </div>
      <div className="flex items-center gap-2">
        {/* Only show column selector for table view */}
        {viewMode === "table" && (
          <ColumnSelector
            visibleColumns={visibleColumns}
            allColumns={allColumns}
            onToggleColumn={toggleColumnVisibility}
          />
        )}
        <div className="flex items-center gap-1 rounded-md border border-neutral-200 bg-white p-1">
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={() => onViewModeChange("table")}
                className={`rounded p-1.5 ${
                  viewMode === "table"
                    ? "bg-neutral-100"
                    : "hover:bg-neutral-50"
                }`}
                aria-label="Table view"
              >
                <ListIcon className="h-4 w-4" />
              </button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Table view</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={() => onViewModeChange("grid")}
                className={`rounded p-1.5 ${
                  viewMode === "grid"
                    ? "bg-neutral-100"
                    : "hover:bg-neutral-50"
                }`}
                aria-label="Grid view"
              >
                <LayoutGrid className="h-4 w-4" />
              </button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Grid view</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </div>
    </div>
  );
};
