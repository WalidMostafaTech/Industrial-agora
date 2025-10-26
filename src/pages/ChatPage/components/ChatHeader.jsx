import { Link, useNavigate } from "react-router-dom";
import Avatar from "../../../components/common/Avatar";
import { ImArrowRight2 } from "react-icons/im";
import ChatExternallyModal from "../../../components/modals/ChatExternallyModal";
import ChatLocalModal from "../../../components/modals/ChatLocalModal";
import { useState } from "react";

const ChatHeader = ({ contact = {}, setShowChat, chatId }) => {
  const [openLocalModal, setOpenLocalModal] = useState(false);
  const [openExternallyModal, setOpenExternallyModal] = useState(false);
  console.log("contact", contact);
  const navigate = useNavigate();

  const handleClose = () => {
    setShowChat(false);
    navigate("/chat");
  };

  const [disabledBtns, setDisabledBtns] = useState(contact?.action !== null);

  console.log("action", contact?.action);

  return (
    <div className="flex items-center gap-4 p-4 border-b border-gray-300">
      <div className="flex-1 flex items-center gap-2">
        <Avatar name={contact?.name} />
        <div className="flex-1">
          <h4 className="text-base lg:text-2xl font-bold capitalize line-clamp-1 flex-1 break-all">
            {contact?.name}
          </h4>

          <Link
            to={`/product/${contact?.product_id}`}
            className="text-base lg:text-lg font-medium text-myBlue-2 line-clamp-1 break-all w-fit"
          >
            {contact?.product_name}
          </Link>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={() => setOpenExternallyModal(true)}
          disabled={disabledBtns}
          className={`bg-red-700 text-white text-sm lg:text-lg py-1 px-2 lg:py-2 lg:px-4 rounded-md cursor-pointer hover:brightness-90 transition ${
            disabledBtns ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          Externally
        </button>

        <button
          onClick={() => setOpenLocalModal(true)}
          disabled={disabledBtns}
          className={`bg-green-700 text-white text-sm lg:text-lg py-1 px-2 lg:py-2 lg:px-4 rounded-md cursor-pointer hover:brightness-90 transition ${
            disabledBtns ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          Locally
        </button>

        <span
          onClick={handleClose}
          className="text-myBlue-2 text-2xl cursor-pointer lg:hidden"
        >
          <ImArrowRight2 />
        </span>
      </div>

      <ChatExternallyModal
        openModal={openExternallyModal}
        onClose={() => setOpenExternallyModal(false)}
        chatId={chatId}
        setDisabledBtns={setDisabledBtns}
      />
      <ChatLocalModal
        openModal={openLocalModal}
        onClose={() => setOpenLocalModal(false)}
        chatId={chatId}
        setDisabledBtns={setDisabledBtns}
      />
    </div>
  );
};

export default ChatHeader;
