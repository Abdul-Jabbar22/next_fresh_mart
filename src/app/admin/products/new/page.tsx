"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export default function AddProductPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    image: '',
    price: 0,
    stock: 0,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/admin/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error(await res.text());
      toast.success("Product added!");
      router.push('/admin/products');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to add product');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: name === 'price' || name === 'stock' ? Number(value) : value }));
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-gray-900 rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-6 text-white">Add New Product</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required className="w-full p-2 rounded bg-gray-800 text-white" />
        <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} className="w-full p-2 rounded bg-gray-800 text-white" rows={3} />
        <input type="text" name="image" placeholder="Image URL" value={formData.image} onChange={handleChange} required className="w-full p-2 rounded bg-gray-800 text-white" />
        <input type="number" name="price" placeholder="Price" value={formData.price} onChange={handleChange} required className="w-full p-2 rounded bg-gray-800 text-white" />
        <input type="number" name="stock" placeholder="Stock" value={formData.stock} onChange={handleChange} required className="w-full p-2 rounded bg-gray-800 text-white" />
        <button type="submit" disabled={loading} className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50">
          {loading ? 'Adding...' : 'Add Product'}
        </button>
      </form>
    </div>
  );
}
