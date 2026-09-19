import { Product, CartItem, UserAddress, OrderRecord } from '../types';
import { PRODUCTS, INITIAL_ORDERS } from '../data/mockData';
import { INITIAL_ADDRESSES } from '../data/addresses';

const CART_STORAGE_KEY = 'reload_casual_cart_v1';
const WISHLIST_STORAGE_KEY = 'reload_casual_wishlist_v1';
const ORDERS_STORAGE_KEY = 'reload_casual_orders_v1';
const ADDRESSES_STORAGE_KEY = 'reload_casual_addresses_v1';
const COUPON_STORAGE_KEY = 'reload_casual_coupon_v1';

export const storage = {
  getCart(): CartItem[] {
    try {
      const data = localStorage.getItem(CART_STORAGE_KEY);
      if (!data) {
        // Return initial 2 screenshot matching items
        return [
          { product: PRODUCTS[0], size: 'L', quantity: 1 },
          { product: PRODUCTS[1], size: 'M', quantity: 1 }
        ];
      }
      return JSON.parse(data);
    } catch {
      return [
        { product: PRODUCTS[0], size: 'L', quantity: 1 },
        { product: PRODUCTS[1], size: 'M', quantity: 1 }
      ];
    }
  },

  saveCart(items: CartItem[]) {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      console.warn('Failed to save cart to localStorage', e);
    }
  },

  getWishlist(): Product[] {
    try {
      const data = localStorage.getItem(WISHLIST_STORAGE_KEY);
      if (!data) {
        return [PRODUCTS[2], PRODUCTS[5]];
      }
      return JSON.parse(data);
    } catch {
      return [PRODUCTS[2], PRODUCTS[5]];
    }
  },

  saveWishlist(items: Product[]) {
    try {
      localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      console.warn('Failed to save wishlist to localStorage', e);
    }
  },

  getOrders(): OrderRecord[] {
    try {
      const data = localStorage.getItem(ORDERS_STORAGE_KEY);
      if (!data) return INITIAL_ORDERS;
      return JSON.parse(data);
    } catch {
      return INITIAL_ORDERS;
    }
  },

  saveOrders(orders: OrderRecord[]) {
    try {
      localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
    } catch (e) {
      console.warn('Failed to save orders to localStorage', e);
    }
  },

  getAddresses(): UserAddress[] {
    try {
      const data = localStorage.getItem(ADDRESSES_STORAGE_KEY);
      if (!data) return INITIAL_ADDRESSES;
      return JSON.parse(data);
    } catch {
      return INITIAL_ADDRESSES;
    }
  },

  saveAddresses(addresses: UserAddress[]) {
    try {
      localStorage.setItem(ADDRESSES_STORAGE_KEY, JSON.stringify(addresses));
    } catch (e) {
      console.warn('Failed to save addresses to localStorage', e);
    }
  },

  getCoupon(): string | null {
    try {
      return localStorage.getItem(COUPON_STORAGE_KEY) || null;
    } catch {
      return null;
    }
  },

  saveCoupon(coupon: string | null) {
    try {
      if (coupon) {
        localStorage.setItem(COUPON_STORAGE_KEY, coupon);
      } else {
        localStorage.removeItem(COUPON_STORAGE_KEY);
      }
    } catch (e) {
      console.warn('Failed to save coupon to localStorage', e);
    }
  }
};
