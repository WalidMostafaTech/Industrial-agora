import { useQuery } from "@tanstack/react-query";
import { getMainCategories } from "../../../services/homeServices";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import LoadingSection from "../../../components/Loading/LoadingSection";
import EmptySection from "../../../components/sections/EmptySection";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useState } from "react";
import "swiper/css";
import "swiper/css/navigation";

const ProcessOutSourceSlider = () => {
  const {
    data: categories,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: getMainCategories,
  });

  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  if (isLoading) return <LoadingSection />;
  if (isError || !categories) return <EmptySection />;

  return (
    <section className="sectionPadding">
      <div className="container">
        {/* ✅ أزرار التقليب */}
        <div className="flex justify-end mb-4 gap-3">
          <button
            className={`swiper-button-prev-custom-outsource bg-white p-4 rounded-full shadow transition cursor-pointer ${
              isBeginning
                ? "opacity-40 cursor-not-allowed"
                : "hover:bg-myGreen hover:text-white"
            }`}
            disabled={isBeginning}
          >
            <FaChevronLeft />
          </button>
          <button
            className={`swiper-button-next-custom-outsource bg-white p-4 rounded-full shadow transition cursor-pointer ${
              isEnd
                ? "opacity-40 cursor-not-allowed"
                : "hover:bg-myGreen hover:text-white"
            }`}
            disabled={isEnd}
          >
            <FaChevronRight />
          </button>
        </div>

        {/* ✅ السلايدر */}
        <Swiper
          key={categories?.length || 0}
          modules={[Navigation]}
          spaceBetween={20}
          slidesPerView={1}
          navigation={{
            nextEl: ".swiper-button-next-custom-outsource",
            prevEl: ".swiper-button-prev-custom-outsource",
          }}
          breakpoints={{
            1024: { slidesPerView: 2 },
            1280: { slidesPerView: 3 },
          }}
          onInit={(swiper) => {
            setIsBeginning(swiper.isBeginning);
            setIsEnd(swiper.isEnd);
          }}
          onSlideChange={(swiper) => {
            setIsBeginning(swiper.isBeginning);
            setIsEnd(swiper.isEnd);
          }}
        >
          {categories?.map((item) => (
            <SwiperSlide key={item.id}>
              <div className="relative w-full h-64 lg:h-80 rounded-2xl overflow-hidden shadow-xl">
                {/* الصورة */}
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />

                {/* الأوفرلاي */}
                <div className="absolute inset-0 bg-black/40"></div>

                {/* النصوص */}
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-xl md:text-2xl font-bold mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm md:text-base leading-relaxed">
                    {item.paragraph}
                  </p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default ProcessOutSourceSlider;
