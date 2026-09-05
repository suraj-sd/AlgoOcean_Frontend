import api from "./axios";
import type { Product } from "../types";

export interface ProductQuery {
  page?: number;
  limit?: number;
  search?: string;
  categoryId?: number;
  minPrice?: number;
  maxPrice?: number;
}

export const getProducts = async (params?: ProductQuery) => {
  const response = await api.get("/products", {
    params,
  });

  return response.data;
};

export const getProductById = async (id: number): Promise<Product> => {
  const response = await api.get(`/products/${id}`);

  return response.data.data;
};

export const createProduct = async (data: {
  name: string;
  description?: string;
  price: number;
  stock: number;
  categoryId: number;
}) => {
  const response = await api.post("/products", data);

  return response.data;
};

// export const updateProduct = async (
//   id: number,
//   data: Partial<{
//     name: string;
//     description: string;
//     price: number;
//     stock: number;
//     categoryId: number;
//   }>,
// ) => {
//   const response = await api.put(`/products/${id}`, data);

//   return response.data;
// };

export const deleteProduct = async (id: number) => {
  const response = await api.delete(`/products/${id}`);

  return response.data;
};
