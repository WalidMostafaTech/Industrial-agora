import { useState } from "react";
import MainInput from "../form/MainInput";
import FormError from "../form/FormError";
import { useTranslation } from "react-i18next";

const CommissionModal = ({ isOpen, onClose, onConfirm, error, loading }) => {
  const { t } = useTranslation();

  const [months, setMonths] = useState("");
  const [monthsError, setMonthsError] = useState("");

  const handleConfirm = () => {
    if (!months) {
      setMonthsError(t("modals.CommissionModal.monthsError"));
      return;
    }

    setMonthsError("");

    onConfirm({ months });
    setMonths("");
  };

  const handleClose = () => {
    if (!loading) {
      setMonths("");
      setMonthsError("");
      onClose();
    }
  };

  return (
    <dialog
      id="commission_modal"
      className={`modal ${isOpen ? "modal-open" : ""}`}
      onClick={(e) => {
        if (e.target === e.currentTarget && !loading) onClose();
      }}
    >
      <div className="modal-box max-w-md space-y-4">
        <h3 className="font-bold text-lg text-center">
          {t("modals.CommissionModal.title")}
        </h3>

        {/* Months Input */}
        <MainInput
          label={t("modals.CommissionModal.durationLabel")}
          id="months"
          type="number"
          min="1"
          value={months}
          onChange={(e) => setMonths(e.target.value)}
          error={monthsError}
        />

        {/* Server Error */}
        <FormError errorMsg={error?.response?.data?.message} />

        {/* Buttons */}
        <div className="flex justify-between gap-3">
          <button
            onClick={handleClose}
            type="button"
            className={`mainBtn danger ${
              loading ? "opacity-60 cursor-not-allowed" : ""
            }`}
            disabled={loading}
          >
            {t("modals.CommissionModal.cancel")}
          </button>

          <button
            onClick={handleConfirm}
            type="button"
            className="mainBtn success flex items-center justify-center"
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="mr-2">
                  {t("modals.CommissionModal.loading")}
                </span>
                <span className="spinner-border animate-spin inline-block w-4 h-4 border-2 rounded-full" />
              </>
            ) : (
              t("modals.CommissionModal.confirm")
            )}
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default CommissionModal;
