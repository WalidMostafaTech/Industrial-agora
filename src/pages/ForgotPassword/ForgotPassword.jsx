import { useState } from "react";
import PageTitle from "../../components/common/PageTitle";
import CheckEmail from "./sections/CheckEmail";
import OTP from "./sections/OTP";
import ResetPassword from "./sections/ResetPassword";

const ForgotPassword = () => {
  const [steps, setSteps] = useState(1);

  const handleNext = () => {
    setSteps((prev) => prev + 1);
  };
  return (
    <section className="pagePadding container">
      <PageTitle title="Forgot Password" />

      <div className="whiteContainer space-y-6 w-full max-w-xl mx-auto">
        {steps === 1 && <CheckEmail goNext={handleNext} />}
        {steps === 2 && <OTP goNext={handleNext} />}
        {steps === 3 && <ResetPassword />}
      </div>
    </section>
  );
};

export default ForgotPassword;
