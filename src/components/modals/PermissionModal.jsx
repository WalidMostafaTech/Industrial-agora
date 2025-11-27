import { createPortal } from "react-dom";
import { useTranslation } from "react-i18next";
import { IoWarningOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

const PermissionModal = ({ openModal, onClose }) => {
  const { t } = useTranslation();
  if (!openModal) return null;

  return createPortal(
    <dialog className={`modal modal-open`} onClick={onClose}>
      <div
        className="modal-box space-y-4 flex flex-col items-center justify-center gap-4 text-center"
        onClick={(e) => e.stopPropagation()}
      >
        <IoWarningOutline className="text-[100px] text-yellow-500" />
        <h2 className="text-2xl font-bold max-w-sm">
          {t("PermissionSection.title")}
        </h2>

        <div className="modal-action">
          <button onClick={onClose} className="mainBtn danger">
            {t("close")}
          </button>
          <Link to="/subscription-packages" className="mainBtn">
            {t("PermissionSection.upgrade")}
          </Link>
        </div>
      </div>
    </dialog>,
    document.body
  );
};

export default PermissionModal;
