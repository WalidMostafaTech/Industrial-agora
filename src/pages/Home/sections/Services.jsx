import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getServices } from "../../../services/homeServices";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import LoadingSection from "../../../components/Loading/LoadingSection";
import EmptySection from "../../../components/sections/EmptySection";

const Services = () => {
  const {
    data: services,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["services"],
    queryFn: getServices,
  });

  if (isLoading) return <LoadingSection />;

  if (isError || !services) return <EmptySection />;

  return (
    <section className="sectionPadding my-8 container">
      <h2 className="text-myBlue-1 text-3xl lg:text-5xl font-bold text-center mb-10 lg:mb-14">
        Why Join Industrial Agora
      </h2>
      <Swiper
        spaceBetween={20}
        slidesPerView={1}
        pagination={{ clickable: true }}
        breakpoints={{
          768: { slidesPerView: 2.5 },
          1024: { slidesPerView: 3.5 },
        }}
      >
        {services?.services?.map((item) => (
          <SwiperSlide key={item.id}>
            <div
              key={item.id}
              className="flex flex-col items-center lg:items-start gap-1 group"
            >
              <span className="h-22 overflow-hidden mb-4">
                <img
                  src={item.icon}
                  alt={item.title}
                  className="w-full h-full object-contain"
                />
              </span>

              <h3 className="text-2xl font-semibold text-myBlue-1">
                {item.title}
              </h3>
              <p className="text-gray-500">{item.paragraph}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="flex justify-center mt-10 lg:mt-14">
        <Link className="animationBtn">get started</Link>
      </div>{" "}
    </section>
  );
};

export default Services;
