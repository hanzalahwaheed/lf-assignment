const SortIcon = ({
  direction,
}: {
  direction: "ascending" | "descending" | null;
}) => {
  if (direction === "ascending") return <span className="ml-2">↑</span>;
  if (direction === "descending") return <span className="ml-2">↓</span>;
  return <span className="ml-2 text-neutral-400">↕</span>;
};

export default SortIcon;
