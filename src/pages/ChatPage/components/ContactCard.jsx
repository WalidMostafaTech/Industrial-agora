import { useSelector } from "react-redux";
import Avatar from "../../../components/common/Avatar";

const ContactCard = ({ contact = {}, activeChat, handleClick }) => {
  const { profile } = useSelector((state) => state.profile);

  const contactList = {
    id: contact.id,
    name:
      contact.user_id !== profile?.id ? contact.user.name : contact.seller.name,
    last_message: contact.latest_message.message || contact.product.name,
    new_messages: contact.unread_messages_count,
  };

  return (
    <div
      onClick={() => handleClick(contactList.id)}
      className={`flex items-center gap-2 p-4 rounded-xl transition cursor-pointer ${
        activeChat === contactList.id
          ? "bg-myBlue-2 text-white"
          : "bg-gray-100 hover:bg-gray-300"
      }`}
    >
      <Avatar name={contactList.name} active={activeChat === contactList.id} />
      <div className="flex-1">
        <div className="w-full flex justify-between gap-2">
          <h4 className="text-lg lg:text-2xl font-bold capitalize line-clamp-1 flex-1 break-all">
            {contactList.name}
          </h4>
          {contactList.new_messages > 0 && (
            <span className="bg-green-600 text-white rounded-full w-6 h-6 flex items-center justify-center">
              {contactList.new_messages}
            </span>
          )}
        </div>
        <p className="text-sm lg:text-base font-medium line-clamp-1 break-all">
          {contactList.last_message}
        </p>
      </div>
    </div>
  );
};

export default ContactCard;
