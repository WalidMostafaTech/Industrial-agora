import logoImg from "../../assets/images/logo/logo-map.png";

const Loader = () => {
  return (
    <div className="flex flex-col items-center">
      <img src={logoImg} alt="Logo" className="w-20 lg:w-30 animate-bounce" />

      <h2 className="lg:text-xl font-semibold text-light-red mt-4">
        loading ...
      </h2>
    </div>
  );
};

export default Loader;
