import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import bgImg from "../../../assets/images/logo/logo-map.png";
import LoadingSection from "../../../components/Loading/LoadingSection";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useState } from "react"; 
import { useSelector } from "react-redux";

const MainCategories = () => {
  const { categories, loading, error } = useSelector(
    (state) => state.categories
  );

  // ✅ الحالة اللي بتتحكم في تعطيل الأزرار
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  const filterCategories = categories?.filter((cat) => cat.home);

  if (loading) return <LoadingSection />;
  if (error || !categories) return null;

  return (
    <section
      className="sectionPadding relative"
      style={{
        backgroundImage: `url(${bgImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-stone-500/70"></div>

      <div className="container relative z-10">
        {/* أزرار التقليب */}
        <div className="flex justify-end mb-4 gap-3">
          <button
            className={`swiper-button-prev-custom-main-category bg-white p-4 rounded-full shadow transition cursor-pointer ${
              isBeginning
                ? "opacity-40 cursor-not-allowed"
                : "hover:bg-myGreen hover:text-white"
            }`}
            disabled={isBeginning}
          >
            <FaChevronLeft />
          </button>
          <button
            className={`swiper-button-next-custom-main-category bg-white p-4 rounded-full shadow transition cursor-pointer ${
              isEnd
                ? "opacity-40 cursor-not-allowed"
                : "hover:bg-myGreen hover:text-white"
            }`}
            disabled={isEnd}
          >
            <FaChevronRight />
          </button>
        </div>

        <Swiper
          modules={[Navigation]}
          spaceBetween={20}
          slidesPerView={1}
          navigation={{
            nextEl: ".swiper-button-next-custom-main-category",
            prevEl: ".swiper-button-prev-custom-main-category",
          }}
          breakpoints={{
            1024: { slidesPerView: 2 },
            1280: { slidesPerView: 3 },
          }}
          // ✅ هنا التحديث
          onInit={(swiper) => {
            setIsBeginning(swiper.isBeginning);
            setIsEnd(swiper.isEnd);
          }}
          onSlideChange={(swiper) => {
            setIsBeginning(swiper.isBeginning);
            setIsEnd(swiper.isEnd);
          }}
        >
          {filterCategories?.map((item) => (
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
                <Link to={`/categories/${item.id}`} className="animationBtn">
                  see more
                </Link>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default MainCategories;
