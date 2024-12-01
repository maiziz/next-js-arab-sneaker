export const categories = [
  'رياضي',
  'كاجوال',
  'كلاسيكي',
  'أحذية الجري',
  'أحذية كرة القدم'
];

export const brands = [
  { id: 'nike', name: 'Nike', nameAr: 'نايك' },
  { id: 'adidas', name: 'Adidas', nameAr: 'اديداس' },
  { id: 'puma', name: 'Puma', nameAr: 'بوما' },
  { id: 'newbalance', name: 'New Balance', nameAr: 'نيو بالانس' },
  { id: 'reebok', name: 'Reebok', nameAr: 'ريبوك' }
];

export const availableSizes = [
  '36', '37', '38', '39', '40', '41', '42', '43', '44', '45'
];

export interface Product {
  id: number;
  name: string;
  brand: string;
  brandAr: string;
  category: string;
  price: number;
  description: string;
  image: string;
  rating: number;
  reviews: number;
  isNewArrival?: boolean;
  colors: string[];
  sizes: string[];
}

export const productData: Product[] = [
  {
    id: 1,
    name: 'نايك اير جوردن 1 هاي',
    brand: 'Nike',
    brandAr: 'نايك',
    category: 'رياضي',
    price: 24999,
    description: 'حذاء رياضي كلاسيكي بتصميم عصري وأنيق',
    image: '/images/products/nike-air-jordan.jpg',
    rating: 4.8,
    reviews: 245,
    isNewArrival: true,
    colors: ['أسود', 'أحمر', 'أبيض'],
    sizes: ['40', '41', '42', '43', '44']
  },
  {
    id: 2,
    name: 'اديداس ألترا بوست',
    brand: 'Adidas',
    brandAr: 'اديداس',
    category: 'أحذية الجري',
    price: 19999,
    description: 'حذاء رياضي مريح مثالي للجري والتمارين الرياضية',
    image: '/images/products/adidas-ultraboost.jpg',
    rating: 4.6,
    reviews: 189,
    colors: ['أسود', 'رمادي', 'أزرق'],
    sizes: ['39', '40', '41', '42', '43']
  },
  {
    id: 3,
    name: 'نيو بالانس 574',
    brand: 'New Balance',
    brandAr: 'نيو بالانس',
    category: 'كاجوال',
    price: 15999,
    description: 'حذاء كاجوال عصري مريح للاستخدام اليومي',
    image: '/images/products/new-balance-574.jpg',
    rating: 4.5,
    reviews: 156,
    colors: ['رمادي', 'أسود', 'أبيض'],
    sizes: ['40', '41', '42', '43']
  }
];

export const getProductsByCategory = (category: string): Product[] => {
  return productData.filter(product => product.category === category);
};

export const getProductsByBrand = (brand: string): Product[] => {
  return productData.filter(product => product.brand === brand);
};

export const getProductById = (id: number): Product | undefined => {
  return productData.find(product => product.id === id);
};

export const newArrivals = productData.filter(product => product.isNewArrival);
