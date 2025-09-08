const SectionTitle = ({ title, subTitle, position = "center" }) => {
  return (
    <hgroup
      className={`mb-4 lg:mb-10 ${
        position === "start" ? "lg:text-start" : "text-center"
      }`}
    >
      <h2 className="text-3xl lg:text-5xl font-bold">{title}</h2>
      {subTitle && (
        <p
          className={`lg:text-xl text-center mt-2 max-w-2xl ${
            position === "start" ? "lg:text-start" : "mx-auto"
          }`}
        >
          {subTitle}
        </p>
      )}
    </hgroup>
  );
};

export default SectionTitle;
