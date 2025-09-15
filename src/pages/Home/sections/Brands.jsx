import Marquee from "react-fast-marquee";
import brandImg1 from "../../../assets/images/brand-img1.png";
import brandImg2 from "../../../assets/images/brand-img2.png";
import brandImg3 from "../../../assets/images/brand-img3.png";

const Brands = () => {
  const brandsList = [
    { image_url: brandImg1 },
    { image_url: brandImg2 },
    { image_url: brandImg3 },
    { image_url: brandImg1 },
    { image_url: brandImg2 },
    { image_url: brandImg3 },
    { image_url: brandImg1 },
    { image_url: brandImg2 },
    { image_url: brandImg3 },
    { image_url: brandImg1 },
    { image_url: brandImg2 },
    { image_url: brandImg3 },
  ];
  return (
    <section className="sectionPadding my-8">
      <h2 className="text-4xl lg:text-5xl text-myBlue-1 text-center font-bold mb-10 lg:mb-14">
        Our Brands
      </h2>
      <Marquee speed={200} gradient={false}>
        {brandsList.map((item, index) => (
          <img
            key={index}
            src={item.image_url}
            alt={`brand-${index}`}
            style={{ transform: "rotateY(6deg)" }}
            className="w-40 lg:w-52 mx-4 lg:mx-10"
          />
        ))}
      </Marquee>
    </section>
  );
};

export default Brands;
