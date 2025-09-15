import { useState, useEffect, useRef } from "react";
import { HiMenu } from "react-icons/hi";
import { IoClose, IoSearchOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import logoImg from "../../../assets/images/logo-white.png";
import NavBar from "./NavBar";

const Header = () => {
  const [activeNav, setActiveNav] = useState(false);
  const [openLinks, setOpenLinks] = useState(null);

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

  return (
    <header
      className="container fixed left-1/2 -translate-x-1/2 top-4 z-50"
      ref={headerRef}
    >
      <div
        className={`flex flex-col xl:flex-row items-center justify-between gap-4 
        px-4 xl:px-6 py-3 xl:py-6 bg-myBlue-1/80 backdrop-blur shadow-md rounded-3xl 
        overflow-hidden xl:overflow-visible transition-[max-height] duration-500 ease-in-out
        ${activeNav ? "max-h-screen" : "max-h-[60px]"} xl:max-h-[200px]`}
      >
        <div className="flex items-center justify-between gap-2 w-full xl:w-auto">
          <Link to="/" onClick={() => setActiveNav(false)}>
            <img
              loading="lazy"
              src={logoImg}
              alt="Logo"
              className="w-36 xl:w-48"
            />
          </Link>
          <span
            className="text-3xl text-white cursor-pointer xl:hidden"
            onClick={() => {
              setActiveNav(!activeNav);
              setOpenLinks(null);
            }}
          >
            {activeNav ? <IoClose /> : <HiMenu />}
          </span>
        </div>

        <NavBar
          setActiveNav={setActiveNav}
          openLinks={openLinks}
          setOpenLinks={setOpenLinks}
        />

        <div className="flex items-center justify-center flex-wrap gap-4">
          <span className="text-3xl text-white cursor-pointer pe-4 border-e">
            <IoSearchOutline />
          </span>

          <Link to="/contact-us" className="mainBtn !rounded-full">
            Join us
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
