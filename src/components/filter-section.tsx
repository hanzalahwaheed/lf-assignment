import React, { useState, useMemo } from "react";
import { ChevronDown, Search } from "lucide-react";
import DebouncedInput from "./ui/debounced-input";

interface FilterOption {
  key: string | number;
  label: string;
}

type FilterValue = string | number;

interface FilterSectionProps {
  title: string;
  type: "checkbox" | "radio";
  options: Array<FilterOption | FilterValue>;
  selected: FilterValue | FilterValue[] | null;
  onChange: (value: FilterValue) => void;
}

export const FilterSection: React.FC<FilterSectionProps> = ({
  title,
  type,
  options,
  selected,
  onChange,
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredOptions = useMemo(() => {
    if (!searchTerm) return options;
    const term = searchTerm.toLowerCase();
    return options.filter((option) => {
      if (!option) return false;
      const label = typeof option === "object" ? option.label : String(option);
      return label.toLowerCase().includes(term);
    });
  }, [options, searchTerm]);

  const handleChange = (value: FilterValue) => {
    onChange(value);
  };

  return (
    <details
      className="group border-b border-slate-200 py-4 last:border-b-0"
      open
    >
      <summary className="flex cursor-pointer items-center justify-between font-semibold text-slate-800">
        {title}
        <ChevronDown className="h-5 w-5 transform transition-transform group-open:rotate-180" />
      </summary>
      <div className="space-y-2">
        {(title === "Category" || title === "Brand") && (
          <div className="sticky top-0 z-10 bg-white pb-2">
            <div className="relative">
              <Search className="absolute top-1/2 left-3 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
              <DebouncedInput
                type="text"
                value={searchTerm}
                onChange={setSearchTerm}
                placeholder={`Search ${title.toLowerCase()}...`}
                className="w-full rounded-md border border-slate-300 py-1.5 pr-3 pl-9 text-sm focus:ring-0 focus:outline-none"
              />
            </div>
          </div>
        )}
        <div className="max-h-48 overflow-y-auto pr-2">
          {filteredOptions.length === 0 ? (
            <div className="py-2 text-center text-sm text-slate-500">
              No {title.toLowerCase()} found
            </div>
          ) : (
            filteredOptions.map((option, index) => {
              if (!option) return null;

              const value = typeof option === "object" ? option.key : option;
              const label =
                typeof option === "object" ? option.label : String(option);
              const isSelected = Array.isArray(selected)
                ? selected.includes(value)
                : value === selected;

              return (
                <div
                  key={`${String(value)}-${index}`}
                  className="my-0.5 flex items-center"
                >
                  <input
                    type={type}
                    id={`filter-${title}-${value}`}
                    name={type === "radio" ? title : undefined}
                    checked={!!isSelected}
                    onChange={() => handleChange(value)}
                    className={`h-4 w-4 rounded border-gray-300`}
                  />
                  <label
                    htmlFor={`filter-${title}-${value}`}
                    className="ml-3 text-sm text-gray-700 capitalize"
                  >
                    {type === "checkbox" ? label.replace("-", " ") : label}
                  </label>
                </div>
              );
            })
          )}
        </div>
      </div>
    </details>
  );
};

export default FilterSection;
