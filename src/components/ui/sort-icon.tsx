interface SortIconProps {
  direction: "ascending" | "descending" | null;
  className?: string;
}

const SortIcon = ({ direction, className = "" }: SortIconProps) => {
  const baseClasses = "inline-flex items-center";

  if (direction === "ascending")
    return <span className={`${baseClasses} ${className}`}>↑</span>;
  if (direction === "descending")
    return <span className={`${baseClasses} ${className}`}>↓</span>;
  return (
    <span className={`${baseClasses} text-neutral-400 ${className}`}>↕</span>
  );
};

export default SortIcon;
