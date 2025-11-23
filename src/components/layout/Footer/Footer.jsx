import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { TiArrowRight } from "react-icons/ti";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { sendNewsletter } from "../../../services/homeServices";
import SuccessModal from "../../modals/SuccessModal";

import logoImg from "../../../assets/images/logo/logo-blue.png";
import instagram from "../../../assets/icons/insta.png";
import linkedin from "../../../assets/icons/linked.png";
import whatsapp from "../../../assets/icons/whats.png";

const Footer = () => {
  const { t } = useTranslation();
  const { setting } = useSelector((state) => state.setting);
  const [email, setEmail] = useState("");
  const [successModal, setSuccessModal] = useState(false);

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
      title: t("footer.company"),
      links: [
        { name: t("footer.home"), url: "/" },
        { name: t("footer.categories"), url: "/categories/all" },
        { name: t("footer.about_us"), url: "/about-us" },
        { name: t("footer.contact_us"), url: "/contact-us" },
        { name: t("footer.request_consultation"), url: "/request" },
      ],
    },
    {
      title: t("footer.services"),
      links: [
        { name: t("footer.material_exchange"), url: "/" },
        { name: t("footer.industrial_outsourcing"), url: "/" },
        { name: t("footer.waste_reduction"), url: "/" },
        { name: t("footer.business_opportunities"), url: "/" },
        { name: t("footer.customized_offers"), url: "/" },
      ],
    },
    {
      title: t("footer.features"),
      links: [
        { name: t("footer.trusted_platform"), url: "/" },
        { name: t("footer.verified_suppliers"), url: "/" },
        { name: t("footer.wide_range"), url: "/" },
        { name: t("footer.sustainable_solutions"), url: "/" },
        { name: t("footer.reduce_costs"), url: "/" },
      ],
    },
  ];

  const FooterComponent = ({ title, links }) => (
    <div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <ul className="space-y-1">
        {links.map((link, index) => (
          <li key={index}>
            <Link
              to={link.url}
              className="hover:text-myBlue-2 transition-colors text-sm font-semibold"
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
        <img src={logoImg} alt="Logo" className="w-48 lg:w-52" />

        <form onSubmit={handleSubmit} className="flex gap-2 w-full lg:max-w-lg">
          <input
            type="email"
            placeholder={t("footer.email_placeholder")}
            className="p-2 lg:px-4 text-sm border-none outline-none rounded-md shadow-xl bg-gray-200 flex-1"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button
            type="submit"
            disabled={mutation.isPending}
            className="mainBtn disabled:opacity-60 flex items-center gap-1"
          >
            {mutation.isPending ? t("footer.sending") : t("footer.join_us")}
            <TiArrowRight className="rtl:rotate-180" />
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
              target="_blank"
              href={`https://wa.me/${(setting?.whatsapp || "").replace(
                /\s/g,
                ""
              )}`}
              className="text-2xl hover:text-myBlue-2 duration-300 cursor-pointer"
            >
              <img src={whatsapp} alt="whatsapp" className="w-6 h-6" />
            </a>
            <a className="text-3xl hover:text-myBlue-2 duration-300 cursor-pointer">
              <img src={linkedin} alt="linkedin" className="w-6 h-6" />
            </a>
            <a className="text-2xl hover:text-myBlue-2 duration-300 cursor-pointer">
              <img src={instagram} alt="Instagram" className="w-6 h-6" />
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
        <div className="container text-white text-sm flex flex-col md:flex-row items-center justify-between gap-2 md:gap-8 text-center flex-wrap">
          <p>{t("footer.copyright")}</p>
          <p>{t("footer.registration")}</p>
          <p>
            {t("footer.prepared_by")}{" "}
            <a
              href="http://technomasr.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Techno Masr
            </a>
          </p>
        </div>
      </div>

      <SuccessModal
        openModal={successModal}
        onClose={() => setSuccessModal(false)}
        msg={t("footer.newsletter_success")}
        onConfirm={() => setSuccessModal(false)}
        btnText={t("footer.ok")}
      />
    </footer>
  );
};

export default Footer;
