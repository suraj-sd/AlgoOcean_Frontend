import { useEffect, useState } from "react";

import {
  getAllOrders,
  updateOrderStatus
} from "../../api/order.api";

import type {
  Order,
  OrderStatus
} from "../../types";

const statuses: OrderStatus[] = [
  "PENDING",
  "CONFIRMED",
  "PROCESSING",
  "SHIPPED",
  "DELIVERED",
  "CANCELLED"
];

const AdminOrders = () => {
  const [orders, setOrders] =
    useState<Order[]>([]);

  const loadOrders = async () => {
    const data = await getAllOrders();

    setOrders(data);
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const changeStatus = async (
    id: number,
    status: OrderStatus
  ) => {
    try {
      await updateOrderStatus(
        id,
        status
      );

      await loadOrders();
    } catch (error: any) {
      alert(
        error?.response?.data?.message ||
        "Unable to update order"
      );
    }
  };

  return (
    <div>

      <h1 className="text-4xl font-black">
        Orders
      </h1>

      <div className="mt-8 space-y-5">

        {orders.map((order) => (
          <div
            key={order.id}
            className="rounded-3xl border bg-white p-6"
          >

            <div className="flex flex-wrap justify-between gap-5">

              <div>
                <p className="text-sm text-slate-500">
                  Order #{order.id}
                </p>

                <p className="mt-1 text-xl font-black">
                  $
                  {Number(
                    order.totalAmount
                  ).toFixed(2)}
                </p>
              </div>

              <select
                value={order.status}
                onChange={(e) =>
                  changeStatus(
                    order.id,
                    e.target.value as OrderStatus
                  )
                }
                className="rounded-xl border px-4 py-2 font-semibold"
              >
                {statuses.map(
                  (status) => (
                    <option
                      key={status}
                      value={status}
                    >
                      {status}
                    </option>
                  )
                )}
              </select>

            </div>

          </div>
        ))}

      </div>

    </div>
  );
};

export default AdminOrders;