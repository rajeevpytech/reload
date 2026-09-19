import React, { useState, useEffect } from 'react';
import {
  Truck,
  Star,
  RotateCcw,
  ShieldCheck,
  ArrowRight,
  Heart,
  Box,
  Sparkles,
  Smartphone,
  Layers,
  Check
} from 'lucide-react';
import { CATEGORIES, PRODUCTS, INSTAGRAM_LOOKS, HERO_SLIDES } from '../data/mockData';
import { Product } from '../types';
import { ProductCard3D } from './ProductCard3D';

interface HomeScreenProps {
  onSelectProduct: (product: Product) => void;
  onSelectCategory: (categorySlug: Product['category']) => void;
  onToggleWishlist: (product: Product) => void;
  isWishlisted: (productId: string) => boolean;
  onNavigateCategories: () => void;
  onApplyPromoCode: (code: string) => void;
  onOpenInstagramLook: (lookId: string) => void;
  onOpenApkModal?: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  onSelectProduct,
  onSelectCategory,
  onToggleWishlist,
  isWishlisted,
  onNavigateCategories,
  onApplyPromoCode,
  onOpenInstagramLook,
  onOpenApkModal
}) => {
  const [heroIndex, setHeroIndex] = useState<number>(0);
  const [downloadCouponCopied, setDownloadCouponCopied] = useState<boolean>(false);

  // Auto rotate hero slides every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const currentHero = HERO_SLIDES[heroIndex];

  const handleAppStoreClick = () => {
    onApplyPromoCode('EXTRA10');
    setDownloadCouponCopied(true);
    if (onOpenApkModal) {
      onOpenApkModal();
    }
    setTimeout(() => setDownloadCouponCopied(false), 3000);
  };

  return (
    <div id="home-screen-root" className="min-h-screen text-white pb-24">
      {/* 1. Category Story Avatars Row */}
      <section
        id="category-story-row"
        className="py-4 px-2 border-b border-[#1A1A1A] overflow-x-auto no-scrollbar"
        data-purpose="quick-category-navigation"
      >
        <div className="flex items-center gap-4 min-w-max px-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.slug)}
              className="flex flex-col items-center group cursor-pointer focus:outline-none bg-transparent border-0"
            >
              <div className="w-16 h-16 rounded-full ring-2 ring-[#333333] group-hover:ring-[#C5A059] transition-all p-0.5 overflow-hidden bg-[#161616]">
                <img
                  alt={`${cat.name} Category`}
                  className="w-full h-full object-cover rounded-full group-hover:scale-110 transition-transform duration-300"
                  src={cat.storyImage}
                  referrerPolicy="no-referrer"
                />
              </div>
              <span className="text-xs font-medium text-gray-300 mt-1.5 group-hover:text-[#C5A059] transition-colors">
                {cat.name}
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* 2. Hero Banner Carousel */}
      <section
        id="hero-banner-carousel"
        className="relative bg-[#0F0F0F] border-b border-[#222222] overflow-hidden"
        data-purpose="main-hero-carousel"
      >
        <div className="relative min-h-[460px] flex items-center justify-between px-5 py-8">
          {/* Left Content Column */}
          <div className="w-7/12 z-10 space-y-3">
            <span className="text-[11px] font-semibold tracking-[0.25em] text-[#C5A059] uppercase block animate-pulse">
              {currentHero.subheading}
            </span>
            <h1 className="text-3xl sm:text-4xl font-serif tracking-tight text-white leading-tight">
              {currentHero.titleMain}
              <br />
              <span className="font-normal text-[#DFC07B]">{currentHero.titleHighlight}</span>
            </h1>
            <p className="text-[10px] tracking-wider text-gray-400 font-light leading-relaxed uppercase pr-2">
              {currentHero.description}
            </p>
            <div className="pt-2">
              <button
                id="btn-hero-shop-now"
                onClick={() => onSelectCategory(currentHero.linkCategory as Product['category'])}
                className="inline-block px-5 py-2.5 bg-[#C5A059] text-black font-semibold text-xs tracking-wider uppercase rounded-sm hover:bg-[#DFC07B] active:scale-95 transition-all shadow-md"
              >
                {currentHero.cta}
              </button>
            </div>
          </div>

          {/* Right Model Image with Architectural Paneling Background */}
          <div className="absolute right-0 top-0 bottom-0 w-7/12 flex items-end justify-end pointer-events-none overflow-hidden">
            {/* Subtle shadow gradient overlay to blend into left background */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#0F0F0F] via-transparent to-transparent z-10"></div>
            <img
              alt="Male Fashion Model"
              className="h-full object-cover object-top scale-105 transition-all duration-700 ease-out"
              src={currentHero.image}
              referrerPolicy="no-referrer"
            />
          </div>
        </div>

        {/* Carousel Pagination Indicators */}
        <div className="flex items-center justify-center gap-1.5 pb-4">
          {HERO_SLIDES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setHeroIndex(idx)}
              className={`h-1.5 rounded-full transition-all ${
                heroIndex === idx ? 'w-4 bg-[#C5A059]' : 'w-1.5 bg-white/40'
              }`}
              aria-label={`Slide ${idx + 1}`}
            />
          ))}
        </div>
      </section>

      {/* 3. Value Propositions Bar */}
      <section
        id="brand-value-propositions"
        className="grid grid-cols-2 md:grid-cols-4 gap-3 px-4 py-6 border-b border-[#1F1F1F] bg-[#0E0E0E]"
        data-purpose="brand-guarantees"
      >
        {/* Feature 1: Shipping */}
        <div className="flex items-center gap-3">
          <div className="text-[#C5A059] shrink-0">
            <Truck className="w-6 h-6" strokeWidth={1.5} />
          </div>
          <div>
            <h4 className="text-[11px] font-bold tracking-wide uppercase text-white">FREE SHIPPING</h4>
            <p className="text-[10px] text-gray-400">On all orders</p>
          </div>
        </div>

        {/* Feature 2: Quality */}
        <div className="flex items-center gap-3">
          <div className="text-[#C5A059] shrink-0">
            <Star className="w-6 h-6" strokeWidth={1.5} />
          </div>
          <div>
            <h4 className="text-[11px] font-bold tracking-wide uppercase text-white">PREMIUM QUALITY</h4>
            <p className="text-[10px] text-gray-400">Finest Fabrics</p>
          </div>
        </div>

        {/* Feature 3: Returns */}
        <div className="flex items-center gap-3">
          <div className="text-[#C5A059] shrink-0">
            <RotateCcw className="w-6 h-6" strokeWidth={1.5} />
          </div>
          <div>
            <h4 className="text-[11px] font-bold tracking-wide uppercase text-white">EASY RETURNS</h4>
            <p className="text-[10px] text-gray-400">Hassle-free returns</p>
          </div>
        </div>

        {/* Feature 4: Payments */}
        <div className="flex items-center gap-3">
          <div className="text-[#C5A059] shrink-0">
            <ShieldCheck className="w-6 h-6" strokeWidth={1.5} />
          </div>
          <div>
            <h4 className="text-[11px] font-bold tracking-wide uppercase text-white">SECURE PAYMENTS</h4>
            <p className="text-[10px] text-gray-400">100% Protected</p>
          </div>
        </div>
      </section>

      {/* 4. Split Editorial Promo Cards */}
      <section
        id="editorial-campaign-splits"
        className="px-3 py-4 grid grid-cols-2 gap-2.5"
        data-purpose="editorial-campaign-splits"
      >
        {/* Card 1: Timeless Classics */}
        <div
          onClick={() => onSelectCategory('shirt')}
          className="relative bg-[#141414] rounded-sm overflow-hidden border border-[#242424] min-h-[220px] flex flex-col justify-between p-3.5 group cursor-pointer"
        >
          <img
            alt="Model in Burgundy Shirt and Chinos"
            className="absolute inset-0 w-full h-full object-cover object-center opacity-70 group-hover:scale-105 transition-transform duration-500"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBsx8tcI0ha8t6u9GvDAfF7lC69XSGpijJUqSExWFy_KQK5OOzDe_6gRaRT7vIiZizreVwIJ--WScYwoCwo82bqZRMvBo3MoTG7URGu3SduxKS8VwMpFVvvaxBmu-sO2CCjISBNKDKwbj8eNIvaVH1tXM1_cOUQmmBYAk9zD5Hnjc71119RNfJ-74JLOpSqXEircAGUimurGGsZOnDXRSehX_QzPt5y3g9Pb3ZQO6KJBLX8M4MttwrG"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/20"></div>

          <div className="relative z-10">
            <h3 className="font-serif text-sm leading-tight text-white uppercase tracking-wider">
              TIMELESS
              <br />
              <span className="text-[#C5A059]">CLASSICS</span>
            </h3>
            <p className="text-[9px] text-gray-300 mt-1 font-light">Styles that never fade.</p>
          </div>

          <div className="relative z-10 pt-4">
            <span className="inline-block text-[10px] font-semibold tracking-wider text-white group-hover:text-[#C5A059] uppercase border-b border-white pb-0.5 group-hover:border-[#C5A059] transition-colors">
              SHOP NOW
            </span>
          </div>
        </div>

        {/* Card 2: Comfort Meets Style */}
        <div
          onClick={() => onSelectCategory('hoodie')}
          className="relative bg-[#141414] rounded-sm overflow-hidden border border-[#242424] min-h-[220px] flex flex-col justify-between p-3.5 group cursor-pointer"
        >
          <img
            alt="Model in California Streetwear Hoodie"
            className="absolute inset-0 w-full h-full object-cover object-center opacity-70 group-hover:scale-105 transition-transform duration-500"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDNI_p8mSJx5DPWY66msMwICoPG_s7jgr8F7VBa2ewkHlV4IJ9nfmeUFhZbYZxixrftMZY4-xuheYuqAYVYFwdYjWmJX9MvecXjayd5CiyOQypK5Qg6Q7nvDosoAEuVxmNts2ag65KKqfX7JI4BqKRqv1NjyhUduS19SFPpHn9VybnFAiFDeR9WEtBQLfPz7czTnQHlqn9D2XS1ArdJ0l1V7Y91L9d5_xAgOmR6OTWWSPUf_7hfS4w6"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/20"></div>

          <div className="relative z-10">
            <h3 className="font-serif text-sm leading-tight text-white uppercase tracking-wider">
              COMFORT
              <br />
              <span className="text-[#C5A059]">MEETS STYLE</span>
            </h3>
            <p className="text-[9px] text-gray-300 mt-1 font-light">Casual looks. Premium feel.</p>
          </div>

          <div className="relative z-10 pt-4">
            <span className="inline-block text-[10px] font-semibold tracking-wider text-white group-hover:text-[#C5A059] uppercase border-b border-white pb-0.5 group-hover:border-[#C5A059] transition-colors">
              SHOP NOW
            </span>
          </div>
        </div>
      </section>

      {/* 5. New Arrivals Horizontal Scrollable Products */}
      <section id="new-arrivals-section" className="py-4 px-3" data-purpose="new-arrivals-carousel">
        {/* Header with View All */}
        <div className="flex items-center justify-between pb-3">
          <h2 className="text-sm font-bold tracking-wider text-white uppercase font-sans">
            NEW ARRIVALS
          </h2>
          <button
            id="btn-view-all-new-arrivals"
            onClick={onNavigateCategories}
            className="text-xs font-semibold text-[#C5A059] flex items-center gap-1 hover:underline cursor-pointer bg-transparent border-0 p-0"
          >
            VIEW ALL
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Horizontal Scrolling 3D Interactive Product Cards */}
        <div className="flex gap-3 overflow-x-auto no-scrollbar pb-3 pt-1 px-1">
          {PRODUCTS.slice(0, 6).map((prod) => (
            <div key={prod.id} className="w-[165px] sm:w-[185px] shrink-0">
              <ProductCard3D
                product={prod}
                onSelect={onSelectProduct}
                onToggleWishlist={onToggleWishlist}
                isWishlisted={isWishlisted(prod.id)}
              />
            </div>
          ))}
        </div>
      </section>

      {/* 6. 3D Spatial Studio Spotlight */}
      <section id="3d-studio-spotlight" className="px-3 py-4">
        <div className="p-4 rounded-2xl bg-gradient-to-r from-[#18130B] via-[#141414] to-[#121212] border border-[#C5A059]/40 mb-3 flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[9px] uppercase tracking-[0.25em] font-extrabold text-[#DFC07B] flex items-center gap-1.5">
              <Box className="w-3.5 h-3.5 text-[#C5A059]" />
              NEXT-GEN 3D STUDIO
            </span>
            <h3 className="text-base font-serif font-bold text-white">
              Tactile 3D Depth &amp; 360° Lighting
            </h3>
            <p className="text-[11px] text-gray-300">
              Interactive realistic fabrics with turntable rotation and studio lighting.
            </p>
          </div>
          {onOpenApkModal && (
            <button
              onClick={onOpenApkModal}
              className="px-3 py-1.5 rounded-lg bg-[#C5A059] hover:bg-[#DFC07B] text-black font-bold text-[10px] uppercase tracking-wider shrink-0 transition"
            >
              Get APK
            </button>
          )}
        </div>

        {/* 2-Column 3D Perspective Grid */}
        <div className="grid grid-cols-2 gap-3">
          {PRODUCTS.slice(2, 6).map((prod) => (
            <ProductCard3D
              key={prod.id}
              product={prod}
              onSelect={onSelectProduct}
              onToggleWishlist={onToggleWishlist}
              isWishlisted={isWishlisted(prod.id)}
            />
          ))}
        </div>
      </section>

      {/* 7. Category Tiles Grid (2 columns) */}
      <section
        id="category-tiles-grid"
        className="py-4 px-3 space-y-2.5"
        data-purpose="visual-category-cards"
      >
        <div className="flex items-center justify-between pb-1">
          <h3 className="text-xs font-bold tracking-wider text-white uppercase font-sans">
            SHOP BY CATEGORY
          </h3>
          <span
            onClick={onNavigateCategories}
            className="text-xs font-semibold text-[#C5A059] cursor-pointer hover:underline"
          >
            EXPLORE ALL
          </span>
        </div>
        <div className="grid grid-cols-2 gap-2.5">
          {CATEGORIES.slice(0, 6).map((cat) => (
            <div
              key={cat.id}
              onClick={() => onSelectCategory(cat.slug)}
              className="relative bg-[#141414] rounded-sm overflow-hidden h-28 flex items-center justify-between p-3 border border-[#222222] group cursor-pointer hover:border-[#C5A059] transition-colors"
            >
              <div className="relative z-10">
                <h3 className="font-serif text-sm font-semibold text-white group-hover:text-[#DFC07B]">
                  {cat.name}s
                </h3>
                <span className="text-[9px] text-[#C5A059] tracking-wider uppercase font-semibold group-hover:underline mt-1 inline-block">
                  SHOP NOW
                </span>
              </div>
              <img
                alt={`${cat.name}s Tile`}
                className="absolute right-0 top-0 bottom-0 w-1/2 object-cover object-center group-hover:scale-105 transition-transform duration-500"
                src={cat.tileImage}
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#141414] via-[#141414]/70 to-transparent"></div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. App Download Banner with 3D Mockup */}
      <section
        id="app-download-section"
        className="mx-3 my-4 p-4 rounded-sm bg-gradient-to-r from-[#161616] via-[#121212] to-[#0A0A0A] border border-[#222222] relative overflow-hidden"
        data-purpose="mobile-app-download"
      >
        <div className="flex items-center">
          {/* Phone Mockup Preview (Left side) */}
          <div className="w-5/12 relative -ml-2">
            <div className="w-32 h-44 rounded-2xl bg-black border-2 border-[#333333] shadow-2xl p-1.5 rotate-[-8deg] transform relative overflow-hidden">
              <div className="w-full h-full bg-[#111111] rounded-xl flex flex-col items-center justify-center p-2 border border-[#262626]">
                {/* Dynamic Island notch */}
                <div className="w-8 h-2 bg-black rounded-full mb-auto mt-0.5"></div>
                <div className="text-center my-auto">
                  <span className="text-[10px] tracking-widest font-extrabold text-[#C5A059] font-serif block">
                    RELOAD
                  </span>
                  <span className="text-[5px] tracking-[0.3em] text-[#C5A059] uppercase block -mt-0.5">
                    CASUAL
                  </span>
                </div>
                <div className="w-8 h-0.5 bg-white/20 rounded-full mt-auto"></div>
              </div>
            </div>
          </div>

          {/* App Download Details (Right side) */}
          <div className="w-7/12 pl-2">
            <span className="text-[9px] uppercase tracking-[0.2em] text-gray-400 font-semibold block">
              DOWNLOAD THE APP
            </span>
            <h3 className="text-lg font-serif text-[#DFC07B] font-bold leading-tight mt-0.5">
              EXTRA 10% OFF
            </h3>
            <p className="text-[9px] text-gray-400 mt-1 leading-snug">
              Exclusive Offers | Early Access | Easy Shopping
            </p>

            {/* App Store & APK Badges */}
            <div className="flex flex-wrap gap-1.5 mt-3">
              {/* Direct APK Button */}
              {onOpenApkModal && (
                <button
                  id="btn-install-apk-banner"
                  onClick={onOpenApkModal}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-[#C5A059] to-[#DFC07B] text-black rounded text-left font-bold text-xs hover:brightness-110 cursor-pointer active:scale-95 transition-all shadow-md"
                >
                  <Smartphone className="w-4 h-4 text-black shrink-0" />
                  <div>
                    <span className="block text-[7px] text-black/80 uppercase leading-none font-bold">INSTALL ON PHONE</span>
                    <span className="block text-[9px] font-extrabold text-black leading-none">Download .APK</span>
                  </div>
                </button>
              )}

              {/* App Store */}
              <button
                id="btn-store-apple"
                onClick={handleAppStoreClick}
                className="inline-flex items-center gap-1 px-2.5 py-1 bg-black border border-[#333333] rounded text-left hover:border-gray-500 cursor-pointer active:scale-95 transition-all"
              >
                <svg className="w-3.5 h-3.5 text-white shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.38c.62-.75 1.04-1.8 0.92-2.85-.9.04-1.99.6-2.61 1.34-.55.63-1.03 1.68-.9 2.69 1 .08 2.02-.51 2.59-1.18z"></path>
                </svg>
                <div>
                  <span className="block text-[6px] text-gray-400 uppercase leading-none">Download on</span>
                  <span className="block text-[8px] font-bold text-white leading-none">App Store</span>
                </div>
              </button>

              {/* Google Play */}
              <button
                id="btn-store-google"
                onClick={handleAppStoreClick}
                className="inline-flex items-center gap-1 px-2.5 py-1 bg-black border border-[#333333] rounded text-left hover:border-gray-500 cursor-pointer active:scale-95 transition-all"
              >
                <svg className="w-3.5 h-3.5 text-white shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M3.609 1.814L13.793 12 3.61 22.186A2.21 2.21 0 0 1 3 20.627V3.373c0-.6.23-1.16.609-1.559zm11.246 11.247l2.259 2.259-12.06 6.892 9.801-9.151zm2.259-2.259l-2.259 2.259L5.054 3.91l12.06 6.892zM18.73 11.4l2.84 1.62c.79.45.79 1.19 0 1.64l-2.84 1.62-2.13-2.44 2.13-2.44z"></path>
                </svg>
                <div>
                  <span className="block text-[6px] text-gray-400 uppercase leading-none">GET IT ON</span>
                  <span className="block text-[8px] font-bold text-white leading-none">Google Play</span>
                </div>
              </button>
            </div>

            {downloadCouponCopied && (
              <p className="text-[10px] text-green-400 mt-2 font-medium">
                ✓ Coupon EXTRA10 applied to your cart!
              </p>
            )}
          </div>
        </div>
      </section>

      {/* 8. Instagram Lookbook Feed */}
      <section
        id="instagram-lookbook-section"
        className="py-5 px-3"
        data-purpose="instagram-lookbook-feed"
      >
        <div className="flex items-center justify-between pb-3">
          <h3 className="text-xs font-bold tracking-wider text-white uppercase font-sans">
            FOLLOW US ON INSTAGRAM
          </h3>
          <button
            onClick={() => onOpenInstagramLook('look-1')}
            className="text-xs font-medium text-gray-400 hover:text-white flex items-center gap-1 cursor-pointer bg-transparent border-0 p-0"
          >
            @reload.casual
            <ArrowRight className="w-3 h-3 text-gray-400" />
          </button>
        </div>

        {/* 5-Grid Lookbook Gallery */}
        <div className="grid grid-cols-5 gap-1.5">
          {INSTAGRAM_LOOKS.map((look) => (
            <div
              key={look.id}
              onClick={() => onOpenInstagramLook(look.id)}
              className="aspect-square bg-[#1A1A1A] overflow-hidden group cursor-pointer relative"
            >
              <img
                alt={`Instagram ${look.tag}`}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                src={look.image}
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                <Heart className="w-3.5 h-3.5 text-white fill-white" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Editorial Footer Note */}
      <footer className="px-4 pt-6 pb-4 border-t border-[#1C1C1C] text-center text-gray-500 text-[11px] space-y-2">
        <p className="tracking-widest uppercase text-gray-400 font-serif text-xs">
          RELOAD CASUAL • NEW DELHI • MUMBAI
        </p>
        <p className="text-[10px] text-gray-500">
          Handcrafted luxury streetwear & occasion attire. Free express worldwide delivery.
        </p>
      </footer>
    </div>
  );
};
