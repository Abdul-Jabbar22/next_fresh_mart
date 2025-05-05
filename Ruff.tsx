// app/shop/page.tsx or app/shop/page.jsx
import Filter from "@/component/Filter";
import ProductCard from "@/component/ProductCard";
import { notFound } from "next/navigation";

type Product = {
  _id: string;
  name: string;
  category: string;
  price: number;
  image: string;
};

async function getProducts(query: string): Promise<Product[]> {
  const res = await fetch(
    `http://localhost:3000/api/products${query ? `?q=${query}` : ""}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    notFound();
  }

  return res.json();
}

type Props = {
  searchParams?: { q?: string };
};

export default async function Shop({ searchParams }: Props) {
  const query = searchParams?.q || "";
  const products = await getProducts(query);

  return (
    <div className="p-4 sm:p-6">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar Filter */}
        <div className="w-full lg:w-1/4">
          <Filter />
        </div>

        {/* Product Listing */}
        <div className="w-full lg:w-3/4">
          <h2 className="text-xl sm:text-2xl font-semibold text-black mb-4">
            {query ? `Results for "${query}"` : "All Fruits"}
          </h2>

          {products.length === 0 ? (
            <p className="text-gray-500">No products found.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
