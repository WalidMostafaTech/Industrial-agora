import { useNavigate } from "react-router-dom";
import FormBtn from "../form/FormBtn";
import MainInput from "../form/MainInput";
import Modal from "./Modal";

const SendMsgModal = ({ openModal, onClose }) => {
  const navigate = useNavigate();
  return (
    <Modal openModal={openModal} onClose={onClose}>
      <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
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
    </Modal>
  );
};

export default SendMsgModal;
