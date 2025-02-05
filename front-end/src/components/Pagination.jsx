const Pagination = ({ totalPages, currentPage, setCurrentPage }) => {
  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center items-center gap-2 mt-8">
      <button
        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
        disabled={currentPage === 1}
        className="px-4 py-2 border-2 border-purple-500 rounded-lg text-purple-500 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-purple-50 transition-colors"
      >
        Previous
      </button>

      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <button
          key={page}
          onClick={() => setCurrentPage(page)}
          className={`w-10 h-10 rounded-lg ${
            currentPage === page
              ? "bg-purple-500 text-white"
              : "border-2 border-purple-500 text-purple-500 hover:bg-purple-50"
          } transition-colors`}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
        disabled={currentPage === totalPages}
        className="px-4 py-2 border-2 border-purple-500 rounded-lg text-purple-500 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-purple-50 transition-colors"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
