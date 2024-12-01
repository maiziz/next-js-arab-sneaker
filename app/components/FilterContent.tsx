'use client';

import { brands } from '../data/products';

interface FilterContentProps {
  priceRange: number[];
  setPriceRange: (range: number[]) => void;
  selectedBrands: string[];
  setSelectedBrands: (brands: string[]) => void;
  resetFilters: () => void;
}

export default function FilterContent({
  priceRange,
  setPriceRange,
  selectedBrands,
  setSelectedBrands,
  resetFilters,
}: FilterContentProps) {
  const handleBrandChange = (brand: string) => {
    if (selectedBrands.includes(brand)) {
      setSelectedBrands(selectedBrands.filter((b) => b !== brand));
    } else {
      setSelectedBrands([...selectedBrands, brand]);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ar-DZ', {
      style: 'currency',
      currency: 'DZD',
    }).format(price);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      <div className="border-b border-gray-200 pb-4">
        <h3 className="text-lg font-medium text-gray-900 mb-2">السعر</h3>
        <div className="mt-4 space-y-4">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <span>{formatPrice(priceRange[0])}</span>
            <span>{formatPrice(priceRange[1])}</span>
          </div>
          <input
            type="range"
            min="0"
            max="50000"
            step="1000"
            value={priceRange[1]}
            onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
        </div>
      </div>

      <div className="border-b border-gray-200 py-4">
        <h3 className="text-lg font-medium text-gray-900 mb-2">الماركات</h3>
        <div className="space-y-2">
          {brands.map((brand) => (
            <label key={brand.id} className="flex items-center">
              <input
                type="checkbox"
                checked={selectedBrands.includes(brand.name)}
                onChange={() => handleBrandChange(brand.name)}
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <span className="mr-2 text-gray-600">{brand.nameAr}</span>
            </label>
          ))}
        </div>
      </div>

      <button
        onClick={resetFilters}
        className="mt-4 w-full bg-gray-100 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-200 transition-colors"
      >
        إعادة تعيين التصفية
      </button>
    </div>
  );
}
