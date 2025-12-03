import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const VerifiedEmailRoute = () => {
  const { t } = useTranslation();
  const { profile } = useSelector((state) => state.profile);
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    if (!profile.verified) setOpenModal(true);
  }, [profile]);

  const handleConfirm = () => {
    setOpenModal(false);
    navigate("/verify-email", { replace: true });
  };

  const handleClose = () => {
    setOpenModal(false);
    navigate("/", { replace: true });
  };

  return (
    <ProtectModal
      open={openModal}
      title={t("VerifiedEmailRoute.ProtectedRoute.title")}
      message={t("VerifiedEmailRoute.ProtectedRoute.message")}
      confirmText={t("VerifiedEmailRoute.ProtectedRoute.confirm")}
      onConfirm={handleConfirm}
      onClose={handleClose}
    />
  );
};
export default VerifiedEmailRoute;
