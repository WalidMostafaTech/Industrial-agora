const CategoryBanner = ({ image, title }) => {
  return (
    <div className="relative h-[250px] lg:h-[300px] overflow-hidden group">
      <img src={image} alt="category" className="w-full h-full object-cover" />

      {title && (
        <div className="absolute bottom-0 left-0 p-4 pe-20">
          <span
            className="absolute bg-myBlue-1 inset-0 z-0 pointer-events-none transform origin-top-left transition-transform duration-300 group-hover:scale-85"
            style={{
              clipPath: "polygon(0 0,81% 0,100% 100%,0 100%)",
            }}
          />

          <h3 className="text-2xl font-bold text-white capitalize relative z-10">
            {title}
          </h3>
        </div>
      )}
    </div>
  );
};

export default CategoryBanner;
