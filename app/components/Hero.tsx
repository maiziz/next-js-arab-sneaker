'use client';

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { newArrivals } from '../data/products';
import type { Product } from '../data/products';

interface ScrollableSectionProps {
  title: string;
  products: Product[];
  icon: React.ReactNode;
  color: string;
}

const ScrollableSection = ({ title, products, icon, color }: ScrollableSectionProps) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleScroll = (direction: 'left' | 'right') => {
    const container = scrollContainerRef.current;
    if (!container) return;
    const scrollAmount = direction === 'right' ? -400 : 400;
    container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ar-DZ', {
      style: 'currency',
      currency: 'DZD'
    }).format(price);
  };

  return (
    <div className="relative mb-12">
      <div 
        className="flex items-center mb-6 gap-4 p-4 rounded-lg shadow-lg"
        style={{ backgroundColor: color }}
      >
        <span className="text-white text-3xl">{icon}</span>
        <h2 className="text-2xl font-bold text-white">{title}</h2>
      </div>

      <div className="relative">
        {/* Scroll Left Button */}
        <button
          onClick={() => handleScroll('left')}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white p-2 rounded-full shadow-md"
        >
          <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Scrollable Container */}
        <div
          ref={scrollContainerRef}
          className="flex overflow-x-auto gap-4 pb-4 scrollbar-hide snap-x"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {products.map((product) => (
            <Link
              key={product.id}
              href={`/product/${product.id}`}
              className="flex-none w-72 snap-start"
            >
              <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                <div className="relative h-72">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 288px"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-1 text-gray-900">{product.name}</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-indigo-600 font-bold">
                      {formatPrice(product.price)}
                    </span>
                    <div className="flex items-center">
                      <span className="text-yellow-400 mr-1">★</span>
                      <span className="text-sm text-gray-600">{product.rating}</span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Scroll Right Button */}
        <button
          onClick={() => handleScroll('right')}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white p-2 rounded-full shadow-md"
        >
          <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default function Hero() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* New Arrivals Section */}
      <ScrollableSection
        title="وصل حديثاً"
        products={newArrivals}
        icon={
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
          </svg>
        }
        color="#4f46e5"
      />

      {/* Featured Section */}
      <ScrollableSection
        title="منتجات مميزة"
        products={newArrivals.slice(0, 4)} // Using a subset of products for featured items
        icon={
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        }
        color="#dc2626"
      />
    </div>
  );
}
