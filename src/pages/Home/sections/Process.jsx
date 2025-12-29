import { useQuery } from "@tanstack/react-query";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { Link } from "react-router-dom";
import LoadingSection from "../../../components/Loading/LoadingSection";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useState } from "react";
import "swiper/css";
import "swiper/css/navigation";
import { getProductsByType } from "../../../services/productServices";
import { useTranslation } from "react-i18next";

const Process = () => {
  const { t } = useTranslation();
  const {
    data: products,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["products", "process"],
    queryFn: () => getProductsByType({ type: "outsource" }),
  });

  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  if (isLoading) return <LoadingSection />;

  if (isError || !products || products.length === 0) return null;

  return (
    <section className="sectionPadding bg-myBlue-1">
      <h2 className="text-white text-3xl lg:text-4xl font-bold text-center mb-10">
        {t("processOutsource")}
      </h2>

      <div className="container relative">
        {products?.length > 3 && (
          <div className="flex justify-end mb-4 gap-3">
            <button
              className={`swiper-button-prev-custom-process bg-white p-2 rounded-md border border-gray-300 shadow transition cursor-pointer ${
                isBeginning
                  ? "opacity-40 cursor-not-allowed"
                  : "hover:brightness-85"
              }`}
              disabled={isBeginning}
            >
              <FaChevronLeft />
            </button>
            <button
              className={`swiper-button-next-custom-process bg-white p-2 rounded-md border border-gray-300 shadow transition cursor-pointer ${
                isEnd ? "opacity-40 cursor-not-allowed" : "hover:brightness-85"
              }`}
              disabled={isEnd}
            >
              <FaChevronRight />
            </button>
          </div>
        )}

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
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1280: { slidesPerView: products?.length > 3 ? 4 : 3 },
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
              <div className="bg-white p-4 lg:p-6 rounded-2xl flex flex-col items-center gap-2 text-center h-full">
                <div className="w-full h-52 xl:h-64 rounded-xl shadow-xl overflow-hidden mb-4">
                  <img
                    loading="lazy"
                    src={item.first_image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-lg font-bold text-myBlue-1">{item.name}</h3>
                <p className="text-gray-600 text-sm line-clamp-2 h-11">
                  {item.description}
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="flex justify-center mt-10 lg:mt-14">
        <Link
          to="process-outsource/products"
          className="animationBtn light w-fit"
        >
          {t("seeMore")}
        </Link>
      </div>
    </section>
  );
};

export default Process;
