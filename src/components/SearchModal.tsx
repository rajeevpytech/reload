import React, { useState, useMemo } from 'react';
import { Search, X, ArrowRight, TrendingUp, Sparkles } from 'lucide-react';
import { Product } from '../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onSelectProduct: (product: Product) => void;
}

const TRENDING_TAGS = [
  'Summer Collection',
  'Tracksuit',
  'Puffer Jacket',
  'Kurta Set',
  'Formal Shirt',
  'Co-ord Set'
];

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  products,
  onSelectProduct
}) => {
  const [query, setQuery] = useState('');

  const filteredProducts = useMemo(() => {
    if (!query.trim()) return [];
    const lower = query.toLowerCase();
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(lower) ||
        p.category.toLowerCase().includes(lower) ||
        p.categoryLabel.toLowerCase().includes(lower) ||
        p.description.toLowerCase().includes(lower)
    );
  }, [query, products]);

  if (!isOpen) return null;

  return (
    <div id="search-modal-container" className="fixed inset-0 z-50 flex flex-col bg-[#0B0B0B]/98 backdrop-blur-xl animate-fade-in">
      {/* Top Search Input Bar */}
      <div className="p-4 border-b border-[#222222] flex items-center gap-3">
        <Search className="w-5 h-5 text-[#C5A059]" />
        <input
          id="search-input-field"
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search tracksuits, kurtas, jackets, shirts..."
          autoFocus
          className="flex-1 bg-transparent border-0 text-white placeholder-gray-500 text-sm focus:outline-none"
        />
        {query && (
          <button
            onClick={() => setQuery('')}
            className="text-gray-400 hover:text-white p-1"
          >
            <X className="w-4 h-4" />
          </button>
        )}
        <button
          id="btn-close-search"
          onClick={onClose}
          className="text-xs font-semibold text-[#DFC07B] hover:text-white tracking-wider uppercase px-2 py-1"
        >
          Cancel
        </button>
      </div>

      {/* Content Body */}
      <div className="flex-1 overflow-y-auto p-4 no-scrollbar">
        {/* If no query, show trending */}
        {!query.trim() ? (
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-1.5 text-xs text-[#C5A059] font-semibold tracking-wider uppercase mb-3">
                <TrendingUp className="w-4 h-4" />
                <span>Trending Searches</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {TRENDING_TAGS.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setQuery(tag)}
                    className="px-3 py-1.5 rounded-full bg-[#161616] border border-[#262626] text-xs text-gray-300 hover:border-[#C5A059] hover:text-white transition-colors"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center gap-1.5 text-xs text-gray-400 font-semibold tracking-wider uppercase mb-3">
                <Sparkles className="w-4 h-4 text-[#DFC07B]" />
                <span>Popular Picks for You</span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {products.slice(0, 4).map((item) => (
                  <div
                    key={item.id}
                    onClick={() => {
                      onSelectProduct(item);
                      onClose();
                    }}
                    className="p-2 bg-[#121212] rounded border border-[#222222] cursor-pointer hover:border-[#C5A059] transition-all flex items-center gap-2.5"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-12 h-14 object-cover rounded bg-[#181818]"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="text-xs text-gray-200 font-medium truncate">{item.name}</p>
                      <p className="text-[11px] text-[#DFC07B] font-bold mt-0.5">₹{item.price.toLocaleString('en-IN')}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div>
            <div className="flex items-center justify-between text-xs text-gray-400 mb-3">
              <span>Results for "{query}"</span>
              <span>{filteredProducts.length} items found</span>
            </div>

            {filteredProducts.length === 0 ? (
              <div className="py-16 text-center text-gray-400">
                <p className="text-sm font-medium">No luxury items found matching "{query}"</p>
                <p className="text-xs text-gray-500 mt-1">Try searching for "tracksuit", "jacket", "shirt", or "kurta"</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {filteredProducts.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => {
                      onSelectProduct(item);
                      onClose();
                    }}
                    className="flex items-center gap-3 p-2 bg-[#141414] rounded border border-[#242424] hover:border-[#C5A059] cursor-pointer transition-colors group"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-14 h-18 object-cover rounded bg-[#181818]"
                    />
                    <div className="flex-1 min-w-0">
                      <span className="text-[10px] text-[#C5A059] uppercase tracking-wider block">
                        {item.categoryLabel}
                      </span>
                      <h4 className="text-xs font-medium text-white truncate group-hover:text-[#DFC07B]">
                        {item.name}
                      </h4>
                      <div className="flex items-center gap-2 mt-1">
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
                    <ArrowRight className="w-4 h-4 text-gray-500 group-hover:text-[#C5A059] group-hover:translate-x-1 transition-all mr-1" />
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
