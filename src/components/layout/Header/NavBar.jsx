import { useState } from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import { TiArrowSortedUp } from "react-icons/ti";
import { NavLink } from "react-router-dom";

const NavBar = ({ setActiveNav }) => {
  const [openLinks, setOpenLinks] = useState(null);

  const handleOpenLinks = (name) => {
    if (openLinks === name) {
      setOpenLinks(null);
    } else {
      setOpenLinks(name);
    }
  };

  const linksList = [
    { name: "home", path: "/", list: [] },
    {
      name: "categories",
      path: "",
      list: [
        { name: "category 1", link: "/categories?category=category-1" },
        { name: "category 2", link: "/categories?category=category-2" },
      ],
    },
    {
      name: "seller",
      path: "",
      list: [
        { name: "how to sell", link: "/how-to-sell" },
        { name: "how to be a seller", link: "/how-to-be-a-seller" },
        { name: "apply for vendor account", link: "/login" },
        { name: "terms of use", link: "/terms" },
      ],
    },
    {
      name: "buyer",
      path: "",
      list: [
        { name: "how does it work", link: "/how-does-it-work" },
        { name: "advantages", link: "/advantages" },
      ],
    },
    { name: "about us", path: "/about-us", list: [] },
    { name: "contact us", path: "/contact-us", list: [] },
    { name: "request", path: "/request", list: [] },
  ];

  return (
    <nav className="flex flex-col items-center xl:flex-row gap-4 xl:gap-8">
      {linksList.map((link) =>
        link.list.length > 0 ? (
          <div className="navLink relative" key={link.name}>
            <button
              type="button"
              onClick={() => handleOpenLinks(link.name)}
              className="capitalize"
            >
              {link.name}
            </button>
            <div
              className={`absolute min-w-xs top-[calc(100%+1rem)] start-0 shadow-md rounded-xl overflow-hidden
              flex flex-col gap-4 p-4 bg-white text-black z-50 cursor-pointer ${
                openLinks === link.name ? "block" : "hidden"
              }`}
            >
              <TiArrowSortedUp className="absolute top-[-1rem] start-0 text-white text-2xl z-50" />

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
                  <FaArrowRightLong className="group-hover:translate-x-1 transition-all duration-300" />
                </NavLink>
              ))}
            </div>
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
  );
};

export default NavBar;
