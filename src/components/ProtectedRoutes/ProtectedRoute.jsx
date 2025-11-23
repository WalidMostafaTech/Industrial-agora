import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import ProtectModal from "../modals/ProtectModal";
import LoadingPage from "../Loading/LoadingPage";
import { useTranslation } from "react-i18next";

const ProtectedRoute = ({ children }) => {
  const { t } = useTranslation();
  const token = Cookies.get("tokenAG");
  const { profile, loading } = useSelector((state) => state.profile);
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    if (!token || !profile) setOpenModal(true);
  }, [token, profile, loading]);

  const handleConfirm = () => {
    setOpenModal(false);
    navigate("/login", { replace: true });
  };
  const handleClose = () => {
    setOpenModal(false);
    navigate("/", { replace: true });
  };

  if (!loading && token && profile) return <>{children}</>;
  if (loading) return <LoadingPage />;

  return (
    <ProtectModal
      open={openModal}
      title={t("ProtectedRoutes.ProtectedRoute.title")}
      message={t("ProtectedRoutes.ProtectedRoute.message")}
      confirmText={t("ProtectedRoutes.ProtectedRoute.confirm")}
      onConfirm={handleConfirm}
      onClose={handleClose}
    />
  );
};

export default ProtectedRoute;
