import { createPortal } from "react-dom";
import icon from "../../assets/icons/chat-external-icon.png";

const ChatExternallyModal = ({ openModal, onClose }) => {
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
          You are leaving the Agora platform, and any transactions outside of it
          are at your own risk and we are not responsible for them.
        </p>
        <div className="modal-action">
          <button className="mainBtn danger" onClick={onClose}>
            Close
          </button>

          <button className="mainBtn">Go to Agora</button>
        </div>
      </div>
    </dialog>,
    document.body
  );
};

export default ChatExternallyModal;
