import { useState } from "react";
import PageTitle from "../../components/common/PageTitle";
import FormTitle from "../../components/form/FormTitle";
import OTP from "./section/OTP";
import ChangeEmail from "./section/ChangeEmail";

const VerifiedEmail = () => {
  const [step, setStep] = useState("otp");

  return (
    <section className="pagePadding container">
      <PageTitle title={"Verify Email"} />

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
