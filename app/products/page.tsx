'use client';

import { useState } from 'react';
import { productData } from '../data/products';
import ProductCard from '../components/ProductCard';
import FilterContent from '../components/FilterContent';

export default function ProductsPage() {
  // Filter states
  const [priceRange, setPriceRange] = useState([0, 50000]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Reset filters
  const resetFilters = () => {
    setPriceRange([0, 50000]);
    setSelectedBrands([]);
  };

  // Filter products
  const filteredProducts = productData.filter(product => {
    const priceInRange = product.price <= priceRange[1];
    const brandMatch = selectedBrands.length === 0 || selectedBrands.includes(product.brand);
    return priceInRange && brandMatch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">تسوق الأحذية</h1>
        
        {/* Mobile filter dialog */}
        <button
          type="button"
          className="inline-flex items-center lg:hidden"
          onClick={() => setMobileFiltersOpen(true)}
        >
          <span className="text-sm font-medium text-gray-700">تصفية</span>
          <svg
            className="mr-2 h-5 w-5 text-gray-400"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      <div className="lg:grid lg:grid-cols-4 lg:gap-x-8">
        {/* Filters */}
        <div className="hidden lg:block">
          <FilterContent
            priceRange={priceRange}
            setPriceRange={setPriceRange}
            selectedBrands={selectedBrands}
            setSelectedBrands={setSelectedBrands}
            resetFilters={resetFilters}
          />
        </div>

        {/* Product grid */}
        <div className="lg:col-span-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.length === 0 ? (
              <div className="col-span-full text-center py-12 bg-white rounded-lg">
                <p className="text-gray-500 text-lg">
                  لا توجد منتجات تطابق معايير البحث
                </p>
              </div>
            ) : (
              filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))
            )}
          </div>
        </div>
      </div>

      {/* Mobile filter dialog */}
      {mobileFiltersOpen && (
        <div className="fixed inset-0 flex z-40 lg:hidden">
          <div className="fixed inset-0 bg-black bg-opacity-25" onClick={() => setMobileFiltersOpen(false)} />
          <div className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-6 shadow-xl">
            <div className="flex items-center justify-between px-4">
              <h2 className="text-lg font-medium text-gray-900">تصفية المنتجات</h2>
              <button
                type="button"
                className="text-gray-400 hover:text-gray-500"
                onClick={() => setMobileFiltersOpen(false)}
              >
                <span className="sr-only">إغلاق القائمة</span>
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="mt-4 px-4">
              <FilterContent
                priceRange={priceRange}
                setPriceRange={setPriceRange}
                selectedBrands={selectedBrands}
                setSelectedBrands={setSelectedBrands}
                resetFilters={resetFilters}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
