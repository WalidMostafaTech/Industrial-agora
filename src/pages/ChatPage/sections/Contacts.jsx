import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ContactCard from "../components/ContactCard";

const Contacts = ({ setShowChat, chats, chatId }) => {
  const [activeChat, setActiveChat] = useState(null);
  const navigate = useNavigate();

  // ✅ لما يتغير id في الـ URL نحدث activeChat
  useEffect(() => {
    if (chatId) {
      setActiveChat(Number(chatId));
    } else {
      setActiveChat(null);
    }
  }, [chatId]);

  const handleClick = (id) => {
    setActiveChat(id);
    setShowChat(true);
    navigate(`/chat/${id}`); // ✅ يغير الـ URL
  };

  if (!chats)
    return (
      <div className="h-full p-4 flex items-center justify-center">
        <p className="text-white text-center text-lg bg-myBlue-1 py-2 px-4 rounded-full">
          No contacts available.
        </p>
      </div>
    );

  return (
    <aside className="h-full overflow-y-auto py-4">
      <div className="h-full overflow-y-auto space-y-4 px-4">
        {chats.map((contact) => (
          <ContactCard
            key={contact.id}
            contact={contact}
            activeChat={activeChat}
            handleClick={handleClick}
          />
        ))}
      </div>
    </aside>
  );
};

export default Contacts;
