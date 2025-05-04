import ProductCard from "@/component/ProductCard";

type Product = {
  _id: string;
  name: string;
  category: string;
  price: number;
  image: string;
};
async function getProducts(): Promise<Product[]> {
  const res = await fetch("http://localhost:3000/api/products", {
    cache: "no-store",
  });
  return res.json();
}

export default async function Shop() {
  const products = await getProducts();

  return (
    <div className="p-4 sm:p-6">
      <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-black">
        Shop Fruits & Vegetables
      </h2>
      <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
}
