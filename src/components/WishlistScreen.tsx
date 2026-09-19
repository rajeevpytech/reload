import React from 'react';
import { Heart, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { Product } from '../types';

interface WishlistScreenProps {
  wishlist: Product[];
  onRemoveWishlist: (productId: string) => void;
  onMoveToCart: (product: Product, size?: string) => void;
  onSelectProduct: (product: Product) => void;
  onBrowseShopping: () => void;
  onMoveAllToCart: () => void;
}

export const WishlistScreen: React.FC<WishlistScreenProps> = ({
  wishlist,
  onRemoveWishlist,
  onMoveToCart,
  onSelectProduct,
  onBrowseShopping,
  onMoveAllToCart
}) => {
  return (
    <div id="wishlist-screen-root" className="min-h-screen text-white pb-24">
      {/* Header */}
      <div className="p-4 bg-[#111111] border-b border-[#222222] flex items-center justify-between">
        <div>
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#C5A059] font-bold block">
            SAVED STYLES
          </span>
          <h1 className="text-xl font-serif text-white mt-0.5">My Wishlist</h1>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-400">{wishlist.length} items</span>
          {wishlist.length > 0 && (
            <button
              onClick={onMoveAllToCart}
              className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider bg-[#C5A059] text-black rounded hover:bg-[#DFC07B] transition-colors"
            >
              Move All to Bag
            </button>
          )}
        </div>
      </div>

      {/* Wishlist Items List */}
      <div className="p-3">
        {wishlist.length === 0 ? (
          <div className="py-24 text-center px-4">
            <div className="w-16 h-16 rounded-full bg-[#181818] border border-[#2B2B2B] flex items-center justify-center mx-auto mb-3 text-gray-500">
              <Heart className="w-8 h-8" />
            </div>
            <h3 className="text-base font-serif text-white">Your wishlist is empty</h3>
            <p className="text-xs text-gray-400 mt-1 max-w-xs mx-auto">
              Save your favorite streetwear, kurtas, and tracksuits to review them whenever inspiration strikes.
            </p>
            <button
              onClick={onBrowseShopping}
              className="mt-4 px-6 py-2.5 bg-[#C5A059] text-black font-semibold text-xs tracking-wider uppercase rounded hover:bg-[#DFC07B] transition-all inline-flex items-center gap-2"
            >
              <span>Explore New Arrivals</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            {wishlist.map((item) => (
              <div
                key={item.id}
                className="bg-[#141414] border border-[#222222] rounded overflow-hidden flex flex-col justify-between group hover:border-[#C5A059] transition-all"
              >
                <div
                  className="relative aspect-[3/4] bg-[#181818] cursor-pointer"
                  onClick={() => onSelectProduct(item)}
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                  />
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onRemoveWishlist(item.id);
                    }}
                    className="absolute top-2 right-2 p-1.5 rounded-full bg-black/60 backdrop-blur-sm text-gray-300 hover:text-red-400 transition-colors"
                    title="Remove from wishlist"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="p-2.5 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[9px] uppercase tracking-wider text-[#C5A059]">
                      {item.categoryLabel}
                    </span>
                    <h4
                      onClick={() => onSelectProduct(item)}
                      className="text-xs font-medium text-gray-100 truncate cursor-pointer hover:text-[#DFC07B]"
                    >
                      {item.name}
                    </h4>
                    <div className="flex items-center gap-1.5 mt-1">
                      <span className="text-xs font-bold text-white">
                        ₹{item.price.toLocaleString('en-IN')}
                      </span>
                      {item.originalPrice > item.price && (
                        <span className="text-[10px] text-gray-500 line-through">
                          ₹{item.originalPrice.toLocaleString('en-IN')}
                        </span>
                      )}
                    </div>
                  </div>

                  <button
                    onClick={() => onMoveToCart(item, item.sizes[0] || 'M')}
                    className="mt-3 w-full py-1.5 px-2 bg-[#1E1E1E] border border-[#C5A059]/60 hover:bg-[#C5A059] text-[#DFC07B] hover:text-black rounded text-[11px] font-semibold tracking-wider uppercase transition-all flex items-center justify-center gap-1.5"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Move To Bag</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
