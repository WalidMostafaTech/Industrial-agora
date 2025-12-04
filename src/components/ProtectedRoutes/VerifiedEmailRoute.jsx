import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ProtectModal from "../modals/ProtectModal";

const VerifiedEmailRoute = ({ children }) => {
  const { t } = useTranslation();
  const { profile } = useSelector((state) => state.profile);
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    if (profile && !profile.email_verified_at) {
      setOpenModal(true);
    }
  }, [profile]);

  const handleConfirm = () => {
    setOpenModal(false);
    navigate("/verify-email", { replace: true });
  };

  const handleClose = () => {
    setOpenModal(false);
    navigate("/", { replace: true });
  };

  // ⭐ لو الإيميل verified → رجّع الأطفال
  if (profile?.email_verified_at) return <>{children}</>;

  return (
    <ProtectModal
      open={openModal}
      title={t("ProtectedRoutes.VerifiedEmailRoute.title")}
      message={t("ProtectedRoutes.VerifiedEmailRoute.message")}
      confirmText={t("ProtectedRoutes.VerifiedEmailRoute.confirm")}
      onConfirm={handleConfirm}
      onClose={handleClose}
    />
  );
};

export default VerifiedEmailRoute;
