import { PiArrowRightLight } from "react-icons/pi";
import { TiArrowSortedUp, TiArrowSortedDown } from "react-icons/ti";
import { NavLink, useLocation } from "react-router-dom";
import DropDown from "../../common/DropDown";
import { useRef } from "react";

const NavBar = ({ activeNav, setActiveNav, openLinks, setOpenLinks }) => {
  const handleOpenLinks = (name) => {
    if (openLinks === name) {
      setOpenLinks(null);
    } else {
      setOpenLinks(name);
    }
  };

   const exchangeBtnRef = useRef();

  const linksList = [
    { name: "home", path: "/", list: [] },
    { name: "about", path: "/about-us", list: [] },
    {
      name: "exchange categories",
      path: "/categories",
      list: [
        { name: "category 1", link: "/categories?category=category-1" },
        { name: "category 2", link: "/categories?category=category-2" },
      ],
    },
    { name: "Process OutSource", path: "/request", list: [] },
    { name: "request consultation", path: "/request", list: [] },
    { name: "contact", path: "/contact-us", list: [] },
  ];

  const { pathname } = useLocation();

  return (
    <>
      {/* ✅ Desktop Nav */}
      <nav
        className="hidden w-max mx-auto xl:flex items-center justify-center gap-4 
        absolute top-1/2 left-1/2 -translate-1/2"
      >
        {linksList.map((link) =>
          link.list.length > 0 ? (
            <div
              className={`navLink relative ${
                pathname === link.path ? "active" : ""
              }`}
              key={link.name}
              ref={exchangeBtnRef}
            >
              <button
                type="button"
                onClick={() => handleOpenLinks(link.name)}
                className={`uppercase cursor-pointer flex items-center gap-1 ${
                  pathname === link.path ? "active" : ""
                }`}
              >
                {link.name}
                <TiArrowSortedDown className="text-xl" />
              </button>

              <DropDown
                onClose={() => setOpenLinks(null)}
                openDropdown={openLinks === link.name}
                buttonRef={exchangeBtnRef} 
              >
                <div className="bg-white min-w-56 p-4 flex flex-col gap-4 relative">
                  {link.list.map((subLink) => (
                    <NavLink
                      to={subLink.link}
                      key={subLink.name}
                      className="group flex items-center justify-between gap-2 font-semibold"
                      onClick={() => {
                        setActiveNav(false);
                        setOpenLinks(null);
                      }}
                    >
                      {subLink.name}
                      <PiArrowRightLight className="group-hover:translate-x-1 transition-all duration-300" />
                    </NavLink>
                  ))}
                </div>
              </DropDown>
            </div>
          ) : (
            <NavLink
              to={link.path}
              key={link.name}
              className="navLink"
              onClick={() => {
                setActiveNav(false);
                setOpenLinks(null);
              }}
            >
              {link.name}
            </NavLink>
          )
        )}
      </nav>

      <nav
        className={`flex xl:hidden flex-col w-full overflow-hidden transition-all duration-500 ease-in-out ${
          activeNav ? "max-h-screen pt-2" : "max-h-0"
        }`}
      >
        {linksList.map((link) =>
          link.list.length > 0 ? (
            <div
              className={`navLink py-1 ${
                pathname === link.path ? "active" : ""
              }`}
              key={link.name}
            >
              <button
                type="button"
                onClick={() => handleOpenLinks(link.name)}
                className="uppercase cursor-pointer flex items-center w-full gap-1"
              >
                {link.name}
                <TiArrowSortedDown className="text-xl" />
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out
                  flex flex-col gap-4 px-2 bg-white text-black z-50 cursor-pointer relative
                  ${openLinks === link.name ? "max-h-60 py-2" : "max-h-0"}`}
              >
                {openLinks === link.name && (
                  <TiArrowSortedUp className="absolute -top-4 start-2 text-white text-2xl z-50" />
                )}

                {link.list.map((subLink) => (
                  <NavLink
                    to={subLink.link}
                    key={subLink.name}
                    className="group flex items-center gap-2 font-semibold"
                    onClick={() => {
                      setActiveNav(false);
                      setOpenLinks(null);
                    }}
                  >
                    {subLink.name}
                    <PiArrowRightLight className="group-hover:translate-x-1 transition-all duration-300" />
                  </NavLink>
                ))}
              </div>
            </div>
          ) : (
            <NavLink
              to={link.path}
              key={link.name}
              className="navLink py-1"
              onClick={() => {
                setActiveNav(false);
                setOpenLinks(null);
              }}
            >
              {link.name}
            </NavLink>
          )
        )}
      </nav>
    </>
  );
};

export default NavBar;
