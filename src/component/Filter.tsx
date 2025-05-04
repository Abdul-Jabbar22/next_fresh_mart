"use client"
import { useState } from "react";
type FilterProps = {
    category: string;
    setCategory: (val: string) => void;
    priceRange: string;
    setPriceRange: (val: string) => void;
    sortBy: string;
    setSortBy: (val: string) => void;
    resetFilters: () => void;
  };
  
const Filter = () => {
  const [category, setCategory] = useState('');
  const [priceRange, setPriceRange] = useState('');
  const [sortBy, setSortBy] = useState('');

  const resetFilters = () => {
    setCategory('');
    setPriceRange('');
    setSortBy('');
  };

  return (
    <div className="w-full sm:w-64 bg-white border border-gray-200 p-4 rounded-xl shadow-md mr-0 sm:mr-6 mb-4 sm:mb-0">
      <h3 className="text-lg font-semibold mb-4 text-black">Filter</h3>

      {/* Category */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1 text-gray-700">Category</label>
        <select
          className="w-full p-2 border rounded-md text-black
          "
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">All</option>
          <option value="apple">Apple</option>
          <option value="banana">Banana</option>
          <option value="orange">Orange</option>
        </select>
      </div>

      {/* Price Range */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1 text-gray-700">Price Range</label>
        <select
          className="w-full p-2 border rounded-md text-black"
          value={priceRange}
          onChange={(e) => setPriceRange(e.target.value)}
        >
          <option value="">All</option>
          <option value="0-10">Rs0 - Rs10</option>
          <option value="10-20">Rs10 - Rs20</option>
          <option value="20-50">Rs250 - Rs550</option>
        </select>
      </div>

      {/* Sort By */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1 text-gray-700">Sort By</label>
        <select
          className="w-full p-2 border rounded-md text-black"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="">Default</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
        </select>
      </div>

      {/* Reset Button */}
      <button
        onClick={resetFilters}
        className="w-full mt-2 bg-gray-100 hover:bg-gray-200 text-sm text-gray-800 py-2 rounded-md"
      >
        Reset Filters
      </button>
    </div>
  );
};

export default Filter;
