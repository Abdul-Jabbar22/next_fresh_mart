"use client";

import { ReactNode, useEffect, useState } from "react";
import Link from "next/link";
import { Pencil, Trash2 } from "lucide-react";
import Loader from "@/component/Loader";

interface Order {
  _id: string;
  userName: string;
  email: string;
  total: number;
  status: string;
  createdAt: string;
}

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchOrders = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/admin/orders", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      if (!res.ok) throw new Error("Failed to fetch orders");
      const data = await res.json();
      setOrders(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  console.log("orders>>>",orders);
  

  const deleteOrder = async (orderId: string) => {
    if (!confirm("Are you sure you want to delete this order?")) return;

    try {
      const res = await fetch(`/api/admin/orders/${orderId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      if (!res.ok) throw new Error("Failed to delete order");
      setOrders((prev) => prev.filter((order) => order._id !== orderId));
    } catch (err: any) {
      alert(err.message);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (loading) return <Loader/>
  if (error) return <p className="text-red-500 p-4">Error: {error}</p>;

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-black">Admin - Orders</h1>

      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div className="overflow-x-auto border rounded-md">
          <table className="min-w-full table-auto text-sm">
            <thead className="bg-green-600 text-white">
              <tr>
                <th className="px-4 py-2 text-left">Customer</th>
                <th className="px-4 py-2 text-left">Email</th>
                <th className="px-4 py-2 text-left">Total</th>
                <th className="px-4 py-2 text-left">Status</th>
                <th className="px-4 py-2 text-left">Date</th>
                <th className="px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id} className="border-b">
                  <td className="px-4 py-2 text-gray-500">{order.userName}</td>
                  <td className="px-4 py-2  text-gray-500">{order.email}</td>
                  <td className="px-4 py-2  text-gray-500">Rs {order.total}</td>
                  <td className="px-4 py-2  text-gray-500">{order.status}</td>
                  <td className="px-4 py-2  text-gray-500">{new Date(order.createdAt).toLocaleDateString()}</td>
                  <td className="px-4 py-2 space-x-2">
                    <Link
                      href={`/admin/orders/edit/${order._id}`}
                      className="text-blue-600 hover:underline"
                    >
                      <Pencil className="inline w-4 h-4" />
                    </Link>
                    <button
                      onClick={() => deleteOrder(order._id)}
                      className="text-red-600 hover:underline"
                    >
                      <Trash2 className="inline w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
