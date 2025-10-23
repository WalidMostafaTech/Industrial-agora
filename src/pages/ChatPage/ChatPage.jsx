import { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Chat from "./sections/Chat";
import Contacts from "./sections/Contacts";
import { getChats, getMsgs } from "../../services/chatServices";

const ChatPage = () => {
  const [showChat, setShowChat] = useState(false);
  const { id } = useParams();

  // ✅ Fetch all chats
  const {
    data: chats,
    isLoading: chatsLoading,
    error: chatsError,
  } = useQuery({
    queryKey: ["chats"],
    queryFn: getChats,
  });

  // ✅ Fetch messages (only if there’s an id)
  const {
    data: messages,
    isLoading: msgsLoading,
    error: msgsError,
  } = useQuery({
    queryKey: ["messages", id],
    queryFn: () => getMsgs(id),
    enabled: !!id, // run only if id exists
  });

  // ✅ Log data when fetched
  if (chats) console.log("Chats:", chats);
  if (messages) console.log("Messages:", messages);

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
