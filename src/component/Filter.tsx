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
    <div className="h-full bg-white border border-gray-200 p-4 rounded-xl shadow-md mr-0 sm:mr-6 mb-4 sm:mb-0">
    <h3 className="text-lg font-semibold mb-4 text-gray-800">Filter</h3>
  
    {/* Category */}
    <div className="mb-4">
      <label className="block text-sm font-medium mb-1 text-gray-700">Category</label>
      <select
        className="w-full p-2 border border-gray-300 rounded-md text-gray-800 focus:ring-2 focus:ring-green-500 focus:border-green-500"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="">All</option>
        <option value="apple">Fruits</option>
        <option value="apple">Vegitables</option>
       
      </select>
    </div>
  
    {/* Price Range */}
    <div className="mb-4">
      <label className="block text-sm font-medium mb-1 text-gray-700">Price Range</label>
      <select
        className="w-full p-2 border border-gray-300 rounded-md text-gray-800 focus:ring-2 focus:ring-green-500 focus:border-green-500"
        value={priceRange}
        onChange={(e) => setPriceRange(e.target.value)}
      >
        <option value="">All</option>
        <option value="10-20">Rs500 - Rs1000</option>
        <option value="20-50">Rs1200 - Rs2500</option>
      </select>
    </div>
  
 
    {/* Rating */}
    <div className="mb-4">
      <label className="block text-sm font-medium mb-1 text-gray-700">Rating</label>
      <select
        className="w-full p-2 border border-gray-300 rounded-md text-gray-800 focus:ring-2 focus:ring-green-500 focus:border-green-500"
      >
        <option>All Ratings</option>
        <option className="text-yellow-400">★★★★★</option>
        <option className="text-yellow-400">★★★★☆</option>
        <option className="text-yellow-400">★★★☆☆</option>
      </select>
    </div>
    
    {/* Availability Filter */}
    <div className="mb-4">
      <label className="flex items-center text-sm font-medium text-gray-700">
        <input 
          type="checkbox" 
          className="mr-2 h-4 w-4 text-green-500 border-gray-300 rounded focus:ring-green-500"
        />
        In Stock Only
      </label>
    </div>
  
    {/* Reset Button */}
    <button
      onClick={resetFilters}
      className="w-full mt-4 bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-md transition duration-150 ease-in-out"
    >
      Reset Filters
    </button>
  </div>
  );
};

export default Filter;
