import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import img1 from "../../../assets/images/9f8ca255d19a4024444f6d08bbebff24f2a36a06.jpg";
import img2 from "../../../assets/images/d4c7a5f497685b7fcc68b1c084034c98eeabed42.jpg";
import img3 from "../../../assets/images/Rectangle 3.png";

const Section2List = [
  {
    title: "heavy equipment",
    description: "Ready-to-use industrial equipment",
    image: img1,
  },
  {
    title: "raw materials",
    description:
      "High-quality iron, plastic, metals, and raw materials for recycling.",
    image: img2,
  },
  {
    title: "spare parts",
    description:
      "Gears, motors, and industrial components that meet maintenance and operational needs.",
    image: img3,
  },
  {
    title: "heavy equipment",
    description: "Ready-to-use industrial equipment",
    image: img1,
  },
];

const Section2 = () => {
  return (
    <section className="sectionPadding bg-myBlue-1">
      <div className="container">
        <Swiper
          spaceBetween={20}
          slidesPerView={1}
          pagination={{ clickable: true }}
          breakpoints={{
            1024: { slidesPerView: 2 },
            1280: { slidesPerView: 3 },
          }}
        >
          {Section2List.map((item, index) => (
            <SwiperSlide key={index}>
              <div className="bg-white p-4 rounded-2xl flex flex-col items-center gap-4 text-center h-full">
                <div className="w-full h-52 lg:h-64 rounded-xl shadow-xl overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-2xl font-semibold">{item.title}</h3>
                <p className="text-gray-500">{item.description}</p>
                <Link className="animationBtn">see more</Link>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Section2;
