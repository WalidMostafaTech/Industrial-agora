import api from "./api";

export const getSubscribeType = async () => {
  const { data } = await api.get("/subscription-types");
  return data?.data || [];
};

export const addSubscribe = async (formData) => {
  const { data } = await api.post("/subscribe", formData);
  return data;
};
