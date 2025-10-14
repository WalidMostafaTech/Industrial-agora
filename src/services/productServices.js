import api from "./api";

export const addProductApi = async (formData) => {
  const { data } = await api.post("/product", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return data;
};
