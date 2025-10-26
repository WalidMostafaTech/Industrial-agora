import api from "./api";

export const addProductApi = async (formData) => {
  const { data } = await api.post("/product", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return data;
};

export const addSubscribe = async (formData) => {
  const { data } = await api.post("/subscribe", formData);
  return data;
};

export const getProductsByCategory = async (categoryID, page = 1) => {
  const { data } = await api.get(`/products-by-category/${categoryID}`, {
    params: { page },
  });
  return data?.data || [];
};

export const getProductsByType = async (payload) => {
  const { data } = await api.get(`/get-products`, { params: payload });
  return data?.data || [];
};

export const getProductDetails = async (id) => {
  const { data } = await api.get(`/product/${id}`);
  return data?.data || [];
};

export const getCategoryDetails = async (id) => {
  const { data } = await api.get(`/categories/${id}`);
  return data?.data || [];
};

export const getProductsOutSource = async (page = 1) => {
  const { data } = await api.get(`/products`, { params: { page } });
  return data?.data || [];
};
