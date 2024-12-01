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
  description: string;
  price: number;
  image: string;
  category: string;
  sizes: string[];
  colors: string[];
}

export const productData: Product[] = [
  {
    id: 1,
    name: 'نايك اير جوردن',
    description: 'حذاء رياضي مريح وأنيق من نايك، مثالي للرياضة والاستخدام اليومي',
    price: 24999,
    image: 'https://raw.githubusercontent.com/saiik0z/sneaker-imgs/main/nike-air-jordan.png',
    category: 'أحذية رياضية',
    sizes: ['40', '41', '42', '43', '44', '45'],
    colors: ['أسود', 'أحمر', 'أبيض']
  },
  {
    id: 2,
    name: 'نيو بالانس 574',
    description: 'حذاء كلاسيكي من نيو بالانس، مريح للغاية ومناسب للمشي اليومي',
    price: 18999,
    image: 'https://raw.githubusercontent.com/saiik0z/sneaker-imgs/main/new-balance-574.png',
    category: 'أحذية رياضية',
    sizes: ['40', '41', '42', '43', '44'],
    colors: ['رمادي', 'أزرق', 'أسود']
  },
  {
    id: 3,
    name: 'أديداس ألترابوست',
    description: 'حذاء رياضي مبتكر من أديداس، يوفر راحة استثنائية أثناء الجري',
    price: 21999,
    image: 'https://raw.githubusercontent.com/saiik0z/sneaker-imgs/main/adidas-ultraboost.png',
    category: 'أحذية رياضية',
    sizes: ['41', '42', '43', '44', '45'],
    colors: ['أسود', 'أبيض', 'رمادي']
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
