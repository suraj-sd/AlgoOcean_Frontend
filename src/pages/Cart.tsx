import { Link, useNavigate } from "react-router-dom";
import {
  Minus,
  Plus,
  Trash2
} from "lucide-react";

import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { createOrder } from "../api/order.api";

const Cart = () => {
  const {
    items,
    total,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    clearCart
  } = useCart();

  const { user } = useAuth();

  const navigate = useNavigate();

  const checkout = async () => {
    if (!user) {
      navigate("/login");
      return;
    }

    try {
      await createOrder(
        items.map((item) => ({
          productId: item.product.id,
          quantity: item.quantity
        }))
      );

      clearCart();

      navigate("/orders");
    } catch (error: any) {
      alert(
        error?.response?.data?.message ||
        "Order creation failed"
      );
    }
  };

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-24 text-center">
        <h1 className="text-4xl font-black">
          Your cart is empty
        </h1>

        <p className="mt-3 text-slate-500">
          Add some products to get started.
        </p>

        <Link
          to="/products"
          className="mt-7 inline-block rounded-xl bg-indigo-600 px-6 py-3 font-bold text-white"
        >
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">

      <h1 className="text-4xl font-black">
        Shopping Cart
      </h1>

      <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_350px]">

        <div className="space-y-4">

          {items.map((item) => (
            <div
              key={item.product.id}
              className="flex items-center justify-between rounded-2xl border bg-white p-5"
            >

              <div>
                <h3 className="font-bold">
                  {item.product.name}
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  ${Number(item.product.price).toFixed(2)}
                </p>
              </div>

              <div className="flex items-center gap-4">

                <div className="flex items-center rounded-xl border">
                  <button
                    onClick={() =>
                      decreaseQuantity(
                        item.product.id
                      )
                    }
                    className="p-2"
                  >
                    <Minus size={16} />
                  </button>

                  <span className="px-3">
                    {item.quantity}
                  </span>

                  <button
                    onClick={() =>
                      increaseQuantity(
                        item.product.id
                      )
                    }
                    className="p-2"
                  >
                    <Plus size={16} />
                  </button>
                </div>

                <button
                  onClick={() =>
                    removeFromCart(
                      item.product.id
                    )
                  }
                  className="text-red-500"
                >
                  <Trash2 size={19} />
                </button>

              </div>

            </div>
          ))}

        </div>

        <div className="h-fit rounded-3xl border bg-white p-7 shadow-sm">

          <h2 className="text-xl font-bold">
            Order Summary
          </h2>

          <div className="mt-6 flex justify-between text-slate-500">
            <span>Subtotal</span>
            <span>
              ${total.toFixed(2)}
            </span>
          </div>

          <div className="my-5 border-t" />

          <div className="flex justify-between text-xl font-black">
            <span>Total</span>
            <span>
              ${total.toFixed(2)}
            </span>
          </div>

          <button
            onClick={checkout}
            className="mt-7 w-full rounded-xl bg-indigo-600 py-3 font-bold text-white hover:bg-indigo-500"
          >
            Checkout
          </button>

        </div>

      </div>
    </div>
  );
};

export default Cart;