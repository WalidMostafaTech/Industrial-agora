import { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

const MainInput = ({
  label,
  icon,
  type = "text",
  options = [],
  error,
  id,
  value,
  onChange,
  onBlur,
  placeholder,
  disabled = false,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";
  const inputType = isPassword ? (showPassword ? "text" : "password") : type;

  const commonInputClasses = `w-full lg:text-lg bg-white outline-none border-none p-3 rounded-md ring-1 transition-all ${
    isPassword && "pe-10"
  } ${error ? "ring-red-600" : "ring-gray-400 focus-within:ring-myBlue-2"} ${
    disabled ? "opacity-60 cursor-not-allowed bg-gray-100" : ""
  }`;

  const commonLabel = label && (
    <label
      htmlFor={id}
      className="block w-fit font-semibold mb-2 text-sm lg:text-base capitalize"
    >
      {label} :
    </label>
  );

  const commonError = error && (
    <p className="mt-2 flex items-center gap-1 text-sm text-red-600">{error}</p>
  );

  if (type === "textarea") {
    return (
      <div>
        {commonLabel}
        <textarea
          id={id}
          name={id}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          disabled={disabled}
          className={`${commonInputClasses} h-32 resize-none`}
        />
        {commonError}
      </div>
    );
  }

  if (type === "select") {
    return (
      <div>
        {commonLabel}
        <div className="relative">
          {icon && (
            <span className="text-neutral-500 absolute top-1/2 -translate-y-1/2 start-2 pointer-events-none text-2xl">
              {icon}
            </span>
          )}
          <select
            id={id}
            name={id}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            disabled={disabled}
            className={commonInputClasses}
          >
            {options.map((option, idx) => (
              <option key={`${option.value}-${idx}`} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        {commonError}
      </div>
    );
  }

  return (
    <div>
      {commonLabel}
      <div className="relative">
        {icon && (
          <span className="text-neutral-500 absolute top-1/2 -translate-y-1/2 start-2 pointer-events-none text-2xl">
            {icon}
          </span>
        )}

        <input
          id={id}
          name={id}
          type={inputType}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          disabled={disabled}
          className={commonInputClasses}
        />

        {isPassword && (
          <span
            onClick={() => !disabled && setShowPassword(!showPassword)}
            className={`text-neutral-500 cursor-pointer absolute top-1/2 -translate-y-1/2 end-2 text-2xl ${
              disabled ? "opacity-40 cursor-not-allowed" : ""
            }`}
          >
            {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
          </span>
        )}
      </div>
      {commonError}
    </div>
  );
};

export default MainInput;
