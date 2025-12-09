import { useState, useEffect, useRef } from "react";
import { HiMenu } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import { Link } from "react-router-dom";
import logoText from "../../../assets/images/logo/logo-text-blue.png";
import logoMap from "../../../assets/images/logo/logo-map.png";
import NavBar from "./NavBar";
import SearchModal from "../../modals/SearchModal";
import HeaderAction from "./HeaderAction";
import { useDispatch } from "react-redux";
import { getProfileAct } from "../../../store/profile/profileSlice";
import { getMainCategoriesAct } from "../../../store/categories/categories";
import { fetchCities, fetchSetting, fetchTerms } from "../../../store/setting/setting";
import Cookies from "js-cookie";
import useHasPermission from "../../../hooks/useHasPermission";
import { PERMISSIONS } from "../../../permissions";

const Header = () => {
  const [activeNav, setActiveNav] = useState(false);
  const [openLinks, setOpenLinks] = useState(null);
  const [openSearch, setOpenSearch] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const headerRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (headerRef.current && !headerRef.current.contains(event.target)) {
        setActiveNav(false);
        setOpenLinks(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024); // < lg
    };
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    handleResize();
    handleScroll();
    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const dispatch = useDispatch();

  useEffect(() => {
    if (Cookies.get("tokenAG")) {
      dispatch(getProfileAct());
    }
    dispatch(getMainCategoriesAct());
    dispatch(fetchSetting());
    dispatch(fetchCities());
    dispatch(fetchTerms());
  }, [dispatch]);

  const canSearch = useHasPermission(PERMISSIONS.VIEW_SEARCH_LISTINGS);

  return (
    <>
      <header
        className={`${
          isMobile && isScrolled ? " top-0   " : "container   top-4 "
        } transition-all duration-200  w-full z-50 left-0 right-0 fixed`}
        ref={headerRef}
      >
        <div
          className={`flex flex-col p-4 bg-stone-300/70 backdrop-blur shadow-md transition-all duration-200 
            
            ${isMobile && isScrolled ? "rounded-none" : "rounded-3xl"}
            `}
        >
          <div className="flex items-center justify-between gap-2 w-full">
            <div className="flex items-center gap-1">
              <span
                className="text-2xl text-myBlue-2 cursor-pointer lg:hidden"
                onClick={() => {
                  setActiveNav((prev) => !prev);
                  setOpenLinks(null);
                }}
              >
                {activeNav ? <IoClose /> : <HiMenu />}
              </span>
              <Link
                to="/"
                onClick={() => setActiveNav(false)}
                className="flex flex-row rtl:flex-row-reverse items-center gap-2 group"
              >
                <img
                  loading="lazy"
                  src={logoMap}
                  alt="Logo"
                  className="w-10 xl:w-12 group-hover:scale-125 duration-300"
                />
                <img
                  loading="lazy"
                  src={logoText}
                  alt="Logo"
                  className="w-22 xl:w-26 group-hover:translate-x-1 duration-300"
                />
              </Link>
            </div>

            <HeaderAction
              setOpenSearch={setOpenSearch}
              setActiveNav={setActiveNav}
              setOpenLinks={setOpenLinks}
            />
          </div>

          <NavBar
            activeNav={activeNav}
            setActiveNav={setActiveNav}
            openLinks={openLinks}
            setOpenLinks={setOpenLinks}
          />
        </div>
      </header>

      {canSearch && (
        <SearchModal
          openSearch={openSearch}
          onClose={() => setOpenSearch(false)}
        />
      )}
    </>
  );
};

export default Header;
