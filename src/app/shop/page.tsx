import Filter from "@/component/Filter";
import ProductCard from "@/component/ProductCard";

type Product = {
  _id: string;
  name: string;
  category: string;
  price: number;
  image: string;
};
async function getProducts(): Promise<Product[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL }/api/products`, {
    cache: "no-store",
  });
  return res.json();
}

export default async function Shop() {
  const products = await getProducts();

  return (
    <div className="p-4 sm:p-6">
    <div className="flex flex-col lg:flex-row gap-6">
      
      {/* Sidebar Filter */}
      <div className=" lg:w-1/3 ">
      <Filter />
      </div>
  
      {/* Product Listing */}
      <div className="w-full lg:w-3/4">
        <h2 className="text-xl sm:text-2xl font-semibold text-black mb-4">
          All Fruits
        </h2>
  
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 xl:grid-cols-5 gap-6">
     
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>
  
    </div>
  </div>
  

  
  
  
  );
}
