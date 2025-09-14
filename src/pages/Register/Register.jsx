import { useState } from "react";
import PageTitle from "../../components/common/PageTitle";
import FormBtn from "../../components/form/FormBtn";
import FormTitle from "../../components/form/FormTitle";
import MainInput from "../../components/form/MainInput";
import { Link } from "react-router-dom";

const Register = () => {
  const [completeRegister, setCompleteRegister] = useState(true);
  return (
    <section className="container pagePadding">
      <PageTitle title="Register" />

      {completeRegister ? (
        <div className="flex flex-col items-center justify-center gap-8 lg:gap-12 min-h-80">
          <p className="text-center text-gray-500 lg:text-lg">
            Your registration has been completed successfully
          </p>

          <Link to="/" className="animationBtn">
            Continue
          </Link>
        </div>
      ) : (
        <form className="whiteContainer space-y-6 max-w-3xl mx-auto">
          <FormTitle
            title="Account Login"
            subtitle="If you are already a member you can login with your email address and password."
          />

          <MainInput label="full name" id="full_name" />

          <MainInput label="Email Address" id="email" type="email" />

          <MainInput
            label="company name"
            id="company_name"
            type="select"
            options={[
              { value: "", label: "select company" },
              { value: "company 1", label: "company 1" },
              { value: "company 2", label: "company 2" },
              { value: "company 3", label: "company 3" },
            ]}
          />

          <MainInput
            label="city"
            id="city"
            type="select"
            options={[
              { value: "", label: "select city" },
              { value: "city 1", label: "city 1" },
              { value: "city 2", label: "city 2" },
              { value: "city 3", label: "city 3" },
            ]}
          />

          <MainInput label="phone" id="phone" type="number" />

          <MainInput label="tax number" id="tax_number" type="number" />

          <MainInput label="Password" id="password" type="password" />

          <MainInput
            label="confirm Password"
            id="confirm_password"
            type="password"
          />

          <div className="flex items-center">
            <input
              id="privacy_policy"
              name="privacy_policy"
              type="checkbox"
              className="h-4 w-4 text-myBlue-1 focus:ring-myBlue-1 border-gray-300 rounded"
            />
            <label
              htmlFor="privacy_policy"
              className="ms-2 block text-gray-600"
            >
              accept privacy policy
            </label>
          </div>

          <FormBtn title="Register" />
        </form>
      )}
    </section>
  );
};

export default Register;
