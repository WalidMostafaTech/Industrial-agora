import { createPortal } from "react-dom";
import { useMutation } from "@tanstack/react-query";
import icon from "../../assets/icons/chat-external-icon.png";
import { updateChatAction } from "../../services/chatServices";

const ChatExternallyModal = ({
  openModal,
  onClose,
  chatId,
  setDisabledBtns,
}) => {
  const { mutate, isPending } = useMutation({
    mutationFn: (payload) => updateChatAction(payload),
    onSuccess: () => {
      onClose(); // يقفل المودال بعد نجاح العملية
      setDisabledBtns(true);
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
          className="w-18 mx-auto mb-8"
        />
        <p className="text-center text-lg font-semibold">
          You are leaving the Agora platform, and any transactions outside of it
          are at your own risk and we are not responsible for them.
        </p>

        <div className="modal-action">
          <button className="mainBtn danger" onClick={onClose}>
            Close
          </button>

          <button
            className="mainBtn"
            onClick={handleContinue}
            disabled={isPending}
          >
            {isPending ? "Loading..." : "Continue"}
          </button>
        </div>
      </div>
    </dialog>,
    document.body
  );
};

export default ChatExternallyModal;
