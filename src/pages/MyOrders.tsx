import { useEffect, useState } from "react";

import { getMyOrders } from "../api/order.api";
import type { Order } from "../types";

const MyOrders = () => {
  const [orders, setOrders] =
    useState<Order[]>([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    getMyOrders()
      .then(setOrders)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="py-20 text-center">
        Loading orders...
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">

      <h1 className="text-4xl font-black">
        My Orders
      </h1>

      <div className="mt-8 space-y-5">

        {orders.length === 0 ? (
          <div className="rounded-3xl border bg-white p-12 text-center">
            <h2 className="text-xl font-bold">
              No orders yet
            </h2>
          </div>
        ) : (
          orders.map((order) => (
            <div
              key={order.id}
              className="rounded-3xl border bg-white p-6 shadow-sm"
            >

              <div className="flex flex-wrap justify-between gap-4">

                <div>
                  <p className="text-sm text-slate-500">
                    Order #{order.id}
                  </p>

                  <h2 className="mt-1 text-xl font-bold">
                    ${Number(
                      order.totalAmount
                    ).toFixed(2)}
                  </h2>
                </div>

                <span className="h-fit rounded-full bg-indigo-50 px-4 py-2 text-sm font-bold text-indigo-600">
                  {order.status}
                </span>

              </div>

              <div className="mt-5 border-t pt-5">
                {order.items?.map(
                  (item) => (
                    <div
                      key={item.id}
                      className="flex justify-between py-2 text-sm"
                    >
                      <span>
                        {item.product?.name ||
                          `Product #${item.productId}`}
                        {" × "}
                        {item.quantity}
                      </span>

                      <span>
                        $
                        {Number(
                          item.price
                        ).toFixed(2)}
                      </span>
                    </div>
                  )
                )}
              </div>

            </div>
          ))
        )}

      </div>
    </div>
  );
};

export default MyOrders;