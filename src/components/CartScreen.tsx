import React, { useState } from 'react';
import { Trash2, Plus, Minus, Tag, ArrowRight, ShieldCheck, Truck, Check, ShoppingBag, MapPin, ChevronRight } from 'lucide-react';
import { CartItem, Product, UserAddress } from '../types';

interface CartScreenProps {
  cartItems: CartItem[];
  onUpdateQuantity: (productId: string, size: string, delta: number) => void;
  onRemoveItem: (productId: string, size: string) => void;
  onBrowseShopping: () => void;
  onSelectProduct: (product: Product) => void;
  onCompleteOrder: (total: number, items: CartItem[], addressText: string, paymentMode: string) => void;
  appliedCoupon: string | null;
  onApplyCoupon: (code: string) => boolean;
  onRemoveCoupon: () => void;
  addresses?: UserAddress[];
  selectedAddressId?: string;
  onOpenAddressModal?: () => void;
  onOpenCouponModal?: () => void;
}

export const CartScreen: React.FC<CartScreenProps> = ({
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onBrowseShopping,
  onSelectProduct,
  onCompleteOrder,
  appliedCoupon,
  onApplyCoupon,
  onRemoveCoupon,
  addresses = [],
  selectedAddressId,
  onOpenAddressModal,
  onOpenCouponModal
}) => {
  const [couponInput, setCouponInput] = useState<string>('');
  const [couponError, setCouponError] = useState<string>('');
  const [couponSuccess, setCouponSuccess] = useState<string>('');
  const [isCheckingOut, setIsCheckingOut] = useState<boolean>(false);
  const [selectedPayment, setSelectedPayment] = useState<string>('upi');
  const [orderSuccessId, setOrderSuccessId] = useState<string | null>(null);

  const activeAddress = addresses.find((a) => a.id === selectedAddressId) || addresses[0];

  // Financial calculations
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.product.originalPrice * item.quantity,
    0
  );
  const discountedSubtotal = cartItems.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );
  const productSavings = subtotal - discountedSubtotal;

  const couponDiscount = appliedCoupon === 'EXTRA10' || appliedCoupon === 'RELOAD10'
    ? Math.round(discountedSubtotal * 0.1)
    : appliedCoupon === 'FESTIVE15'
    ? Math.round(discountedSubtotal * 0.15)
    : 0;
  const deliveryFee = 0; // Free shipping
  const finalTotal = discountedSubtotal - couponDiscount;

  const handleApply = (codeToApply?: string) => {
    const code = (codeToApply || couponInput).trim().toUpperCase();
    if (!code) return;
    const ok = onApplyCoupon(code);
    if (ok) {
      setCouponSuccess(`Coupon ${code} applied successfully! Discount added.`);
      setCouponError('');
      setCouponInput('');
    } else {
      setCouponError('Invalid coupon code. Try EXTRA10 or RELOAD10.');
      setCouponSuccess('');
    }
  };

  const handlePlaceOrder = () => {
    const id = `ORD-${Math.floor(10000 + Math.random() * 90000)}`;
    setOrderSuccessId(id);
    const addrString = activeAddress
      ? `${activeAddress.addressLine}, ${activeAddress.city} - ${activeAddress.pincode}`
      : 'Signature Towers, CyberCity, Gurugram, 122002';
    const payMode = selectedPayment === 'upi' ? 'Instant UPI (GPay)' : selectedPayment === 'card' ? 'Credit Card' : 'Cash On Delivery';
    onCompleteOrder(finalTotal, cartItems, addrString, payMode);
  };

  if (orderSuccessId) {
    return (
      <div className="min-h-screen text-white p-4 flex flex-col items-center justify-center pb-24 text-center">
        <div className="w-16 h-16 rounded-full bg-green-500/20 border-2 border-green-500 flex items-center justify-center mb-4">
          <Check className="w-8 h-8 text-green-400" />
        </div>
        <span className="text-[10px] tracking-[0.25em] text-[#C5A059] uppercase font-bold">
          ORDER CONFIRMED
        </span>
        <h2 className="text-2xl font-serif text-white mt-1">Thank You, Rajeev!</h2>
        <p className="text-xs text-gray-400 mt-1">Order #{orderSuccessId} has been placed successfully.</p>

        <div className="my-6 p-4 bg-[#141414] border border-[#262626] rounded-lg w-full max-w-sm text-left text-xs space-y-2.5">
          <div className="flex justify-between pb-2 border-b border-[#222222]">
            <span className="text-gray-400">Total Paid:</span>
            <span className="font-bold text-[#DFC07B] text-sm">₹{finalTotal.toLocaleString('en-IN')}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Payment:</span>
            <span className="text-gray-200 capitalize">{selectedPayment === 'upi' ? 'UPI / GPay' : selectedPayment}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Estimated Delivery:</span>
            <span className="text-green-400 font-medium">Friday, Express Courier</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Delivery Address:</span>
            <span className="text-gray-300 text-right">Signature Towers, 402, DLF CyberCity</span>
          </div>
        </div>

        <button
          onClick={() => {
            setOrderSuccessId(null);
            setIsCheckingOut(false);
            onBrowseShopping();
          }}
          className="px-6 py-2.5 bg-[#C5A059] text-black text-xs font-bold uppercase tracking-wider rounded hover:bg-[#DFC07B] transition-colors"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div id="cart-screen-root" className="min-h-screen text-white pb-28">
      {/* Header */}
      <div className="p-4 bg-[#111111] border-b border-[#222222] flex items-center justify-between">
        <div>
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#C5A059] font-bold block">
            LUXURY ATELIER
          </span>
          <h1 className="text-xl font-serif text-white mt-0.5">Shopping Bag</h1>
        </div>
        <span className="text-xs text-gray-400">
          {cartItems.reduce((sum, item) => sum + item.quantity, 0)} items
        </span>
      </div>

      {cartItems.length === 0 ? (
        <div className="py-24 text-center px-4">
          <div className="w-16 h-16 rounded-full bg-[#161616] border border-[#262626] flex items-center justify-center mx-auto mb-3 text-gray-500">
            <ShoppingBag className="w-8 h-8" />
          </div>
          <h3 className="text-base font-serif text-white">Your Shopping Bag is empty</h3>
          <p className="text-xs text-gray-400 mt-1 max-w-xs mx-auto">
            Discover curated summer shirts, kurtas, tracksuits and elevate your wardrobe.
          </p>
          <button
            onClick={onBrowseShopping}
            className="mt-4 px-6 py-2.5 bg-[#C5A059] text-black font-semibold text-xs tracking-wider uppercase rounded hover:bg-[#DFC07B] transition-all inline-flex items-center gap-2"
          >
            <span>Start Shopping</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <div className="p-3 space-y-4">
          {/* Cart Item Cards */}
          <div className="space-y-3">
            {cartItems.map((item) => (
              <div
                key={`${item.product.id}-${item.size}`}
                className="p-3 bg-[#141414] rounded border border-[#242424] flex gap-3"
              >
                {/* Thumbnail */}
                <div
                  className="w-20 h-24 bg-[#1C1C1C] rounded overflow-hidden shrink-0 cursor-pointer"
                  onClick={() => onSelectProduct(item.product)}
                >
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>

                {/* Info */}
                <div className="flex-1 flex flex-col justify-between min-w-0">
                  <div>
                    <div className="flex items-start justify-between gap-1">
                      <span className="text-[10px] uppercase text-[#C5A059] tracking-wider font-semibold">
                        {item.product.categoryLabel}
                      </span>
                      <button
                        onClick={() => onRemoveItem(item.product.id, item.size)}
                        className="text-gray-500 hover:text-red-400 p-0.5"
                        title="Remove"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <h4
                      onClick={() => onSelectProduct(item.product)}
                      className="text-xs font-medium text-gray-100 truncate cursor-pointer hover:text-[#DFC07B]"
                    >
                      {item.product.name}
                    </h4>

                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs font-bold text-white">
                        ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                      </span>
                      {item.product.originalPrice > item.product.price && (
                        <span className="text-[10px] text-gray-500 line-through">
                          ₹{(item.product.originalPrice * item.quantity).toLocaleString('en-IN')}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Size & Quantity Control */}
                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#202020]">
                    <span className="text-[10px] text-gray-400">
                      Size: <strong className="text-white">{item.size}</strong>
                    </span>

                    <div className="flex items-center gap-2 border border-[#333333] rounded px-1.5 py-0.5 bg-[#181818]">
                      <button
                        onClick={() => onUpdateQuantity(item.product.id, item.size, -1)}
                        className="text-gray-400 hover:text-white p-0.5"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-xs font-bold w-4 text-center">{item.quantity}</span>
                      <button
                        onClick={() => onUpdateQuantity(item.product.id, item.size, 1)}
                        className="text-gray-400 hover:text-white p-0.5"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Coupon Code Card */}
          <div className="p-3.5 bg-[#141414] rounded border border-[#262626] space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-gray-300 flex items-center gap-1.5">
                <Tag className="w-3.5 h-3.5 text-[#C5A059]" />
                Apply Exclusive Coupon
              </span>
              <div className="flex items-center gap-2">
                {onOpenCouponModal && (
                  <button
                    onClick={onOpenCouponModal}
                    className="text-[11px] font-medium text-[#DFC07B] hover:underline"
                  >
                    View All Coupons
                  </button>
                )}
                {appliedCoupon && (
                  <button
                    onClick={onRemoveCoupon}
                    className="text-[10px] text-red-400 hover:underline"
                  >
                    Remove
                  </button>
                )}
              </div>
            </div>

            {appliedCoupon ? (
              <div className="p-2 rounded bg-[#1C2417] border border-green-600/40 flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5 text-green-400 font-medium">
                  <Check className="w-4 h-4" />
                  <span>Coupon {appliedCoupon} applied! (10% off)</span>
                </div>
                <span className="text-xs font-bold text-green-400">
                  -₹{couponDiscount.toLocaleString('en-IN')}
                </span>
              </div>
            ) : (
              <div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={couponInput}
                    onChange={(e) => {
                      setCouponInput(e.target.value);
                      setCouponError('');
                    }}
                    placeholder="Enter coupon code (e.g. EXTRA10)"
                    className="flex-1 bg-[#1A1A1A] border border-[#2E2E2E] rounded px-3 py-1.5 text-xs text-white uppercase tracking-wider focus:outline-none focus:border-[#C5A059]"
                  />
                  <button
                    onClick={() => handleApply()}
                    className="px-4 py-1.5 bg-[#C5A059] hover:bg-[#DFC07B] text-black text-xs font-bold rounded tracking-wider uppercase transition-colors"
                  >
                    Apply
                  </button>
                </div>

                {couponError && <p className="text-[11px] text-red-400 mt-1">{couponError}</p>}
                {couponSuccess && <p className="text-[11px] text-green-400 mt-1">{couponSuccess}</p>}

                {/* Quick 1-tap suggestion banner matching the Download App banner */}
                <div className="mt-2.5 p-2 rounded bg-[#181818] border border-[#2F2F2F] flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-[#DFC07B] text-[11px]">EXTRA10</span>
                    <p className="text-[10px] text-gray-400">Save 10% on your entire order</p>
                  </div>
                  <button
                    onClick={() => handleApply('EXTRA10')}
                    className="px-2.5 py-1 text-[10px] font-bold tracking-wider text-[#C5A059] border border-[#C5A059] rounded hover:bg-[#C5A059] hover:text-black transition-colors"
                  >
                    TAP TO APPLY
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Price Breakdown */}
          <div className="p-3.5 bg-[#141414] rounded border border-[#262626] space-y-2 text-xs">
            <h4 className="font-bold text-gray-200 uppercase tracking-wider text-[11px] pb-1 border-b border-[#222222]">
              Price Details
            </h4>
            <div className="flex justify-between text-gray-400">
              <span>Total MRP</span>
              <span>₹{subtotal.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between text-gray-400">
              <span>Product Discount</span>
              <span className="text-green-400">-₹{productSavings.toLocaleString('en-IN')}</span>
            </div>
            {couponDiscount > 0 && (
              <div className="flex justify-between text-gray-400">
                <span>Coupon Savings ({appliedCoupon})</span>
                <span className="text-green-400">-₹{couponDiscount.toLocaleString('en-IN')}</span>
              </div>
            )}
            <div className="flex justify-between text-gray-400">
              <span>Delivery Fee</span>
              <span className="text-[#DFC07B] font-medium uppercase text-[10px]">
                FREE (Guaranteed)
              </span>
            </div>

            <div className="pt-2 border-t border-[#222222] flex justify-between items-baseline text-sm font-bold text-white">
              <span>Total Amount</span>
              <span className="text-[#DFC07B] text-base">₹{finalTotal.toLocaleString('en-IN')}</span>
            </div>

            <p className="text-[10px] text-gray-500 pt-1">
              You saved ₹{(productSavings + couponDiscount).toLocaleString('en-IN')} on this order!
            </p>
          </div>

          {/* Checkout Modal / Slideup */}
          {isCheckingOut ? (
            <div className="p-4 bg-[#141414] rounded border border-[#C5A059] space-y-3">
              <h4 className="font-serif text-sm text-white">Select Payment & Delivery Address</h4>

              {/* Delivery Address */}
              <div className="p-3 bg-[#1A1A1A] rounded border border-[#2A2A2A] text-xs">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#C5A059]" />
                    <span className="font-bold text-[#DFC07B]">
                      {activeAddress ? activeAddress.name : 'Rajeev Sharma'}
                    </span>
                    <span className="text-[9px] uppercase px-1.5 py-0.5 rounded bg-[#252525] text-gray-300 font-semibold">
                      {activeAddress ? activeAddress.type : 'HOME'}
                    </span>
                  </div>
                  {onOpenAddressModal && (
                    <button
                      type="button"
                      onClick={onOpenAddressModal}
                      className="text-[11px] font-semibold text-[#DFC07B] hover:underline flex items-center gap-0.5"
                    >
                      <span>Change</span>
                      <ChevronRight className="w-3 h-3" />
                    </button>
                  )}
                </div>
                <p className="text-gray-300 leading-relaxed mt-1">
                  {activeAddress ? activeAddress.addressLine : 'Signature Towers, 402, DLF CyberCity'}
                </p>
                <p className="text-gray-400 text-[11px] mt-0.5">
                  {activeAddress ? `${activeAddress.city} — ${activeAddress.pincode}` : 'Gurugram, 122002'}
                </p>
                <p className="text-gray-500 text-[10px] mt-0.5">
                  Phone: {activeAddress ? activeAddress.phone : '+91 98765 43210'}
                </p>
              </div>

              {/* Payment Methods */}
              <div className="space-y-1.5 text-xs">
                <span className="font-semibold text-gray-300 block text-[11px]">Payment Mode</span>
                {[
                  { id: 'upi', label: 'Instant UPI (Google Pay, PhonePe, Paytm)' },
                  { id: 'card', label: 'Credit / Debit Card (Visa, Mastercard, Amex)' },
                  { id: 'cod', label: 'Cash On Delivery (Verified OTP)' }
                ].map((m) => (
                  <label
                    key={m.id}
                    onClick={() => setSelectedPayment(m.id)}
                    className={`flex items-center gap-2.5 p-2 rounded border cursor-pointer ${
                      selectedPayment === m.id
                        ? 'border-[#C5A059] bg-[#1E1911] text-white'
                        : 'border-[#262626] bg-[#161616] text-gray-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      checked={selectedPayment === m.id}
                      onChange={() => setSelectedPayment(m.id)}
                      className="accent-[#C5A059]"
                    />
                    <span>{m.label}</span>
                  </label>
                ))}
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  onClick={() => setIsCheckingOut(false)}
                  className="w-1/3 py-2.5 px-3 rounded bg-[#222222] text-xs font-semibold text-gray-300"
                >
                  Back
                </button>
                <button
                  id="btn-place-order"
                  onClick={handlePlaceOrder}
                  className="w-2/3 py-2.5 px-4 rounded bg-[#C5A059] hover:bg-[#DFC07B] text-black font-bold text-xs uppercase tracking-wider shadow-lg transition-colors"
                >
                  Confirm & Pay ₹{finalTotal.toLocaleString('en-IN')}
                </button>
              </div>
            </div>
          ) : (
            <button
              id="btn-proceed-to-checkout"
              onClick={() => setIsCheckingOut(true)}
              className="w-full py-3.5 px-4 bg-[#C5A059] hover:bg-[#DFC07B] text-black font-bold text-xs uppercase tracking-wider rounded shadow-xl flex items-center justify-center gap-2 transition-colors active:scale-98"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}

          {/* Guarantees */}
          <div className="flex items-center justify-around text-gray-500 text-[10px] pt-1">
            <span className="flex items-center gap-1">
              <Truck className="w-3.5 h-3.5 text-[#C5A059]" /> Free Return Pickups
            </span>
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-[#C5A059]" /> 256-bit Secure Checkout
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
