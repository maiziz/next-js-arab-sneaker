'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const pathname = usePathname();
  const { cartItems } = useCart();
  const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo/Home Link */}
          <Link 
            href="/"
            className="text-indigo-900 font-bold text-2xl hover:text-indigo-950 transition-colors"
          >
            Arab Sneaker
          </Link>

          <div className="flex items-center gap-6">
            {/* Products Link */}
            <Link
              href="/products"
              className={`text-indigo-900 hover:text-indigo-950 transition-colors ${
                pathname === '/products' ? 'font-semibold' : ''
              }`}
            >
              المنتجات
            </Link>

            {/* Cart Link */}
            <Link
              href="/cart"
              className="relative text-indigo-900 hover:text-indigo-950 transition-colors"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-6 w-6" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" 
                />
              </svg>
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
