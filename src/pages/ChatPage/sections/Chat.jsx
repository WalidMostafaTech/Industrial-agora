import { useTranslation } from "react-i18next";
import ChatHeader from "../components/ChatHeader";
import MsgInput from "../components/MsgInput";
import MsgsContainer from "../components/MsgsContainer";

const Chat = ({ showChat, setShowChat, chatData, chatId }) => {
  const { t } = useTranslation();

  return (
    <div
      className={`h-full overflow-y-auto absolute inset-0 transform transition-transform duration-300 lg:relative lg:translate-x-0 ${
        showChat ? "translate-x-0" : "translate-x-full"
      } lg:col-span-2 lg:border-s lg:border-gray-300 flex flex-col bg-white`}
    >
      {chatId ? (
        <>
          <ChatHeader
            contact={chatData.header}
            setShowChat={setShowChat}
            chatId={chatId}
          />

          <MsgsContainer messages={chatData.messages} />

          <MsgInput chatId={chatId} />
        </>
      ) : (
        <div className="flex-grow flex items-center justify-center p-4">
          <p className="text-white text-center text-sm bg-myBlue-1 py-2 px-4 rounded-full">
            {t("SelectChatToStartMessaging")}
          </p>
        </div>
      )}
    </div>
  );
};

export default Chat;
