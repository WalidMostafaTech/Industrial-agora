import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import * as yup from "yup";
import { useTranslation } from "react-i18next";
import { registerUser } from "../../services/authServices";

import PageTitle from "../../components/common/PageTitle";
import FormBtn from "../../components/form/FormBtn";
import FormTitle from "../../components/form/FormTitle";
import MainInput from "../../components/form/MainInput";
import FormError from "../../components/form/FormError";
import SuccessModal from "../../components/modals/SuccessModal";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProfileAct } from "../../store/profile/profileSlice";

const Register = () => {
  const { t } = useTranslation(); // ✅ i18n
  const [completeRegister, setCompleteRegister] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cities } = useSelector((state) => state.setting);

  const handleCompleteLogin = () => {
    navigate("/subscription-details", { replace: true });
    dispatch(getProfileAct());
  };

  // ✅ Validation Schema with i18n messages
  const schema = yup.object({
    name: yup.string().required(t("register.fullNameRequired")),
    email: yup
      .string()
      .email(t("register.invalidEmail"))
      .required(t("register.emailRequired")),
    company_name: yup.string().required(t("register.companyRequired")),
    city: yup.string().required(t("register.cityRequired")),
    phone: yup
      .string()
      .matches(/^[0-9]+$/, t("register.phoneNumbersOnly"))
      .required(t("register.phoneRequired")),
    tax_number: yup.string().required(t("register.taxRequired")),
    password: yup
      .string()
      .min(6, t("register.passwordMin"))
      .required(t("register.passwordRequired")),
    password_confirmation: yup
      .string()
      .oneOf([yup.ref("password")], t("register.passwordsMustMatch"))
      .required(t("register.confirmPasswordRequired")),
    privacy_policy: yup.bool().oneOf([true], t("register.acceptPrivacyPolicy")),
  });

  // ✅ React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  // ✅ React Query Mutation
  const { mutate, isPending, error } = useMutation({
    mutationFn: registerUser,
    onSuccess: () => {
      setCompleteRegister(true);
      reset();
    },
    onError: (err) => {
      console.error("❌ Register failed:", err);
    },
  });

  const onSubmit = (data) => {
    mutate(data);
  };

  return (
    <section className="container pagePadding">
      <PageTitle title={t("register.register")} />

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="whiteContainer space-y-6 max-w-xl mx-auto"
      >
        <FormTitle
          title={t("register.accountSignup")}
          subtitle={t("register.accountSignupSubtitle")}
        />

        <MainInput
          label={t("register.fullName")}
          id="name"
          {...register("name")}
          error={errors.name?.message}
        />

        <MainInput
          label={t("register.email")}
          id="email"
          {...register("email")}
          error={errors.email?.message}
        />

        <MainInput
          label={t("register.companyName")}
          id="company_name"
          {...register("company_name")}
          error={errors.company_name?.message}
        />

        <MainInput
          label={t("register.city")}
          id="city"
          type="select"
          options={[
            { value: "", label: t("register.selectCity") },
            ...cities.map((city) => ({ value: city.id, label: city.name })),
          ]}
          {...register("city")}
          error={errors.city?.message}
        />

        <MainInput
          label={t("register.phone")}
          id="phone"
          type="number"
          {...register("phone")}
          error={errors.phone?.message}
        />

        <MainInput
          label={t("register.taxNumber")}
          id="tax_number"
          type="number"
          {...register("tax_number")}
          error={errors.tax_number?.message}
        />

        <MainInput
          label={t("register.password")}
          id="password"
          type="password"
          {...register("password")}
          error={errors.password?.message}
        />

        <MainInput
          label={t("register.confirmPassword")}
          id="password_confirmation"
          type="password"
          {...register("password_confirmation")}
          error={errors.password_confirmation?.message}
        />

        <div>
          <div className="flex items-center">
            <input
              id="privacy_policy"
              type="checkbox"
              {...register("privacy_policy")}
              className="h-4 w-4 text-myBlue-1 focus:ring-myBlue-1 border-gray-300 rounded"
            />
            <label
              htmlFor="privacy_policy"
              className="ms-2 block text-gray-600 text-sm"
            >
              {t("register.acceptPrivacyPolicy")}
            </label>
          </div>
          {errors.privacy_policy?.message && (
            <p className="text-red-700 text-sm">
              {errors.privacy_policy?.message}
            </p>
          )}
        </div>

        <FormError errorMsg={error?.response?.data?.message} />

        <FormBtn loading={isPending} title={t("register.register")} />
      </form>

      <SuccessModal
        openModal={completeRegister}
        onClose={handleCompleteLogin}
        onConfirm={handleCompleteLogin}
        btnText={t("register.continue")}
        msg={t("register.registrationSuccess")}
      />
    </section>
  );
};

export default Register;
