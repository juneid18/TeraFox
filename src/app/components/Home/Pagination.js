// components/Pagination.js
export default function Pagination({ currentPage, totalPages, onPageChange }) {
    const prevPage = () => {
      if (currentPage > 1) onPageChange(currentPage - 1);
    };
  
    const nextPage = () => {
      if (currentPage < totalPages) onPageChange(currentPage + 1);
    };
  
    return (
      <div className="flex justify-center items-center gap-4 mt-6 flex-wrap">
        <button
          onClick={prevPage}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-700 text-white rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span className="text-white">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={nextPage}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-700 text-white rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    );
  }
  