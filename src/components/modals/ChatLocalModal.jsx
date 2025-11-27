import { createPortal } from "react-dom";
import icon from "../../assets/icons/chat-local-icon.png";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateChatAction } from "../../services/chatServices";
import { useTranslation } from "react-i18next";

const ChatLocalModal = ({ openModal, onClose, chatId }) => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: (payload) => updateChatAction(payload),
    onSuccess: () => {
      queryClient.invalidateQueries(["chats"]);
      onClose();
    },
    onError: (error) => {
      console.error("Update chat action failed:", error);
    },
  });

  const handleContinue = () => {
    if (!chatId) return;
    mutate({ id: chatId, action: "Locally" });
  };

  if (!openModal) return null;

  return createPortal(
    <dialog className="modal modal-open" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <img src={icon} alt="chat locally icon" className="w-16 mx-auto mb-8" />
        <p className="text-center font-semibold">
          {t("modals.ChatLocalModal.warning")}
        </p>

        <div className="modal-action">
          <button className="mainBtn danger" onClick={onClose}>
            {t("modals.ChatLocalModal.close")}
          </button>
          <button
            className="mainBtn"
            onClick={handleContinue}
            disabled={isPending}
          >
            {isPending
              ? t("modals.ChatLocalModal.loading")
              : t("modals.ChatLocalModal.continue")}
          </button>
        </div>
      </div>
    </dialog>,
    document.body
  );
};

export default ChatLocalModal;
