import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useState } from "react";
import "swiper/css";
import "swiper/css/navigation";

const ProcessOutSourceSlider = ({ list }) => {
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  return (
    <section className="sectionPadding md:mt-[-30px]">
      <div className="container">
        {/* ✅ أزرار التقليب */}
        <div className="flex justify-end mb-4 gap-3">
          <button
            className={`swiper-button-prev-custom-outsource bg-white p-3 rounded-sm shadow transition cursor-pointer btnArrow 
              ${
                isBeginning
                  ? "opacity-40 cursor-not-allowed"
                  : "hover:bg-myBlue-2 hover:text-white"
              }
              `}
            disabled={isBeginning}
          >
            <FaChevronLeft className="rtl:rotate-180" />
          </button>
          <button
            className={`swiper-button-next-custom-outsource bg-white p-3 rounded-sm shadow transition cursor-pointer btnArrow
              ${
                isEnd
                  ? "opacity-40 cursor-not-allowed"
                  : "hover:bg-myBlue-2 hover:text-white"
              }
              `}
            disabled={isEnd}
          >
            <FaChevronRight className="rtl:rotate-180" />
          </button>
        </div>

        {/* ✅ السلايدر */}
        <Swiper
          key={list?.length || 0}
          modules={[Navigation]}
          spaceBetween={5}
          slidesPerView={1}
          navigation={{
            nextEl: ".swiper-button-next-custom-outsource",
            prevEl: ".swiper-button-prev-custom-outsource",
          }}
          breakpoints={{
            1024: { slidesPerView: 2 },
            1280: { slidesPerView: 2.75 },
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
          {list?.map((item) => (
            <SwiperSlide key={item.id}>
              <div className="p-2">
                <div className="relative w-full h-64 lg:h-90 rounded-md overflow-hidden shadow-[9px_2px_8px_#01377D7A]">
                  {/* الصورة */}
                  <img
                    loading="lazy"
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />

                  {/* الأوفرلاي */}
                  <div className="absolute inset-0 bg-black/50"></div>

                  {/* النصوص */}
                  <div
                    className="
                absolute top-1/2 transform -translate-y-1/2 left-0 right-0 p-6 text-white h-full
                "
                  >
                    <div className="md:mt-32 mt-16">
                      <h3 className="text-xl md:text-2xl font-bold mb-1 ">
                        {item.title}
                      </h3>
                      <p className="text-sm md:text-base leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
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
