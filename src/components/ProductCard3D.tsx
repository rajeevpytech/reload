import React, { useState, useRef } from 'react';
import { Heart, Eye, Box, Sparkles } from 'lucide-react';
import { Product } from '../types';

interface ProductCard3DProps {
  product: Product;
  onSelect: (product: Product) => void;
  onToggleWishlist: (product: Product) => void;
  isWishlisted: boolean;
  featuredBadge?: string;
}

export const ProductCard3D: React.FC<ProductCard3DProps> = ({
  product,
  onSelect,
  onToggleWishlist,
  isWishlisted,
  featuredBadge
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState<number>(0);
  const [rotateY, setRotateY] = useState<number>(0);
  const [glarePos, setGlarePos] = useState<{ x: number; y: number; opacity: number }>({
    x: 50,
    y: 50,
    opacity: 0
  });
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotX = ((y - centerY) / centerY) * -12; // tilt angle
    const rotY = ((x - centerX) / centerX) * 12;

    setRotateX(rotX);
    setRotateY(rotY);

    setGlarePos({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: 0.35
    });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
    setGlarePos((prev) => ({ ...prev, opacity: 0 }));
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => onSelect(product)}
      className="group relative cursor-pointer select-none"
      style={{ perspective: 1200 }}
    >
      {/* 3D Rotating Container */}
      <div
        className="relative rounded-2xl bg-gradient-to-b from-[#191919] to-[#0E0E0E] p-2.5 border border-[#2B2B2B] group-hover:border-[#C5A059]/60 transition-all duration-200 ease-out shadow-lg group-hover:shadow-[0_20px_35px_rgba(0,0,0,0.8)] flex flex-col"
        style={{
          transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(${
            isHovered ? 1.025 : 1
          }, ${isHovered ? 1.025 : 1}, 1)`,
          transformStyle: 'preserve-3d',
          transition: isHovered ? 'transform 0.08s ease-out' : 'transform 0.4s ease-out'
        }}
      >
        {/* Dynamic 3D Specular Sheen Layer */}
        <div
          className="pointer-events-none absolute inset-0 z-30 rounded-2xl transition-opacity duration-300 overflow-hidden"
          style={{
            background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(243, 229, 171, ${glarePos.opacity}), transparent 65%)`
          }}
        />

        {/* Media Container with 3D Depth */}
        <div
          className="relative aspect-[3/4] w-full rounded-xl overflow-hidden bg-[#141414] mb-3"
          style={{ transform: 'translateZ(18px)' }}
        >
          {/* Subtle Ambient Vignette / Spotlight for 3D Studio Look */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 z-10 pointer-events-none" />

          {/* Product Image */}
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700 ease-out"
            referrerPolicy="no-referrer"
          />

          {/* Top Floating Left: 3D Hologram / Studio Tag */}
          <div
            className="absolute top-2.5 left-2.5 z-20 flex flex-col gap-1 items-start"
            style={{ transform: 'translateZ(26px)' }}
          >
            {product.discountPercentage && (
              <span className="bg-gradient-to-r from-[#DFC07B] to-[#C5A059] text-black font-extrabold text-[9px] px-2 py-0.5 rounded-full shadow-md uppercase tracking-wider">
                -{product.discountPercentage}%
              </span>
            )}
            <span className="bg-black/75 backdrop-blur-md border border-[#C5A059]/40 text-[#DFC07B] text-[8px] font-bold px-2 py-0.5 rounded-full shadow flex items-center gap-1">
              <Box className="w-2.5 h-2.5 text-[#DFC07B]" />
              <span>3D STUDIO</span>
            </span>
          </div>

          {/* Top Floating Right: Wishlist Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleWishlist(product);
            }}
            aria-label="Wishlist"
            className={`absolute top-2.5 right-2.5 z-20 w-8 h-8 rounded-full backdrop-blur-md flex items-center justify-center transition-all ${
              isWishlisted
                ? 'bg-[#C5A059] text-black shadow-lg scale-105'
                : 'bg-black/60 text-white/80 hover:text-white hover:bg-black/85'
            }`}
            style={{ transform: 'translateZ(30px)' }}
          >
            <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-black stroke-black' : ''}`} />
          </button>

          {/* Bottom Quick-Action Hover Bar */}
          <div
            className="absolute bottom-2.5 left-2.5 right-2.5 z-20 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center gap-1.5 py-1.5 px-2.5 bg-black/85 backdrop-blur-md rounded-lg border border-[#C5A059]/30 text-[10px] font-semibold text-[#DFC07B]"
            style={{ transform: 'translateZ(24px)' }}
          >
            <Eye className="w-3 h-3" />
            <span>Click for 360° Studio View</span>
          </div>
        </div>

        {/* Product Details Section */}
        <div className="px-1 py-1 space-y-1" style={{ transform: 'translateZ(14px)' }}>
          <div className="flex items-center justify-between text-[10px] text-gray-400">
            <span className="uppercase tracking-widest text-[#C5A059] font-medium truncate">
              {product.categoryLabel}
            </span>
            <span className="flex items-center gap-1 text-gray-400">
              <Sparkles className="w-2.5 h-2.5 text-[#DFC07B]" />
              <span>{product.rating} ★</span>
            </span>
          </div>

          <h3 className="font-serif text-xs font-semibold text-white truncate group-hover:text-[#DFC07B] transition-colors">
            {product.name}
          </h3>

          <div className="flex items-baseline gap-2 pt-0.5">
            <span className="text-sm font-bold text-white font-mono">
              ₹{product.price.toLocaleString('en-IN')}
            </span>
            {product.originalPrice && (
              <span className="text-[11px] text-gray-500 line-through font-mono">
                ₹{product.originalPrice.toLocaleString('en-IN')}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
