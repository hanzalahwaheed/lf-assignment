import { ChevronDown } from "lucide-react";
import React from "react";

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
      <div className="max-h-60 space-y-2 overflow-y-auto pt-2 pr-2">
        {options &&
          options.map((option, index) => {
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
                className="flex items-center"
              >
                <input
                  type={type}
                  id={`filter-${title}-${value}`}
                  name={type === "radio" ? title : undefined}
                  checked={!!isSelected}
                  onChange={() => handleChange(value)}
                  className={`h-4 w-4 rounded ${
                    type === "checkbox"
                      ? "border-gray-300 text-indigo-600"
                      : "border-gray-300 text-indigo-600"
                  } focus:ring-indigo-500`}
                />
                <label
                  htmlFor={`filter-${title}-${value}`}
                  className="ml-3 text-sm text-gray-700"
                >
                  {label}
                </label>
              </div>
            );
          })}
      </div>
    </details>
  );
};

export default FilterSection;
