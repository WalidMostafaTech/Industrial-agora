import { useState } from "react";
import PageTitle from "../../components/common/PageTitle";
import CheckEmail from "./sections/CheckEmail";
import OTP from "./sections/OTP";
import ResetPassword from "./sections/ResetPassword";
import FormTitle from "../../components/form/FormTitle";
import StepProgress from "../../components/common/StepProgress";

const ForgotPassword = () => {
  const steps = [
    {
      title: "Check Email",
      subtitle: "We have sent a password reset link to your email address.",
    },
    {
      title: "Enter OTP",
      subtitle: "We have sent a One-Time Password (OTP) to your email address.",
    },
    {
      title: "Reset Password",
      subtitle: "Please enter your new password below.",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prev) => prev + 1);
  };

  return (
    <section className="pagePadding container">
      <PageTitle title="Forgot Password" />

      <div className="whiteContainer w-full max-w-xl mx-auto mb-4">
        <StepProgress steps={steps} currentIndex={currentIndex} />
      </div>

      <div className="whiteContainer space-y-6 w-full max-w-xl mx-auto">
        <FormTitle
          title={`Step ${currentIndex + 1}: ${steps[currentIndex].title}`}
          subtitle={steps[currentIndex].subtitle}
        />

        {currentIndex === 0 && <CheckEmail goNext={handleNext} />}
        {currentIndex === 1 && <OTP goNext={handleNext} />}
        {currentIndex === 2 && <ResetPassword />}
      </div>
    </section>
  );
};

export default ForgotPassword;
