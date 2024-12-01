'use client';

import { useState, use } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { getProductById } from '../../data/products';
import { useCart } from '../../context/CartContext';
import toast from 'react-hot-toast';

export default function ProductDetail({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [error, setError] = useState('');

  const resolvedParams = use(params);
  const product = getProductById(parseInt(resolvedParams.id));

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16">
        <h1 className="text-2xl text-center text-gray-900">المنتج غير موجود</h1>
      </div>
    );
  }

  const handleAddToCart = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate selections
    if (!selectedSize) {
      setError('الرجاء اختيار المقاس');
      toast.error('الرجاء اختيار المقاس');
      return;
    }
    if (!selectedColor) {
      setError('الرجاء اختيار اللون');
      toast.error('الرجاء اختيار اللون');
      return;
    }

    // Check if selected size and color are available
    const sizeAvailable = product.sizes.includes(selectedSize);
    const colorAvailable = product.colors.includes(selectedColor);

    if (!sizeAvailable || !colorAvailable) {
      setError('عذراً، هذا المقاس أو اللون غير متوفر حالياً');
      toast.error('عذراً، هذا المقاس أو اللون غير متوفر حالياً');
      return;
    }

    // Add to cart
    addToCart(product, selectedSize, selectedColor);
    
    // Show success message
    setError('');
    toast.success('تمت إضافة المنتج إلى السلة');
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ar-DZ', {
      style: 'currency',
      currency: 'DZD'
    }).format(price);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Back Button */}
      <button
        onClick={() => router.back()}
        className="flex items-center text-gray-600 hover:text-gray-900 mb-6"
      >
        <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        العودة
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Image */}
        <div className="relative aspect-square rounded-lg overflow-hidden bg-gray-100">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>

        {/* Product Details */}
        <div className="flex flex-col">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
            <div className="flex items-center mb-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-gray-500 mr-2">({product.reviews} تقييم)</span>
            </div>
            <p className="text-2xl font-bold text-indigo-900">{formatPrice(product.price)}</p>
          </div>

          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2">الوصف</h2>
            <p className="text-gray-600">{product.description}</p>
          </div>

          <form onSubmit={handleAddToCart} className="space-y-6">
            {/* Color Selection */}
            <div>
              <h2 className="text-lg font-semibold mb-2">اللون</h2>
              <div className="flex flex-wrap gap-2">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    type="button"
                    onClick={() => setSelectedColor(color)}
                    className={`px-4 py-2 rounded-md border ${
                      selectedColor === color
                        ? 'border-indigo-600 bg-indigo-50 text-indigo-600'
                        : 'border-gray-300 text-gray-700 hover:border-gray-400'
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div>
              <h2 className="text-lg font-semibold mb-2">المقاس</h2>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 rounded-md border ${
                      selectedSize === size
                        ? 'border-indigo-600 bg-indigo-50 text-indigo-600'
                        : 'border-gray-300 text-gray-700 hover:border-gray-400'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {error && (
              <p className="text-red-600 text-sm">{error}</p>
            )}

            {/* Add to Cart Button */}
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-3 px-6 rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center"
            >
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              إضافة إلى السلة
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
