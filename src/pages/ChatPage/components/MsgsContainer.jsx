import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";

const MsgsContainer = ({ messages = [] }) => {
  const { profile } = useSelector((state) => state.profile);
  const containerRef = useRef(null);

  // 🔹 Scroll to bottom when messages update
  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.scrollTo({
        top: container.scrollHeight,
        // behavior: "smooth",
      });
    }
  }, [messages]);

  if (!messages.length) return (
    <div className="h-full p-4 flex items-center justify-center">
      <p className="text-white text-center text-lg bg-myBlue-1 py-2 px-4 rounded-full">
        No messages yet. Start the conversation!
      </p>
    </div>
  );

  return (
    <div
      ref={containerRef}
      className="h-full overflow-y-auto bg-gray-100 m-4 p-2 rounded-xl"
    >
      {messages.map((msg, index) => {
        const isUser = msg.sender_id === profile?.id;
        const prevMsg = messages[index - 1];
        const nextMsg = messages[index + 1];
        const sameSenderPrev = prevMsg && prevMsg.sender_id === msg.sender_id;
        const sameSenderNext = nextMsg && nextMsg.sender_id === msg.sender_id;

        // 🔹 تعديل الزوايا بشكل واضح حسب التتابع
        const bubbleRadius = isUser
          ? `rounded-2xl ${sameSenderPrev ? "rounded-tr" : ""} ${
              sameSenderNext ? "rounded-br" : ""
            }`
          : `rounded-2xl ${sameSenderPrev ? "rounded-tl" : ""} ${
              sameSenderNext ? "rounded-bl" : ""
            }`;

        return (
          <div
            key={msg.id}
            className={`flex ${isUser ? "justify-end" : "justify-start"} ${
              sameSenderPrev ? "mt-1" : "mt-3"
            }`}
          >
            <div
              className={`max-w-[280px] md:max-w-xl p-2 px-3 shadow-md ${bubbleRadius} ${
                isUser ? "bg-myBlue-2 text-white" : "bg-white text-gray-900"
              }`}
            >
              <p className="text-sm lg:text-lg font-semibold break-all">
                {msg.message}
              </p>

              <span
                className={`text-xs w-fit block ml-auto mt-1 p-1 rounded-md ${
                  isUser ? "bg-white/5" : "bg-black/5"
                }`}
              >
                {new Date(msg.created_at).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MsgsContainer;
