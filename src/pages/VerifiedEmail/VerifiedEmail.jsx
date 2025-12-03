import { useState } from "react";
import PageTitle from "../../components/common/PageTitle";
import OTP from "./section/OTP";
import ChangeEmail from "./section/ChangeEmail";
import { useTranslation } from "react-i18next";

const VerifiedEmail = () => {
  const [step, setStep] = useState("otp");
  const { t } = useTranslation();

  return (
    <section className="pagePadding container">
      <PageTitle title={t("VerifyEmail")} />

      <div className="whiteContainer space-y-6 w-full max-w-xl mx-auto">
        {step === "otp" ? (
          <OTP setStep={setStep} />
        ) : (
          <ChangeEmail setStep={setStep} />
        )}
      </div>
    </section>
  );
};

export default VerifiedEmail;
