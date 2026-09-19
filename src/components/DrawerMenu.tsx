import React from 'react';
import { X, ChevronRight, Crown, MapPin, Phone, ShieldCheck, Sparkles, Tag, Smartphone, Download } from 'lucide-react';
import { CATEGORIES } from '../data/mockData';
import { Product } from '../types';

interface DrawerMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectCategory: (category: Product['category']) => void;
  onSelectCollection: (name: string) => void;
  onOpenAppPromo: () => void;
  onOpenApkModal?: () => void;
}

export const DrawerMenu: React.FC<DrawerMenuProps> = ({
  isOpen,
  onClose,
  onSelectCategory,
  onSelectCollection,
  onOpenAppPromo,
  onOpenApkModal
}) => {
  if (!isOpen) return null;

  return (
    <div id="drawer-menu-backdrop" className="fixed inset-0 z-50 flex">
      {/* Dimmed Overlay */}
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Drawer Content */}
      <aside
        id="drawer-panel"
        className="relative w-4/5 max-w-sm bg-[#0E0E0E] text-white h-full z-10 flex flex-col border-r border-[#222222] shadow-2xl overflow-y-auto no-scrollbar"
      >
        {/* Top Header */}
        <div className="p-4 border-b border-[#222222] flex items-center justify-between bg-[#111111]">
          <div>
            <span className="text-lg tracking-[0.2em] font-extrabold text-[#C5A059] font-serif block">
              RELOAD
            </span>
            <span className="text-[8px] tracking-[0.3em] text-[#DFC07B] uppercase block">
              CASUAL ATELIER
            </span>
          </div>
          <button
            id="btn-close-drawer"
            onClick={onClose}
            className="p-1.5 rounded-full bg-[#1C1C1C] text-gray-300 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* VIP Status Card */}
        <div className="p-4 mx-3 my-3 rounded bg-gradient-to-r from-[#1E1911] via-[#141414] to-[#121212] border border-[#C5A059]/40">
          <div className="flex items-center gap-2 text-[#DFC07B] mb-1">
            <Crown className="w-4 h-4" />
            <span className="text-xs font-bold tracking-wider uppercase">GOLD MEMBER</span>
          </div>
          <p className="text-[11px] text-gray-300">Welcome, Rajeev</p>
          <div className="mt-2 flex items-center justify-between text-[10px] text-gray-400">
            <span>540 Reload Coins</span>
            <span className="text-[#C5A059] font-medium underline cursor-pointer">Tier Perks</span>
          </div>
        </div>

        {/* Quick APK & Mobile App Banner */}
        {onOpenApkModal && (
          <div
            onClick={() => {
              onOpenApkModal();
              onClose();
            }}
            className="mx-3 p-3 rounded-xl bg-gradient-to-r from-[#2B2313] via-[#1C170F] to-[#121212] border border-[#C5A059]/60 cursor-pointer hover:border-[#DFC07B] transition-all shadow-md group"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-[#C5A059]/20 text-[#DFC07B]">
                  <Smartphone className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white group-hover:text-[#DFC07B] transition-colors">
                    Install App / Download APK
                  </h4>
                  <p className="text-[10px] text-gray-400">1-Tap WebAPK &amp; Direct Android File</p>
                </div>
              </div>
              <Download className="w-4 h-4 text-[#DFC07B] group-hover:translate-y-0.5 transition-transform" />
            </div>
          </div>
        )}

        {/* Navigation Sections */}
        <div className="px-4 py-2 space-y-4 flex-1">
          {/* Featured Collections */}
          <div>
            <h4 className="text-[10px] uppercase font-bold tracking-widest text-[#C5A059] mb-2 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              CURATED COLLECTIONS
            </h4>
            <div className="space-y-1">
              {[
                { name: 'Summer Collection 2026', tag: 'New' },
                { name: 'Timeless Classics', tag: 'Editorial' },
                { name: 'Luxury Indo-Western', tag: 'Exclusive' },
                { name: 'Urban Track & Streetwear', tag: 'Trending' }
              ].map((coll) => (
                <button
                  key={coll.name}
                  onClick={() => {
                    onSelectCollection(coll.name);
                    onClose();
                  }}
                  className="w-full py-2 px-2 flex items-center justify-between text-xs text-gray-200 hover:text-[#DFC07B] hover:bg-[#161616] rounded transition-colors text-left"
                >
                  <span>{coll.name}</span>
                  <span className="text-[9px] px-1.5 py-0.5 rounded bg-[#222222] text-[#C5A059] font-medium">
                    {coll.tag}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="border-t border-[#1C1C1C] my-2" />

          {/* Shop Categories */}
          <div>
            <h4 className="text-[10px] uppercase font-bold tracking-widest text-gray-400 mb-2">
              BROWSE CATEGORIES
            </h4>
            <div className="space-y-1">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => {
                    onSelectCategory(cat.slug);
                    onClose();
                  }}
                  className="w-full py-2 px-2 flex items-center justify-between text-xs text-gray-300 hover:text-white hover:bg-[#161616] rounded transition-colors text-left"
                >
                  <span className="capitalize">{cat.name}s</span>
                  <div className="flex items-center gap-1 text-gray-500">
                    <span className="text-[10px]">{cat.itemCount}</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="border-t border-[#1C1C1C] my-2" />

          {/* App Download Promo */}
          <div
            onClick={() => {
              onOpenAppPromo();
              onClose();
            }}
            className="p-3 bg-[#151515] border border-[#2B2B2B] rounded cursor-pointer hover:border-[#C5A059] transition-colors"
          >
            <div className="flex items-center gap-2 text-[#DFC07B] text-xs font-bold">
              <Tag className="w-3.5 h-3.5" />
              <span>EXTRA 10% OFF IN APP</span>
            </div>
            <p className="text-[10px] text-gray-400 mt-1">
              Use code <strong className="text-white">EXTRA10</strong> on any order.
            </p>
          </div>

          {/* Customer Service & Guarantees */}
          <div className="pt-2 text-[11px] text-gray-400 space-y-2">
            <div className="flex items-center gap-2 text-gray-300 hover:text-white cursor-pointer">
              <Phone className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>VIP Concierge: +91 98200 12345</span>
            </div>
            <div className="flex items-center gap-2 text-gray-300 hover:text-white cursor-pointer">
              <MapPin className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>Boutique Locator (Delhi, Mumbai, Bengaluru)</span>
            </div>
            <div className="flex items-center gap-2 text-gray-300">
              <ShieldCheck className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>100% Genuine Handcrafted Pieces</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[#222222] bg-[#0A0A0A] text-center text-[10px] text-gray-500">
          <p>© 2026 RELOAD CASUAL. ALL RIGHTS RESERVED.</p>
        </div>
      </aside>
    </div>
  );
};
