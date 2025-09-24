import { RiSendPlaneFill } from "react-icons/ri";

const MsgInput = () => {
  return (
    <div className="p-4 pt-0">
      <form className="flex items-center gap-2 border border-myBlue-2 rounded-xl">
        <input
          type="text"
          placeholder="Type a message..."
          className="w-full p-2 border-0 outline-none lg:text-lg"
        />

        <button className="text-2xl lg:text-4xl text-myBlue-1 p-2 cursor-pointer">
          <RiSendPlaneFill />
        </button>
      </form>
    </div>
  );
};

export default MsgInput;
