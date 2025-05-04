import HeroSlider from "@/component/HeroSlider";
import ProductCard from "@/component/ProductCard";

type Product = {
  _id: string;
  name: string;
  category: string;
  price: number;
  image: string;
};

async function getProducts(): Promise<Product[]> {
  try {
    const res = await fetch("http://localhost:3000/api/products", {
      next: { revalidate: 60 }, // Optional: Revalidate data every 60 seconds
    });

    if (!res.ok) {
      throw new Error("Failed to fetch products");
    }

    return await res.json();
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

export default async function Home() {
  const products = await getProducts();

  return (
    <div className="p-6 text-center">
      <HeroSlider />
      <h1 className="text-4xl md:text-5xl font-bold mb-6 text-black">
        Fresh Fruits Delivered to Your Doorstep
      </h1>
      <p className="mt-4 text-gray-600">
        Buy the freshest fruits and vegetables online.
      </p>
      <h6 className="text-4xl md:text-5xl text-left font-bold mb-6 text-black">
        Featured Fruits
      </h6>
      {/* Products Grid */}
      <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
}
