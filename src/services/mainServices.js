import api from "./api";

export const getSettings = async () => {
  const { data } = await api.get("/all-settings");
  return data?.data || [];
};

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

export const getProcessOutsourcePage = async () => {
  const { data } = await api.get("/process-outsource-page");
  return data?.data || [];
};

export const getPages = async () => {
  const { data } = await api.get("/pages");
  return data?.data || [];
};

export const getTermsAndConditions = async () => {
  const { data } = await api.get("/terms-conditions");
  return data?.data || [];
};

export const getCities = async () => {
  const { data } = await api.get("/cities");
  return data?.data || [];
};
