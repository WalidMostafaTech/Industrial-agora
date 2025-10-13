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
        className="modal-box w-11/12 max-w-7xl bg-gray-200/70 backdrop-blur rounded-3xl border-2 border-white p-4 pt-10 space-y-6 
        absolute top-6  shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          className="absolute right-2 top-2 text-3xl text-myBlue-2 hover:text-myBlue-1 transition cursor-pointer"
          onClick={onClose}
        >
          <IoMdCloseCircle />
        </button>

        {/* Search Input */}
        <div className="relative border-2 border-white rounded-full">
          <input
            type="search"
            placeholder="Search..."
            className="w-full bg-white/70 text-lg py-2 px-4 pe-12 rounded-full outline-0 border-0"
          />

          <span
            className="absolute top-1/2 end-0 -translate-y-1/2 h-full aspect-square rounded-full
            flex items-center justify-center cursor-pointer bg-myBlue-2 text-white text-2xl"
          >
            <IoSearchOutline />
          </span>
        </div>

        {/* Product Results */}
        <div className="space-y-4 max-h-[60vh] overflow-y-auto">
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

      {/* overlay */}
      <form method="dialog" className="modal-backdrop">
        <button onClick={onClose}>close</button>
      </form>
    </dialog>
  );
};

export default SearchModal;
