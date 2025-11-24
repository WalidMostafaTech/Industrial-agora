import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import MainInput from "../../../components/form/MainInput";
import FormError from "../../../components/form/FormError";
import FormBtn from "../../../components/form/FormBtn";
import SuccessModal from "../../../components/modals/SuccessModal";
import { resetPassword } from "../../../services/forgotPasswordServices";

const ResetPassword = ({ parentData, setParentData }) => {
  const { t } = useTranslation();
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();

  // Validation Schema
  const schema = yup.object().shape({
    password: yup
      .string()
      .trim()
      .min(8, t("reset.minLength"))
      .required(t("reset.passwordRequired"))
      .matches(
        /^(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9]).*$/,
        t("reset.passwordRule")
      ),
    password_confirmation: yup
      .string()
      .trim()
      .oneOf([yup.ref("password"), null], t("reset.passwordMatch"))
      .required(t("reset.confirmRequired")),
  });

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
      setParentData((prev) => ({
        ...prev,
        password: payload.password,
        password_confirmation: payload.password_confirmation,
      }));
      setOpenModal(true);
    },
    onError: (err) => console.error("❌ Reset password error:", err),
  });

  const passwordValue = watch("password", "");

  // Password strength
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
    if (strength <= 1) return t("reset.weak");
    if (strength === 2) return t("reset.medium");
    if (strength === 3) return t("reset.strong");
    return t("reset.veryStrong");
  };

  const getGradient = () => {
    if (strength <= 1) return "bg-gradient-to-r from-red-700 to-red-700";
    if (strength === 2) return "bg-gradient-to-r from-yellow-400 to-yellow-600";
    if (strength === 3) return "bg-gradient-to-r from-blue-500 to-blue-700";
    return "bg-gradient-to-r from-green-500 to-emerald-600";
  };

  const onSubmit = (data) => {
    mutate({
      email: parentData.email,
      otp: parentData.otp,
      password: data.password,
      password_confirmation: data.password_confirmation,
    });
  };

  const displayError =
    (isError && (apiError?.response?.data?.message || t("reset.apiError"))) ||
    "";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Password */}
      <div className="space-y-2">
        <MainInput
          label={t("reset.newPassword")}
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
                  ? "text-red-700"
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

      {/* Confirm */}
      <MainInput
        label={t("reset.confirmPassword")}
        id="password_confirmation"
        type="password"
        {...register("password_confirmation")}
        error={errors.password_confirmation?.message}
      />

      <FormError errorMsg={displayError} />

      <FormBtn title={t("reset.btn")} loading={isPending} />

      <SuccessModal
        openModal={openModal}
        msg={t("reset.successMsg")}
        btnText={t("reset.goLogin")}
        onConfirm={() => navigate("/login")}
      />
    </form>
  );
};

export default ResetPassword;
