const FormTitle = ({ title, subtitle, position = "center" }) => {
  return (
    <hgroup
      className={`mb-4 lg:mb-10 ${
        position === "start" ? "text-start" : "text-center"
      }`}
    >
      {title && (
        <h2 className="text-xl lg:text-2xl font-bold capitalize">{title}</h2>
      )}

      {subtitle && (
        <p className="text-sm text-gray-500 mt-2 max-w-md mx-auto">
          {subtitle}
        </p>
      )}
    </hgroup>
  );
};

export default FormTitle;
