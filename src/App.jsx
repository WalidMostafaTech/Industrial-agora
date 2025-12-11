import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from "./components/layout/Header/Header";
import Footer from "./components/layout/Footer/Footer";
import FixedSection from "./components/sections/FixedSection";
import HeadInjector from "./HeadInjector";

function App() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

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
