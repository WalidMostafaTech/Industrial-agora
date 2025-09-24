import { createPortal } from "react-dom";
import { IoClose } from "react-icons/io5";
// eslint-disable-next-line no-unused-vars
import { AnimatePresence, motion } from "framer-motion";
import { backdropVariants, modalVariants } from "../../animations/modalV";

const Modal = ({ openModal, onClose, closeBtn = false, children }) => {
  return createPortal(
    <AnimatePresence>
      {openModal && (
        <motion.section
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={onClose}
          className="fixed z-50 top-0 start-0 w-screen h-screen bg-black/80 flex items-center justify-center p-4"
        >
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
            className="w-full max-h-full max-w-2xl whiteContainer overflow-y-auto"
          >
            {closeBtn && (
              <span
                onClick={onClose}
                className="absolute top-4 right-4 text-2xl cursor-pointer"
              >
                <IoClose />
              </span>
            )}
            {children}
          </motion.div>
        </motion.section>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default Modal;
