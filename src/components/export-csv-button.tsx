"use client";

import { Download } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface ExportAsCSVProps<T> {
  data: T[];
  headers: string[];
  filename: string;
  getRowData: (item: T) => (string | number)[];
  disabled?: boolean;
  className?: string;
}

export function ExportAsCSV<T>({
  data,
  headers,
  filename,
  getRowData,
  disabled = false,
  className = "",
}: ExportAsCSVProps<T>) {
  const handleExportCSV = () => {
    if (data.length === 0) return;

    const csvContent = [
      headers.join(","),
      ...data.map((item) =>
        getRowData(item)
          .map((cell) => {
            if (typeof cell === "string") {
              // Escape quotes and wrap in quotes
              return `"${cell.replace(/"/g, '""')}"`;
            }
            return cell;
          })
          .join(","),
      ),
    ].join("\n");

    // Create download link
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute(
      "download",
      `${filename}-${new Date().toISOString().split("T")[0]}.csv`,
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          onClick={handleExportCSV}
          disabled={disabled || data.length === 0}
          className={`flex cursor-pointer items-center gap-1 rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm font-medium text-neutral-700 transition hover:bg-neutral-100 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
        >
          <Download className="h-4 w-4" />
          <span>Export</span>
        </button>
      </TooltipTrigger>
      <TooltipContent>
        <p>Export data to CSV file</p>
      </TooltipContent>
    </Tooltip>
  );
}
