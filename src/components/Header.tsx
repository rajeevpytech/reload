import React from 'react';
import { Menu, Search, ShoppingBag, Smartphone } from 'lucide-react';

interface HeaderProps {
  cartCount: number;
  onOpenDrawer: () => void;
  onOpenSearch: () => void;
  onOpenCart: () => void;
  onGoHome: () => void;
  onOpenApkModal?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  cartCount,
  onOpenDrawer,
  onOpenSearch,
  onOpenCart,
  onGoHome,
  onOpenApkModal
}) => {
  return (
    <header
      id="main-app-header"
      className="sticky top-0 z-40 bg-[#0B0B0B]/95 backdrop-blur-md border-b border-[#222222] px-4 py-2.5 flex items-center justify-between transition-colors"
      data-purpose="site-navigation-header"
    >
      {/* Left: Hamburger Menu */}
      <button
        id="btn-drawer-toggle"
        onClick={onOpenDrawer}
        aria-label="Open Navigation Menu"
        className="p-1 text-white hover:text-[#C5A059] active:scale-95 transition-transform"
        type="button"
      >
        <Menu className="w-6 h-6" strokeWidth={1.75} />
      </button>

      {/* Center: Brand Logo */}
      <button
        id="btn-brand-home"
        onClick={onGoHome}
        className="flex flex-col items-center cursor-pointer group bg-transparent border-0 p-0 focus:outline-none"
        data-purpose="brand-logo"
      >
        <span className="text-xl tracking-[0.25em] font-extrabold text-[#C5A059] font-serif leading-tight uppercase group-hover:text-[#DFC07B] transition-colors">
          RELOAD
        </span>
        <span className="text-[9px] tracking-[0.38em] text-[#C5A059] uppercase font-light -mt-0.5 group-hover:text-[#DFC07B] transition-colors">
          CASUAL
        </span>
      </button>

      {/* Right: APK Button, Search & Shopping Cart */}
      <div className="flex items-center gap-2.5 sm:gap-3.5">
        {onOpenApkModal && (
          <button
            id="btn-header-install-apk"
            onClick={onOpenApkModal}
            className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-gradient-to-r from-[#211B10] to-[#161616] border border-[#C5A059]/50 text-[#DFC07B] hover:border-[#C5A059] text-[10px] font-bold tracking-wider active:scale-95 transition-all shadow-sm group"
            title="Install Mobile App / Download APK"
          >
            <Smartphone className="w-3 h-3 text-[#C5A059] group-hover:scale-110 transition-transform" />
            <span>APK</span>
          </button>
        )}

        <button
          id="btn-search-toggle"
          onClick={onOpenSearch}
          aria-label="Search"
          className="p-1 text-white hover:text-[#C5A059] active:scale-95 transition-transform"
          type="button"
        >
          <Search className="w-5 h-5" strokeWidth={2} />
        </button>

        <button
          id="btn-header-cart"
          onClick={onOpenCart}
          aria-label="Shopping Cart"
          className="relative p-1 text-white hover:text-[#C5A059] active:scale-95 transition-transform"
          type="button"
        >
          <ShoppingBag className="w-5 h-5" strokeWidth={1.8} />
          {cartCount > 0 && (
            <span
              id="header-cart-badge"
              className="absolute -top-1 -right-1.5 bg-[#C5A059] text-black font-bold text-[10px] w-4 h-4 rounded-full flex items-center justify-center shadow-sm"
            >
              {cartCount}
            </span>
          )}
        </button>
      </div>
    </header>
  );
};
