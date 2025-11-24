import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useMutation } from "@tanstack/react-query";

import MainInput from "../../../components/form/MainInput";
import FormError from "../../../components/form/FormError";
import FormBtn from "../../../components/form/FormBtn";
import { sendOtp } from "../../../services/forgotPasswordServices";
import { useTranslation } from "react-i18next";

const CheckEmail = ({ goNext, setParentData }) => {
  const { t } = useTranslation();

  const schema = yup.object().shape({
    email: yup
      .string()
      .email(t("checkEmail.errors.emailInvalid"))
      .required(t("checkEmail.errors.emailRequired")),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const { mutate, isPending, error } = useMutation({
    mutationFn: (email) => sendOtp(email),
    onSuccess: (res, email) => {
      setParentData((prev) => ({ ...prev, email }));
      goNext();
    },
  });

  const onSubmit = (data) => {
    mutate(data.email);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <MainInput
        label={t("checkEmail.emailLabel")}
        id="email"
        {...register("email")}
        error={errors.email?.message}
      />

      <FormError errorMsg={error?.response?.data?.message} />

      <FormBtn title={t("checkEmail.continue")} loading={isPending} />
    </form>
  );
};

export default CheckEmail;
