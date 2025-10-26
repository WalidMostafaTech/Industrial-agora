import { useQuery } from "@tanstack/react-query";
import { getFeatures } from "../../../services/homeServices";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import LoadingSection from "../../../components/Loading/LoadingSection";
import EmptySection from "../../../components/sections/EmptySection";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const Features = () => {
  const {
    data: features,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["features"],
    queryFn: getFeatures,
  });

  if (isLoading) return <LoadingSection />;
  if (isError || !features) return null;

  const items = features?.features || [];
  const disableNavigation = items.length <= 3;

  return (
    <section className="sectionPadding my-8 container relative">
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-10">
        <div className="flex flex-col justify-center items-center xl:items-start gap-8">
          <h2 className="text-myBlue-1 text-3xl lg:text-5xl font-bold">
            Our Goals
          </h2>
          <Link to="/about-us" className="animationBtn w-fit hidden xl:block">
            See More
          </Link>
        </div>

        <div className="xl:col-span-3 relative">
          {/* أزرار التنقل */}
          <button
            className={`swiper-button-prev-custom-features absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white p-3 rounded-full shadow 
            hover:bg-myGreen hover:text-white transition ${
              disableNavigation
                ? "opacity-50 pointer-events-none"
                : "cursor-pointer"
            }`}
          >
            <FaChevronLeft />
          </button>
          <button
            className={`swiper-button-next-custom-features absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white p-3 rounded-full shadow 
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
              nextEl: ".swiper-button-next-custom-features",
              prevEl: ".swiper-button-prev-custom-features",
            }}
            breakpoints={{
              768: { slidesPerView: 2.5 },
              1024: { slidesPerView: 3.5 },
            }}
          >
            {items.map((item) => (
              <SwiperSlide key={item.id}>
                <div className="flex flex-col items-center gap-4 text-center group">
                  <span className="h-22 overflow-hidden">
                    <img
                      src={item.icon}
                      alt={item.title}
                      className="w-full h-full object-contain"
                    />
                  </span>
                  <h3 className="text-2xl font-semibold line-clamp-1">
                    {item.title}
                  </h3>
                  <p className="text-gray-500 line-clamp-2">{item.paragraph}</p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <Link to="/about-us" className="animationBtn w-fit mx-auto xl:hidden">
          See More
        </Link>
      </div>
    </section>
  );
};

export default Features;
