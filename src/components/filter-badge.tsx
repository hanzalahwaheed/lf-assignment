import React from "react";

interface FilterBadgeProps {
  type: string;
  value: any;
  label?: string;
  onRemove: (type: string, value: any) => void;
}

export const FilterBadge: React.FC<FilterBadgeProps> = ({
  type,
  value,
  label,
  onRemove,
}) => (
  <div className="flex items-center bg-slate-200 text-slate-800 text-xs font-medium pl-2.5 pr-1 py-1 rounded-full">
    <span className="capitalize">{label || value}</span>
    <button
      onClick={() => onRemove(type, value)}
      className="ml-1 p-0.5 rounded-full hover:bg-slate-300"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-3.5 w-3.5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    </button>
  </div>
);

export default FilterBadge;
