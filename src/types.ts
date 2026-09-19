export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  comment: string;
  verifiedBuyer: boolean;
  avatarBg?: string;
}

export interface UserAddress {
  id: string;
  name: string;
  phone: string;
  addressLine: string;
  city: string;
  pincode: string;
  type: 'HOME' | 'WORK' | 'OTHER';
  isDefault: boolean;
}

export interface Product {
  id: string;
  name: string;
  category: 'shirt' | 'tshirt' | 'pants' | 'kurta' | 'tracksuit' | 'hoodie' | 'jacket';
  categoryLabel: string;
  price: number;
  originalPrice: number;
  discountPercentage?: number;
  image: string;
  additionalImages?: string[];
  description: string;
  sizes: string[];
  fabric: string;
  fit: string;
  rating: number;
  reviewsCount: number;
  isNewArrival?: boolean;
  isFeatured?: boolean;
  reviews?: Review[];
}

export interface CartItem {
  product: Product;
  size: string;
  quantity: number;
}

export interface CategoryItem {
  id: string;
  name: string;
  slug: Product['category'];
  storyImage: string;
  tileImage: string;
  itemCount: number;
  tagline: string;
}

export interface InstagramLook {
  id: string;
  image: string;
  likes: number;
  tag: string;
}

export type TabType = 'home' | 'categories' | 'wishlist' | 'cart' | 'account';

export interface OrderRecord {
  id: string;
  date: string;
  items: {
    name: string;
    image: string;
    size: string;
    quantity: number;
    price: number;
  }[];
  totalAmount: number;
  status: 'Delivered' | 'In Transit' | 'Processing';
  estimatedDelivery: string;
  shippingAddress?: string;
  paymentMethod?: string;
  timeline?: {
    title: string;
    description: string;
    time: string;
    completed: boolean;
  }[];
}
