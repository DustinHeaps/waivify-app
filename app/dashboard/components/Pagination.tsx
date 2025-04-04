"use client";

type PaginationProps = {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export default function Pagination({
  page,
  totalPages,
  onPageChange,
}: PaginationProps) {
  return (
    <div className='flex flex-col items-center gap-2 mt-6 text-sm text-gray-600'>
      {/* Buttons Row */}
      <div className='flex items-center gap-4'>
        <button
          onClick={() => onPageChange(page - 1)}
          disabled={page === 1}
          className={`flex items-center gap-1 px-3 py-1 rounded-md border ${
            page === 1
              ? "cursor-not-allowed text-gray-400 border-gray-200"
              : "hover:bg-gray-50 text-blue-600 border-gray-300"
          }`}
        >
          ← Previous
        </button>

        <button
          onClick={() => onPageChange(page + 1)}
          disabled={page === totalPages}
          className={`flex items-center gap-1 px-3 py-1 rounded-md border ${
            page === totalPages
              ? "cursor-not-allowed text-gray-400 border-gray-200"
              : "hover:bg-gray-50 text-blue-600 border-gray-300"
          }`}
        >
          Next →
        </button>
      </div>

      {/* Page Status */}
      <div>
        Page <span className='font-medium text-gray-700'>{page}</span> of{" "}
        <span className='font-medium text-gray-700'>{totalPages}</span>
      </div>
    </div>

    // <div className='flex items-center justify-between mt-6 text-sm text-gray-600'>
    //   <button
    //     onClick={() => onPageChange(page - 1)}
    //     disabled={page === 1}
    //     className={`flex items-center gap-1 px-3 py-1 rounded-md border ${
    //       page === 1
    //         ? "cursor-not-allowed text-gray-400 border-gray-200"
    //         : "hover:bg-gray-50 text-blue-600 border-gray-300"
    //     }`}
    //   >
    //     ← Previous
    //   </button>

    //   <span className='text-gray-500'>
    //     Page <span className='font-medium text-gray-700'>{page}</span> of{" "}
    //     <span className='font-medium text-gray-700'>{totalPages}</span>
    //   </span>

    //   <button
    //     onClick={() => onPageChange(page + 1)}
    //     disabled={page === totalPages}
    //     className={`flex items-center gap-1 px-3 py-1 rounded-md border ${
    //       page === totalPages
    //         ? "cursor-not-allowed text-gray-400 border-gray-200"
    //         : "hover:bg-gray-50 text-blue-600 border-gray-300"
    //     }`}
    //   >
    //     Next →
    //   </button>
    // </div>
  );
}
