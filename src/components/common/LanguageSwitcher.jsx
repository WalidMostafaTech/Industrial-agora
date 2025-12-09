import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeLanguage } from "../../store/languageSlice/languageSlice";
import LoadingModal from "../Loading/LoadingModal";

import arFlag from "../../assets/icons/flag-ar.png";
import enFlag from "../../assets/icons/flag-en.png";

const LanguageSwitcher = () => {
  const dispatch = useDispatch();
  const { lang } = useSelector((state) => state.language);

  const [openLoading, setOpenLoading] = useState(false);

  useEffect(() => {
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  }, [lang]);

  const handleToggle = () => {
    dispatch(changeLanguage(lang === "ar" ? "en" : "ar"));
    setOpenLoading(true);
  };

  return (
    <div>
      <button
        onClick={handleToggle}
        className="cursor-pointer px-1 py-0.5 rounded-md bg-white text-myBlue-2 text-xs md:text-sm border md:border-2 flex items-center gap-1"
      >
        <img
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
