import MainCardList from "../../components/common/MainCardList";
import PageBanner from "../../components/common/PageBanner";
import PageTitle from "../../components/common/PageTitle";
import bannerImg from "../../assets/images/slider-img.png";
import cardImg from "../../assets/images/Agreement-amico 1.png";

const data = [
  {
    id: "1",
    title: { text: "Company", border: true, index: true },
    image: cardImg,
    btn: { text: "register", link: "/register", arrow: true, border: true },
    description: {
      text: "Stokartı.com provides product listing services only to corporate customers. A separate control panel access for importing surplus stocks to Sokarti is only granted to corporate customers who are a limited or corporation company with commercial activity. Our non-commercial members can register for basic membership which does not include the access to control panel. If you are a non-commercial member, please contact us for your surplus stock listing demands and vendor account operations.",
      border: true,
    },
  },
  {
    id: "2",
    title: { text: "Company", border: true, index: true },
    image: cardImg,
    btn: { text: "register", link: "/register", arrow: true, border: true },
    description: {
      text: "Stokartı.com provides product listing services only to corporate customers. A separate control panel access for importing surplus stocks to Sokarti is only granted to corporate customers who are a limited or corporation company with commercial activity. Our non-commercial members can register for basic membership which does not include the access to control panel. If you are a non-commercial member, please contact us for your surplus stock listing demands and vendor account operations.",
      border: true,
    },
  },
  {
    id: "3",
    title: { text: "Company", border: true, index: true },
    image: cardImg,
    btn: { text: "register", link: "/register", arrow: true, border: true },
    description: {
      text: "Stokartı.com provides product listing services only to corporate customers. A separate control panel access for importing surplus stocks to Sokarti is only granted to corporate customers who are a limited or corporation company with commercial activity. Our non-commercial members can register for basic membership which does not include the access to control panel. If you are a non-commercial member, please contact us for your surplus stock listing demands and vendor account operations.",
      border: true,
    },
  },
];

const HowToBeASeller = () => {
  return (
    <section className="pagePadding">
      <PageTitle title="How to be a seller" />

      <PageBanner image={bannerImg} title="How to be a seller" />

      <div className="container mt-8 lg:mt-12">
        <MainCardList data={data} border />
      </div>
    </section>
  );
};

export default HowToBeASeller;
