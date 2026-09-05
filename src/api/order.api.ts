import api from "./axios";
import type { Order, OrderStatus } from "../types";

export interface CreateOrderItem {
  productId: number;
  quantity: number;
}

export const createOrder = async (items: CreateOrderItem[]) => {
  const response = await api.post("/orders", {
    items,
  });

  return response.data;
};

export const getMyOrders = async (): Promise<Order[]> => {
  const response = await api.get("/orders");

  return response.data.data;
};

export const getAllOrders = async (): Promise<Order[]> => {
  const response = await api.get("/orders/admin");

  return response.data.data;
};

export const getOrderById = async (id: number): Promise<Order> => {
  const response = await api.get(`/orders/${id}`);

  return response.data.data;
};

export const updateOrderStatus = async (id: number, status: OrderStatus) => {
  const response = await api.patch(`/orders/${id}/status`, {
    status,
  });

  return response.data;
};
