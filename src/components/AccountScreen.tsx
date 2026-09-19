import React from 'react';
import { Crown, Package, MapPin, CreditCard, Bell, ChevronRight, PhoneCall, LogOut, CheckCircle2, Clock, Smartphone, Download, Sparkles } from 'lucide-react';
import { OrderRecord, UserAddress } from '../types';

interface AccountScreenProps {
  orders: OrderRecord[];
  onTrackOrder: (orderId: string) => void;
  onSelectCategory: (category: any) => void;
  addresses?: UserAddress[];
  onOpenAddressModal?: () => void;
  onOpenSupport?: (orderId?: string) => void;
  onOpenApkModal?: () => void;
}

export const AccountScreen: React.FC<AccountScreenProps> = ({
  orders,
  onTrackOrder,
  onSelectCategory,
  addresses = [],
  onOpenAddressModal,
  onOpenSupport,
  onOpenApkModal
}) => {
  return (
    <div id="account-screen-root" className="min-h-screen text-white pb-24">
      {/* Top Profile Card */}
      <div className="p-4 bg-gradient-to-b from-[#181818] to-[#0E0E0E] border-b border-[#222222]">
        <div className="flex items-center gap-3">
          <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-[#C5A059] to-[#DFC07B] p-0.5 shadow-lg">
            <div className="w-full h-full rounded-full bg-[#111111] flex items-center justify-center text-lg font-serif font-bold text-[#DFC07B]">
              RS
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h2 className="text-base font-serif font-bold text-white">Rajeev Sharma</h2>
              <Crown className="w-4 h-4 text-[#C5A059]" />
            </div>
            <p className="text-xs text-gray-400">rajeev.pytech@gmail.com</p>
            <span className="inline-block mt-1 px-2 py-0.5 rounded-full text-[9px] font-bold tracking-wider uppercase bg-[#C5A059]/20 text-[#DFC07B] border border-[#C5A059]/40">
              Gold Elite Tier
            </span>
          </div>
        </div>

        {/* Reload Coins Banner */}
        <div className="mt-4 p-3 rounded bg-[#141414] border border-[#282828] flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase tracking-wider text-gray-400">Reload Rewards</span>
            <p className="text-sm font-bold text-[#DFC07B] mt-0.5">540 Coins Available</p>
          </div>
          <button className="px-3 py-1 bg-[#222222] hover:bg-[#2A2A2A] text-xs font-semibold text-[#DFC07B] rounded border border-[#C5A059]/30">
            Redeem ₹540
          </button>
        </div>
      </div>

      <div className="p-3 space-y-4">
        {/* Recent Orders Section */}
        <div>
          <div className="flex items-center justify-between mb-2.5 px-1">
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-300 flex items-center gap-1.5">
              <Package className="w-4 h-4 text-[#C5A059]" />
              My Orders ({orders.length})
            </h3>
            <span className="text-[11px] text-[#C5A059] hover:underline cursor-pointer">
              All Orders
            </span>
          </div>

          <div className="space-y-2.5">
            {orders.map((order) => (
              <div
                key={order.id}
                onClick={() => onTrackOrder(order.id)}
                className="p-3 bg-[#141414] rounded border border-[#242424] hover:border-[#C5A059] transition-colors cursor-pointer"
              >
                <div className="flex items-center justify-between pb-2 border-b border-[#202020] text-xs">
                  <div>
                    <span className="font-bold text-white">{order.id}</span>
                    <span className="text-gray-500 text-[10px] ml-2">{order.date}</span>
                  </div>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded flex items-center gap-1 ${
                      order.status === 'Delivered'
                        ? 'bg-green-950 text-green-400 border border-green-800'
                        : 'bg-amber-950 text-amber-400 border border-amber-800'
                    }`}
                  >
                    {order.status === 'Delivered' ? (
                      <CheckCircle2 className="w-3 h-3" />
                    ) : (
                      <Clock className="w-3 h-3" />
                    )}
                    {order.status}
                  </span>
                </div>

                <div className="py-2.5 flex items-center gap-3">
                  {order.items.map((it, idx) => (
                    <div key={idx} className="flex items-center gap-2.5 flex-1 min-w-0">
                      <img
                        src={it.image}
                        alt={it.name}
                        className="w-11 h-14 object-cover rounded bg-[#181818]"
                      />
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-medium text-gray-200 truncate">{it.name}</p>
                        <p className="text-[10px] text-gray-400">
                          Size: {it.size} | Qty: {it.quantity}
                        </p>
                        <p className="text-xs font-bold text-[#DFC07B] mt-0.5">
                          ₹{it.price.toLocaleString('en-IN')}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-2 border-t border-[#202020] flex items-center justify-between text-[11px] text-gray-400">
                  <span>{order.estimatedDelivery}</span>
                  <div className="flex items-center gap-1 text-[#C5A059] font-medium">
                    <span>Track Order</span>
                    <ChevronRight className="w-3 h-3" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile App & APK Direct Install Banner */}
        {onOpenApkModal && (
          <div
            onClick={onOpenApkModal}
            className="p-3.5 rounded-xl bg-gradient-to-r from-[#241D10] via-[#1A160F] to-[#121212] border border-[#C5A059]/60 cursor-pointer hover:border-[#DFC07B] transition-all shadow-md group"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#C5A059]/20 border border-[#C5A059]/40 flex items-center justify-center text-[#DFC07B] group-hover:scale-105 transition-transform">
                  <Smartphone className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[9px] font-extrabold uppercase tracking-widest text-[#DFC07B]">
                      ANDROID &amp; IOS
                    </span>
                    <span className="px-1.5 py-0.2 rounded bg-green-900/60 text-green-300 text-[8px] font-bold">
                      OFFLINE READY
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-white group-hover:text-[#DFC07B] transition-colors">
                    Install App on Phone / Download .APK
                  </h4>
                  <p className="text-[10px] text-gray-400">
                    Direct WebAPK instant install &amp; PWABuilder package instructions
                  </p>
                </div>
              </div>
              <Download className="w-5 h-5 text-[#DFC07B] group-hover:translate-y-0.5 transition-transform" />
            </div>
          </div>
        )}

        {/* Account Quick Settings */}
        <div className="space-y-1.5 bg-[#141414] rounded border border-[#242424] p-2">
          {/* Saved Addresses */}
          <div
            onClick={onOpenAddressModal}
            className="flex items-center justify-between p-2.5 hover:bg-[#1C1C1C] rounded transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 rounded bg-[#1C1C1C] text-[#C5A059]">
                <MapPin className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-semibold text-gray-200">Saved Delivery Addresses</h4>
                <p className="text-[10px] text-gray-500">
                  {addresses.length > 0
                    ? `${addresses.length} saved: ${addresses[0].city}`
                    : 'Add or manage home & work locations'}
                </p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-500" />
          </div>

          {/* Payment Methods */}
          <div
            onClick={() => onOpenSupport && onOpenSupport()}
            className="flex items-center justify-between p-2.5 hover:bg-[#1C1C1C] rounded transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 rounded bg-[#1C1C1C] text-[#C5A059]">
                <CreditCard className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-semibold text-gray-200">Payment Methods &amp; UPI</h4>
                <p className="text-[10px] text-gray-500">Google Pay •••• 9876 (Active &amp; Verified)</p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-500" />
          </div>

          {/* Drop Alerts */}
          <div
            onClick={() => onOpenSupport && onOpenSupport()}
            className="flex items-center justify-between p-2.5 hover:bg-[#1C1C1C] rounded transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 rounded bg-[#1C1C1C] text-[#C5A059]">
                <Bell className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-semibold text-gray-200">Notifications &amp; Drop Alerts</h4>
                <p className="text-[10px] text-gray-500">SMS, WhatsApp, Email enabled</p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-500" />
          </div>

          {/* VIP Concierge */}
          <div
            onClick={() => onOpenSupport && onOpenSupport()}
            className="flex items-center justify-between p-2.5 hover:bg-[#1C1C1C] rounded transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 rounded bg-[#1C1C1C] text-[#C5A059]">
                <PhoneCall className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-semibold text-gray-200">VIP Concierge 24/7</h4>
                <p className="text-[10px] text-gray-500">Direct WhatsApp Line with Master Stylist</p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-500" />
          </div>
        </div>

        {/* Brand Atelier Note */}
        <div className="p-3.5 bg-gradient-to-r from-[#17130C] to-[#121212] border border-[#C5A059]/30 rounded text-center text-xs space-y-1">
          <p className="font-serif text-[#DFC07B] font-bold tracking-wider">
            RELOAD CASUAL BESPOKE
          </p>
          <p className="text-[10px] text-gray-400">
            For bespoke wedding, runway, or corporate gifting inquiries, connect with our master
            tailoring studio.
          </p>
        </div>

        {/* Sign Out */}
        <button className="w-full py-2.5 flex items-center justify-center gap-2 text-xs font-semibold text-gray-400 hover:text-red-400 bg-[#121212] border border-[#222222] rounded transition-colors">
          <LogOut className="w-3.5 h-3.5" />
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  );
};
