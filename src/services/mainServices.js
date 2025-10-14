import api from "./api";

export const sendContact = async (formData) => {
  const { data } = await api.post("/contact", formData);
  return data;
};

export const sendConsultationRequest = async (formData) => {
  const { data } = await api.post("/consultation-request", formData);
  return data;
};

export const getConsultationSettings = async () => {
  const { data } = await api.get("/consultation-settings");
  return data?.data || [];
};

export const getPages = async () => {
  const { data } = await api.get("/pages");
  return data?.data || [];
};
