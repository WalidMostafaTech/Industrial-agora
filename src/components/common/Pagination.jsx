import { useTranslation } from "react-i18next";
import { TfiArrowCircleLeft, TfiArrowCircleRight } from "react-icons/tfi";

const Pagination = ({ totalPages, currentPage, onPageChange }) => {
  const { t } = useTranslation();
  if (totalPages === 0) return null;

  const handlePageClick = (page) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      onPageChange(page);
    }
  };

  // تحديد الصفحات المعروضة (بحد أقصى 5)
  const getVisiblePages = () => {
    const pages = [];
    let start = Math.max(1, currentPage - 2);
    let end = Math.min(totalPages, currentPage + 2);

    if (totalPages <= 5) {
      start = 1;
      end = totalPages;
    } else {
      if (currentPage <= 3) {
        start = 1;
        end = 5;
      } else if (currentPage >= totalPages - 2) {
        start = totalPages - 4;
        end = totalPages;
      }
    }

    for (let i = start; i <= end; i++) pages.push(i);
    return pages;
  };

  const visiblePages = getVisiblePages();

  return (
    <div className="flex items-center justify-center lg:justify-end gap-2">
      {/* First Button */}
      <button
        onClick={() => handlePageClick(1)}
        disabled={currentPage === 1}
        className={`px-1 lg:px-3 h-8 text-sm flex items-center justify-center border font-medium ${
          currentPage === 1
            ? "border-transparent bg-stone-200 text-stone-400 cursor-not-allowed"
            : "border-transparent bg-stone-200 text-gray-600 hover:bg-stone-300 cursor-pointer"
        }`}
      >
        {t("FIRST")}
      </button>

      {/* Previous Button */}
      <button
        onClick={() => handlePageClick(currentPage - 1)}
        disabled={currentPage === 1}
        className={`w-8 h-8 flex items-center justify-center border ${
          currentPage === 1
            ? "border-transparent bg-stone-200 text-stone-400 cursor-not-allowed"
            : "border-transparent bg-stone-200 text-gray-600 hover:bg-stone-300 cursor-pointer"
        }`}
      >
        <TfiArrowCircleLeft className="text-lg rtl:rotate-180" />
      </button>

      {/* Pages */}
      {visiblePages.map((page) => (
        <button
          key={page}
          onClick={() => handlePageClick(page)}
          className={`w-8 h-8 flex items-center justify-center border cursor-pointer ${
            currentPage === page
              ? "border-myBlue-2 bg-white text-myBlue-2"
              : "border-transparent bg-stone-200 text-gray-600 hover:bg-stone-300"
          }`}
        >
          {page}
        </button>
      ))}

      {/* Next Button */}
      <button
        onClick={() => handlePageClick(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`w-8 h-8 flex items-center justify-center border ${
          currentPage === totalPages
            ? "border-transparent bg-stone-200 text-stone-400 cursor-not-allowed"
            : "border-transparent bg-stone-200 text-gray-600 hover:bg-stone-300 cursor-pointer"
        }`}
      >
        <TfiArrowCircleRight className="text-lg rtl:rotate-180" />
      </button>

      {/* Last Button */}
      <button
        onClick={() => handlePageClick(totalPages)}
        disabled={currentPage === totalPages}
        className={`px-1 lg:px-3 h-8 text-sm flex items-center justify-center border font-medium ${
          currentPage === totalPages
            ? "border-transparent bg-stone-200 text-stone-400 cursor-not-allowed"
            : "border-transparent bg-stone-200 text-gray-600 hover:bg-stone-300 cursor-pointer"
        }`}
      >
        {t("LAST")}
      </button>
    </div>
  );
};

export default Pagination;
