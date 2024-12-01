'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '../context/CartContext';
import { wilayas } from '../data/algerianWilayas';

interface DeliveryFormProps {
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => void;
}

interface DeliveryInfo {
  fullName: string;
  phoneNumber: string;
  wilaya: string;
  address: string;
}

export default function DeliveryForm({ onClose, onSubmit }: DeliveryFormProps) {
  const router = useRouter();
  const { clearCart } = useCart();
  const [deliveryInfo, setDeliveryInfo] = useState<DeliveryInfo>({
    fullName: '',
    phoneNumber: '',
    wilaya: '',
    address: ''
  });

  const [errors, setErrors] = useState<Partial<DeliveryInfo>>({});
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setDeliveryInfo(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name as keyof DeliveryInfo]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors: Partial<DeliveryInfo> = {};
    
    if (!deliveryInfo.fullName.trim()) {
      newErrors.fullName = 'الرجاء إدخال الاسم الكامل';
    }
    
    if (!deliveryInfo.phoneNumber.trim()) {
      newErrors.phoneNumber = 'الرجاء إدخال رقم الهاتف';
    } else if (!/^0[567][0-9]{8}$/.test(deliveryInfo.phoneNumber)) {
      newErrors.phoneNumber = 'رقم الهاتف غير صحيح';
    }
    
    if (!deliveryInfo.wilaya) {
      newErrors.wilaya = 'الرجاء اختيار الولاية';
    }
    
    if (!deliveryInfo.address.trim()) {
      newErrors.address = 'الرجاء إدخال العنوان';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setLoading(true);
      try {
        // Show success message
        setShowSuccess(true);
        
        // Wait for 3 seconds to show the success message
        await new Promise(resolve => setTimeout(resolve, 3000));
        
        // Clear cart and redirect
        clearCart();
        router.push('/');
        router.refresh();
      } catch (error) {
        console.error('Error submitting form:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  if (showSuccess) {
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
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            ✕
          </button>
          <h2 className="text-2xl font-bold text-indigo-900">
            معلومات التوصيل
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700 mb-2" htmlFor="fullName">
              الاسم الكامل
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={deliveryInfo.fullName}
              onChange={handleChange}
              className={`w-full p-3 border rounded-lg ${
                errors.fullName ? 'border-red-500' : 'border-gray-300'
              }`}
              dir="rtl"
              disabled={loading}
            />
            {errors.fullName && (
              <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>
            )}
          </div>

          <div>
            <label className="block text-gray-700 mb-2" htmlFor="phoneNumber">
              رقم الهاتف
            </label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              value={deliveryInfo.phoneNumber}
              onChange={handleChange}
              placeholder="0XXXXXXXXX"
              className={`w-full p-3 border rounded-lg ${
                errors.phoneNumber ? 'border-red-500' : 'border-gray-300'
              }`}
              dir="ltr"
              disabled={loading}
            />
            {errors.phoneNumber && (
              <p className="text-red-500 text-sm mt-1">{errors.phoneNumber}</p>
            )}
          </div>

          <div>
            <label className="block text-gray-700 mb-2" htmlFor="wilaya">
              الولاية
            </label>
            <select
              id="wilaya"
              name="wilaya"
              value={deliveryInfo.wilaya}
              onChange={handleChange}
              className={`w-full p-3 border rounded-lg ${
                errors.wilaya ? 'border-red-500' : 'border-gray-300'
              }`}
              dir="rtl"
              disabled={loading}
            >
              <option value="">اختر الولاية</option>
              {wilayas.map((wilaya) => (
                <option key={wilaya.code} value={wilaya.name}>
                  {wilaya.name}
                </option>
              ))}
            </select>
            {errors.wilaya && (
              <p className="text-red-500 text-sm mt-1">{errors.wilaya}</p>
            )}
          </div>

          <div>
            <label className="block text-gray-700 mb-2" htmlFor="address">
              العنوان
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={deliveryInfo.address}
              onChange={handleChange}
              className={`w-full p-3 border rounded-lg ${
                errors.address ? 'border-red-500' : 'border-gray-300'
              }`}
              dir="rtl"
              disabled={loading}
            />
            {errors.address && (
              <p className="text-red-500 text-sm mt-1">{errors.address}</p>
            )}
          </div>

          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              disabled={loading}
            >
              إلغاء
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50"
              disabled={loading}
            >
              {loading ? 'جاري التأكيد...' : 'تأكيد الطلب'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
