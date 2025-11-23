// import logoImg from "../../assets/images/logo/logo-map.png";
import { useTranslation } from "react-i18next";
import { FaCog } from "react-icons/fa";

const Loader = () => {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col items-center">
      {/* <img src={logoImg} alt="Logo" className="w-16 lg:w-22 animate-bounce" /> */}

      <div className="relative w-36 h-36 flex items-center justify-center">
        <FaCog className="text-[6rem] text-myBlue-2 animate-spin-slow" />

        <FaCog
          className="absolute top-2 left-2 text-[2.5rem] text-myGreen animate-spin-reverse-slow"
          style={{ transformOrigin: "center" }}
        />

        <FaCog
          className="absolute bottom-2 right-2 text-[2.5rem] text-myGreen animate-spin-reverse-slow"
          style={{ transformOrigin: "center" }}
        />
      </div>

      <h2 className="text-xl font-bold text-myBlue-2 mt-4"> {t("loading")}</h2>
    </div>
  );
};

export default Loader;
