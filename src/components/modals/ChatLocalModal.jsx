import { createPortal } from "react-dom";
import icon from "../../assets/icons/chat-local-icon.png";

const ChatLocalModal = ({ openModal, onClose }) => {
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

          <button className="mainBtn">Go to Agora</button>
        </div>
      </div>
    </dialog>,
    document.body
  );
};

export default ChatLocalModal;
