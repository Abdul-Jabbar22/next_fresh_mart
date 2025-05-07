"use client";

import { useEffect, useState } from "react";
import { ProductType } from "@/types";
import Link from "next/link";
import { Trash2, Pencil } from "lucide-react";

export default function AdminProductsPage() {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchProducts = async () => {
    try {
      const res = await fetch("/api/admin/products", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });

      if (!res.ok) throw new Error("Failed to fetch products");
      const data = await res.json();
      setProducts(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async (id: string) => {
    const confirm = window.confirm("Are you sure you want to delete this product?");
    if (!confirm) return;

    try {
      const res = await fetch(`/api/admin/products/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });

      if (!res.ok) throw new Error("Failed to delete product");
      setProducts(products.filter((product) => product._id !== id));
    } catch (err: any) {
      alert(err.message);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) return <p className="p-4">Loading products...</p>;
  if (error) return <p className="text-red-500 p-4">Error: {error}</p>;

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Admin - Products</h1>
        <Link
          href="/admin/products/new"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Add Product
        </Link>
      </div>

      {products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <div className="overflow-x-auto border rounded-md">
          <table className="min-w-full table-auto text-sm">
            <thead className="bg-green-600 text-white">
              <tr>
                <th className="px-4 py-2 text-left">Image</th>
                <th className="px-4 py-2 text-left">Name</th>
                <th className="px-4 py-2 text-left">Price (Rs)</th>
                <th className="px-4 py-2 text-left">Category</th>
                <th className="px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id} className="border-b">
                  <td className="px-4 py-2">
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-16 h-16 object-contain"
                    />
                  </td>
                  <td className="px-4 py-2">{product.name}</td>
                  <td className="px-4 py-2">{product.price}</td>
                  <td className="px-4 py-2">{product.category}</td>
                  <td className="px-4 py-2 space-x-2">
                    <Link
                      href={`/admin/products/edit/${product._id}`}
                      className="text-blue-600 hover:underline"
                    >
                      <Pencil className="inline w-4 h-4" />
                    </Link>
                    <button
                      onClick={() => deleteProduct(product._id)}
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
