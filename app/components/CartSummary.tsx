'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import DeliveryForm from './DeliveryForm';
import ConfirmationDialog from './ConfirmationDialog';

const DELIVERY_PRICE = 1000; // 1000 DZD delivery cost

interface CartItem {
  id: number;
  price: number;
  quantity: number;
}

interface CartSummaryProps {
  cartItems: CartItem[];
}

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('ar-DZ', {
    style: 'currency',
    currency: 'DZD'
  }).format(price);
};

export default function CartSummary({ cartItems }: CartSummaryProps) {
  const router = useRouter();
  const [showDeliveryForm, setShowDeliveryForm] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const total = subtotal + DELIVERY_PRICE;

  const handleProceedToCheckout = () => {
    setShowDeliveryForm(true);
  };

  const handleDeliverySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowDeliveryForm(false);
    setShowConfirmation(true);
  };

  return (
    <>
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-xl font-bold text-indigo-900 mb-6 text-right">
          ملخص الطلب
        </h2>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">المجموع الفرعي</span>
            <span className="font-medium">{formatPrice(subtotal)}</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-gray-600">رسوم التوصيل</span>
            <span className="font-medium text-emerald-700">{formatPrice(DELIVERY_PRICE)}</span>
          </div>

          <div className="border-t pt-4">
            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold">المجموع الكلي</span>
              <span className="text-lg font-bold text-indigo-900">
                {formatPrice(total)}
              </span>
            </div>
          </div>

          <button
            onClick={handleProceedToCheckout}
            className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg hover:bg-indigo-700 transition-colors mt-4"
          >
            متابعة الدفع
          </button>

          <p className="text-sm text-gray-500 text-center mt-4">
            الأسعار تشمل الضريبة
          </p>
        </div>
      </div>

      {showDeliveryForm && (
        <DeliveryForm
          onClose={() => setShowDeliveryForm(false)}
          onSubmit={handleDeliverySubmit}
        />
      )}

      <ConfirmationDialog
        open={showConfirmation}
        onClose={() => {
          setShowConfirmation(false);
          router.push('/');
        }}
      />
    </>
  );
}
