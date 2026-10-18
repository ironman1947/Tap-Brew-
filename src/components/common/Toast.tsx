import React from 'react';
import { useCart } from '../../context/CartContext';
import { Sparkles, X } from 'lucide-react';

export const Toast: React.FC = () => {
  const { toastMessage, showToast } = useCart();

  if (!toastMessage) return null;

  return (
    <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 animate-bounce-subtle pointer-events-auto">
      <div className="px-4 py-2.5 rounded-full glass-panel border border-[#D9AD68]/50 text-xs font-semibold text-[#FAF5ED] flex items-center gap-2.5 shadow-2xl backdrop-blur-xl">
        <Sparkles className="w-4 h-4 text-[#D9AD68] shrink-0 animate-spin-slow" />
        <span>{toastMessage}</span>
        <button
          onClick={() => showToast('')}
          className="text-[#C4BCAC] hover:text-[#FAF5ED] ml-1 p-0.5 cursor-pointer"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
