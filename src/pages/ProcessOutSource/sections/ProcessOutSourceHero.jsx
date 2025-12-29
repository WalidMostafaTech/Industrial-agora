import { Link } from "react-router-dom";
// import processBG from "../../../assets/images/Process-bg.jpg";
import { useTranslation } from "react-i18next";

const ProcessOutSourceHero = ({ image }) => {
  const { t } = useTranslation();

  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center text-center text-white px-4"
      style={{
        backgroundImage: `url(${image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Content */}
      <div className="relative z-10 max-w-3xl pt-32 pb-8 space-y-2 lg:space-y-6">
        <h1 className="text-4xl md:text-6xl font-bold">
          {t("processOutsourceHero.title")}
        </h1>

        <h2
          className="text-2xl md:text-4xl font-bold text-myBlue-2"
          style={{
            textShadow: "0 0 10px rgba(255, 255, 255, 0.8)",
          }}
        >
          {t("processOutsourceHero.subtitle")}
        </h2>

        <p className="text-lg lg:text-lg leading-relaxed">
          {t("processOutsourceHero.paragraph1")}
        </p>

        <p className="text-lg lg:text-lg leading-relaxed">
          {t("processOutsourceHero.paragraph2")}
        </p>

        <p className="text-lg lg:text-lg leading-relaxed">
          {t("processOutsourceHero.paragraph3")}
        </p>

        <Link to="process-outsource/service" className="mainBtn w-fit mx-auto">
          {t("processOutsourceHero.cta")}
        </Link>
      </div>
    </section>
  );
};

export default ProcessOutSourceHero;
