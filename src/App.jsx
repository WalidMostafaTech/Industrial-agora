import { Outlet, useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from "./components/layout/Header/Header";
import Footer from "./components/layout/Footer/Footer";
import FixedSection from "./components/sections/FixedSection";
import HeadInjector from "./HeadInjector";
import { useDispatch } from "react-redux";
import { setLanguage } from "./store/languageSlice/languageSlice";
import i18n from "./i18n";

function App() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const { lang } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!["en", "ar"].includes(lang)) {
      navigate("/en", { replace: true });
      return;
    }

    i18n.changeLanguage(lang);
    dispatch(setLanguage(lang));

    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = lang;
  }, [lang]);

  return (
    <main>
      <Header />
      <HeadInjector />
      <div className="min-h-[100svh]">
        <Outlet />
      </div>
      <Footer />

      <FixedSection />
    </main>
  );
}

export default App;
