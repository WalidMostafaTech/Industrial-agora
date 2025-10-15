const FormBtn = ({
  title = "Submit",
  disabled,
  loading,
  onClick = () => {},
  type = "submit",
  variant = "primary",
  margin = true,
}) => {
  const isDisabled = disabled || loading;
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={isDisabled}
      className={`animationBtn ${margin && "block mx-auto"} ${
        variant === "light" ? "light" : ""
      } ${isDisabled ? "!cursor-not-allowed contrast-50" : ""}`}
    >
      {loading ? (
        <>
          Loading ...
          <span className="inline-block w-4 h-4 border-2 border-myBlue-2 border-t-transparent rounded-full animate-spin ms-2"></span>
        </>
      ) : (
        title
      )}
    </button>
  );
};

export default FormBtn;
