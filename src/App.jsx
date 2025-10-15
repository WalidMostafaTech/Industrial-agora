import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from "./components/layout/Header/Header";
import Footer from "./components/layout/Footer/Footer";
import FixedSection from "./components/sections/FixedSection";
import { useDispatch } from "react-redux";
import { getProfileAct } from "./store/profile/profileSlice";
import { getMainCategoriesAct } from "./store/categories/categories";

function App() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProfileAct());
    dispatch(getMainCategoriesAct());
  }, [dispatch]);

  return (
    <main>
      <Header />
      <div className="min-h-[calc(100dvh-460px)]">
        <Outlet />
      </div>
      <Footer />

      <FixedSection />
    </main>
  );
}

export default App;
