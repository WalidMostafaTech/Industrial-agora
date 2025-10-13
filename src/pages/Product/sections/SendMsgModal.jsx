import { useNavigate } from "react-router-dom";
import FormBtn from "../../../components/form/FormBtn";
import MainInput from "../../../components/form/MainInput";

const SendMsgModal = ({ openModal, onClose }) => {
  const navigate = useNavigate();

  return (
    <dialog
      className={`modal ${openModal ? "modal-open" : ""}`}
      onClose={onClose}
    >
      <div className="modal-box bg-base-100">
        <form className="space-y-6">
          <h3 className="text-xl lg:text-3xl text-myBlue-1 font-bold">
            Send a message to the seller
          </h3>

          <MainInput type="textarea" />

          <div className="flex justify-between gap-4">
            <FormBtn
              title="Send"
              margin={false}
              onClick={() => navigate("/chat")}
            />

            <button
              onClick={onClose}
              type="button"
              className="animationBtn danger"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>

      {/* overlay */}
      <form method="dialog" className="modal-backdrop">
        <button onClick={onClose}>close</button>
      </form>
    </dialog>
  );
};

export default SendMsgModal;
