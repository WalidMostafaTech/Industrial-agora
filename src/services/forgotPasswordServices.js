import api from "./api";

export const sendOtp = async (email) => {
  const { data } = await api.post("/forgot-password/send-otp", { email });
  return data;
};

export const verifyOtp = async (payload) => {
  const { data } = await api.post("/forgot-password/verify-otp", payload);
  return data;
};

export const resetPassword = async (payload) => {
  const { data } = await api.post("/forgot-password/reset", payload);
  return data;
};
