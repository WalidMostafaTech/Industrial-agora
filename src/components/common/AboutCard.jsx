const AboutCard = ({ title, paragraph, image }) => {
  return (
    <div
      className={`flex items-center justify-between flex-col lg:flex-row even:lg:flex-row-reverse gap-4 lg:gap-12 not-last:border-b-2 border-myBlue-2 pb-4 lg:pb-12`}
    >
      <div className="lg:w-2/5 max-h-72 overflow-hidden">
        <img src={image} alt={title} className="w-full h-full object-cover" />
      </div>

      <div className="flex-1 space-y-2 lg:space-y-4">
        <div>
          <h3
            className={`text-xl lg:text-3xl font-bold text-myBlue-1 inline-block mt-2 min-w-1/3 lg:min-w-1/4 border-b-3 pb-1 lg:pb-2`}
          >
            {title}
          </h3>
        </div>

        <p className="text-gray-600 lg:text-lg">{paragraph}</p>
      </div>
    </div>
  );
};

export default AboutCard;
