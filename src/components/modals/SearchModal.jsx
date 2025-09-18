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
            className="container max-h-full overflow-y-auto p-4 bg-white rounded-xl space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between gap-4">
              <h3 className="text-xl lg:text-3xl font-bold">Search</h3>
              <span
                className="text-3xl lg:text-4xl text-myBlue-2 cursor-pointer"
                onClick={onClose}
              >
                <IoMdCloseCircle />
              </span>
            </div>

            <div>
              <MainInput id="search" type="search" placeholder={"Search..."} />
            </div>

            <div>
              {products.map((product) => (
                <Link
                  to={`/product/${product.id}`}
                  key={product.id}
                  onClick={onClose}
                  className="flex items-center gap-2 lg:gap-4 p-2 lg:p-4 mb-2 lg:mb-4 shadow-md hover:bg-gray-100 rounded-xl cursor-pointer"
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
