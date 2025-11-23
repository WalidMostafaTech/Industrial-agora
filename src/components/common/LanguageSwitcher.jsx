import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeLanguage } from "../../store/languageSlice/languageSlice";
import LoadingModal from "../Loading/LoadingModal";

const LanguageSwitcher = () => {
  const dispatch = useDispatch();
  const { lang } = useSelector((state) => state.language);

  const [openLoading, setOpenLoading] = useState(false);

  // ⬅️ كل ما lang يتغير عدل الاتجاه وافتح المودال
  useEffect(() => {
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  }, [lang]);

  const handleToggle = () => {
    dispatch(changeLanguage(lang === "ar" ? "en" : "ar"));
    setOpenLoading(true);
  };

  return (
    <div className="relative text-sm">
      {/* زرار واحد يبدل اللغة */}
      <button
        onClick={handleToggle}
        className={`cursor-pointer px-2 py-1 rounded-md text-myBlue-2 border-2`}
      >
        <span className="font-semibold">
          {lang === "en" ? "العربية" : "English"}
        </span>
      </button>

      {/* المودال */}
      <LoadingModal openModal={openLoading} />
    </div>
  );
};

export default LanguageSwitcher;
