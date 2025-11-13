import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useMutation } from "@tanstack/react-query";
import PageTitle from "../../components/common/PageTitle";
import FormTitle from "../../components/form/FormTitle";
import FormBtn from "../../components/form/FormBtn";
import MainInput from "../../components/form/MainInput";
import { loginUser } from "../../services/authServices";
import FormError from "../../components/form/FormError";
import { useDispatch } from "react-redux";
import { getProfileAct } from "../../store/profile/profileSlice";
import SuccessModal from "../../components/modals/SuccessModal";
import { useState } from "react";

// ✅ Validation Schema
const schema = yup.object({
  email: yup
    .string()
    .email("Please enter a valid email address")
    .required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const Login = () => {
  const [completeRegister, setCompleteRegister] = useState(false);

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

  // ✅ Mutation: تنفيذ login API
  const { mutate, isPending, error } = useMutation({
    mutationFn: loginUser,
    onSuccess: () => {
      setCompleteRegister(true);
    },
    onError: (err) => {
      console.error("❌ Login Failed:", err);
    },
  });

  const onSubmit = (formData) => {
    console.log("Form submitted:", formData);

    mutate(formData);
  };

  return (
    <section className="container pagePadding">
      <PageTitle title="Welcome, Please Sign In!" />

      <section className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* ✅ Login Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="whiteContainer space-y-6 order-1 lg:order-2"
        >
          <FormTitle
            title="Account Login"
            subtitle="If you are already a member you can login with your email address and password."
          />

          <MainInput
            label="Email Address"
            id="email"
            {...register("email")}
            error={errors.email?.message}
          />

          <MainInput
            label="Password"
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
                Remember me
              </label>
            </div>

            <div>
              <Link
                to="/forgot-password"
                className="font-medium text-red-700 hover:brightness-75"
              >
                Forgot your password?
              </Link>
            </div>
          </div>

          <FormError errorMsg={error?.response?.data?.message} />

          <FormBtn loading={isPending} title={"Login"} />

          <div className="text-sm text-center">
            Don&apos;t have an account?{" "}
            <Link
              to="/register"
              className="font-medium text-myBlue-2 hover:brightness-75 hover:underline"
            >
              Sign up here
            </Link>
          </div>
        </form>

        {/* ✅ Register Section */}
        <div className="whiteContainer flex flex-col items-center justify-between order-2 lg:order-1">
          <FormTitle
            title="New Member"
            subtitle="Creating an account on our website allows you to have an easier and faster shopping experience, keep track of your order status, and easily view your previous purchase history."
          />

          <Link to="/register" className="animationBtn">
            Register
          </Link>
        </div>
      </section>

      <SuccessModal
        openModal={completeRegister}
        onClose={handleCompleteLogin}
        onConfirm={handleCompleteLogin}
        btnText="Home"
        msg="You Signed In Successfully!"
      />
    </section>
  );
};

export default Login;
