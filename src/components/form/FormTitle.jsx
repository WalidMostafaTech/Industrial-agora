const FormTitle = ({ title, subtitle, position = "center" }) => {
  return (
    <hgroup
      className={`mb-4 lg:mb-10 ${
        position === "start" ? "text-start" : "text-center"
      }`}
    >
      <h2 className="text-xl lg:text-3xl font-bold capitalize">{title}</h2>
      {subtitle && <p className="lg:text-lg text-gray-500 mt-4">{subtitle}</p>}
    </hgroup>
  );
};

export default FormTitle;
