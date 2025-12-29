import Partners from "./sections/Partners";
import Hero from "./sections/Hero";
import Features from "./sections/Features";
import MainCategories from "./sections/mainCategories";
import Services from "./sections/Services";
import HomeVideo from "./sections/HomeVideo";
import MissionVisionSolution from "./sections/MissionVisionSolution";
import Process from "./sections/Process";
import { useQuery } from "@tanstack/react-query";
import { setPageSeo } from "../../services/mainServices";
import SeoManager from "../../utils/SeoManager";

const Home = () => {
  const { data: seoData } = useQuery({
    queryKey: ["seoData"],
    queryFn: () => setPageSeo({ page: "home" }),
  });

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
        <Hero />
        <Features />
        <MainCategories />
        <Services />
        <HomeVideo />
        <MissionVisionSolution />
        <Process />
        <Partners />
      </article>
    </>
  );
};

export default Home;
