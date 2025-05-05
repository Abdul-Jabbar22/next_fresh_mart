'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';

type Product = {
  _id: string;
  name: string;
  price: number;
  image: string;
  slug: string;
};

export default function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [results, setResults] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalResults: 0,
    limit: 5
  });

  // Debounced search function
  const performSearch = useCallback(async (searchQuery: string, page: number = 1) => {
    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `/api/search?q=${encodeURIComponent(searchQuery)}&page=${page}&limit=5`
      );
      
      if (!response.ok) {
        throw new Error(await response.text());
      }
      
      const data = await response.json();
      setResults(data.results);
      setPagination(data.pagination);
      
      // Update URL without page reload
      router.replace(`/search?q=${encodeURIComponent(searchQuery)}`, { scroll: false });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Search failed');
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  }, [router]);

  // Initial search on mount if query exists
  useEffect(() => {
    if (query) {
      performSearch(query);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Debounce effect for typing
  useEffect(() => {
    const timer = setTimeout(() => {
      performSearch(query);
    }, 300);

    return () => clearTimeout(timer);
  }, [query, performSearch]);

  const handlePageChange = (newPage: number) => {
    performSearch(query, newPage);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="relative mb-8">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search products..."
          className="w-full p-4 border-2 border-gray-200 rounded-lg text-base focus:outline-none focus:border-blue-500 transition-colors"
        />
        {isLoading && (
          <div className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 border-3 border-gray-200 border-t-blue-500 rounded-full animate-spin"></div>
        )}
      </div>

      {error && (
        <div className="p-4 mb-4 text-red-600 bg-red-50 rounded-lg">
          {error}
        </div>
      )}

      <div className="space-y-4">
        {results.length === 0 && query && !isLoading ? (
          <p className="text-center py-8 text-gray-500">
            No products found for "{query}"
          </p>
        ) : (
          results.map((product) => (
            <Link
              key={product._id}
              href={`/product/${product.slug}`}
              className="flex items-center gap-4 p-4 border border-gray-100 rounded-lg hover:shadow-md transition-shadow no-underline text-gray-800"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-16 h-16 object-cover rounded"
              />
              <div>
                <h3 className="text-lg font-medium">{product.name}</h3>
                <p className="text-blue-600 font-bold">${product.price.toFixed(2)}</p>
              </div>
            </Link>
          ))
        )}
      </div>

      {pagination.totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-8">
          {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              disabled={page === pagination.currentPage}
              className={`px-4 py-2 border rounded ${
                page === pagination.currentPage
                  ? 'bg-blue-500 text-white border-blue-500'
                  : 'bg-white border-gray-300 hover:bg-gray-50'
              }`}
            >
              {page}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}