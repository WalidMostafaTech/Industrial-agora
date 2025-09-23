import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import bgImg from "../../../assets/images/logo/logo-map.png";
import { useQuery } from "@tanstack/react-query";
import { getMainCategories } from "../../../services/homeServices";
import LoadingSection from "../../../components/Loading/LoadingSection";
import EmptySection from "../../../components/sections/EmptySection";

const MainCategories = () => {
  const {
    data: categories,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: getMainCategories,
  });


  if (isLoading) return <LoadingSection />;

  if (isError || !categories) return <EmptySection />;

  return (
    <section
      className="sectionPadding relative"
      style={{
        backgroundImage: `url(${bgImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-stone-500/70"></div>
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
          {categories?.map((item) => (
            <SwiperSlide key={item.id}>
              <div className="bg-white p-4 lg:p-8 rounded-2xl flex flex-col items-center gap-4 text-center h-full">
                <div className="w-full h-52 lg:h-64 rounded-xl shadow-xl overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-2xl font-semibold">{item.title}</h3>
                <p className="text-gray-600 line-clamp-2 h-12">
                  {item.paragraph}
                </p>
                <Link className="animationBtn">see more</Link>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default MainCategories;
