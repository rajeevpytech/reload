import React, { useState, useRef } from 'react';
import {
  X,
  Heart,
  ShoppingBag,
  Star,
  Truck,
  RotateCcw,
  ShieldCheck,
  Check,
  Ruler,
  Box,
  Sparkles,
  Sun,
  Maximize2,
  ZoomIn
} from 'lucide-react';
import { Product, Review } from '../types';
import { ReviewsSection } from './ReviewsSection';

interface ProductDetailModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product, size: string) => void;
  onToggleWishlist: (product: Product) => void;
  isWishlisted: boolean;
  onBuyNow: (product: Product, size: string) => void;
  productReviews?: Review[];
  onAddReview?: (productId: string, review: Omit<Review, 'id' | 'date'>) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  isOpen,
  onClose,
  onAddToCart,
  onToggleWishlist,
  isWishlisted,
  onBuyNow,
  productReviews = [],
  onAddReview
}) => {
  if (!isOpen || !product) return null;

  const [selectedImage, setSelectedImage] = useState<string>(product.image);
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0] || 'M');
  const [showSizeGuide, setShowSizeGuide] = useState<boolean>(false);
  const [pincode, setPincode] = useState<string>('110001');
  const [pincodeChecked, setPincodeChecked] = useState<boolean>(true);
  const [isAddedFeedback, setIsAddedFeedback] = useState<boolean>(false);

  // 3D Studio Mode States
  const [is3DMode, setIs3DMode] = useState<boolean>(false);
  const [rotationAngle, setRotationAngle] = useState<number>(0);
  const [isDragging3D, setIsDragging3D] = useState<boolean>(false);
  const [dragStartX, setDragStartX] = useState<number>(0);
  const [lightingPreset, setLightingPreset] = useState<'gold' | 'daylight' | 'noir'>('gold');
  const [isZoomActive, setIsZoomActive] = useState<boolean>(false);

  const gallery = [product.image, ...(product.additionalImages || [])];

  const handleTouchStart = (e: React.TouchEvent) => {
    if (!is3DMode) return;
    setIsDragging3D(true);
    setDragStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!is3DMode || !isDragging3D) return;
    const delta = e.touches[0].clientX - dragStartX;
    setRotationAngle((prev) => Math.max(-45, Math.min(45, prev + delta * 0.4)));
    setDragStartX(e.touches[0].clientX);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!is3DMode) return;
    setIsDragging3D(true);
    setDragStartX(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!is3DMode || !isDragging3D) return;
    const delta = e.clientX - dragStartX;
    setRotationAngle((prev) => Math.max(-45, Math.min(45, prev + delta * 0.4)));
    setDragStartX(e.clientX);
  };

  const handleMouseUp = () => {
    setIsDragging3D(false);
  };

  const handleAdd = () => {
    onAddToCart(product, selectedSize);
    setIsAddedFeedback(true);
    setTimeout(() => setIsAddedFeedback(false), 1800);
  };

  const handleBuy = () => {
    onBuyNow(product, selectedSize);
    onClose();
  };

  return (
    <div id="product-detail-modal-root" className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div
        id="product-detail-sheet"
        className="relative w-full max-w-lg bg-[#0F0F0F] text-white rounded-t-2xl sm:rounded-xl border border-[#262626] max-h-[90vh] overflow-y-auto no-scrollbar shadow-2xl z-10 flex flex-col"
      >
        {/* Sticky Header with Close & Wishlist */}
        <div className="sticky top-0 z-20 flex items-center justify-between px-4 py-3 bg-[#0F0F0F]/90 backdrop-blur-md border-b border-[#222222]">
          <span className="text-[10px] tracking-[0.2em] font-semibold text-[#C5A059] uppercase">
            {product.categoryLabel}
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => onToggleWishlist(product)}
              aria-label="Wishlist"
              className={`p-2 rounded-full border transition-colors ${
                isWishlisted
                  ? 'border-[#C5A059] text-[#DFC07B] bg-[#C5A059]/10'
                  : 'border-[#333333] text-gray-400 hover:text-white'
              }`}
            >
              <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-[#DFC07B]' : ''}`} />
            </button>
            <button
              onClick={onClose}
              aria-label="Close"
              className="p-2 rounded-full border border-[#333333] text-gray-400 hover:text-white hover:bg-[#222222]"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Product Media Gallery & 3D Studio Stage */}
        <div
          className="relative aspect-[4/5] bg-[#101010] overflow-hidden select-none"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleMouseUp}
          style={{ perspective: 1200 }}
        >
          {/* 3D Studio Mode Toggle Pill */}
          <div className="absolute top-3 right-3 z-30 flex items-center gap-1.5">
            <button
              onClick={() => {
                setIs3DMode(!is3DMode);
                setRotationAngle(0);
              }}
              className={`px-3 py-1.5 rounded-full text-[10px] font-bold tracking-wider uppercase backdrop-blur-md border transition-all flex items-center gap-1.5 shadow-lg ${
                is3DMode
                  ? 'bg-[#C5A059] text-black border-[#C5A059] shadow-[0_0_15px_rgba(197,160,89,0.5)]'
                  : 'bg-black/70 text-gray-300 border-[#333333] hover:text-white hover:border-[#C5A059]/50'
              }`}
            >
              <Box className="w-3.5 h-3.5" />
              <span>{is3DMode ? '3D STUDIO ACTIVE' : 'ENTER 3D STUDIO'}</span>
            </button>
          </div>

          {/* Discount Tag */}
          {product.discountPercentage && (
            <span className="absolute top-3 left-3 z-30 bg-[#DFC07B] text-black text-[11px] font-extrabold px-2.5 py-1 rounded-sm shadow-md uppercase">
              -{product.discountPercentage}% OFF
            </span>
          )}

          {/* 3D Dynamic Lighting Atmosphere Overlays */}
          {is3DMode && (
            <>
              {lightingPreset === 'gold' && (
                <div className="pointer-events-none absolute inset-0 z-20 bg-gradient-to-tr from-[#C5A059]/15 via-transparent to-[#F3E5AB]/20 mix-blend-screen" />
              )}
              {lightingPreset === 'daylight' && (
                <div className="pointer-events-none absolute inset-0 z-20 bg-gradient-to-b from-white/10 via-transparent to-black/30 mix-blend-overlay" />
              )}
              {lightingPreset === 'noir' && (
                <div className="pointer-events-none absolute inset-0 z-20 bg-radial from-transparent via-black/40 to-black/80" />
              )}

              {/* 3D Rotation Drag Guidance Overlay */}
              <div className="absolute top-12 left-3 z-20 flex items-center gap-1.5 bg-black/60 backdrop-blur-sm border border-[#C5A059]/30 px-2 py-0.5 rounded-md text-[9px] font-mono text-[#DFC07B]">
                <RotateCcw className="w-3 h-3 animate-spin" style={{ animationDuration: '6s' }} />
                <span>Drag to Rotate ({Math.round(rotationAngle)}°)</span>
              </div>
            </>
          )}

          {/* Main Apparel Image with 3D Transform & Zoom */}
          <div
            className="w-full h-full flex items-center justify-center transition-transform"
            style={{
              transform: is3DMode
                ? `rotateY(${rotationAngle}deg) scale(${isZoomActive ? 1.35 : 1})`
                : 'none',
              transformStyle: 'preserve-3d',
              transition: isDragging3D ? 'none' : 'transform 0.3s ease-out'
            }}
          >
            <img
              src={selectedImage}
              alt={product.name}
              className={`w-full h-full object-cover object-top pointer-events-none transition-all ${
                is3DMode ? 'drop-shadow-[0_25px_35px_rgba(0,0,0,0.9)]' : ''
              }`}
            />
          </div>

          {/* 3D Studio Floating Control Dock */}
          {is3DMode ? (
            <div className="absolute bottom-3 left-3 right-3 z-30 p-2 rounded-xl bg-black/80 backdrop-blur-md border border-[#2B2B2B] flex items-center justify-between gap-2 shadow-2xl">
              {/* Lighting Presets */}
              <div className="flex items-center gap-1">
                <span className="text-[9px] uppercase tracking-wider text-gray-400 mr-1 flex items-center gap-1">
                  <Sun className="w-3 h-3 text-[#C5A059]" />
                  Light:
                </span>
                {(['gold', 'daylight', 'noir'] as const).map((preset) => (
                  <button
                    key={preset}
                    onClick={() => setLightingPreset(preset)}
                    className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase transition ${
                      lightingPreset === preset
                        ? 'bg-[#C5A059] text-black shadow'
                        : 'bg-[#1E1E1E] text-gray-400 hover:text-white'
                    }`}
                  >
                    {preset}
                  </button>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setIsZoomActive(!isZoomActive)}
                  className={`p-1.5 rounded-lg border text-[10px] font-medium flex items-center gap-1 transition ${
                    isZoomActive
                      ? 'bg-[#C5A059] text-black border-[#C5A059]'
                      : 'bg-[#181818] text-gray-300 border-[#333333] hover:text-white'
                  }`}
                  title="Toggle Macro Fabric Zoom"
                >
                  <ZoomIn className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Zoom</span>
                </button>
                <button
                  onClick={() => setRotationAngle(0)}
                  className="p-1.5 rounded-lg bg-[#181818] border border-[#333333] text-gray-300 hover:text-white text-[10px]"
                  title="Reset Angle"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ) : (
            /* Thumbnail Strip in Standard Mode */
            gallery.length > 1 && (
              <div className="absolute bottom-3 left-3 right-3 flex items-center gap-2 overflow-x-auto no-scrollbar py-1 z-20">
                {gallery.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(img)}
                    className={`w-12 h-14 rounded overflow-hidden border-2 transition-all shrink-0 ${
                      selectedImage === img
                        ? 'border-[#C5A059] scale-105 shadow-md'
                        : 'border-black/50 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="thumb" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )
          )}
        </div>

        {/* Details Content */}
        <div className="p-4 space-y-4">
          {/* Title & Ratings */}
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className="flex items-center gap-1 bg-[#1A1A1A] border border-[#2B2B2B] px-2 py-0.5 rounded text-[11px] text-[#DFC07B]">
                <Star className="w-3.5 h-3.5 fill-[#DFC07B]" />
                <span className="font-bold">{product.rating}</span>
              </div>
              <span className="text-[11px] text-gray-400">({product.reviewsCount} verified reviews)</span>
            </div>
            <h1 className="text-xl font-serif tracking-tight text-white">{product.name}</h1>
            <div className="flex items-baseline gap-2.5 mt-1.5">
              <span className="text-xl font-bold text-white">
                ₹{product.price.toLocaleString('en-IN')}
              </span>
              {product.originalPrice > product.price && (
                <span className="text-sm text-gray-500 line-through">
                  ₹{product.originalPrice.toLocaleString('en-IN')}
                </span>
              )}
              <span className="text-xs text-[#C5A059] font-medium">Inclusive of all taxes</span>
            </div>
          </div>

          {/* Size Selector */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-gray-300">
                Select Size: <strong className="text-[#DFC07B]">{selectedSize}</strong>
              </span>
              <button
                onClick={() => setShowSizeGuide(!showSizeGuide)}
                className="text-xs text-[#C5A059] hover:underline flex items-center gap-1"
              >
                <Ruler className="w-3.5 h-3.5" />
                Size Guide
              </button>
            </div>

            <div className="flex flex-wrap gap-2">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`min-w-[48px] py-2 px-3 text-xs font-semibold rounded border transition-all ${
                    selectedSize === size
                      ? 'bg-[#C5A059] text-black border-[#C5A059] shadow-md font-bold'
                      : 'bg-[#181818] text-gray-300 border-[#2A2A2A] hover:border-gray-500'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>

            {showSizeGuide && (
              <div className="mt-2.5 p-3 rounded bg-[#161616] border border-[#2B2B2B] text-xs text-gray-300">
                <p className="font-bold text-[#DFC07B] mb-1">Standard Tailored Sizing:</p>
                <div className="grid grid-cols-3 gap-1 text-[11px] text-gray-400">
                  <span>S: Chest 38"</span>
                  <span>M: Chest 40"</span>
                  <span>L: Chest 42"</span>
                  <span>XL: Chest 44"</span>
                  <span>XXL: Chest 46"</span>
                  <span>Fits true to size</span>
                </div>
              </div>
            )}
          </div>

          {/* Description */}
          <div className="p-3 bg-[#141414] rounded border border-[#222222]">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#DFC07B] mb-1">
              The Reload Cut
            </h4>
            <p className="text-xs text-gray-300 leading-relaxed">{product.description}</p>
          </div>

          {/* Product Specifications */}
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="p-2.5 bg-[#141414] rounded border border-[#222222]">
              <span className="text-[10px] uppercase tracking-wider text-gray-500 block">Fabric</span>
              <span className="font-medium text-gray-200">{product.fabric}</span>
            </div>
            <div className="p-2.5 bg-[#141414] rounded border border-[#222222]">
              <span className="text-[10px] uppercase tracking-wider text-gray-500 block">Silhouette Fit</span>
              <span className="font-medium text-gray-200">{product.fit}</span>
            </div>
          </div>

          {/* Pincode & Express Delivery Check */}
          <div className="p-3 bg-[#141414] rounded border border-[#222222] space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-gray-300 flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-[#C5A059]" />
                Delivery Options
              </span>
              <span className="text-[10px] text-green-400 font-medium">Free Express Available</span>
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
                placeholder="Enter Pincode"
                className="flex-1 bg-[#1A1A1A] border border-[#2E2E2E] rounded px-3 py-1.5 text-xs text-white focus:outline-none focus:border-[#C5A059]"
              />
              <button
                onClick={() => setPincodeChecked(true)}
                className="px-3 py-1.5 bg-[#262626] hover:bg-[#333333] text-xs font-semibold rounded text-white"
              >
                Check
              </button>
            </div>
            {pincodeChecked && (
              <p className="text-[11px] text-gray-300 flex items-center gap-1">
                <Check className="w-3.5 h-3.5 text-[#C5A059]" />
                Delivery to <strong>{pincode}</strong> by Friday with Free Return Pickup.
              </p>
            )}
          </div>

          {/* Trust Value Badges */}
          <div className="grid grid-cols-3 gap-2 pt-1 border-t border-[#1F1F1F] text-center">
            <div className="flex flex-col items-center">
              <Truck className="w-4 h-4 text-[#C5A059] mb-1" />
              <span className="text-[10px] font-bold text-gray-200">Free Shipping</span>
            </div>
            <div className="flex flex-col items-center">
              <RotateCcw className="w-4 h-4 text-[#C5A059] mb-1" />
              <span className="text-[10px] font-bold text-gray-200">14-Day Returns</span>
            </div>
            <div className="flex flex-col items-center">
              <ShieldCheck className="w-4 h-4 text-[#C5A059] mb-1" />
              <span className="text-[10px] font-bold text-gray-200">100% Authentic</span>
            </div>
          </div>

          {/* Client Reviews Section */}
          <ReviewsSection
            productId={product.id}
            reviews={productReviews}
            rating={product.rating}
            reviewsCount={product.reviewsCount}
            onAddReview={(rev) => {
              if (onAddReview) {
                onAddReview(product.id, rev);
              }
            }}
          />
        </div>

        {/* Bottom Fixed Action Buttons */}
        <div className="sticky bottom-0 z-20 p-3 bg-[#0D0D0D] border-t border-[#222222] flex gap-2">
          <button
            id="btn-add-to-cart-modal"
            onClick={handleAdd}
            className={`flex-1 py-3 px-4 rounded font-semibold text-xs tracking-wider uppercase flex items-center justify-center gap-2 border transition-all ${
              isAddedFeedback
                ? 'bg-green-700/80 border-green-500 text-white'
                : 'bg-[#1A1A1A] border-[#C5A059] text-[#DFC07B] hover:bg-[#222222]'
            }`}
          >
            {isAddedFeedback ? (
              <>
                <Check className="w-4 h-4" />
                Added To Bag!
              </>
            ) : (
              <>
                <ShoppingBag className="w-4 h-4" />
                Add To Bag
              </>
            )}
          </button>

          <button
            id="btn-buy-now-modal"
            onClick={handleBuy}
            className="flex-1 py-3 px-4 rounded bg-[#C5A059] hover:bg-[#DFC07B] text-black font-bold text-xs tracking-wider uppercase transition-colors shadow-lg"
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};
