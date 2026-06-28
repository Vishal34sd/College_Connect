import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";

const Pagination = ({ pagination, onPageChange }) => {
  const { currentPage, totalPages, totalTasks } = pagination;

  if (totalPages <= 1) return null;

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      // Always show first page
      pages.push(1);

      let start = Math.max(2, currentPage - 1);
      let end = Math.min(totalPages - 1, currentPage + 1);

      if (currentPage <= 3) {
        end = 4;
      }
      if (currentPage >= totalPages - 2) {
        start = totalPages - 3;
      }

      if (start > 2) pages.push("...");
      for (let i = start; i <= end; i++) pages.push(i);
      if (end < totalPages - 1) pages.push("...");

      // Always show last page
      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-8 animate-fade-in">
      <p className="text-sm text-gray-500 dark:text-gray-400">
        Showing page <span className="font-medium text-gray-700 dark:text-gray-300">{currentPage}</span> of{" "}
        <span className="font-medium text-gray-700 dark:text-gray-300">{totalPages}</span>
        {" "}({totalTasks} tasks)
      </p>

      <div className="flex items-center gap-1">
        {/* Previous */}
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-700 text-gray-600 dark:text-gray-400 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          aria-label="Previous page"
          id="pagination-prev"
        >
          <HiChevronLeft className="w-5 h-5" />
        </button>

        {/* Page numbers */}
        {getPageNumbers().map((pageNum, idx) =>
          pageNum === "..." ? (
            <span
              key={`ellipsis-${idx}`}
              className="px-2 py-1 text-sm text-gray-400 dark:text-gray-500"
            >
              ...
            </span>
          ) : (
            <button
              key={pageNum}
              onClick={() => onPageChange(pageNum)}
              className={`min-w-[36px] h-9 rounded-lg text-sm font-medium transition-all duration-200 ${
                currentPage === pageNum
                  ? "bg-primary-500 text-white shadow-md shadow-primary-500/25"
                  : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-dark-700"
              }`}
              id={`pagination-page-${pageNum}`}
            >
              {pageNum}
            </button>
          )
        )}

        {/* Next */}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-700 text-gray-600 dark:text-gray-400 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          aria-label="Next page"
          id="pagination-next"
        >
          <HiChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
