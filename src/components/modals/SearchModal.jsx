import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { IoSearchOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { getSearch } from "../../services/homeServices";
import { useTranslation } from "react-i18next";

const SearchModal = ({ openSearch, onClose }) => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(searchTerm), 500);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  const { data: searchData, isLoading } = useQuery({
    queryKey: ["search", debouncedSearch],
    queryFn: () => getSearch(debouncedSearch),
    enabled: debouncedSearch.trim().length > 2,
    select: (data) => data || { categories: [], products: [] },
  });

  const handleSubmit = (e) => e.preventDefault();
  const handleClose = () => {
    setSearchTerm("");
    onClose();
  };

  const products = searchData?.products || [];
  const categories = searchData?.categories || [];

  const shouldShowResults =
    isLoading ||
    (searchTerm.trim().length > 2 &&
      (products.length > 0 || categories.length > 0));

  const noResults =
    !isLoading &&
    searchTerm.trim().length > 2 &&
    products.length === 0 &&
    categories.length === 0;

  return (
    <dialog
      className={`modal ${openSearch ? "modal-open" : ""} bg-black/50`}
      onClick={handleClose}
    >
      <div
        className="modal-box p-0 shadow-none w-11/12 max-w-6xl bg-transparent absolute top-4"
        onClick={(e) => e.stopPropagation()}
      >
        {/* حقل البحث */}
        <div className="bg-gray-200/70 backdrop-blur rounded-2xl border-2 border-white p-2 lg:p-4">
          <form
            onSubmit={handleSubmit}
            className="relative border-2 border-white rounded-xl overflow-hidden flex"
          >
            <input
              placeholder={t("modals.searchModal.placeholder")}
              className="w-full bg-white/70 p-2 outline-0 border-0"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button
              type="submit"
              className="flex items-center justify-center p-2 cursor-pointer bg-myBlue-2 text-white text-2xl"
            >
              <IoSearchOutline />
            </button>
          </form>
        </div>

        {(shouldShowResults || noResults) && (
          <div className="space-y-2 lg:space-y-4 max-h-[60vh] overflow-y-auto mt-4 lg:mt-6 bg-gray-200/70 backdrop-blur rounded-2xl border-2 border-white p-2 lg:p-4">
            {isLoading && (
              <p className="text-center text-gray-600">{t("modals.searchModal.loading")}</p>
            )}

            {noResults && (
              <p className="text-center text-gray-600">
                {t("modals.searchModal.noResults")}
              </p>
            )}

            {/* المنتجات */}
            {products.map((product) => (
              <Link
                to={`/product/${product.id}`}
                key={product.id}
                onClick={handleClose}
                className="flex items-center gap-4 p-3 shadow-md bg-white/80 hover:bg-gray-100 rounded-xl cursor-pointer"
              >
                <div className="w-24 lg:w-40 overflow-hidden rounded-lg shadow-md">
                  <img
                    src={product.first_image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h4 className="text-lg font-semibold line-clamp-2">
                  {product.name}
                </h4>
              </Link>
            ))}

            {/* الفئات */}
            {categories.map((category) => (
              <Link
                to={`/categories/${category.id}`}
                key={category.id}
                onClick={handleClose}
                className="flex items-center gap-4 p-3 shadow-md bg-white/80 hover:bg-gray-100 rounded-xl cursor-pointer"
              >
                <div className="w-24 lg:w-40 overflow-hidden rounded-lg shadow-md">
                  <img
                    src={category.image}
                    alt={category.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h4 className="text-lg font-semibold line-clamp-2">
                  {category.title}
                </h4>
              </Link>
            ))}
          </div>
        )}
      </div>
    </dialog>
  );
};

export default SearchModal;
