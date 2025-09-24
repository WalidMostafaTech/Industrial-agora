import axios from "axios";
import crypto from "crypto-js";

const staticWord = "AGORA_2025";
const secretKey = "D9CCAC38146C5B89A32D7C2671EEA";

const api = axios.create({
  baseURL: "https://agora-admins.technomasrsystems.com/api",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    "Accept-Language": "en",
  },
});

function getRiyadhDate() {
  const date = new Date();
  const riyadhDate = new Date(
    date.toLocaleString("en-US", { timeZone: "Asia/Riyadh" })
  );
  return riyadhDate.toISOString().split("T")[0]; // YYYY-MM-DD
}

api.interceptors.request.use((config) => {
  // نخلي الـ nonce string
  const nonce = `${Date.now()}-${Math.floor(Math.random() * 1_000_000)}`; // مثال: "1727181212123-394023"
  const date = getRiyadhDate();

  const urlWithoutProtocol = config.url.replace(/^https?:\/\//, "");
  const method = config.method.toUpperCase();

  const dataToSign = `${nonce}${staticWord}${urlWithoutProtocol}${date}${method}`;
  const signature = crypto
    .HmacSHA256(dataToSign, secretKey)
    .toString(crypto.enc.Hex);

  config.headers["X-Nonce"] = nonce;
  config.headers["X-Signature"] = signature;

  // console.log("🔑 Request Headers:", {
  //   "X-Nonce": nonce,
  //   "X-Signature": signature,
  //   Date: date,
  //   URL: urlWithoutProtocol,
  //   Method: method,
  // });

  return config;
});

export default api;
