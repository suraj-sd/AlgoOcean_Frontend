import api from "./axios";
import type { Category } from "../types";

export const getCategories = async (): Promise<Category[]> => {
  const response = await api.get("/categories");

  return response.data.data;
};

export const createCategory = async (name: string) => {
  const response = await api.post("/categories", {
    name,
  });

  return response.data;
};

export const updateCategory = async (id: number, name: string) => {
  const response = await api.put(`/categories/${id}`, {
    name,
  });

  return response.data;
};

export const deleteCategory = async (id: number) => {
  const response = await api.delete(`/categories/${id}`);

  return response.data;
};
