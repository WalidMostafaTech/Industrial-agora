import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Chat from "./sections/Chat";
import Contacts from "./sections/Contacts";
import { getChats, getMsgs } from "../../services/chatServices";
import useHasPermission from "../../hooks/useHasPermission";
import { PERMISSIONS } from "../../permissions";
import PermissionSection from "../../components/sections/PermissionSection";

const ChatPage = () => {
  const [showChat, setShowChat] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    if (id) setShowChat(true);
  }, [id]);

  const {
    data: chats,
    // isLoading: chatsLoading,
    // error: chatsError,
  } = useQuery({
    queryKey: ["chats"],
    queryFn: getChats,
  });

  const {
    data: messages,
    // isLoading: msgsLoading,
    // error: msgsError,
  } = useQuery({
    queryKey: ["messages", id],
    queryFn: () => getMsgs(id),
    enabled: !!id,
  });
  const currentChat = chats?.find((chat) => chat.id.toString() === id);

  const canChat = useHasPermission(PERMISSIONS.CHAT_MEMBERS);

  if (!canChat) {
    return <PermissionSection />;
  }

  return (
    <section className="container pagePadding h-screen">
      <div className="h-full grid grid-cols-1 lg:grid-cols-3 overflow-x-hidden relative bg-white shadow-2xl rounded-2xl">
        <Contacts setShowChat={setShowChat} chats={chats} chatId={id} />
        <Chat
          showChat={showChat}
          setShowChat={setShowChat}
          currentChat={currentChat}
          messages={messages}
          chatId={id}
        />
      </div>
    </section>
  );
};

export default ChatPage;
