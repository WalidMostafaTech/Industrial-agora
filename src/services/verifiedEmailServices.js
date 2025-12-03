import api from "./api";

export const verifyEmail = async (payload) => {
  const { data } = await api.post("/verify-email", payload);
  return data;
};

export const changeEmail = async (email) => {
  const { data } = await api.post("/change-email", { email });
  return data;
};
