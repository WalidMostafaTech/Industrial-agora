import AboutCardList from "../../components/common/AboutCardList";
import PageBanner from "../../components/common/PageBanner";
import PageTitle from "../../components/common/PageTitle";
// import bannerImg from "../../assets/images/slider-img.png";
// import cardImg from "../../assets/images/32bf46f5bdafd7f6d8d884b65fc96ab358e43f24.jpg";
import { useQuery } from "@tanstack/react-query";
import { getPages } from "../../services/mainServices";
import LoadingSection from "../../components/Loading/LoadingSection";
import EmptySection from "../../components/sections/EmptySection";

// const data = [
//   {
//     id: "1",
//     title: { text: "Who We Are", border: true, index: true },
//     image: cardImg,
//     btn: { text: "register", link: "/register", arrow: true, border: true },
//     description: {
//       text: "Stokartı.com provides product listing services only to corporate customers. A separate control panel access for importing surplus stocks to Sokarti is only granted to corporate customers who are a limited or corporation company with commercial activity. Our non-commercial members can register for basic membership which does not include the access to control panel. If you are a non-commercial member, please contact us for your surplus stock listing demands and vendor account operations.",
//       border: true,
//     },
//   },
//   {
//     id: "2",
//     title: { text: "Who We Are", border: true, index: true },
//     image: cardImg,
//     btn: { text: "register", link: "/register", arrow: true, border: true },
//     description: {
//       text: "Stokartı.com provides product listing services only to corporate customers. A separate control panel access for importing surplus stocks to Sokarti is only granted to corporate customers who are a limited or corporation company with commercial activity. Our non-commercial members can register for basic membership which does not include the access to control panel. If you are a non-commercial member, please contact us for your surplus stock listing demands and vendor account operations.",
//       border: true,
//     },
//   },
//   {
//     id: "3",
//     title: { text: "Who We Are", border: true, index: true },
//     image: cardImg,
//     btn: { text: "register", link: "/register", arrow: true, border: true },
//     description: {
//       text: "Stokartı.com provides product listing services only to corporate customers. A separate control panel access for importing surplus stocks to Sokarti is only granted to corporate customers who are a limited or corporation company with commercial activity. Our non-commercial members can register for basic membership which does not include the access to control panel. If you are a non-commercial member, please contact us for your surplus stock listing demands and vendor account operations.",
//       border: true,
//     },
//   },
// ];

const AboutUS = () => {
  const {
    data: pages,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["pages", "about-us"],
    queryFn: getPages,
  });

  const pageData = pages?.find((page) => page?.slug === "about-us");

  if (isLoading) return <LoadingSection />;

  if (isError || !pages) return <EmptySection />;

  return (
    <section className="pagePadding">
      <PageTitle title="About us" />

      <PageBanner image={pageData.image} title={pageData.title} />

      <div className="container mt-8 lg:mt-12">
        <AboutCardList data={pageData.blocks} border />
      </div>
    </section>
  );
};

export default AboutUS;
