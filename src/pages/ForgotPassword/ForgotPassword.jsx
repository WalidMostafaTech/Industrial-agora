import { useState } from "react";
import { useTranslation } from "react-i18next";

import PageTitle from "../../components/common/PageTitle";
import CheckEmail from "./sections/CheckEmail";
import OTP from "./sections/OTP";
import ResetPassword from "./sections/ResetPassword";
import FormTitle from "../../components/form/FormTitle";
import StepProgress from "../../components/common/StepProgress";

const ForgotPassword = () => {
  const { t } = useTranslation();

  // 🔹 Steps translated using i18n
  const steps = [
    {
      title: t("forgotPassword.steps.checkEmail.title"),
      subtitle: t("forgotPassword.steps.checkEmail.subtitle"),
    },
    {
      title: t("forgotPassword.steps.otp.title"),
      subtitle: t("forgotPassword.steps.otp.subtitle"),
    },
    {
      title: t("forgotPassword.steps.resetPassword.title"),
      subtitle: t("forgotPassword.steps.resetPassword.subtitle"),
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [parentData, setParentData] = useState({
    email: "",
    otp: "",
    password: "",
  });

  const handleNext = () => {
    setCurrentIndex((prev) => prev + 1);
  };

  return (
    <section className="pagePadding container">
      <PageTitle title={t("forgotPassword.pageTitle")} />

      <div className="whiteContainer w-full max-w-xl mx-auto mb-4">
        <StepProgress steps={steps} currentIndex={currentIndex} />
      </div>

      <div className="whiteContainer space-y-6 w-full max-w-xl mx-auto">
        <FormTitle
          title={`${t("forgotPassword.stepLabel")} ${currentIndex + 1}: ${
            steps[currentIndex].title
          }`}
          subtitle={steps[currentIndex].subtitle}
        />

        {currentIndex === 0 && (
          <CheckEmail goNext={handleNext} setParentData={setParentData} />
        )}

        {currentIndex === 1 && (
          <OTP
            goNext={handleNext}
            parentData={parentData}
            setParentData={setParentData}
          />
        )}

        {currentIndex === 2 && (
          <ResetPassword
            parentData={parentData}
            setParentData={setParentData}
          />
        )}
      </div>
    </section>
  );
};

export default ForgotPassword;
