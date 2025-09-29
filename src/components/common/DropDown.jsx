import { useEffect, useRef } from "react";
// eslint-disable-next-line no-unused-vars
import { AnimatePresence, motion } from "framer-motion";
import { dropdownVariants } from "../../animations/dropdownV";

const DropDown = ({ onClose, buttonRef, children, openDropdown }) => {
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target) &&
        buttonRef?.current &&
        !buttonRef.current.contains(e.target)
      ) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose, buttonRef]);

  return (
    <AnimatePresence>
      {openDropdown && (
        <motion.div
          ref={dropdownRef}
          variants={dropdownVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="absolute top-[calc(100%+10px)] end-0 rounded-lg overflow-hidden shadow-lg z-30 origin-top"
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default DropDown;
