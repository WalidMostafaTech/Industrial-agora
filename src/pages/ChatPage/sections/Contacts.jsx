import { useState } from "react";
import ContactCard from "../components/ContactCard";

const Contacts = ({ setShowChat }) => {
  const [activeChat, setActiveChat] = useState(null);

  const handleClick = (id) => {
    setActiveChat(id);
    setShowChat(true);
  };

  const contactsList = [
    {
      id: 1,
      name: "boda",
      last_message: "hello",
      new_messages: 99,
    },
    {
      id: 2,
      name: "walid",
      last_message: "hello",
      new_messages: 2,
    },
    {
      id: 3,
      name: "ahmed",
      last_message: "صحيح",
      new_messages: 5,
    },
  ];

  return (
    <aside className="h-full overflow-y-auto py-4">
      <div className="h-full overflow-y-auto space-y-4 px-4">
        {contactsList.map((contact) => (
          <ContactCard
            key={contact.id}
            contact={contact}
            setShowChat={setShowChat}
            activeChat={activeChat}
            handleClick={handleClick}
          />
        ))}
      </div>
    </aside>
  );
};

export default Contacts;
