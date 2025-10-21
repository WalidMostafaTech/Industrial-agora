import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import MainInput from "../../../components/form/MainInput";
import FormError from "../../../components/form/FormError";
import FormBtn from "../../../components/form/FormBtn";

// ✅ Validation Schema
const schema = yup.object().shape({
  newPassword: yup
    .string()
    .trim()
    .min(8, "New password must be at least 8 characters")
    .required("New password is required")
    .matches(
      /^(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9]).*$/,
      "Password must contain at least one uppercase letter, one number, and one special character"
    ),
  confirmPassword: yup
    .string()
    .trim()
    .oneOf([yup.ref("newPassword"), null], "Passwords must match")
    .required("Please confirm your password"),
});

const ResetPassword = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    console.log("✅ Password reset data:", data);
  };

  // ✅ متابعة كتابة الباسورد
  const passwordValue = watch("newPassword", "");

  // ✅ تقييم قوة الباسورد بناءً على 4 عوامل
  const evaluateStrength = (password) => {
    // إزالة أي مسافات داخل النص
    const cleanPassword = password.replace(/\s/g, "");

    let strength = 0;
    if (cleanPassword.length >= 8) strength++;
    if (/[A-Z]/.test(cleanPassword)) strength++;
    if (/[0-9]/.test(cleanPassword)) strength++;
    if (/[^A-Za-z0-9]/.test(cleanPassword)) strength++;
    return strength;
  };

  const strength = evaluateStrength(passwordValue);
  const strengthPercent = (strength / 4) * 100;

  // ✅ النصوص حسب القوة
  const getStrengthLabel = () => {
    if (strength <= 1) return "Weak";
    if (strength === 2) return "Medium";
    if (strength === 3) return "Strong";
    return "Very Strong";
  };

  // ✅ الألوان حسب القوة
  const getGradient = () => {
    if (strength <= 1) return "bg-gradient-to-r from-red-500 to-red-600";
    if (strength === 2) return "bg-gradient-to-r from-yellow-400 to-yellow-600";
    if (strength === 3) return "bg-gradient-to-r from-blue-500 to-blue-700";
    return "bg-gradient-to-r from-green-500 to-emerald-600";
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* ✅ New Password Field */}
      <div className="space-y-2">
        <MainInput
          label="New Password"
          id="newPassword"
          type="password"
          {...register("newPassword")}
          error={errors.newPassword?.message}
        />

        {passwordValue && (
          <div>
            <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
              <div
                className={`h-2 ${getGradient()} transition-all duration-300 rounded-full`}
                style={{ width: `${strengthPercent}%` }}
              ></div>
            </div>

            <p
              className={`mt-1 font-medium ${
                strength <= 1
                  ? "text-red-600"
                  : strength === 2
                  ? "text-yellow-600"
                  : strength === 3
                  ? "text-blue-600"
                  : "text-green-600"
              }`}
            >
              {getStrengthLabel()}
            </p>
          </div>
        )}
      </div>

      {/* ✅ Confirm Password */}
      <MainInput
        label="Confirm Password"
        id="confirmPassword"
        type="password"
        {...register("confirmPassword")}
        error={errors.confirmPassword?.message}
      />

      <FormError errorMsg={""} />

      <FormBtn title={"Reset Password"} />
    </form>
  );
};

export default ResetPassword;
