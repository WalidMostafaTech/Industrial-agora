import Loader from "./Loader";

const LoadingPage = ({ overlay = false }) => {
  return (
    <article
      className={`h-screen flex items-center justify-center ${
        overlay
          ? "w-screen fixed inset-0 z-50 bg-black/80"
          : "bg-gray-100 w-full"
      }`}
    >
      <Loader />
    </article>
  );
};

export default LoadingPage;
