import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import * as yup from "yup";
import { registerUser } from "../../services/authServices";

import PageTitle from "../../components/common/PageTitle";
import FormBtn from "../../components/form/FormBtn";
import FormTitle from "../../components/form/FormTitle";
import MainInput from "../../components/form/MainInput";
import FormError from "../../components/form/FormError";
import SuccessModal from "../../components/modals/SuccessModal";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getProfileAct } from "../../store/profile/profileSlice";

// ✅ Validation Schema
const schema = yup.object({
  name: yup.string().required("Full name is required"),
  email: yup
    .string()
    .email("Please enter a valid email")
    .required("Email is required"),
  company_name: yup.string().required("Please select your company"),
  city: yup.string().required("Please select your city"),
  phone: yup
    .string()
    .matches(/^[0-9]+$/, "Phone must contain only numbers")
    .required("Phone is required"),
  tax_number: yup.string().required("Tax number is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  password_confirmation: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Please confirm your password"),
  privacy_policy: yup
    .bool()
    .oneOf([true], "You must accept the privacy policy"),
});

const Register = () => {
  const [completeRegister, setCompleteRegister] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleCompleteLogin = () => {
    navigate("/subscription-packages", { replace: true });
    dispatch(getProfileAct());
  };

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
      <PageTitle title="Register" />

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="whiteContainer space-y-6 max-w-xl mx-auto"
      >
        <FormTitle
          title="Account signup"
          subtitle="Become a member and enjoy exclusive promotions."
        />

        <MainInput
          label="Full Name"
          id="name"
          {...register("name")}
          error={errors.name?.message}
        />

        <MainInput
          label="Email Address"
          id="email"
          {...register("email")}
          error={errors.email?.message}
        />

        <MainInput
          label="Company Name"
          id="company_name"
          type="select"
          options={[
            { value: "", label: "Select company" },
            { value: "company 1", label: "company 1" },
            { value: "company 2", label: "company 2" },
            { value: "company 3", label: "company 3" },
          ]}
          {...register("company_name")}
          error={errors.company_name?.message}
        />

        <MainInput
          label="City"
          id="city"
          type="select"
          options={[
            { value: "", label: "Select city" },
            { value: "city 1", label: "city 1" },
            { value: "city 2", label: "city 2" },
            { value: "city 3", label: "city 3" },
          ]}
          {...register("city")}
          error={errors.city?.message}
        />

        <MainInput
          label="Phone"
          id="phone"
          type="number"
          {...register("phone")}
          error={errors.phone?.message}
        />

        <MainInput
          label="Tax Number"
          id="tax_number"
          type="number"
          {...register("tax_number")}
          error={errors.tax_number?.message}
        />

        <MainInput
          label="Password"
          id="password"
          type="password"
          {...register("password")}
          error={errors.password?.message}
        />

        <MainInput
          label="Confirm Password"
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
              Accept privacy policy
            </label>
          </div>
          {errors.privacy_policy?.message && (
            <p className="text-red-700 text-sm">
              {errors.privacy_policy?.message}
            </p>
          )}
        </div>

        {/* ✅ Error / Success Messages */}
        <FormError errorMsg={error?.response?.data?.message} />

        <FormBtn loading={isPending} title={"Register"} />
      </form>

      <SuccessModal
        openModal={completeRegister}
        onClose={handleCompleteLogin}
        onConfirm={handleCompleteLogin}
        btnText="Continue"
        msg="Registration successful!"
      />
    </section>
  );
};

export default Register;
