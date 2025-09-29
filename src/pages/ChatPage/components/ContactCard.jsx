import Avatar from "../../../components/common/Avatar";

const ContactCard = ({ contact, activeChat, handleClick }) => {
  return (
    <div
      onClick={() => handleClick(contact.id)}
      className={`flex items-center gap-2 p-4 rounded-xl transition cursor-pointer ${
        activeChat === contact.id
          ? "bg-myBlue-2 text-white"
          : "bg-gray-100 hover:bg-gray-300"
      }`}
    >
      <Avatar name={contact.name} active={activeChat === contact.id} />
      <div className="flex-1">
        <div className="w-full flex justify-between gap-2">
          <h4 className="text-lg lg:text-2xl font-bold capitalize line-clamp-1 flex-1 break-all">
            {contact.name}
          </h4>
          {contact.new_messages && (
            <span className="bg-green-600 text-white rounded-full w-6 h-6 flex items-center justify-center">
              {contact.new_messages}
            </span>
          )}
        </div>
        <p className="text-sm lg:text-base font-medium line-clamp-1 break-all">
          {contact.last_message}
        </p>
      </div>
    </div>
  );
};

export default ContactCard;
