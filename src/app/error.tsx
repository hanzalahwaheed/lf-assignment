"use client"; // Error boundaries must be Client Components

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-4">
      <h2 className="text-xl font-medium">Something went wrong! : /</h2>
      <button
        className="rounded-sm border px-4 py-2 font-medium text-neutral-400"
        onClick={() => reset()}
      >
        Try again
      </button>
    </div>
  );
}
