import React from 'react';
import { X, CheckCircle2, Clock, Truck, Package, ShieldCheck, MapPin, CreditCard, ChevronRight } from 'lucide-react';
import { OrderRecord } from '../types';

interface OrderDetailModalProps {
  order: OrderRecord | null;
  isOpen: boolean;
  onClose: () => void;
  onSupportHelp: (orderId: string) => void;
}

export const OrderDetailModal: React.FC<OrderDetailModalProps> = ({
  order,
  isOpen,
  onClose,
  onSupportHelp
}) => {
  if (!isOpen || !order) return null;

  const defaultTimeline = [
    {
      title: 'Order Placed & Confirmed',
      description: 'Order details verified and dispatched to atelier',
      time: order.date,
      completed: true
    },
    {
      title: 'Quality Inspected & Packed',
      description: 'Handcrafted inspection by master tailor in New Delhi',
      time: order.status !== 'Processing' ? 'Same Day' : 'In Progress',
      completed: order.status !== 'Processing'
    },
    {
      title: 'Dispatched via BlueDart Apex Air',
      description: 'Waybill generated: AWB #BLUEDART-882910',
      time: order.status === 'Delivered' ? 'Next Day' : order.status === 'In Transit' ? 'Today' : 'Pending',
      completed: order.status === 'Delivered' || order.status === 'In Transit'
    },
    {
      title: 'Delivered with Signature',
      description: 'Handed over directly to recipient',
      time: order.status === 'Delivered' ? order.estimatedDelivery : 'Estimated ' + order.estimatedDelivery,
      completed: order.status === 'Delivered'
    }
  ];

  const timeline = order.timeline || defaultTimeline;

  return (
    <div id="order-detail-backdrop" className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-md bg-[#111111] border border-[#262626] rounded-t-2xl sm:rounded-xl text-white shadow-2xl max-h-[90vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="p-4 border-b border-[#222222] flex items-center justify-between bg-[#161616]">
          <div>
            <span className="text-[10px] tracking-[0.2em] font-semibold text-[#C5A059] uppercase block">
              LIVE ORDER TRACKING
            </span>
            <h3 className="font-serif text-sm font-bold text-white mt-0.5">
              Order {order.id}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-gray-400 hover:text-white hover:bg-[#262626]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar">
          {/* Status Badge Card */}
          <div className="p-3.5 rounded-lg bg-gradient-to-r from-[#1E1911] via-[#141414] to-[#121212] border border-[#C5A059]/40 flex items-center justify-between">
            <div>
              <div className="flex items-center gap-1.5">
                {order.status === 'Delivered' ? (
                  <CheckCircle2 className="w-4 h-4 text-green-400" />
                ) : (
                  <Clock className="w-4 h-4 text-[#DFC07B] animate-spin" />
                )}
                <span className="text-xs font-bold uppercase tracking-wider text-white">
                  {order.status}
                </span>
              </div>
              <p className="text-[11px] text-[#DFC07B] mt-1 font-medium">
                {order.estimatedDelivery}
              </p>
            </div>
            <span className="px-2.5 py-1 rounded bg-[#202020] text-[10px] font-mono text-gray-300 border border-[#333333]">
              {order.date}
            </span>
          </div>

          {/* Purchased Items */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400">
              Ordered Items ({order.items.length})
            </h4>
            <div className="space-y-2">
              {order.items.map((it, idx) => (
                <div
                  key={idx}
                  className="p-2.5 bg-[#171717] rounded border border-[#242424] flex items-center gap-3"
                >
                  <img
                    src={it.image}
                    alt={it.name}
                    className="w-12 h-16 object-cover rounded bg-[#1F1F1F]"
                  />
                  <div className="flex-1 min-w-0">
                    <h5 className="text-xs font-semibold text-white truncate">{it.name}</h5>
                    <p className="text-[10px] text-gray-400 mt-0.5">
                      Size: <strong className="text-gray-200">{it.size}</strong> • Qty: {it.quantity}
                    </p>
                    <p className="text-xs font-bold text-[#DFC07B] mt-1">
                      ₹{it.price.toLocaleString('en-IN')}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tracking Stepper / Timeline */}
          <div className="p-3.5 bg-[#161616] rounded border border-[#262626]">
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-300 mb-3 flex items-center gap-1.5">
              <Truck className="w-3.5 h-3.5 text-[#C5A059]" />
              Shipping Journey & Milestones
            </h4>

            <div className="space-y-4 relative pl-5 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#2A2A2A]">
              {timeline.map((step, idx) => (
                <div key={idx} className="relative">
                  <div
                    className={`absolute -left-[21px] top-0.5 w-3.5 h-3.5 rounded-full flex items-center justify-center border ${
                      step.completed
                        ? 'bg-[#C5A059] border-[#C5A059] text-black'
                        : 'bg-[#181818] border-gray-600 text-transparent'
                    }`}
                  >
                    {step.completed && <CheckCircle2 className="w-2.5 h-2.5 text-black stroke-[3]" />}
                  </div>
                  <div>
                    <div className="flex items-center justify-between">
                      <span
                        className={`text-xs font-semibold ${
                          step.completed ? 'text-white' : 'text-gray-500'
                        }`}
                      >
                        {step.title}
                      </span>
                      <span className="text-[10px] text-gray-500">{step.time}</span>
                    </div>
                    <p className="text-[10px] text-gray-400 mt-0.5">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Delivery & Billing Summary */}
          <div className="p-3 bg-[#161616] rounded border border-[#262626] text-xs space-y-2">
            <div className="flex items-start gap-2 text-gray-300">
              <MapPin className="w-3.5 h-3.5 text-[#C5A059] shrink-0 mt-0.5" />
              <div>
                <span className="text-[10px] uppercase text-gray-500 block">Delivery Address</span>
                <p className="text-gray-200">
                  {order.shippingAddress || 'Signature Towers, DLF CyberCity, Gurugram, 122002'}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-2 text-gray-300 pt-2 border-t border-[#222222]">
              <CreditCard className="w-3.5 h-3.5 text-[#C5A059] shrink-0 mt-0.5" />
              <div className="flex-1 flex justify-between">
                <div>
                  <span className="text-[10px] uppercase text-gray-500 block">Payment</span>
                  <span className="text-gray-200">
                    {order.paymentMethod || 'Prepaid via Instant UPI (GPay)'}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] uppercase text-gray-500 block">Total</span>
                  <span className="font-bold text-[#DFC07B] text-sm">
                    ₹{order.totalAmount.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-3 border-t border-[#222222] bg-[#141414] flex gap-2">
          <button
            onClick={() => onSupportHelp(order.id)}
            className="flex-1 py-2.5 bg-[#1F1F1F] hover:bg-[#2A2A2A] text-xs font-semibold text-[#DFC07B] border border-[#C5A059]/40 rounded transition-colors"
          >
            Need Help with Order?
          </button>
          <button
            onClick={onClose}
            className="flex-1 py-2.5 bg-[#C5A059] hover:bg-[#DFC07B] text-black font-bold text-xs uppercase tracking-wider rounded transition-colors"
          >
            Close Tracker
          </button>
        </div>
      </div>
    </div>
  );
};
