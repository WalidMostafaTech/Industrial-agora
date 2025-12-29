import PageTitle from "../../components/common/PageTitle";
import checkIcon from "../../assets/icons/check-icon.png";
import PageBanner from "../../components/common/PageBanner";
import ConsultationForm from "./ConsultationForm";
import { useQuery } from "@tanstack/react-query";
import {
  getConsultationSettings,
  setPageSeo,
} from "../../services/mainServices";
import LoadingSection from "../../components/Loading/LoadingSection";
import EmptySection from "../../components/sections/EmptySection";
import { useTranslation } from "react-i18next";
import SeoManager from "../../utils/SeoManager";

const RequestConsultation = () => {
  const { t } = useTranslation();
  const {
    data: consultationSettings,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["consultationSettings"],
    queryFn: getConsultationSettings,
  });

  const { data: seoData } = useQuery({
    queryKey: ["seoData"],
    queryFn: () => setPageSeo({ page: "request" }),
  });

  if (isLoading) return <LoadingSection />;

  if (isError || !consultationSettings) return <EmptySection />;

  return (
    <>
      <SeoManager
        title={seoData?.meta_title}
        description={seoData?.meta_description}
        keywords={seoData?.keywords}
        canonical={seoData?.canonical_url}
        ogImage={seoData?.og_image_url}
      />

      <section className="pagePadding">
        <PageTitle title={t("requestConsultation")} />

        <PageBanner
          image={consultationSettings?.consultation_banner}
          title={consultationSettings?.banner_title}
        />

        <div className="container sectionPadding grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* ✅ Left Section */}
          <div className="lg:col-span-3">
            <h3 className="text-2xl lg:text-3xl font-bold">
              {consultationSettings?.section_title}
            </h3>

            <ul className="list-inside mt-4 space-y-2">
              {consultationSettings?.solutions.map((point, index) => (
                <li key={index} className="flex items-start gap-2">
                  <img
                    loading="lazy"
                    src={checkIcon}
                    alt="check icon"
                    className="w-8 lg:w-10"
                  />
                  <p className="lg:text-lg font-semibold pt-2">{point}</p>
                </li>
              ))}
            </ul>
          </div>

          {/* ✅ Right Form Section */}
          <ConsultationForm types={consultationSettings?.consultation_types} />
        </div>
      </section>
    </>
  );
};

export default RequestConsultation;
