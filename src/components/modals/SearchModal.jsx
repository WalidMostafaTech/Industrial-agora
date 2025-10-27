import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { IoSearchOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { getSearch } from "../../services/homeServices";

const SearchModal = ({ openSearch, onClose }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  // ✅ Debounce logic (500ms)
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  // ✅ React Query
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

  // ✅ نتحقق إذا كان المفروض نظهر الـ div ولا لأ
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
        className="modal-box p-0 shadow-none w-11/12 max-w-7xl bg-transparent absolute top-4"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 🔍 Search Input */}
        <div className="bg-gray-200/70 backdrop-blur rounded-2xl border-2 border-white p-2 lg:p-4">
          <form
            onSubmit={handleSubmit}
            className="relative border-2 border-white rounded-xl overflow-hidden flex"
          >
            <input
              placeholder="Search..."
              className="w-full bg-white/70 text-lg p-2 outline-0 border-0"
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

        {/* ✅ Results Section (مش بتظهر إلا لما يكون في لودنج أو نتائج أو مفيش نتائج) */}
        {(shouldShowResults || noResults) && (
          <div className="space-y-2 lg:space-y-4 max-h-[60vh] overflow-y-auto mt-4 lg:mt-6 bg-gray-200/70 backdrop-blur rounded-2xl border-2 border-white p-2 lg:p-4">
            {isLoading && (
              <p className="text-center text-gray-600">Loading...</p>
            )}

            {noResults && (
              <p className="text-center text-gray-600">No results found.</p>
            )}

            {/* 🛒 Products */}
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
                <h4 className="text-lg lg:text-2xl font-semibold line-clamp-2">
                  {product.name}
                </h4>
              </Link>
            ))}

            {/* 🏷 Categories */}
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
                <h4 className="text-lg lg:text-2xl font-semibold line-clamp-2">
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
