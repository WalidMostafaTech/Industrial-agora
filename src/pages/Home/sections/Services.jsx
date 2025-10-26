import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getServices } from "../../../services/homeServices";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import LoadingSection from "../../../components/Loading/LoadingSection";
import EmptySection from "../../../components/sections/EmptySection";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

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
  if (isError || !services) return null;

  const items = services?.services || [];
  const disableNavigation = items.length <= 3;

  return (
    <section className="sectionPadding my-8 container relative">
      <h2 className="text-myBlue-1 text-3xl lg:text-5xl font-bold text-center mb-10 lg:mb-14">
        Why Join Industrial Agora
      </h2>

      <div className="relative">
        {/* أزرار التنقل */}
        <button
          className={`swiper-button-prev-custom-services absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white p-3 rounded-full shadow 
            hover:bg-myGreen hover:text-white transition ${
              disableNavigation
                ? "opacity-50 pointer-events-none"
                : "cursor-pointer"
            }`}
        >
          <FaChevronLeft />
        </button>
        <button
          className={`swiper-button-next-custom-services absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white p-3 rounded-full shadow 
            hover:bg-myGreen hover:text-white transition ${
              disableNavigation
                ? "opacity-50 pointer-events-none"
                : "cursor-pointer"
            }`}
        >
          <FaChevronRight />
        </button>

        <Swiper
          modules={[Navigation]}
          spaceBetween={20}
          slidesPerView={1}
          navigation={{
            nextEl: ".swiper-button-next-custom-services",
            prevEl: ".swiper-button-prev-custom-services",
          }}
          breakpoints={{
            768: { slidesPerView: 2.5 },
            1024: { slidesPerView: 3.5 },
          }}
        >
          {items.map((item) => (
            <SwiperSlide key={item.id}>
              <div className="flex flex-col items-center lg:items-start gap-1 group">
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
                <p className="text-gray-500 text-center lg:text-start">{item.paragraph}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="flex justify-center mt-10 lg:mt-14">
        <Link to="/login" className="animationBtn">get started</Link>
      </div>
    </section>
  );
};

export default Services;
