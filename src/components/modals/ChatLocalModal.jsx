import { createPortal } from "react-dom";
import icon from "../../assets/icons/chat-local-icon.png";
import { useMutation } from "@tanstack/react-query";
import { updateChatAction } from "../../services/chatServices";

const ChatLocalModal = ({ openModal, onClose, chatId, setDisabledBtns }) => {
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
    mutate({ id: chatId, action: "Locally" });
  };

  if (!openModal) return null;

  return createPortal(
    <dialog className={`modal modal-open`} onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <img
          src={icon}
          alt="chat externally icon"
          className="w-18 mx-auto mb-8"
        />
        <p className="text-center text-lg font-semibold">
          You are now inside the Agora platform, all our services are available
          to you and under our responsibility
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

export default ChatLocalModal;
