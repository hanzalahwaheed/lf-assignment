import React, { memo } from 'react';

interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  hasData: boolean;
  onPrevious: () => void;
  onNext: () => void;
}

const PaginationControlsComponent: React.FC<PaginationControlsProps> = ({
  currentPage,
  totalPages,
  hasData,
  onPrevious,
  onNext,
}) => {
  return (
    <div className="flex items-center gap-3">
      <button
        onClick={onPrevious}
        disabled={currentPage === 1}
        className="cursor-pointer rounded-md border border-neutral-300 bg-white px-4 py-2 font-medium transition hover:bg-neutral-100 disabled:cursor-not-allowed disabled:opacity-50"
      >
        Previous
      </button>
      <span>
        Page {currentPage} of {totalPages}
      </span>
      <button
        onClick={onNext}
        disabled={currentPage === totalPages || !hasData}
        className="cursor-pointer rounded-md border border-neutral-300 bg-white px-4 py-2 font-medium transition hover:bg-neutral-100 disabled:cursor-not-allowed disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
};

const PaginationControls = memo(PaginationControlsComponent);
PaginationControls.displayName = 'PaginationControls';

export { PaginationControls };
