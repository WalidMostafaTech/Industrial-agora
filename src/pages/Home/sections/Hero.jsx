import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Autoplay } from "swiper/modules";
import { useState, useRef } from "react";
import "swiper/css";
import "swiper/css/effect-fade";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";
import sliderImg from "../../../assets/images/slider-img.png";

const slides = [
  {
    title: "Your platform for easily buying and selling surplus inventory",
    subtitle: "We connect you with trusted suppliers and buyers in one place.",
    btn1: "Browse Products",
    btn2: "Start selling",
    img: sliderImg,
  },
  {
    title: "Find the best deals on surplus products",
    subtitle: "Save money and get quality items fast.",
    btn1: "Explore Deals",
    btn2: "Join Now",
    img: sliderImg,
  },
  {
    title: "Grow your business with our marketplace",
    subtitle: "Reach thousands of verified buyers instantly.",
    btn1: "Start Today",
    btn2: "Contact Us",
    img: sliderImg,
  },
];

export default function HeroSection() {
  const [realIndex, setRealIndex] = useState(0);
  const swiperRef = useRef(null);

  return (
    <section className="relative w-full h-[90vh]">
      <Swiper
        slidesPerView={1}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        modules={[EffectFade, Autoplay]}
        loop={true}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        onSlideChange={(swiper) => setRealIndex(swiper.realIndex)}
        className="h-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div
              className="h-full relative content-end"
              style={{
                backgroundImage: `url(${slide.img})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              {/* Dark Overlay */}
              <div className="absolute inset-0 bg-black/30"></div>

              <div className="container relative z-10 px-6 flex">
                {/* Vertical Progress Line */}
                <div className="relative min-w-1.5 h-[300px] lg:h-[400px] bg-white overflow-hidden">
                  <div
                    className="absolute top-0 left-0 w-full bg-myBlue-2 transition-all duration-500"
                    style={{
                      height: `${((realIndex + 1) / slides.length) * 100}%`,
                    }}
                  />
                </div>

                <div className="p-6 lg:p-12 pe-0 space-y-6 lg:space-y-12">
                  <h1 className="text-white text-3xl lg:text-6xl font-bold leading-tight max-w-4xl">
                    {slide.title}
                  </h1>
                  <p className="text-gray-200 text-xl max-w-2xl">
                    {slide.subtitle}
                  </p>

                  <div className="flex gap-4 lg:gap-8">
                    <button className="animationBtn !text-white">
                      {slide.btn1}
                    </button>
                    <button className="animationBtn !text-white">
                      {slide.btn2}
                    </button>
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
      hover:bg-white/50 transition z-10 cursor-pointer"
      >
        <LuChevronLeft className="text-myBlue-2 text-4xl" />
      </button>

      {/* Next Button */}
      <button
        onClick={() => swiperRef.current?.slideNext()}
        className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 w-16 h-16 items-center justify-center bg-white/50
      hover:bg-white/50 transition z-10 cursor-pointer"
      >
        <LuChevronRight className="text-myBlue-2 text-4xl" />
      </button>
    </section>
  );
}
