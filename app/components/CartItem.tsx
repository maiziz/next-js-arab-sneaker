'use client';

import Image from 'next/image';

interface CartItemProps {
  item: {
    id: number;
    name: string;
    image: string;
    price: number;
    selectedSize: string;
    selectedColor: string;
    quantity: number;
  };
  updateQuantity: (id: number, quantity: number) => void;
  removeFromCart: (id: number) => void;
}

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('ar-DZ', {
    style: 'currency',
    currency: 'DZD'
  }).format(price);
};

export default function CartItem({ item, updateQuantity, removeFromCart }: CartItemProps) {
  return (
    <div className="flex flex-col sm:flex-row items-center gap-4 bg-white p-4 rounded-lg shadow-sm">
      <div className="relative w-full sm:w-36 h-36 flex-shrink-0">
        <Image
          src={item.image}
          alt={item.name}
          fill
          className="object-cover rounded"
          sizes="(max-width: 640px) 100vw, 144px"
        />
      </div>

      <div className="flex-grow text-center sm:text-right">
        <h3 className="font-semibold text-gray-900">{item.name}</h3>
        <div className="text-sm text-gray-500 mt-1">
          <span>المقاس: {item.selectedSize}</span>
          <span className="mx-2">|</span>
          <span>اللون: {item.selectedColor}</span>
        </div>
        <div className="text-indigo-600 font-semibold mt-1">
          {formatPrice(item.price)}
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 border rounded-lg overflow-hidden">
          <button
            onClick={() => updateQuantity(item.id, item.quantity - 1)}
            className="px-3 py-1 hover:bg-gray-100 transition-colors"
            disabled={item.quantity <= 1}
          >
            -
          </button>
          <span className="w-8 text-center">{item.quantity}</span>
          <button
            onClick={() => updateQuantity(item.id, item.quantity + 1)}
            className="px-3 py-1 hover:bg-gray-100 transition-colors"
          >
            +
          </button>
        </div>

        <button
          onClick={() => removeFromCart(item.id)}
          className="text-gray-400 hover:text-red-500 transition-colors"
          aria-label="Remove item"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>
    </div>
  );
}
