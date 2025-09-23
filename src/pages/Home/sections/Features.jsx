import { useQuery } from "@tanstack/react-query";
import { getFeatures } from "../../../services/homeServices";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import LoadingSection from "../../../components/Loading/LoadingSection";
import EmptySection from "../../../components/sections/EmptySection";

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

  if (isError || !features) return <EmptySection />;

  return (
    <section className="sectionPadding my-8 container">
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-10">
        <div className="flex flex-col justify-center items-center xl:items-start gap-8">
          <h2 className="text-myBlue-1 text-3xl lg:text-5xl font-bold">
            Our Goals
          </h2>
          <Link className="animationBtn w-fit hidden xl:block">See More</Link>
        </div>

        <div className="xl:col-span-3">
          <Swiper
            spaceBetween={20}
            slidesPerView={1}
            pagination={{ clickable: true }}
            breakpoints={{
              768: { slidesPerView: 2.5 },
              1024: { slidesPerView: 3.5 },
            }}
          >
            {features?.features?.map((item) => (
              <SwiperSlide key={item.id}>
                <div
                  key={item.id}
                  className="flex flex-col items-center gap-4 text-center group"
                >
                  <span className="h-22 overflow-hidden">
                    <img
                      src={item.icon}
                      alt={item.title}
                      className="w-full h-full object-contain"
                    />
                  </span>

                  <h3 className="text-2xl font-semibold line-clamp-1">{item.title}</h3>
                  <p className="text-gray-500 line-clamp-2">{item.paragraph}</p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <Link className="animationBtn w-fit mx-auto xl:hidden">See More</Link>
      </div>
    </section>
  );
};

export default Features;
