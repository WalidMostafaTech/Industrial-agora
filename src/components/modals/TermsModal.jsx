import { createPortal } from "react-dom";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
const TermsModal = ({ openModal, onClose, onAccept }) => {
  const { t } = useTranslation();
  const { terms } = useSelector((state) => state.setting);

  if (!openModal) return null;

  return createPortal(
    <dialog className={`modal modal-open`} onClick={onClose}>
      <div
        className="modal-box space-y-4 max-w-3xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="btn btn-sm btn-circle absolute right-2 top-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <h3 className="text-center font-bold text-lg">
          {t("TermsAndConditions")}
        </h3>

        {terms && (
          <div
            className="htmlContent mb-4 lg:mb-8"
            dangerouslySetInnerHTML={{ __html: terms }}
          />
        )}

        <div className="modal-action">
          <button type="button" onClick={onClose} className="mainBtn danger">
            {t("close")}
          </button>
          <button
            type="button"
            className="mainBtn"
            onClick={() => {
              onAccept(); // ✅ تحديث قيمة checkbox
              onClose(); // ✅ اغلاق المودال
            }}
          >
            {t("accept")}
          </button>
        </div>
      </div>
    </dialog>,
    document.body
  );
};

export default TermsModal;
