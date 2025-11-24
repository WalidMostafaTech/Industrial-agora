import AboutCardList from "../../components/common/AboutCardList";
import PageBanner from "../../components/common/PageBanner";
import PageTitle from "../../components/common/PageTitle";
import { useQuery } from "@tanstack/react-query";
import { getPages } from "../../services/mainServices";
import LoadingPage from "../../components/Loading/LoadingPage";
import EmptySection from "../../components/sections/EmptySection";
import { useTranslation } from "react-i18next";

const AboutUS = () => {
  const { t } = useTranslation();
  const {
    data: pages,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["pages", "about-us"],
    queryFn: getPages,
  });

  const pageData = pages?.find((page) => page?.slug === "about-us");

  if (isLoading) return <LoadingPage />;

  if (isError || !pages) return <EmptySection />;

  return (
    <section className="pagePadding">
      <PageTitle title={t("aboutUs")} />

      <PageBanner
        image={pageData.image}
        title={pageData.title}
        overlay="white"
      />

      <div className="container mt-8 lg:mt-12">
        <AboutCardList data={pageData.blocks} border />
      </div>
    </section>
  );
};

export default AboutUS;
