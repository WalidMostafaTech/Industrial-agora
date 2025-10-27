import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useMutation } from "@tanstack/react-query";

import MainInput from "../../../components/form/MainInput";
import FormError from "../../../components/form/FormError";
import FormBtn from "../../../components/form/FormBtn";
import { sendOtp } from "../../../services/forgotPasswordServices";

// ✅ Validation schema
const schema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter a valid email address")
    .required("Email is required"),
});

const CheckEmail = ({ goNext, setParentData }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  // ✅ Mutation to send OTP
  const { mutate, isPending, error } = useMutation({
    mutationFn: (email) => sendOtp(email),
    onSuccess: (res, email) => {
      // ✅ حفظ الإيميل من الـ input نفسه
      setParentData((prev) => ({ ...prev, email }));
      console.log("✅ OTP sent successfully:", res);
      goNext();
    },
    onError: (err) => {
      console.error("❌ Error sending OTP:", err);
    },
  });

  // ✅ Handle form submit
  const onSubmit = (data) => {
    mutate(data.email); // هنا بنمرر الإيميل للميوتشن
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <MainInput
        label="Email"
        id="email"
        {...register("email")}
        error={errors.email?.message}
      />

      {/* ✅ عرض الخطأ لو موجود */}
      <FormError errorMsg={error?.response?.data?.message} />

      <FormBtn title={"Continue"} loading={isPending} />
    </form>
  );
};

export default CheckEmail;
