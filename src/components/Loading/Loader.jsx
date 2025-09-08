import logoImg from "../../assets/images/logo.png";

const Loader = () => {
  return (
    <div className="flex flex-col items-center">
      <img src={logoImg} alt="Logo" className="w-26 lg:w-36 animate-bounce" />

      <h2 className="lg:text-xl font-semibold text-light-red mt-4">
        loading ...
      </h2>
    </div>
  );
};

export default Loader;
