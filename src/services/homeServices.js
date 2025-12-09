import api from "./api";

export const getSliders = async () => {
  const { data } = await api.get("/banners");
  return data?.data || [];
};

export const getFeatures = async () => {
  const { data } = await api.get("/features");
  return data?.data || [];
};

export const getMainCategories = async () => {
  const { data } = await api.get("/main-categories");
  return data?.data || [];
};

export const getServices = async () => {
  const { data } = await api.get("/services");
  return data?.data || [];
};

export const getMissionAndVisionAndSolution = async () => {
  const { data } = await api.get("/mission-vission-solution");
  return data?.data || [];
};

export const getPartners = async () => {
  const { data } = await api.get("/partners");
  return data?.data || [];
};

export const getFooter = async () => {
  const { data } = await api.get("/footer");
  return data?.data || [];
};

export const sendNewsletter = async (email) => {
  const { data } = await api.post("/newsletter", { email });
  return data?.data || [];
};

export const getSearch = async (query) => {
  const { data } = await api.get("/search", {
    params: { query },
  });
  return data?.data || {};
};
