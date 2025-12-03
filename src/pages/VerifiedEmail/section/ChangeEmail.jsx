import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";

import FormBtn from "../../../components/form/FormBtn";
import FormError from "../../../components/form/FormError";
import MainInput from "../../../components/form/MainInput";

import * as yup from "yup";
import { changeEmail } from "../../../services/verifiedEmailServices";

const changeEmailSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter a valid email")
    .required("Email is required"),
});

const ChangeEmail = ({ setStep }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(changeEmailSchema),
  });

  const { mutate, isPending, error } = useMutation({
    mutationFn: (payload) => changeEmail(payload.email),
    onSuccess: () => {
      // بعد ما الإيميل يتغير
      setStep("otp");
    },
  });

  const onSubmit = (data) => {
    mutate(data);
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
      <p className="text-lg font-bold text-center">Change your email</p>

      <MainInput
        label="New Email"
        id="email"
        placeholder="Enter your email"
        {...register("email")}
        error={errors.email?.message}
      />

      <FormError errorMsg={error?.response?.data?.message} />

      <FormBtn title={isPending ? "Loading..." : "Change"} />

      <p
        className="text-myGreen text-sm text-center font-semibold hover:underline cursor-pointer"
        onClick={() => setStep("otp")}
      >
        Back to OTP
      </p>
    </form>
  );
};

export default ChangeEmail;
