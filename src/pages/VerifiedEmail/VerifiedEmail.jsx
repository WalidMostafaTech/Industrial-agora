import { useEffect, useState } from "react";
import PageTitle from "../../components/common/PageTitle";
import OTP from "./section/OTP";
import ChangeEmail from "./section/ChangeEmail";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ProtectModal from "../../components/modals/ProtectModal";

const VerifiedEmail = () => {
  const [step, setStep] = useState("otp");
  const { t } = useTranslation();
  const { profile } = useSelector((state) => state.profile);

  const navigate = useNavigate();

  const [openModal, setOpenModal] = useState({
    loginModal: false,
    verifyModal: false,
  });

  useEffect(() => {
    if (!profile) {
      setOpenModal({ loginModal: true, verifyModal: false });
    } else if (profile.email_verified_at) {
      setOpenModal({ loginModal: false, verifyModal: true });
    } else {
      setOpenModal({ loginModal: false, verifyModal: false });
    }
  }, [profile]);

  const handleConfirm = () => {
    navigate("/", { replace: true });
    setOpenModal({
      loginModal: false,
      verifyModal: false,
    });
  };

  if (!profile)
    return (
      <ProtectModal
        open={openModal.loginModal}
        title={t("verifyEmailPage.notLoggedIn.title")}
        message={t("verifyEmailPage.notLoggedIn.message")}
        confirmText={t("verifyEmailPage.notLoggedIn.confirm")}
        onConfirm={() => navigate("/login", { replace: true })}
        onClose={handleConfirm}
      />
    );

  if (profile?.email_verified_at)
    return (
      <ProtectModal
        open={openModal.verifyModal}
        title={t("verifyEmailPage.alreadyVerified.title")}
        message={t("verifyEmailPage.alreadyVerified.message")}
        confirmText={t("verifyEmailPage.alreadyVerified.confirm")}
        onConfirm={handleConfirm}
        onClose={handleConfirm}
      />
    );

  return (
    <section className="pagePadding container">
      <PageTitle title={t("verifyEmailPage.title")} />

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
