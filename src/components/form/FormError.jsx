const FormError = ({ errorMsg }) => {
  return (
    <div
      className={`bg-red-800 text-white text-sm text-center px-4 rounded-lg overflow-y-auto duration-300 ease-in-out ${
        !errorMsg ? "max-h-0" : "max-h-60 py-2"
      }`}
    >
      {errorMsg}
    </div>
  );
};

export default FormError;
