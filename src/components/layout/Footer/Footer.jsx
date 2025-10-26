import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import logoImg from "../../../assets/images/logo/logo-blue.png";
import { Link } from "react-router-dom";
import { IoLogoLinkedin } from "react-icons/io";
import { BsTwitterX } from "react-icons/bs";
import { TiArrowRight } from "react-icons/ti";
import { useSelector } from "react-redux";
import { sendNewsletter } from "../../../services/homeServices";
import SuccessModal from "../../modals/SuccessModal";

const Footer = () => {
  const { setting } = useSelector((state) => state.setting);
  const [email, setEmail] = useState("");
  const [successModal, setSuccessModal] = useState(false);

  // ✅ React Query mutation
  const mutation = useMutation({
    mutationFn: sendNewsletter,
    onSuccess: () => {
      setEmail("");
      setSuccessModal(true);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email.trim()) return;

    mutation.mutate(email);
  };

  const footerLinks = [
    {
      title: "Our Company",
      links: [
        { name: "Home", url: "/" },
        { name: "Categories", url: "/categories" },
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

  const FooterComponent = ({ title, links }) => (
    <div>
      <h3 className="text-xl lg:text-2xl font-bold mb-4">{title}</h3>
      <ul className="space-y-2">
        {links.map((link, index) => (
          <li key={index}>
            <Link
              to={link.url}
              className="hover:text-myBlue-2 transition-colors"
            >
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <footer className="bg-white">
      <div className="container flex justify-between items-center flex-wrap gap-4 pt-8">
        <img src={logoImg} alt="Logo" className="w-48 lg:w-56" />

        <form
          onSubmit={handleSubmit}
          className="flex gap-2 lg:gap-4 w-full lg:max-w-lg"
        >
          <input
            type="email"
            placeholder="Enter your email"
            className="p-2 lg:px-4 border-none outline-none rounded-md shadow-xl bg-gray-200 flex-1"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button
            type="submit"
            disabled={mutation.isPending}
            className="mainBtn disabled:opacity-60 flex items-center gap-1"
          >
            {mutation.isPending ? "Sending..." : "Join Us"}
            <TiArrowRight />
          </button>
        </form>
      </div>

      <div className="container sectionPadding grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
        <div>
          {setting?.footer && (
            <div
              className="htmlContent mb-4 lg:mb-8"
              dangerouslySetInnerHTML={{ __html: setting?.footer }}
            />
          )}

          <div className="flex items-center space-x-3">
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
              className="text-4xl hover:text-myBlue-2 duration-300"
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

      <SuccessModal
        openModal={successModal}
        onClose={() => setSuccessModal(false)}
        msg="You have successfully joined our newsletter!"
        onConfirm={() => setSuccessModal(false)}
        btnText="OK"
      />
    </footer>
  );
};

export default Footer;
