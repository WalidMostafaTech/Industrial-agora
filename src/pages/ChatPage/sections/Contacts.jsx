import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ContactCard from "../components/ContactCard";
import { useTranslation } from "react-i18next";

const Contacts = ({ setShowChat, chats, chatId }) => {
  const { t } = useTranslation();
  const [activeChat, setActiveChat] = useState(null);
  const navigate = useNavigate();
  const { lang } = useParams();

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
    navigate(`/${lang}/chat/${id}`); // ✅ يغير الـ URL
  };

  if (!chats || chats.length === 0)
    return (
      <div className="h-full p-4 flex items-center justify-center">
        <p className="text-white text-center text-sm bg-myBlue-1 py-2 px-4 rounded-full">
          {t("NoContactsAvailable")}
        </p>
      </div>
    );

  return (
    <aside className="h-full overflow-y-auto py-4">
      <div className="h-full overflow-y-auto space-y-2 px-4">
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
