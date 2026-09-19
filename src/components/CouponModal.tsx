import React, { useState } from 'react';
import { Tag, Check, X, Sparkles, Copy } from 'lucide-react';
import { AVAILABLE_COUPONS } from '../data/addresses';

interface CouponModalProps {
  isOpen: boolean;
  onClose: () => void;
  appliedCoupon: string | null;
  onSelectCoupon: (code: string) => void;
}

export const CouponModal: React.FC<CouponModalProps> = ({
  isOpen,
  onClose,
  appliedCoupon,
  onSelectCoupon
}) => {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleCopyAndApply = (code: string) => {
    onSelectCoupon(code);
    setCopiedCode(code);
    setTimeout(() => {
      setCopiedCode(null);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-md bg-[#121212] border border-[#282828] rounded-t-2xl sm:rounded-xl text-white shadow-2xl max-h-[85vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="p-4 border-b border-[#222222] flex items-center justify-between bg-[#161616]">
          <div className="flex items-center gap-2">
            <Tag className="w-4 h-4 text-[#C5A059]" />
            <h3 className="font-serif text-sm font-bold text-white">Exclusive Promo Coupons</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-gray-400 hover:text-white hover:bg-[#262626]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Coupons List */}
        <div className="p-4 space-y-3 overflow-y-auto no-scrollbar">
          {AVAILABLE_COUPONS.map((coupon) => {
            const isApplied = appliedCoupon === coupon.code;
            return (
              <div
                key={coupon.code}
                className={`p-3.5 rounded-lg border transition-all ${
                  isApplied
                    ? 'border-[#C5A059] bg-[#1C1811]'
                    : 'border-[#282828] bg-[#171717] hover:border-gray-600'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-1 rounded bg-[#252525] border border-[#C5A059]/40 text-xs font-mono font-bold text-[#DFC07B] tracking-wider">
                        {coupon.code}
                      </span>
                      <span className="text-xs font-bold text-green-400">
                        {coupon.discountPercent}% OFF
                      </span>
                    </div>
                    <h4 className="text-xs font-semibold text-white mt-1.5">{coupon.title}</h4>
                    <p className="text-[11px] text-gray-400 mt-0.5 leading-snug">
                      {coupon.description}
                    </p>
                  </div>

                  <button
                    onClick={() => handleCopyAndApply(coupon.code)}
                    className={`px-3 py-1.5 text-xs font-bold uppercase tracking-wider rounded transition-colors ${
                      isApplied
                        ? 'bg-green-600 text-white'
                        : 'bg-[#C5A059] hover:bg-[#DFC07B] text-black'
                    }`}
                  >
                    {copiedCode === coupon.code
                      ? 'Applied!'
                      : isApplied
                      ? 'Applied ✓'
                      : 'Apply Code'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <div className="p-3 bg-[#161616] border-t border-[#222222] text-center text-[11px] text-gray-400">
          <p>Coupons can be combined with complimentary luxury express delivery.</p>
        </div>
      </div>
    </div>
  );
};
