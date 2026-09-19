import React from 'react';
import { Home, LayoutGrid, Heart, ShoppingBag, User } from 'lucide-react';
import { TabType } from '../types';

interface BottomNavProps {
  activeTab: TabType;
  onSelectTab: (tab: TabType) => void;
  cartCount: number;
  wishlistCount: number;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeTab,
  onSelectTab,
  cartCount,
  wishlistCount
}) => {
  return (
    <nav
      id="mobile-bottom-navigation"
      className="fixed bottom-0 left-0 right-0 z-50 bg-[#0B0B0B]/98 backdrop-blur-lg border-t border-[#1F1F1F] py-2 px-3 transition-all"
      data-purpose="mobile-fixed-bottom-bar"
    >
      <div className="flex items-center justify-around max-w-md mx-auto">
        {/* Nav Item: Home */}
        <button
          id="nav-tab-home"
          onClick={() => onSelectTab('home')}
          className={`flex flex-col items-center group transition-colors ${
            activeTab === 'home' ? 'text-[#C5A059]' : 'text-gray-400 hover:text-white'
          }`}
        >
          <Home className={`w-5 h-5 ${activeTab === 'home' ? 'stroke-[2.2]' : 'stroke-[1.8]'}`} />
          <span className="text-[10px] font-medium mt-1">Home</span>
        </button>

        {/* Nav Item: Categories */}
        <button
          id="nav-tab-categories"
          onClick={() => onSelectTab('categories')}
          className={`flex flex-col items-center group transition-colors ${
            activeTab === 'categories' ? 'text-[#C5A059]' : 'text-gray-400 hover:text-white'
          }`}
        >
          <LayoutGrid className={`w-5 h-5 ${activeTab === 'categories' ? 'stroke-[2.2]' : 'stroke-[1.8]'}`} />
          <span className="text-[10px] font-medium mt-1">Categories</span>
        </button>

        {/* Nav Item: Wishlist */}
        <button
          id="nav-tab-wishlist"
          onClick={() => onSelectTab('wishlist')}
          className={`relative flex flex-col items-center group transition-colors ${
            activeTab === 'wishlist' ? 'text-[#C5A059]' : 'text-gray-400 hover:text-white'
          }`}
        >
          <div className="relative">
            <Heart
              className={`w-5 h-5 ${
                activeTab === 'wishlist'
                  ? 'stroke-[2.2] fill-[#C5A059]/20'
                  : 'stroke-[1.8]'
              }`}
            />
            {wishlistCount > 0 && (
              <span className="absolute -top-1.5 -right-2 bg-[#DFC07B] text-black font-bold text-[9px] w-3.5 h-3.5 rounded-full flex items-center justify-center">
                {wishlistCount}
              </span>
            )}
          </div>
          <span className="text-[10px] font-medium mt-1">Wishlist</span>
        </button>

        {/* Nav Item: Cart */}
        <button
          id="nav-tab-cart"
          onClick={() => onSelectTab('cart')}
          className={`relative flex flex-col items-center group transition-colors ${
            activeTab === 'cart' ? 'text-[#C5A059]' : 'text-gray-400 hover:text-white'
          }`}
        >
          <div className="relative">
            <ShoppingBag
              className={`w-5 h-5 ${activeTab === 'cart' ? 'stroke-[2.2]' : 'stroke-[1.8]'}`}
            />
            {cartCount > 0 && (
              <span
                id="bottom-nav-cart-badge"
                className="absolute -top-1.5 -right-2 bg-[#C5A059] text-black font-bold text-[9px] w-3.5 h-3.5 rounded-full flex items-center justify-center shadow-sm"
              >
                {cartCount}
              </span>
            )}
          </div>
          <span className="text-[10px] font-medium mt-1">Cart</span>
        </button>

        {/* Nav Item: Account */}
        <button
          id="nav-tab-account"
          onClick={() => onSelectTab('account')}
          className={`flex flex-col items-center group transition-colors ${
            activeTab === 'account' ? 'text-[#C5A059]' : 'text-gray-400 hover:text-white'
          }`}
        >
          <User className={`w-5 h-5 ${activeTab === 'account' ? 'stroke-[2.2]' : 'stroke-[1.8]'}`} />
          <span className="text-[10px] font-medium mt-1">Account</span>
        </button>
      </div>
    </nav>
  );
};
