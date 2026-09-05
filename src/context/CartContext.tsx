import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode
} from "react";

import type { Product } from "../types";

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  increaseQuantity: (productId: number) => void;
  decreaseQuantity: (productId: number) => void;
  clearCart: () => void;
  total: number;
}

const CartContext =
  createContext<CartContextType | undefined>(
    undefined
  );

export const CartProvider = ({
  children
}: {
  children: ReactNode;
}) => {
  const [items, setItems] = useState<CartItem[]>(
    () => {
      const saved = localStorage.getItem("cart");

      return saved ? JSON.parse(saved) : [];
    }
  );

  useEffect(() => {
    localStorage.setItem(
      "cart",
      JSON.stringify(items)
    );
  }, [items]);

  const addToCart = (product: Product) => {
    setItems((current) => {
      const existing = current.find(
        (item) =>
          item.product.id === product.id
      );

      if (existing) {
        return current.map((item) =>
          item.product.id === product.id
            ? {
                ...item,
                quantity: item.quantity + 1
              }
            : item
        );
      }

      return [
        ...current,
        {
          product,
          quantity: 1
        }
      ];
    });
  };

  const removeFromCart = (
    productId: number
  ) => {
    setItems((current) =>
      current.filter(
        (item) =>
          item.product.id !== productId
      )
    );
  };

  const increaseQuantity = (
    productId: number
  ) => {
    setItems((current) =>
      current.map((item) =>
        item.product.id === productId
          ? {
              ...item,
              quantity: item.quantity + 1
            }
          : item
      )
    );
  };

  const decreaseQuantity = (
    productId: number
  ) => {
    setItems((current) =>
      current
        .map((item) =>
          item.product.id === productId
            ? {
                ...item,
                quantity: item.quantity - 1
              }
            : item
        )
        .filter(
          (item) => item.quantity > 0
        )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const total = items.reduce(
    (sum, item) =>
      sum +
      Number(item.product.price) *
        item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
        total
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error(
      "useCart must be used inside CartProvider"
    );
  }

  return context;
};