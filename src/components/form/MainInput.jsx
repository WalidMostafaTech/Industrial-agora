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
  ...rest
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";
  const inputType = isPassword ? (showPassword ? "text" : "password") : type;

  const commonInputClasses = `w-full text-sm bg-white outline-none border-none p-2 rounded-md ring-1 transition-all ${
    isPassword && "pe-10"
  } ${
    error
      ? "ring-red-700 ring-2"
      : "ring-gray-400 focus-within:ring-myBlue-2 focus-within:ring-2"
  } ${disabled ? "opacity-60 cursor-not-allowed bg-gray-100" : ""}`;

  const commonLabel = label && (
    <label
      htmlFor={id}
      className="block w-fit font-semibold mb-1 text-sm capitalize"
    >
      {label} :
    </label>
  );

  const commonError = error && (
    <p className="mt-2 flex items-center gap-1 text-xs text-red-700">{error}</p>
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
          {...rest}
        />
        {commonError}
      </div>
    );
  }

  if (type === "select") {
    return (
      <div>
        {commonLabel}
        <select
          id={id}
          name={id}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          disabled={disabled}
          className={`select select-ghost select-md outline-none! ${commonInputClasses}`}
          {...rest}
        >
          {placeholder && <option value="">{placeholder}</option>}
          {options.map((option, idx) => (
            <option key={`${option.value}-${idx}`} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
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
          {...rest}
        />

        {isPassword && (
          <span
            onClick={() => !disabled && setShowPassword(!showPassword)}
            className={`text-neutral-500 cursor-pointer absolute top-1/2 -translate-y-1/2 end-2 text-xl ${
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
