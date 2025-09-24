import { Link } from "react-router-dom";
import Avatar from "../../../components/common/Avatar";
import { ImArrowRight2 } from "react-icons/im";

const ChatHeader = ({ contact, setShowChat }) => {
  return (
    <div className="flex items-center gap-4 p-4 border-b border-gray-300">
      <div className="flex-1 flex items-center gap-2">
        <Avatar name={contact.name} />
        <div className="flex-1">
          <h4 className="text-lg lg:text-2xl font-bold capitalize line-clamp-1 flex-1 break-all">
            {contact.name}
          </h4>

          <Link
            to={`/product/${contact.product.id}`}
            className="text-lg font-medium text-myBlue-2 line-clamp-1 break-all w-fit"
          >
            {contact.product.title}
          </Link>
        </div>
      </div>

      <span
        onClick={() => setShowChat(false)}
        className="text-myBlue-2 text-2xl cursor-pointer lg:hidden"
      >
        <ImArrowRight2 />
      </span>
    </div>
  );
};

export default ChatHeader;
