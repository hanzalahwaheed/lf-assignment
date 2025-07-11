import React, { useState, useMemo } from "react";
import { ChevronDown, Search } from "lucide-react";
import DebouncedInput from "../ui/debounced-input";
import { Checkbox } from "../ui/checkbox";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";

interface FilterOption {
  key: string | number;
  label: string;
}

type FilterValue = string | number;

interface FilterSectionProps {
  title: string;
  type: "checkbox" | "radio";
  options: (FilterOption | FilterValue)[];
  selected: FilterValue | FilterValue[] | null;
  onChange: (value: FilterValue) => void;
  open: boolean;
}

export const FilterSection: React.FC<FilterSectionProps> = ({
  title,
  type,
  options,
  selected,
  onChange,
  open,
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
    <details className="group py-2" open={open}>
      <summary className="flex cursor-pointer items-center justify-between rounded-md px-1 py-2 font-medium text-neutral-800 hover:bg-neutral-100">
        {title}
        <ChevronDown className="mr-2 h-5 w-5 transform transition-transform group-open:rotate-180" />
      </summary>
      <div className="space-y-2">
        {(title === "Category" || title === "Brand") && (
          <div className="relative my-2 bg-white">
            <div className="relative rounded-md border border-neutral-300">
              <Search className="absolute top-1/2 left-3 h-3.5 w-3.5 -translate-y-1/2 text-neutral-400" />
              <DebouncedInput
                type="text"
                value={searchTerm}
                onChange={setSearchTerm}
                placeholder={`Search ${title.toLowerCase()}...`}
                className="w-full py-1.5 pr-3 pl-9 text-sm focus:ring-0 focus:outline-none"
              />
            </div>
          </div>
        )}
        <div className="max-h-48 overflow-y-auto pr-2">
          {filteredOptions.length === 0 ? (
            <div className="py-2 text-center text-sm text-neutral-500">
              No {title.toLowerCase()} found
            </div>
          ) : type === "radio" ? (
            <RadioGroup
              name={title}
              value={selected !== null ? String(selected) : ""}
              onValueChange={(value) => handleChange(value)}
            >
              {filteredOptions.map((option, index) => {
                if (!option) return null;

                const value = typeof option === "object" ? option.key : option;
                const label =
                  typeof option === "object" ? option.label : String(option);

                return (
                  <div
                    key={`${String(value)}-${index}`}
                    className="flex items-center px-1"
                  >
                    <RadioGroupItem
                      id={`filter-${title}-${value}`}
                      value={String(value)}
                      className="cursor-pointer"
                    />
                    <label
                      htmlFor={`filter-${title}-${value}`}
                      className="ml-3 text-sm text-gray-700 capitalize"
                    >
                      {label}
                    </label>
                  </div>
                );
              })}
            </RadioGroup>
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
                  className="my-0.5 flex items-center px-1"
                >
                  <Checkbox
                    id={`filter-${title}-${value}`}
                    checked={!!isSelected}
                    onCheckedChange={() => handleChange(value)}
                    className="cursor-pointer"
                  />
                  <label
                    htmlFor={`filter-${title}-${value}`}
                    className="ml-3 text-sm text-gray-700 capitalize"
                  >
                    {label.replace("-", " ")}
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
