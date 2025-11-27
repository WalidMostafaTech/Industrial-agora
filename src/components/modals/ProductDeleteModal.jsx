import { createPortal } from "react-dom";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import MainInput from "../form/MainInput";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getReasons, deleteProduct } from "../../services/productServices";

const ProductDeleteModal = ({ openModal, onClose, productId }) => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const [selectedReason, setSelectedReason] = useState("");

  const { data: reasons, isLoading } = useQuery({
    queryKey: ["reasons"],
    queryFn: getReasons,
  });

  const mutation = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries(["products"]); // لو عندك query للمنتجات
      onClose();
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedReason) return; // ممكن تحط رسالة خطأ هنا
    mutation.mutate({ id: productId, delete_reason_id: selectedReason });
  };

  if (!openModal) return null;

  return createPortal(
    <dialog className={`modal modal-open`} onClick={onClose}>
      <div className="modal-box space-y-4" onClick={(e) => e.stopPropagation()}>
        <form onSubmit={handleSubmit}>
          <MainInput
            type="select"
            label={t("select_delete_reason")}
            placeholder={t("select_delete_reason")}
            options={reasons?.map((reason) => ({
              label: reason.text,
              value: reason.id,
            }))}
            disabled={isLoading}
            value={selectedReason}
            onChange={(e) => setSelectedReason(e.target.value)}
          />

          <div className="modal-action">
            <button type="button" onClick={onClose} className="mainBtn danger">
              {t("close")}
            </button>
            <button
              type="submit"
              className="mainBtn"
              disabled={mutation.isPending}
              style={{ opacity: mutation.isPending ? 0.5 : 1 }}
            >
              {t("request")}
            </button>
          </div>
        </form>
      </div>
    </dialog>,
    document.body
  );
};

export default ProductDeleteModal;
