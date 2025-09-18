export const backdropVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.3 },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.2 },
  },
};

export const searchModalVariants = {
  hidden: { y: -50 },
  visible: {
    y: 0,
    transition: {
      type: "spring",
      duration: 0.6,
      damping: 30,
      stiffness: 200,
    },
  },
  exit: {
    y: -50,
    transition: { duration: 0.3 },
  },
};
