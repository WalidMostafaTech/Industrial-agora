import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { IoSearchOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { getSearch } from "../../services/homeServices";

const SearchModal = ({ openSearch, onClose }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const { data: searchData, isLoading } = useQuery({
    queryKey: ["search", searchTerm],
    queryFn: () => getSearch(searchTerm),
    enabled: searchTerm.trim().length > 2, // يبدأ لما البحث أكبر من حرفين
    select: (data) => data || { categories: [], products: [] }, // تأمين القيم الفاضية
  });

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleClose = () => {
    setSearchTerm("");
    onClose();
  };

  const products = searchData?.products || [];
  const categories = searchData?.categories || [];

  return (
    <dialog
      className={`modal ${openSearch ? "modal-open" : ""} bg-black/50`}
      onClick={handleClose}
    >
      <div
        className="modal-box p-0 shadow-none w-11/12 max-w-7xl bg-transparent absolute top-4"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input */}
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

        {/* Results */}
        <div className="space-y-2 lg:space-y-4 max-h-[60vh] overflow-y-auto mt-4 lg:mt-6 bg-gray-200/70 backdrop-blur rounded-2xl border-2 border-white p-2 lg:p-4">
          {isLoading && <p className="text-center text-gray-600">Loading...</p>}

          {!isLoading &&
            products.length === 0 &&
            categories.length === 0 &&
            searchTerm && (
              <p className="text-center text-gray-600">No results found.</p>
            )}

          {/* Products */}
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

          {/* Categories */}
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
                  alt={category.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h4 className="text-lg lg:text-2xl font-semibold line-clamp-2">
                {category.title}
              </h4>
            </Link>
          ))}
        </div>
      </div>
    </dialog>
  );
};

export default SearchModal;
