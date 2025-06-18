import { useRef, useState, useEffect } from "react";
import { Columns, ChevronDown } from "lucide-react";
import { Checkbox } from "./ui/checkbox";

export type ColumnType = {
  key: string;
  label: string;
};

interface ColumnSelectorProps {
  allColumns: ColumnType[];
  visibleColumns: string[];
  onToggleColumn: (columnKey: string) => void;
}

export const ColumnSelector = ({
  allColumns,
  visibleColumns,
  onToggleColumn,
}: ColumnSelectorProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const columnSelectorRef = useRef<HTMLDivElement>(null);

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        columnSelectorRef.current &&
        !columnSelectorRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="relative" ref={columnSelectorRef}>
      <button
        className="flex items-center gap-1 rounded-md border border-neutral-300 bg-white px-3 py-1.5 text-sm text-neutral-600 hover:bg-neutral-50"
        aria-label="Select columns"
        onClick={toggleDropdown}
      >
        <Columns className="h-3.5 w-3.5" />
        <span className="hidden sm:inline">Columns</span>
        <ChevronDown className="h-3 w-3" />
      </button>

      {/* Column Selector Dropdown */}
      {isOpen && (
        <div className="absolute top-full right-0 z-10 mt-1 w-60 rounded-md border border-neutral-200 bg-white py-1 shadow-lg">
          <div className="px-3 py-2 text-xs font-medium text-neutral-500 uppercase">
            Toggle Columns
          </div>
          <div className="max-h-60 overflow-y-auto">
            {allColumns.map((column) => (
              <div key={column.key} className="flex items-center px-3 py-1.5">
                <Checkbox
                  disabled={
                    visibleColumns.length === 1 &&
                    visibleColumns.includes(column.key)
                  }
                  id={`column-${column.key}`}
                  checked={visibleColumns.includes(column.key)}
                  onCheckedChange={() => onToggleColumn(column.key)}
                />
                <label
                  htmlFor={`column-${column.key}`}
                  className="ml-3 cursor-pointer text-sm text-neutral-600"
                >
                  {column.label}
                </label>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ColumnSelector;
