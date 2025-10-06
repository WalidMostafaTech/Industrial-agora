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
      <div className="w-full h-full bg-black/50 content-center">
        {title && (
          <div className="container">
            <h2 className="text-2xl lg:text-4xl text-white font-bold max-w-md">{title}</h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default PageBanner;
