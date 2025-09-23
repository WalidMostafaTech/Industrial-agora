import { createPortal } from "react-dom";
// eslint-disable-next-line no-unused-vars
import { AnimatePresence, motion } from "framer-motion";
import {
  backdropVariants,
  searchModalVariants,
} from "../../animations/searchModalV";
import { IoMdCloseCircle } from "react-icons/io";
import MainInput from "../form/MainInput";
import image from "../../assets/images/32bf46f5bdafd7f6d8d884b65fc96ab358e43f24.jpg";
import { Link } from "react-router-dom";
import { IoSearchOutline } from "react-icons/io5";

const products = [
  {
    id: 1,
    name: "Product 1",
    image: image,
  },
  {
    id: 2,
    name: "Product 2",
    image: image,
  },
  {
    id: 3,
    name: "Product 3",
    image: image,
  },
];

const SearchModal = ({ openSearch, onClose }) => {
  return createPortal(
    <AnimatePresence>
      {openSearch && (
        <motion.section
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="fixed z-50 top-0 start-0 w-screen h-screen bg-black/50 p-4"
          onClick={onClose}
        >
          <motion.div
            variants={searchModalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="container max-h-full overflow-y-auto p-4 bg-stone-300/70 backdrop-blur rounded-3xl space-y-4 border-3 border-white"
            onClick={(e) => e.stopPropagation()}
          >
            {/* <div className="flex items-center justify-between gap-4">
              <h3 className="text-xl lg:text-3xl font-bold">Search</h3>
              <span
                className="text-3xl lg:text-4xl text-myBlue-2 cursor-pointer"
                onClick={onClose}
              >
                <IoMdCloseCircle />
              </span>
            </div> */}

            <div className="relative border-3 border-white rounded-full">
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

            <div className="space-y-4">
              {products.map((product) => (
                <Link
                  to={`/product/${product.id}`}
                  key={product.id}
                  onClick={onClose}
                  className="flex items-center gap-2 lg:gap-4 p-2 lg:p-4 shadow-md bg-white/70 hover:bg-gray-100 rounded-xl cursor-pointer"
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
          </motion.div>
        </motion.section>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default SearchModal;
