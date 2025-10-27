import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Autoplay } from "swiper/modules";
import { useState, useRef } from "react";
import "swiper/css";
import "swiper/css/effect-fade";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";
import { useQuery } from "@tanstack/react-query";
import { getSliders } from "../../../services/homeServices";
import { Link } from "react-router-dom";
import EmptySection from "../../../components/sections/EmptySection";
import LoadingSection from "../../../components/Loading/LoadingSection";

export default function HeroSection() {
  const [realIndex, setRealIndex] = useState(0);
  const swiperRef = useRef(null);

  const {
    data: sliders,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["sliders"],
    queryFn: getSliders,
  });

  if (isLoading) return <LoadingSection />;

  if (isError || !sliders) return <EmptySection />;

  return (
    <section className="relative w-full h-[80vh]">
      <Swiper
        slidesPerView={1}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        modules={[EffectFade, Autoplay]}
        loop={true}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        onSlideChange={(swiper) => setRealIndex(swiper.realIndex)}
        className="h-full"
      >
        {sliders?.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="h-full relative content-end">
              <picture className="absolute inset-0 z-[-1] w-full h-full">
                <source
                  media="(max-width: 767px)"
                  srcSet={slide.mobile_image}
                />
                <img
                  src={slide.desktop_image}
                  alt={slide.title}
                  className="w-full h-full object-cover"
                />
              </picture>
              {/* Dark Overlay */}
              <div className="absolute inset-0 bg-black/50" />

              <div className="container relative z-10 flex items-end">
                {/* Vertical Progress Line */}
                <div className="relative min-w-1.5 h-[300px] lg:min-h-[500px] bg-white overflow-hidden">
                  <div
                    className="absolute top-0 left-0 w-full bg-myBlue-2 transition-all duration-500"
                    style={{
                      height: `${((realIndex + 1) / sliders?.length) * 100}%`,
                    }}
                  />
                </div>

                <div className="p-6 lg:p-12 pe-0 space-y-6 lg:space-y-12">
                  <h1 className="text-white text-3xl lg:text-6xl font-bold leading-tight max-w-4xl">
                    {slide.title}
                  </h1>
                  <p className="text-gray-200 text-xl max-w-2xl">
                    {slide.paragraph}
                  </p>

                  <div className="flex gap-4 lg:gap-8">
                    {slide.buttons.map((btn, index) => (
                      <Link
                        to={btn.url}
                        key={index}
                        className="animationBtn !text-white"
                      >
                        {btn.text}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Prev Button */}
      <button
        onClick={() => swiperRef.current?.slidePrev()}
        className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 w-16 h-16 items-center justify-center bg-white/50
      rounded-xl hover:bg-white/70 transition z-10 cursor-pointer"
      >
        <LuChevronLeft className="text-myBlue-2 text-4xl" />
      </button>

      {/* Next Button */}
      <button
        onClick={() => swiperRef.current?.slideNext()}
        className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 w-16 h-16 items-center justify-center bg-white/50
      rounded-xl hover:bg-white/70 transition z-10 cursor-pointer"
      >
        <LuChevronRight className="text-myBlue-2 text-4xl" />
      </button>
    </section>
  );
}
