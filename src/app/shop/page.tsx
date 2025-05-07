"use client";

import { useEffect, useState } from "react";
import Filter from "@/component/Filter";
import ProductCard from "@/component/ProductCard";
import { ProductType } from "@/types";
import Loader from "@/component/Loader";
import Pagination from "@/component/Pagination"; // You'll need to create this component

export default function Shop() {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 1,
  });

  const fetchProducts = async (page = 1, limit = 10) => {
    try {
      setLoading(true);
      const res = await fetch(
        `http://localhost:3000/api/products?page=${page}&limit=${limit}`,
        { cache: "no-store" }
      );
      const data = await res.json();
      setProducts(data.data); // Access the products array from data.data
      setPagination({
        page: data.pagination.page,
        limit: data.pagination.limit,
        total: data.pagination.total,
        totalPages: data.pagination.totalPages,
      });
    } catch (err) {
      console.error("Failed to fetch products:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handlePageChange = (newPage: number) => {
    fetchProducts(newPage, pagination.limit);
  };

  return (
    <div className="p-4 sm:p-6">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar Filter */}
        <div className="lg:w-1/3">
          <Filter />
        </div>

        {/* Product Listing */}
        <div className="w-full lg:w-3/4">
          <h2 className="text-xl sm:text-2xl font-semibold text-black mb-4">
            All Fruits
          </h2>

          {loading ? (
            <Loader />
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 xl:grid-cols-5 gap-6">
                {products.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
              
              {/* Pagination Controls */}
              <div className="mt-8">
                <Pagination
                  currentPage={pagination.page}
                  totalPages={pagination.totalPages}
                  onPageChange={handlePageChange}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}