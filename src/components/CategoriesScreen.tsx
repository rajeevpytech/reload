import React, { useState, useMemo } from 'react';
import { SlidersHorizontal, Heart, ArrowUpDown, Check } from 'lucide-react';
import { CATEGORIES } from '../data/mockData';
import { Product } from '../types';

interface CategoriesScreenProps {
  products: Product[];
  selectedCategory: Product['category'] | 'all';
  onSelectCategory: (category: Product['category'] | 'all') => void;
  onSelectProduct: (product: Product) => void;
  onToggleWishlist: (product: Product) => void;
  isWishlisted: (productId: string) => boolean;
}

export const CategoriesScreen: React.FC<CategoriesScreenProps> = ({
  products,
  selectedCategory,
  onSelectCategory,
  onSelectProduct,
  onToggleWishlist,
  isWishlisted
}) => {
  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high' | 'rating'>('featured');
  const [showSortMenu, setShowSortMenu] = useState<boolean>(false);

  const activeCatInfo = CATEGORIES.find((c) => c.slug === selectedCategory);

  const filteredProducts = useMemo(() => {
    let list = products;
    if (selectedCategory !== 'all') {
      list = list.filter((p) => p.category === selectedCategory);
    }

    return [...list].sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0; // featured
    });
  }, [products, selectedCategory, sortBy]);

  return (
    <div id="categories-screen-root" className="min-h-screen text-white pb-24">
      {/* Category Pills Header */}
      <div className="sticky top-[53px] z-30 bg-[#0B0B0B]/95 backdrop-blur-md border-b border-[#222222] py-2 px-3">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
          <button
            onClick={() => onSelectCategory('all')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
              selectedCategory === 'all'
                ? 'bg-[#C5A059] text-black shadow-md'
                : 'bg-[#181818] text-gray-300 border border-[#2B2B2B] hover:border-gray-500'
            }`}
          >
            All Items
          </button>
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.slug)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat.slug
                  ? 'bg-[#C5A059] text-black shadow-md'
                  : 'bg-[#181818] text-gray-300 border border-[#2B2B2B] hover:border-gray-500'
              }`}
            >
              {cat.name}s
            </button>
          ))}
        </div>
      </div>

      {/* Category Hero / Title Banner */}
      <div className="p-4 bg-gradient-to-b from-[#141414] to-[#0B0B0B] border-b border-[#222222]">
        <span className="text-[10px] uppercase tracking-[0.25em] text-[#C5A059] font-bold block">
          COLLECTIONS
        </span>
        <h1 className="text-2xl font-serif tracking-tight text-white mt-0.5 capitalize">
          {selectedCategory === 'all' ? 'All Curated Pieces' : `${activeCatInfo?.name || selectedCategory}s`}
        </h1>
        <p className="text-xs text-gray-400 mt-1">
          {activeCatInfo ? activeCatInfo.tagline : 'Explore the full luxury menswear catalogue.'}
        </p>

        {/* Filter / Sort Control Bar */}
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-[#222222] text-xs text-gray-300">
          <span>{filteredProducts.length} Exclusive Styles</span>

          <div className="relative">
            <button
              onClick={() => setShowSortMenu(!showSortMenu)}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#1C1C1C] border border-[#2F2F2F] text-xs hover:border-[#C5A059]"
            >
              <ArrowUpDown className="w-3.5 h-3.5 text-[#C5A059]" />
              <span className="capitalize">
                {sortBy === 'featured'
                  ? 'Featured'
                  : sortBy === 'price-low'
                  ? 'Price: Low to High'
                  : sortBy === 'price-high'
                  ? 'Price: High to Low'
                  : 'Highest Rated'}
              </span>
            </button>

            {showSortMenu && (
              <div className="absolute right-0 top-full mt-1 w-44 bg-[#141414] border border-[#2F2F2F] rounded shadow-2xl z-40 py-1">
                {[
                  { id: 'featured', label: 'Featured Pieces' },
                  { id: 'price-low', label: 'Price: Low to High' },
                  { id: 'price-high', label: 'Price: High to Low' },
                  { id: 'rating', label: 'Highest Rated' }
                ].map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => {
                      setSortBy(opt.id as any);
                      setShowSortMenu(false);
                    }}
                    className="w-full px-3 py-2 text-left text-xs flex items-center justify-between hover:bg-[#202020] text-gray-200"
                  >
                    <span>{opt.label}</span>
                    {sortBy === opt.id && <Check className="w-3.5 h-3.5 text-[#C5A059]" />}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="p-3">
        {filteredProducts.length === 0 ? (
          <div className="py-20 text-center text-gray-400">
            <SlidersHorizontal className="w-8 h-8 mx-auto text-gray-600 mb-2" />
            <p className="text-sm font-medium">No items found in this category.</p>
            <button
              onClick={() => onSelectCategory('all')}
              className="mt-3 px-4 py-1.5 bg-[#C5A059] text-black text-xs font-semibold rounded"
            >
              View All Catalogue
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            {filteredProducts.map((prod) => {
              const wish = isWishlisted(prod.id);
              return (
                <div
                  key={prod.id}
                  onClick={() => onSelectProduct(prod)}
                  className="bg-[#121212] rounded border border-[#222222] overflow-hidden group cursor-pointer hover:border-[#C5A059] transition-all flex flex-col"
                >
                  <div className="relative aspect-[3/4] bg-[#1A1A1A] overflow-hidden">
                    {prod.discountPercentage && (
                      <span className="absolute bottom-2 left-2 z-10 bg-[#DFC07B] text-black text-[9px] font-bold px-1.5 py-0.5 rounded-sm">
                        -{prod.discountPercentage}%
                      </span>
                    )}
                    <img
                      src={prod.image}
                      alt={prod.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      referrerPolicy="no-referrer"
                    />
                    <button
                      aria-label="Add to Wishlist"
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleWishlist(prod);
                      }}
                      className={`absolute top-2 right-2 w-7 h-7 rounded-full backdrop-blur-sm flex items-center justify-center transition-colors ${
                        wish
                          ? 'bg-[#C5A059] text-black'
                          : 'bg-black/40 text-white/80 hover:text-white'
                      }`}
                    >
                      <Heart className={`w-4 h-4 ${wish ? 'fill-current' : ''}`} />
                    </button>
                  </div>

                  <div className="p-2.5 flex-1 flex flex-col justify-between">
                    <div>
                      <span className="text-[9px] text-[#C5A059] tracking-wider uppercase font-semibold">
                        {prod.categoryLabel}
                      </span>
                      <h3 className="text-xs text-gray-100 font-medium truncate mt-0.5 group-hover:text-[#DFC07B]">
                        {prod.name}
                      </h3>
                    </div>

                    <div className="flex items-baseline gap-1.5 mt-2">
                      <span className="text-xs font-bold text-white">
                        ₹{prod.price.toLocaleString('en-IN')}
                      </span>
                      {prod.originalPrice > prod.price && (
                        <span className="text-[10px] text-gray-500 line-through">
                          ₹{prod.originalPrice.toLocaleString('en-IN')}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
