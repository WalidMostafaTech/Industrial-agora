import api from "./api";
import Cookies from "js-cookie";

export const loginUser = async (formData) => {
  const { data } = await api.post("/login", formData);

  if (data?.data?.token) {
    Cookies.set("tokenAG", data?.data?.token);
  }

  return data?.data;
};

export const registerUser = async (formData) => {
  const { data } = await api.post("/register", formData);
  return data;
};

export const logoutUser = async () => {
  const { data } = await api.post("/logout");
  Cookies.remove("tokenAG");
  return data;
};
