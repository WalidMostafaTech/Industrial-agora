import { PiArrowRightLight } from "react-icons/pi";
import { TiArrowSortedDown } from "react-icons/ti";
import { NavLink, useLocation, useParams } from "react-router-dom";
import { useRef } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

const NavBar = ({ activeNav, setActiveNav, openLinks, setOpenLinks }) => {
  const { t } = useTranslation();
  const handleOpenLinks = (name) => {
    setOpenLinks(openLinks === name ? null : name);
  };

  const { lang } = useParams();

  const { categories } = useSelector((state) => state.categories);
  const filterCategories = categories?.filter((cat) => cat.nav);
  const categoriesLinks = filterCategories?.map((cat) => ({
    name: cat.title,
    link: `categories/${cat.slug}`,
  }));

  const exchangeBtnRef = useRef();
  const { pathname } = useLocation();

  const linksList = [
    { name: t("navbar.home"), path: `/${lang}`, list: [] },
    { name: t("navbar.about"), path: "about-us", list: [] },
    {
      name: t("navbar.exchange_categories"),
      path: "categories/all",
      list: categoriesLinks,
    },
    {
      name: t("navbar.process_outsource"),
      path: "process-outsource",
      list: [],
    },
    { name: t("navbar.request_consultation"), path: "request", list: [] },
    { name: t("navbar.contact"), path: "contact-us", list: [] },
  ];

  return (
    <>
      {/* Desktop Nav */}
      <nav className="hidden w-max mx-auto lg:flex items-center justify-center gap-2 lg:gap-4 absolute top-1/2 left-1/2 -translate-1/2">
        {linksList.map((link) =>
          link.list.length > 0 ? (
            <div
              className={`navLink relative ${
                pathname === link.path ? "active" : ""
              }`}
              key={link.name}
              ref={exchangeBtnRef}
            >
              <div className="dropdown dropdown-start">
                <div tabIndex={0}>
                  <button
                    type="button"
                    onClick={() => handleOpenLinks(link.name)}
                    className={`uppercase cursor-pointer flex items-center gap-1 ${
                      pathname === link.path ? "active" : ""
                    }`}
                  >
                    {link.name}
                  </button>
                </div>

                <ul
                  tabIndex={0}
                  className="dropdown-content menu menu-sm bg-base-100 rounded-box z-1 min-w-60 p-2 shadow-sm text-lg"
                >
                  {link.list.map((subLink) => (
                    <NavLink
                      end
                      to={subLink.link}
                      key={subLink.name}
                      className="group text-sm text-black flex items-center justify-between gap-2 font-semibold p-2 not-last:border-b border-gray-300"
                      onClick={() => {
                        setActiveNav(false);
                        setOpenLinks(null);
                      }}
                    >
                      <p className="flex-1 line-clamp-2">{subLink.name}</p>
                      <PiArrowRightLight className="group-hover:translate-x-1 rtl:group-hover:-translate-x-1 rtl:rotate-180 transition-all duration-300" />
                    </NavLink>
                  ))}
                </ul>
              </div>
            </div>
          ) : (
            <NavLink
              to={link.path}
              key={link.name}
              end
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

      {/* Mobile Nav */}
      <nav
        className={`flex lg:hidden flex-col w-full overflow-hidden transition-all duration-500 ease-in-out ${
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
                className={`overflow-hidden transition-all duration-300 ease-in-out flex flex-col gap-4 z-50 cursor-pointer relative border-s-4 border-myBlue-2 ${
                  openLinks === link.name ? "max-h-60 p-2" : "max-h-0"
                }`}
              >
                {link.list.map((subLink) => (
                  <NavLink
                    to={subLink.link}
                    key={subLink.name}
                    end
                    className="group flex items-center gap-2 font-medium"
                    onClick={() => {
                      setActiveNav(false);
                      setOpenLinks(null);
                    }}
                  >
                    {subLink.name}
                  </NavLink>
                ))}
              </div>
            </div>
          ) : (
            <NavLink
              to={link.path}
              key={link.name}
              end
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
