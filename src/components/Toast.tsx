import React from 'react';
import { Check, Sparkles } from 'lucide-react';

interface ToastProps {
  message: string | null;
  onClose?: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message }) => {
  if (!message) return null;

  return (
    <div
      id="app-toast-feedback"
      className="fixed top-16 left-1/2 -translate-x-1/2 z-50 bg-[#19150E] border border-[#C5A059] text-white px-4 py-2.5 rounded-full shadow-2xl flex items-center gap-2 text-xs font-semibold tracking-wide animate-bounce"
    >
      <Sparkles className="w-4 h-4 text-[#DFC07B]" />
      <span>{message}</span>
    </div>
  );
};
