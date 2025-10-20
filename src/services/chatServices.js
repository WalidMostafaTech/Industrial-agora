import api from "./api";

export const sendMsg = async (payload) => {
  const { data } = await api.post("/chat/send", payload);

  return data?.data || {};
};

export const getChats = async () => {
  const { data } = await api.get("/chat");
  return data?.data || [];
};
