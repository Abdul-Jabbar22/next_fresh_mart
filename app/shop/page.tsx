import ProductCard from "@/component/ProductCard"; // ✅ correct path (check folder name)

async function getProducts(): Promise<Product[]> {
  const res = await fetch("http://localhost:3000/api/products", {
    cache: "no-store",
  });
  return res.json();
}

export default async function Shop() {
  const products = await getProducts();

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Shop Fruits & Vegetables</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />

        ))}
      </div>
    </div>
  );
}
