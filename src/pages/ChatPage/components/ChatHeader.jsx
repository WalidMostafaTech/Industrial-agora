import { Link, useNavigate, useParams } from "react-router-dom";
import Avatar from "../../../components/common/Avatar";
import { ImArrowRight2 } from "react-icons/im";
import ChatExternallyModal from "../../../components/modals/ChatExternallyModal";
import ChatLocalModal from "../../../components/modals/ChatLocalModal";
import { useState } from "react";
import { useSelector } from "react-redux";

const ChatHeader = ({ currentChat = {}, setShowChat, chatId }) => {
  const [openLocalModal, setOpenLocalModal] = useState(false);
  const [openExternallyModal, setOpenExternallyModal] = useState(false);
  const navigate = useNavigate();
  const { lang } = useParams();

  const handleClose = () => {
    setShowChat(false);
    navigate(`/${lang}/chat`);
  };

  const { profile } = useSelector((state) => state.profile);

  const name =
    currentChat?.user_id !== profile?.id
      ? currentChat?.user?.name
      : currentChat?.seller?.name;

  const disabledBtn = currentChat?.action !== null;

  return (
    <div className="flex items-center gap-4 p-4 border-b border-gray-300">
      <div className="flex-1 flex items-center gap-2">
        <Avatar name={name} />
        <div className="flex-1">
          <h4 className="text-base font-bold capitalize line-clamp-1 flex-1 break-all">
            {name}
          </h4>

          <Link
            to={`product/${currentChat?.product?.id}`}
            className="text-sm font-medium text-myBlue-2 line-clamp-1 break-all w-fit"
          >
            {currentChat?.product?.name}
          </Link>
        </div>
      </div>

      <div className="flex items-center gap-2">
        {currentChat?.product?.type === "product" ? (
          <button
            onClick={() => setOpenLocalModal(true)}
            disabled={disabledBtn}
            className={`bg-green-700 text-white text-sm py-1 px-2 rounded-md cursor-pointer hover:brightness-90 transition ${
              disabledBtn ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            Send to Agora
          </button>
        ) : (
          <>
            <button
              onClick={() => setOpenExternallyModal(true)}
              disabled={disabledBtn}
              className={`bg-red-700 text-white text-sm py-1 px-2 rounded-md cursor-pointer hover:brightness-90 transition ${
                disabledBtn ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              Externally
            </button>

            <button
              onClick={() => setOpenLocalModal(true)}
              disabled={disabledBtn}
              className={`bg-green-700 text-white text-sm py-1 px-2 rounded-md cursor-pointer hover:brightness-90 transition ${
                disabledBtn ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              Locally
            </button>
          </>
        )}

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
      />
      <ChatLocalModal
        openModal={openLocalModal}
        onClose={() => setOpenLocalModal(false)}
        chatId={chatId}
      />
    </div>
  );
};

export default ChatHeader;
