import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useMutation } from "@tanstack/react-query";

import MainInput from "../../../components/form/MainInput";
import FormError from "../../../components/form/FormError";
import FormBtn from "../../../components/form/FormBtn";
import { resetPassword } from "../../../services/forgotPasswordServices";
import { useState } from "react";
import SuccessModal from "../../../components/modals/SuccessModal";
import { useNavigate } from "react-router-dom";

// ✅ Validation Schema
const schema = yup.object().shape({
  password: yup
    .string()
    .trim()
    .min(8, "New password must be at least 8 characters")
    .required("New password is required")
    .matches(
      /^(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9]).*$/,
      "Password must contain at least one uppercase letter, one number, and one special character"
    ),
  password_confirmation: yup
    .string()
    .trim()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Please confirm your password"),
});

const ResetPassword = ({ parentData, setParentData }) => {
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const {
    mutate,
    isPending,
    isError,
    error: apiError,
  } = useMutation({
    mutationFn: (payload) => resetPassword(payload),
    onSuccess: (res, payload) => {
      console.log("✅ Password reset successful:", res);
      // لو عايز تحفظ أي داتا في الـ parentData:
      setParentData((prev) => ({
        ...prev,
        password: payload.password,
        password_confirmation: payload.password_confirmation,
      }));
      // ممكن هنا تفتح success modal أو تنتقل لصفحة الدخول
      setOpenModal(true);
    },
    onError: (err) => {
      console.error("❌ Reset password error:", err);
    },
  });

  // ✅ متابعة كتابة الباسورد
  const passwordValue = watch("password", "");

  // ✅ تقييم قوة الباسورد بناءً على 4 عوامل
  const evaluateStrength = (password) => {
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

  const getStrengthLabel = () => {
    if (strength <= 1) return "Weak";
    if (strength === 2) return "Medium";
    if (strength === 3) return "Strong";
    return "Very Strong";
  };

  const getGradient = () => {
    if (strength <= 1) return "bg-gradient-to-r from-red-500 to-red-600";
    if (strength === 2) return "bg-gradient-to-r from-yellow-400 to-yellow-600";
    if (strength === 3) return "bg-gradient-to-r from-blue-500 to-blue-700";
    return "bg-gradient-to-r from-green-500 to-emerald-600";
  };

  // ✅ عند الإرسال
  const onSubmit = (data) => {
    const payload = {
      email: parentData.email,
      otp: parentData.otp,
      password: data.password,
      password_confirmation: data.password_confirmation,
    };
    console.log("📩 Sending reset password data:", payload);
    mutate(payload);
  };

  const displayError =
    (isError &&
      (apiError?.response?.data?.message || "Failed to reset password")) ||
    "";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* ✅ New Password Field */}
      <div className="space-y-2">
        <MainInput
          label="New Password"
          id="password"
          type="password"
          {...register("password")}
          error={errors.password?.message}
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
        id="password_confirmation"
        type="password"
        {...register("password_confirmation")}
        error={errors.password_confirmation?.message}
      />

      {/* ✅ عرض خطأ الـ API إن وجد */}
      <FormError errorMsg={displayError} />

      {/* ✅ زر Reset */}
      <FormBtn title="Reset Password" loading={isPending} />

      <SuccessModal
        openModal={openModal}
        msg="Password reset successfully!"
        btnText={"Go To Login"}
        onConfirm={() => navigate("/login")}
      />
    </form>
  );
};

export default ResetPassword;
