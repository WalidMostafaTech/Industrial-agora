import { useState } from "react";
import arFlag from "../../assets/icons/flag-ar.png";
import enFlag from "../../assets/icons/flag-en.png";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import LoadingModal from "../Loading/LoadingModal";

const LanguageSwitcher = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { lang } = useParams();

  const [openLoading, setOpenLoading] = useState(false);

  const toggleLang = () => {
    const newLang = lang === "ar" ? "en" : "ar";
    const newPath = location.pathname.replace(`/${lang}`, `/${newLang}`);
    navigate(newPath);
    setOpenLoading(true);

    setTimeout(() => {
      window.location.reload();
    }, 300);
  };

  return (
    <div>
      <button
        onClick={toggleLang}
        className="cursor-pointer px-1 py-0.5 rounded-md bg-white text-myBlue-2 text-xs md:text-sm border md:border-2 flex items-center gap-1"
      >
        <img
          loading="lazy"
          src={lang === "en" ? arFlag : enFlag}
          alt="flag"
          className="w-5 rounded-sm"
        />
        <span className="font-semibold">
          {lang === "en" ? "العربية" : "English"}
        </span>
      </button>

      <LoadingModal openModal={openLoading} />
    </div>
  );
};

export default LanguageSwitcher;
