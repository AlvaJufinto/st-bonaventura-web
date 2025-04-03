const Pagination = ({ currentPage, totalPages, goToPage }) => {
  return (
    <div className="flex justify-between mt-4">
      <button
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-4 py-2 bg-gray-500 text-white rounded-md font-secondary ${
          currentPage === 1 ? "opacity-50" : ""
        }`}
      >
        Previous
      </button>
      <span className="self-center text-sm font-secondary">{`Page ${currentPage} of ${totalPages}`}</span>
      <button
        onClick={() => goToPage(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`px-4 py-2 bg-gray-500 text-white rounded-md font-secondary ${
          currentPage === totalPages ? "opacity-50" : ""
        }`}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
