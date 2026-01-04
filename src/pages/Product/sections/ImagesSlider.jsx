import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import { useSelector } from "react-redux";

const ImagesSlider = ({ images }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const { lang } = useSelector((state) => state.language);

  return (
    <div className="relative">
      {/* ✅ السلايدر الرئيسي */}
      <Swiper
        dir={lang === "ar" ? "rtl" : "ltr"}
        loop={true}
        spaceBetween={10}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs]}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)} // ✅ تحديد الصورة الحالية
        className="rounded-2xl overflow-hidden shadow-lg"
        style={{
          "--swiper-navigation-color": "var(--color-myBlue-2)",
          "--swiper-pagination-color": "var(--color-myBlue-2)",
        }}
      >
        {images?.map((img, index) => (
          <SwiperSlide key={index}>
            <img
              loading="lazy"
              src={img}
              alt="service"
              className="w-full h-[300px] sm:h-[400px] lg:h-[300px] object-cover rounded-2xl transition-transform duration-500 hover:scale-[1.02]"
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* ✅ الصور المصغّرة */}
      {images?.length > 1 && (
        <Swiper
          dir={lang === "ar" ? "rtl" : "ltr"}
          onSwiper={setThumbsSwiper}
          loop={true}
          spaceBetween={10}
          slidesPerView={images?.length >= 4 ? 4 : images?.length}
          freeMode={true}
          watchSlidesProgress={true}
          modules={[FreeMode, Thumbs]}
          className="mt-4"
        >
          {images?.map((img, index) => (
            <SwiperSlide key={index}>
              <div
                className={`relative cursor-pointer group rounded-xl overflow-hidden transition-all duration-300 ${
                  activeIndex === index
                    ? "border-2 border-myBlue-2 opacity-100"
                    : "border-2 border-transparent opacity-70 hover:opacity-100 hover:border-myBlue-2"
                }`}
              >
                <img
                  loading="lazy"
                  src={img}
                  alt="thumbnail"
                  className="w-full h-[80px] md:h-[100px] object-cover rounded-lg"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
};

export default ImagesSlider;
