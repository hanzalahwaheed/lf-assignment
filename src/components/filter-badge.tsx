import React from "react";
import { FilterType } from "@/types/filters";
import { X } from "lucide-react";

interface FilterBadgeProps {
  type: FilterType;
  value: string | number;
  label?: string;
  onRemove: (type: FilterType, value: string | number) => void;
}

export const FilterBadge: React.FC<FilterBadgeProps> = ({
  type,
  value,
  label,
  onRemove,
}) => (
  <div className="flex items-center rounded-full bg-neutral-200 py-1 pr-1 pl-2.5 text-xs font-medium text-neutral-800">
    <span className="capitalize">{label || value}</span>
    <button
      onClick={() => onRemove(type, value)}
      className="ml-1 rounded-full p-0.5 hover:bg-neutral-300"
    >
      <X className="h-3.5 w-3.5" />
    </button>
  </div>
);

export default FilterBadge;
