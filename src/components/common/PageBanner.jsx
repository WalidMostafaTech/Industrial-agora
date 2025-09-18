const PageBanner = ({ image, title }) => {
  return (
    <div
      className="w-full h-[200px] lg:h-[300px] overflow-hidden"
      style={{
        backgroundImage: `url(${image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="w-full h-full bg-gray-300/30 content-center">
        {title && <h2 className="container lg:text-lg text-white">{title}</h2>}
      </div>
    </div>
  );
};

export default PageBanner;
