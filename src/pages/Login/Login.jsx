import { Link } from "react-router-dom";
import PageTitle from "../../components/common/PageTitle";
import FormTitle from "../../components/form/FormTitle";
import FormBtn from "../../components/form/FormBtn";
import MainInput from "../../components/form/MainInput";

const Login = () => {
  return (
    <section className="container pagePadding">
      <PageTitle title="Welcome, Please Sign In!" />

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <form className="whiteContainer space-y-6">
          <FormTitle
            title="Account Login"
            subtitle="If you are already a member you can login with your email address and password."
            position="start"
          />

          <MainInput
            label="Email Address"
            id="email"
            name="email"
            type="email"
          />

          <MainInput
            label="Password"
            id="password"
            name="password"
            type="password"
          />

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember_me"
                name="remember_me"
                type="checkbox"
                className="h-4 w-4 text-myBlue-1 focus:ring-myBlue-1 border-gray-300 rounded"
              />
              <label
                htmlFor="remember_me"
                className="ms-2 block text-gray-600"
              >
                Remember me
              </label>
            </div>

            <div>
              <a
                href="#"
                className="font-medium text-red-600 hover:brightness-75"
              >
                Forgot your password?
              </a>
            </div>
          </div>

          <FormBtn title="Login" />
        </form>

        <div className="whiteContainer flex flex-col items-center justify-between">
          <FormTitle
            title="New Customer"
            subtitle="Creating an account on our website allows you to have an easier and faster shopping experience, keep track of your order status, and easily view your previous purchase history."
            position="start"
          />

          <Link className="animationBtn">Register</Link>
        </div>
      </section>
    </section>
  );
};

export default Login;
