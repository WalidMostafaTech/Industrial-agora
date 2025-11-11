const PageBanner = ({ image, title, overlay = "black" }) => {
  return (
    <div
      className="w-full h-[200px] lg:h-[250px] overflow-hidden rounded-md shadow-md border border-myBlue-1 relative"
      style={{
        backgroundImage: `url(${image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div
        className={`w-full h-full content-center ${
          overlay === "black" ? "bg-black/50" : "bg-stone-400/50"
        }`}
      >
        {title && (
          <div className="container">
            <h2 className="text-2xl lg:text-3xl text-white font-bold max-w-md">
              {title}
            </h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default PageBanner;
