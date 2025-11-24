import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import PageTitle from "../../components/common/PageTitle";
import FormTitle from "../../components/form/FormTitle";
import FormBtn from "../../components/form/FormBtn";
import MainInput from "../../components/form/MainInput";
import { loginUser } from "../../services/authServices";
import FormError from "../../components/form/FormError";
import { getProfileAct } from "../../store/profile/profileSlice";
import SuccessModal from "../../components/modals/SuccessModal";

// Validation Schema
const Login = () => {
  const { t } = useTranslation();
  const [completeRegister, setCompleteRegister] = useState(false);

  const schema = yup.object({
    email: yup
      .string()
      .email(t("login.emailValid"))
      .required(t("login.emailRequired")),
    password: yup
      .string()
      .min(6, t("login.passMin"))
      .required(t("login.passRequired")),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleCompleteLogin = () => {
    navigate("/", { replace: true });
    dispatch(getProfileAct());
  };

  // Mutation for login API
  const { mutate, isPending, error } = useMutation({
    mutationFn: loginUser,
    onSuccess: () => setCompleteRegister(true),
    onError: (err) => console.error("❌ Login Failed:", err),
  });

  const onSubmit = (formData) => mutate(formData);

  return (
    <section className="container pagePadding">
      <PageTitle title={t("login.welcome")} />

      <section className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Login Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="whiteContainer space-y-6 order-1 lg:order-2"
        >
          <FormTitle
            title={t("login.accountLogin")}
            subtitle={t("login.accountSubtitle")}
          />

          <MainInput
            label={t("login.email")}
            id="email"
            {...register("email")}
            error={errors.email?.message}
          />

          <MainInput
            label={t("login.password")}
            id="password"
            type="password"
            {...register("password")}
            error={errors.password?.message}
          />

          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center">
              <input
                id="remember_me"
                name="remember_me"
                type="checkbox"
                className="h-4 w-4 text-myBlue-1 focus:ring-myBlue-1 border-gray-300 rounded"
              />
              <label htmlFor="remember_me" className="ms-2 block text-gray-600">
                {t("login.remember")}
              </label>
            </div>

            <div>
              <Link
                to="/forgot-password"
                className="font-medium text-red-700 hover:brightness-85"
              >
                {t("login.forgot")}
              </Link>
            </div>
          </div>

          <FormError errorMsg={error?.response?.data?.message} />

          <FormBtn loading={isPending} title={t("login.loginBtn")} />

          <div className="text-sm text-center">
            {t("login.noAccount")}{" "}
            <Link
              to="/register"
              className="font-medium text-myBlue-2 hover:brightness-85 hover:underline"
            >
              {t("login.signup")}
            </Link>
          </div>
        </form>

        {/* Register Section */}
        <div className="whiteContainer flex flex-col items-center justify-between order-2 lg:order-1">
          <FormTitle
            title={t("login.newMember")}
            subtitle={t("login.newMemberText")}
          />

          <Link to="/register" className="animationBtn">
            {t("login.registerBtn")}
          </Link>
        </div>
      </section>

      <SuccessModal
        openModal={completeRegister}
        onClose={handleCompleteLogin}
        onConfirm={handleCompleteLogin}
        btnText={t("login.homeBtn")}
        msg={t("login.success")}
      />
    </section>
  );
};

export default Login;
