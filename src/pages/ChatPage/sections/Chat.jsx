import ChatHeader from "../components/ChatHeader";
import MsgInput from "../components/MsgInput";
import MsgsContainer from "../components/MsgsContainer";

const Chat = ({ showChat, setShowChat }) => {
  const contact = { name: "boda", product: { id: 1, title: "product1" } };

  return (
    <div
      className={`h-full overflow-y-auto absolute inset-0 transform transition-transform duration-300 lg:relative lg:translate-x-0 ${
        showChat ? "translate-x-0" : "translate-x-full"
      } lg:col-span-2 lg:border-s lg:border-gray-300 flex flex-col bg-white`}
    >
      <ChatHeader contact={contact} setShowChat={setShowChat} />

      <MsgsContainer />

      <MsgInput />
    </div>
  );
};

export default Chat;
