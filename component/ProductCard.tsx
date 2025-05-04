type Product = {
  _id: string;
  name: string;
  category: string;
  price: number;
  image: string;
};

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="border rounded-xl p-4 shadow-sm hover:shadow-md transition">
      <img src={product.image} alt={product.name} className="w-full h-48 object-cover rounded-md" />
      <h3 className="text-lg font-semibold mt-2">{product.name}</h3>
      <p className="text-sm text-gray-500">{product.category}</p>
      <p className="text-green-600 font-bold mt-1">${product.price.toFixed(2)}</p>
    </div>
  );
}
