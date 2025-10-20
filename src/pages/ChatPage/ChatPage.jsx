import { useState } from "react";
import Chat from "./sections/Chat";
import Contacts from "./sections/Contacts";
import { useParams } from "react-router-dom";

const ChatPage = () => {
  const [showChat, setShowChat] = useState(false);
  const { id } = useParams();
  console.log("chat ID :" + id);

  return (
    <section className="container pagePadding h-screen">
      <div className="h-full grid grid-cols-1 lg:grid-cols-3 overflow-x-hidden relative bg-white shadow-2xl rounded-2xl">
        <Contacts setShowChat={setShowChat} />

        <Chat showChat={showChat} setShowChat={setShowChat} />
      </div>
    </section>
  );
};

export default ChatPage;
