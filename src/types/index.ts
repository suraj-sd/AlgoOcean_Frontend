export type UserRole = "USER" | "ADMIN";

export interface User {
  id: number;
  name: string;
  email: string;
  role: UserRole;
}

export interface Category {
  id: number;
  name: string;
}

export interface Product {
  id: number;
  name: string;
  description?: string | null;
  price: string | number;
  stock: number;
  categoryId: number;
  category?: Category;
}

export type OrderStatus =
  | "PENDING"
  | "CONFIRMED"
  | "PROCESSING"
  | "SHIPPED"
  | "DELIVERED"
  | "CANCELLED";

export interface OrderItem {
  id: number;
  productId: number;
  quantity: number;
  price: string | number;
  product?: Product;
}

export interface Order {
  id: number;
  userId: number;
  status: OrderStatus;
  totalAmount: string | number;
  items: OrderItem[];
  createdAt: string;
  updatedAt: string;
}
