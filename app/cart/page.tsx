'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '../context/CartContext';
import CartItem from '../components/CartItem';
import CartSummary from '../components/CartSummary';

export default function CartPage() {
  const { cartItems, removeFromCart, updateQuantity } = useCart();

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">سلة التسوق</h1>

      {cartItems.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-500 mb-4">سلة التسوق فارغة</div>
          <Link
            href="/products"
            className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            تصفح المنتجات
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <CartItem
                key={`${item.id}-${item.selectedSize}-${item.selectedColor}`}
                item={item}
                updateQuantity={updateQuantity}
                removeFromCart={() => removeFromCart(item.id)}
              />
            ))}
          </div>

          {/* Cart Summary */}
          <div className="lg:col-span-1">
            <CartSummary cartItems={cartItems} />
          </div>
        </div>
      )}
    </div>
  );
}
