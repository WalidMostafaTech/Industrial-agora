import { createPortal } from "react-dom";
import { useTranslation } from "react-i18next";
import { IoWarningOutline } from "react-icons/io5";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const PermissionModal = ({ openModal, onClose }) => {
  const { profile } = useSelector((state) => state.profile);
  const { t } = useTranslation();

  if (!openModal) return null;

  return createPortal(
    <dialog className={`modal modal-open`} onClick={onClose}>
      <div
        className="modal-box flex flex-col items-center justify-center gap-2 text-center"
        onClick={(e) => e.stopPropagation()}
      >
        {profile ? (
          <>
            <IoWarningOutline className="text-[100px] text-yellow-500" />
            <h2 className="text-xl font-bold max-w-sm">
              {t("modals.permissionModal.upgradeTitle")}
            </h2>

            <div className="modal-action">
              <button onClick={onClose} className="mainBtn danger">
                {t("modals.permissionModal.closeButton")}
              </button>
              <Link to="/subscription-packages" className="mainBtn">
                {t("modals.permissionModal.upgradeButton")}
              </Link>
            </div>
          </>
        ) : profile?.verified ? (
          <>
            <IoWarningOutline className="text-[100px] text-red-700" />
            <h2 className="text-xl font-bold max-w-sm">
              {t("modals.permissionModal.verifiedTitle")}
            </h2>
            <div className="modal-action">
              <button onClick={onClose} className="mainBtn danger">
                {t("modals.permissionModal.closeButton")}
              </button>
              <Link to="/verify-email" className="mainBtn">
                {t("modals.permissionModal.verifiedButton")}
              </Link>
            </div>
          </>
        ) : (
          <>
            <IoWarningOutline className="text-[100px] text-red-700" />
            <h2 className="text-xl font-bold max-w-sm">
              {t("modals.permissionModal.loginTitle")}
            </h2>
            <div className="modal-action">
              <button onClick={onClose} className="mainBtn danger">
                {t("modals.permissionModal.closeButton")}
              </button>
              <Link to="/login" className="mainBtn">
                {t("modals.permissionModal.loginButton")}
              </Link>
            </div>
          </>
        )}
      </div>
    </dialog>,
    document.body
  );
};

export default PermissionModal;
