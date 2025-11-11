import { useMutation, useQueryClient } from "@tanstack/react-query";
import { RiSendPlaneFill } from "react-icons/ri";
import { sendMsg } from "../../../services/chatServices";
import { useState } from "react";

const MsgInput = ({ chatId }) => {
  const [msg, setMsg] = useState("");
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: sendMsg,
    onSuccess: (res) => {
      console.log("✅ New Message Response:", res);

      setMsg("");

      // ✅ الرسالة الصحيحة داخل res.message
      const newMessage = res.message;

      // ✅ أضفها للكاش مباشرة بدون ريفرش
      queryClient.setQueryData(["messages", chatId], (oldMsgs = []) => [
        ...oldMsgs,
        newMessage,
      ]);
    },
  });

  const onSubmit = (e) => {
    e.preventDefault();
    if (!msg.trim()) return;

    mutate({
      message: msg,
      chat_id: chatId,
    });
  };

  return (
    <div className="p-4 pt-0">
      <form
        onSubmit={onSubmit}
        className="flex items-center gap-2 border border-myBlue-2 rounded-lg"
      >
        <input
          type="text"
          placeholder="Type a message..."
          className="w-full p-1 border-0 outline-none"
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
        />

        <button
          type="submit"
          disabled={isPending}
          className="text-2xl text-myBlue-1 p-2 cursor-pointer flex items-center justify-center"
        >
          {isPending ? (
            <span className="w-6 h-6 lg:w-4 lg:h-4 border-3 border-myBlue-1 border-t-transparent rounded-full animate-spin"></span>
          ) : (
            <RiSendPlaneFill />
          )}
        </button>
      </form>
    </div>
  );
};

export default MsgInput;
