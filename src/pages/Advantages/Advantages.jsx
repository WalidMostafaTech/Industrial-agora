import MainCardList from "../../components/common/MainCardList";
import PageBanner from "../../components/common/PageBanner";
import PageTitle from "../../components/common/PageTitle";
import bannerImg from "../../assets/images/slider-img.png";
import cardImg from "../../assets/images/Agreement-amico 1.png";
import IndexNumber from "../../components/common/IndexNumber";

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

const data2 = [
  {
    id: 1,
    text: "We are a home-based physical therapy platform committed to making rehabilitation easier, more personal, and more effective.",
  },
  {
    id: 2,
    text: "Our mission is to empower individuals to recover in the comfort and safety of their own homes without the hassle of clinic visits or long waits.",
  },
  {
    id: 3,
    text: "Whether you’re healing from injury, surgery, chronic pain, or mobility issues, we tailor every session to your unique needs and goals.",
  },
  {
    id: 4,
    text: "We believe recovery should be convenient, compassionate, and close, that’s why we’re redefining physical therapy, one home visit at a time.",
  },
];

const Advantages = () => {
  return (
    <section className="pagePadding">
      <PageTitle title="Advantages" />

      <PageBanner image={bannerImg} title="How to be a seller" />

      <div className="container mt-8 lg:mt-12 grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-8">
        {data2.map((item, index) => (
          <div key={item.id} className="bg-myBlue-2/30 rounded-xl p-4">
            <IndexNumber index={index + 1} />
            <p className="text-myBlue-1 text-center lg:text-lg lg:max-w-2/3 mx-auto my-8">{item.text}</p>
          </div>
        ))}
      </div>

      <div className="container mt-8 lg:mt-12">
        <MainCardList data={data} border />
      </div>
    </section>
  );
};

export default Advantages;
