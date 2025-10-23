import api from "./api";

export const sendMsg = async (payload) => {
  const { data } = await api.post("/chat/send", payload);

  return data?.data || {};
};

export const getChats = async () => {
  const { data } = await api.get("/chats/allChats");
  return data?.data || [];
};

export const getMsgs = async (chatId) => {
  const { data } = await api.get(`/chats/${chatId}/messages`);
  return data?.data || [];
};
