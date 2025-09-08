import { FaFacebook, FaInstagram } from "react-icons/fa";
import logoImg from "../../../assets/images/logo.png";
import { Link } from "react-router-dom";
import { IoLogoLinkedin } from "react-icons/io";
import { BsTwitterX } from "react-icons/bs";
import { TiArrowRight } from "react-icons/ti";

const Footer = () => {
  const footerLinks = [
    {
      title: "Our Company",
      links: [
        { name: "Home", url: "/" },
        { name: "Categories", url: "/categories" },
        { name: "Seller", url: "/seller" },
        { name: "Buyer", url: "/buyer" },
        { name: "About us", url: "/about" },
        { name: "Contact us", url: "/contact" },
        { name: "Request", url: "/request" },
      ],
    },
    {
      title: "Services",
      links: [
        { name: "Product Listings", url: "/product-listings" },
        { name: "Direct Supplier Connection", url: "/supplier-connection" },
        { name: "Business Opportunities", url: "/business-opportunities" },
        { name: "Logistics", url: "/logistics" },
      ],
    },
    {
      title: "Features",
      links: [
        { name: "User-Friendly Platform", url: "/platform" },
        { name: "Verified Suppliers", url: "/verified-suppliers" },
        { name: "Wide Product Range", url: "/product-range" },
        { name: "Fast & Secure Shipping", url: "/shipping" },
        { name: "Real-Time Updates", url: "/updates" },
      ],
    },
  ];

  const FooterComponent = ({ title, links }) => {
    return (
      <div>
        <h3 className="text-xl lg:text-2xl font-bold mb-4">{title}</h3>
        <ul className="space-y-2">
          {links.map((link, index) => (
            <li key={index}>
              <Link
                // to={link.url}
                className="hover:text-myBlue-2 transition-colors"
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <footer className="bg-white">
      <div className="container flex justify-between items-center flex-wrap gap-4 pt-8">
        <img src={logoImg} alt="Logo" className="w-48 lg:w-56" />

        <div className="flex gap-2 w-full max-w-lg">
          <input
            type="email"
            placeholder="email"
            className="p-2 border-none outline-none rounded-md shadow-xl bg-gray-200 flex-1"
          />
          <button className="mainBtn">
            Join Us <TiArrowRight className="text-2xl" />
          </button>
        </div>
      </div>

      <div className="container sectionPadding grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
        <div>
          <p className="mb-4 lg:mb-8">
            Our platform connects businesses with the right suppliers, offering
            heavy equipment, raw materials, spare parts, and electrical
            products. We make trade simple, fast, and reliable — from browsing
            products to secure shipping.
          </p>

          <div className="flex space-x-3">
            <a
              href="#"
              target="_blank"
              className="text-3xl hover:text-myBlue-2 duration-300"
            >
              <FaFacebook />
            </a>
            <a
              href="#"
              target="_blank"
              className="text-3xl hover:text-myBlue-2 duration-300"
            >
              <IoLogoLinkedin />
            </a>
            <a
              href="#"
              target="_blank"
              className="text-3xl hover:text-myBlue-2 duration-300"
            >
              <BsTwitterX />
            </a>
            <a
              href="#"
              target="_blank"
              className="text-3xl hover:text-myBlue-2 duration-300"
            >
              <FaInstagram />
            </a>
          </div>
        </div>

        {footerLinks.map((section, index) => (
          <FooterComponent
            key={index}
            title={section.title}
            links={section.links}
          />
        ))}
      </div>

      <div className="bg-myBlue-1 p-4">
        <div className="text-center">
          <p className="text-white">All rights reserved to @Techno Masr</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
