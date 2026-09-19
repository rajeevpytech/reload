import React, { useState } from 'react';
import { X, MessageSquare, Send, PhoneCall, Mail, ShieldCheck, Sparkles, CheckCircle2 } from 'lucide-react';

interface SupportModalProps {
  isOpen: boolean;
  onClose: () => void;
  orderIdContext?: string | null;
}

export const SupportModal: React.FC<SupportModalProps> = ({
  isOpen,
  onClose,
  orderIdContext
}) => {
  const [subject, setSubject] = useState<string>(
    orderIdContext ? `Inquiry regarding ${orderIdContext}` : 'Order & Delivery Assistance'
  );
  const [message, setMessage] = useState<string>('');
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setMessage('');
      onClose();
    }, 2400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-md bg-[#121212] border border-[#282828] rounded-t-2xl sm:rounded-xl text-white shadow-2xl max-h-[85vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="p-4 border-b border-[#222222] flex items-center justify-between bg-[#161616]">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#C5A059]" />
            <h3 className="font-serif text-sm font-bold text-white">VIP Concierge & Helpdesk</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-gray-400 hover:text-white hover:bg-[#262626]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 space-y-3 overflow-y-auto no-scrollbar">
          {/* Quick contact channels */}
          <div className="grid grid-cols-2 gap-2 text-xs">
            <a
              href="tel:+918005559900"
              className="p-2.5 rounded bg-[#171717] border border-[#262626] hover:border-[#C5A059] flex items-center gap-2 text-gray-200 transition-colors"
            >
              <PhoneCall className="w-4 h-4 text-[#DFC07B]" />
              <div>
                <span className="text-[10px] text-gray-400 block uppercase font-bold">Call Concierge</span>
                <span className="font-semibold">+91 800 555 9900</span>
              </div>
            </a>
            <a
              href="mailto:concierge@reloadcasual.com"
              className="p-2.5 rounded bg-[#171717] border border-[#262626] hover:border-[#C5A059] flex items-center gap-2 text-gray-200 transition-colors"
            >
              <Mail className="w-4 h-4 text-[#DFC07B]" />
              <div>
                <span className="text-[10px] text-gray-400 block uppercase font-bold">VIP Email</span>
                <span className="font-semibold">concierge@reload</span>
              </div>
            </a>
          </div>

          {/* Form */}
          {isSubmitted ? (
            <div className="p-6 text-center space-y-2 bg-[#171717] rounded border border-green-600/40">
              <CheckCircle2 className="w-10 h-10 text-green-400 mx-auto" />
              <h4 className="text-sm font-bold text-white font-serif">Message Dispatched</h4>
              <p className="text-xs text-gray-300">
                Your dedicated stylist representative will respond via WhatsApp & Email within 15 minutes.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3 pt-1">
              <div>
                <label className="text-[10px] uppercase text-gray-400 block mb-1">Subject</label>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full bg-[#181818] border border-[#2C2C2C] rounded px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-[#C5A059]"
                />
              </div>

              <div>
                <label className="text-[10px] uppercase text-gray-400 block mb-1">
                  How can our team assist you?
                </label>
                <textarea
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Need size alteration, exchange request, or delivery time update?"
                  className="w-full bg-[#181818] border border-[#2C2C2C] rounded px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-[#C5A059]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-[#C5A059] hover:bg-[#DFC07B] text-black font-bold text-xs uppercase tracking-wider rounded transition-colors flex items-center justify-center gap-1.5 shadow-lg"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Send Direct Inquiry</span>
              </button>
            </form>
          )}
        </div>

        <div className="p-3 bg-[#161616] border-t border-[#222222] text-center text-[10px] text-gray-400">
          Operates 7 days a week • 9:00 AM – 10:00 PM IST
        </div>
      </div>
    </div>
  );
};
