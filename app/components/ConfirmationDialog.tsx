'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '../context/CartContext';

interface ConfirmationDialogProps {
  open: boolean;
  onClose: () => void;
}

export default function ConfirmationDialog({ open, onClose }: ConfirmationDialogProps) {
  const router = useRouter();
  const { clearCart } = useCart();

  useEffect(() => {
    if (open) {
      // Clear cart and redirect after 2 seconds
      const timer = setTimeout(() => {
        clearCart();
        onClose();
        router.push('/');
        router.refresh(); // Force a refresh to update the cart state
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [open, clearCart, onClose, router]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-indigo-900 mb-4">
            شكراً لك!
          </h2>
          <p className="text-gray-600 mb-4">
            تم استلام طلبك بنجاح
          </p>
          <p className="text-gray-600">
            سيتم معالجة طلبك والاتصال بك خلال 24 ساعة القادمة
          </p>

          <button
            onClick={onClose}
            className="mt-6 bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            حسناً
          </button>
        </div>
      </div>
    </div>
  );
}
