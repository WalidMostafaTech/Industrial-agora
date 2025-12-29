import {
  getProcessOutsourcePage,
  setPageSeo,
} from "../../services/mainServices";
import ProcessOutSourceHero from "./sections/ProcessOutSourceHero";
import ProcessOutSourceSlider from "./sections/ProcessOutSourceSlider";
import { useQuery } from "@tanstack/react-query";
import LoadingPage from "../../components/Loading/LoadingPage";
import SeoManager from "../../utils/SeoManager";

const ProcessOutSource = () => {
  const { data: processOutsourceData, isLoading } = useQuery({
    queryKey: ["process-outsource-page"],
    queryFn: getProcessOutsourcePage,
  });

  const { data: seoData } = useQuery({
    queryKey: ["seoData"],
    queryFn: () => setPageSeo({ page: "process-outsource" }),
  });

  if (isLoading) return <LoadingPage />;

  return (
    <>
      <SeoManager
        title={seoData?.meta_title}
        description={seoData?.meta_description}
        keywords={seoData?.keywords}
        canonical={seoData?.canonical_url}
        ogImage={seoData?.og_image_url}
      />

      <article>
        <ProcessOutSourceHero image={processOutsourceData?.bg_banner} />
        <ProcessOutSourceSlider list={processOutsourceData?.data} />
      </article>
    </>
  );
};

export default ProcessOutSource;
