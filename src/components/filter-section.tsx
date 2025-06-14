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
      className="border-b border-slate-200 last:border-b-0 py-4 group"
      open
    >
      <summary className="font-semibold text-slate-800 cursor-pointer flex justify-between items-center">
        {title}
        <svg
          className="h-5 w-5 transition-transform transform group-open:rotate-180"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </summary>
      <div className="space-y-2 max-h-60 overflow-y-auto pr-2 pt-2">
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
                      ? "text-indigo-600 border-gray-300"
                      : "text-indigo-600 border-gray-300"
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
