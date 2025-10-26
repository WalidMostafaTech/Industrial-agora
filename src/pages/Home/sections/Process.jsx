import { useQuery } from "@tanstack/react-query";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { Link } from "react-router-dom";
import LoadingSection from "../../../components/Loading/LoadingSection";
import EmptySection from "../../../components/sections/EmptySection";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useState } from "react";
import "swiper/css";
import "swiper/css/navigation";
import { getProductsByType } from "../../../services/productServices";

const Process = () => {
  const {
    data: products,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["products", "process"],
    queryFn: getProductsByType({ type: "outsource" }),
  });

  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  if (isLoading) return <LoadingSection />;

  if (isError || !products) return null;

  return (
    <section className="sectionPadding bg-myBlue-1">
      <h2 className="text-white text-3xl lg:text-5xl font-bold text-center mb-6 lg:mb-10">
        Why Join Industrial Agora
      </h2>

      <div className="container relative">
        {/* ✅ أزرار التقليب */}
        <div className="flex justify-end mb-4 gap-3">
          <button
            className={`swiper-button-prev-custom-process bg-white p-4 rounded-full shadow transition cursor-pointer ${
              isBeginning
                ? "opacity-40 cursor-not-allowed"
                : "hover:bg-myGreen hover:text-white"
            }`}
            disabled={isBeginning}
          >
            <FaChevronLeft />
          </button>
          <button
            className={`swiper-button-next-custom-process bg-white p-4 rounded-full shadow transition cursor-pointer ${
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
          modules={[Navigation]}
          spaceBetween={20}
          slidesPerView={1}
          navigation={{
            nextEl: ".swiper-button-next-custom-process",
            prevEl: ".swiper-button-prev-custom-process",
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
          {products?.map((item) => (
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

export default Process;
