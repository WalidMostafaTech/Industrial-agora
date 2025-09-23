import axios from "axios";

const api = axios.create({
  baseURL: "https://agora-admins.technomasrsystems.com/api",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    "Accept-Language": "en",
  },
});

export default api;
