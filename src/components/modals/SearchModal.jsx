import { IoMdCloseCircle } from "react-icons/io";
import { IoSearchOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import image from "../../assets/images/32bf46f5bdafd7f6d8d884b65fc96ab358e43f24.jpg";

const products = [
  { id: 1, name: "Product 1", image: image },
  { id: 2, name: "Product 2", image: image },
  { id: 3, name: "Product 3", image: image },
];

const SearchModal = ({ openSearch, onClose }) => {
  return (
    <dialog
      className={`modal ${openSearch ? "modal-open" : ""} bg-black/50`}
      onClick={onClose}
    >
      <div
        className="modal-box p-0 shadow-none w-11/12 max-w-7xl bg-transparent absolute top-4"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input */}
        <div className="bg-gray-200/70 backdrop-blur rounded-2xl border-2 border-white p-2 lg:p-4">
          <form className="relative border-2 border-white rounded-xl overflow-hidden flex">
            <input
              placeholder="Search..."
              className="w-full bg-white/70 text-lg p-2 outline-0 border-0"
            />

            <button
              type="submit"
              className="flex items-center justify-center p-2 cursor-pointer bg-myBlue-2 text-white text-2xl"
            >
              <IoSearchOutline />
            </button>
          </form>
        </div>

        {/* Product Results */}
        <div className="space-y-2 lg:space-y-4 max-h-[60vh] overflow-y-auto mt-4 lg:mt-6 bg-gray-200/70 backdrop-blur rounded-2xl border-2 border-white p-2 lg:p-4">
          {products.map((product) => (
            <Link
              to={`/product/${product.id}`}
              key={product.id}
              onClick={onClose}
              className="flex items-center gap-4 p-3 shadow-md bg-white/80 hover:bg-gray-100 rounded-xl cursor-pointer"
            >
              <div className="w-24 lg:w-40 overflow-hidden rounded-lg shadow-md">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h4 className="text-lg lg:text-2xl font-semibold line-clamp-2">
                {product.name}
              </h4>
            </Link>
          ))}
        </div>
      </div>
    </dialog>
  );
};

export default SearchModal;
