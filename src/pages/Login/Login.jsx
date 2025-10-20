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
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // ✅ Mutation: تنفيذ login API
  const { mutate, isPending, error } = useMutation({
    mutationFn: loginUser,
    onSuccess: () => {
      navigate("/", { replace: true });
      dispatch(getProfileAct());
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

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* ✅ Login Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="whiteContainer space-y-6"
        >
          <FormTitle
            title="Account Login"
            subtitle="If you are already a member you can login with your email address and password."
            position="start"
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

          <div className="flex items-center justify-between">
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
                className="font-medium text-red-600 hover:brightness-75"
              >
                Forgot your password?
              </Link>
            </div>
          </div>

          <FormError errorMsg={error?.response?.data?.message} />

          <FormBtn loading={isPending} title={"Login"} />
        </form>

        {/* ✅ Register Section */}
        <div className="whiteContainer flex flex-col items-center justify-between">
          <FormTitle
            title="New Customer"
            subtitle="Creating an account on our website allows you to have an easier and faster shopping experience, keep track of your order status, and easily view your previous purchase history."
            position="start"
          />

          <Link to="/register" className="animationBtn">
            Register
          </Link>
        </div>
      </section>
    </section>
  );
};

export default Login;
