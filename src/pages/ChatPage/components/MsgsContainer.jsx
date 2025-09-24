const MsgsContainer = () => {
  const user = "walid";

  const messages = [
    { id: 1, sender: "boda", text: "hello walid", time: "12:30" },
    { id: 2, sender: "walid", text: "hello boda", time: "12:31" },
    { id: 3, sender: "boda", text: "hello walid", time: "12:31" },
    { id: 4, sender: "walid", text: "hello boda", time: "12:31" },
  ];

  return (
    <div className="h-full overflow-y-auto bg-gray-100 m-4 p-2 rounded-xl space-y-4">
      {messages.map((msg) => {
        const isUser = msg.sender === user;
        return (
          <div
            key={msg.id}
            className={`flex ${isUser ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[280px] md:max-w-xl p-2 rounded-xl shadow-md ${
                isUser
                  ? "bg-myBlue-2 text-white rounded-br-none"
                  : "bg-white text-gray-900 rounded-bl-none"
              }`}
            >
              <p className="text-sm lg:text-lg font-semibold break-all">
                {msg.text}
              </p>
              <span
                className={`text-xs lg:text-sm w-fit block ml-auto mt-1 p-1 rounded-md ${
                  isUser ? "bg-white/5" : "bg-black/5"
                }`}
              >
                {msg.time}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MsgsContainer;
