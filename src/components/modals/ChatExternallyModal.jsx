import { createPortal } from "react-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import icon from "../../assets/icons/chat-external-icon.png";
import { updateChatAction } from "../../services/chatServices";
import { useTranslation } from "react-i18next";

const ChatExternallyModal = ({ openModal, onClose, chatId }) => {
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
    mutate({ id: chatId, action: "Externally" });
  };

  if (!openModal) return null;

  return createPortal(
    <dialog className="modal modal-open" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <img
          src={icon}
          alt="chat externally icon"
          className="w-16 mx-auto mb-8"
        />
        <p className="text-center font-semibold">
          {t("modals.ChatExternallyModal.warning")}
        </p>

        <div className="modal-action">
          <button className="mainBtn danger" onClick={onClose}>
            {t("modals.ChatExternallyModal.close")}
          </button>

          <button
            className="mainBtn"
            onClick={handleContinue}
            disabled={isPending}
          >
            {isPending
              ? t("modals.ChatExternallyModal.loading")
              : t("modals.ChatExternallyModal.continue")}
          </button>
        </div>
      </div>
    </dialog>,
    document.body
  );
};

export default ChatExternallyModal;
