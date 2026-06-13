// components/DoctorsPagination.jsx

export default function Pagination({
  page,
  totalPages,
  onPageChange,
}) {
  const pages = [...Array(totalPages)].map(
    (_, index) => index + 1
  );

  return (
    <div className="flex justify-center gap-2 mt-6">

      <button
        disabled={page === 1}
        onClick={() => onPageChange(page - 1)}
        className="px-3 py-2 border rounded"
      >
        Previous
      </button>

      {pages.map((pageNumber) => (
        <button
          key={pageNumber}
          onClick={() => onPageChange(pageNumber)}
          className={`px-3 py-2 border rounded ${
            page === pageNumber
              ? "bg-blue-600 text-white"
              : ""
          }`}
        >
          {pageNumber}
        </button>
      ))}

      <button
        disabled={page === totalPages}
        onClick={() => onPageChange(page + 1)}
        className="px-3 py-2 border rounded"
      >
        Next
      </button>

    </div>
  );
}