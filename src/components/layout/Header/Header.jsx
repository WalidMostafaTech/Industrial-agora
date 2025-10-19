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

const Header = () => {
  const [activeNav, setActiveNav] = useState(false);
  const [openLinks, setOpenLinks] = useState(null);
  const [openSearch, setOpenSearch] = useState(false);

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

    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(getProfileAct());
      dispatch(getMainCategoriesAct());
    }, [dispatch]);

  return (
    <>
      <header
        className="container fixed left-1/2 -translate-x-1/2 top-4 z-50"
        ref={headerRef}
      >
        <div className="flex flex-col p-4 xl:py-6 bg-white/70 backdrop-blur shadow-md rounded-3xl">
          <div className="flex items-center justify-between gap-2 w-full">
            <div className="flex items-center gap-1">
              <span
                className="text-3xl text-myBlue-2 cursor-pointer xl:hidden"
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
                className="flex items-center gap-2 group"
              >
                <img
                  loading="lazy"
                  src={logoMap}
                  alt="Logo"
                  className="w-10 xl:w-14 group-hover:scale-125 duration-300"
                />
                <img
                  loading="lazy"
                  src={logoText}
                  alt="Logo"
                  className="w-22 xl:w-28 group-hover:translate-x-2 duration-300"
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

      <SearchModal
        openSearch={openSearch}
        onClose={() => setOpenSearch(false)}
      />
    </>
  );
};

export default Header;
