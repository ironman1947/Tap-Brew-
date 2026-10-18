import React from 'react';
import { useCart } from '../../context/CartContext';
import { useModalLock } from '../../hooks/useModalLock';
import { X, MapPin, Check, Wifi, Copy } from 'lucide-react';

export const TableSelectorModal: React.FC = () => {
  const { isTableModalOpen, setIsTableModalOpen, tableNumber, setTableNumber, showToast } = useCart();

  useModalLock(isTableModalOpen, () => setIsTableModalOpen(false));

  if (!isTableModalOpen) return null;

  const tables = Array.from({ length: 15 }, (_, i) => {
    const num = String(i + 1).padStart(2, '0');
    return `Table ${num}`;
  });

  const currentUrl = typeof window !== 'undefined' ? window.location.href : 'https://tapandbrew.cafe/?t=04';

  const copyUrl = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(currentUrl);
      showToast('NFC URL copied to clipboard');
    }
  };

  return (
    <div
      onClick={() => setIsTableModalOpen(false)}
      className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-end sm:items-center justify-center p-0 sm:p-4 animate-fade-in"
    >
      <div
        className="w-full max-w-md bg-[#1B1613] border border-[#D9AD68]/40 rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden animate-slide-up max-h-[90dvh] flex flex-col justify-between"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-[#FAF5ED]/10 flex items-center justify-between bg-[#201A16]">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#2C1E18] text-[#D9AD68] border border-[#D9AD68]/30 flex items-center justify-center">
              <MapPin className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-heading font-bold text-lg text-[#FAF5ED]">Switch Seated Table</h3>
              <p className="text-xs text-[#C4BCAC]">Simulate dining at any table</p>
            </div>
          </div>

          <button
            onClick={() => setIsTableModalOpen(false)}
            className="w-8 h-8 rounded-full bg-[#171310] text-[#C4BCAC] hover:text-[#FAF5ED] flex items-center justify-center border border-[#FAF5ED]/10 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          <p className="text-xs text-[#C4BCAC] leading-relaxed">
            In our physical café, each wooden tabletop features an encoded NFC disc that automatically routes patrons to their table's live menu without manual selection.
          </p>

          {/* Table Grid */}
          <div className="grid grid-cols-3 sm:grid-cols-5 gap-2.5 max-h-56 overflow-y-auto p-1">
            {tables.map((tbl) => {
              const isSelected = tableNumber === tbl;
              return (
                <button
                  key={tbl}
                  type="button"
                  onClick={() => {
                    setTableNumber(tbl);
                    setIsTableModalOpen(false);
                  }}
                  className={`p-3 rounded-2xl border text-center transition-all cursor-pointer ${
                    isSelected
                      ? 'border-[#D9AD68] bg-[#D9AD68] text-[#171310] font-bold shadow-md scale-105'
                      : 'border-[#FAF5ED]/10 bg-[#201A16] text-[#FAF5ED] hover:border-[#D9AD68]/40 hover:bg-[#2C1E18]'
                  }`}
                >
                  <span className="text-xs block font-heading">{tbl.replace('Table ', 'T-')}</span>
                  {isSelected && <Check className="w-3.5 h-3.5 mx-auto mt-1" />}
                </button>
              );
            })}
          </div>

          {/* Physical NFC Tag Writing Guide */}
          <div className="p-4 rounded-2xl bg-[#201A16] border border-[#FAF5ED]/10 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-[#D9AD68] uppercase tracking-wider flex items-center gap-1.5">
                <Wifi className="w-3.5 h-3.5" />
                Physical NFC Tag URL Spec
              </span>
              <button
                onClick={copyUrl}
                className="text-[11px] text-[#C4BCAC] hover:text-[#FAF5ED] flex items-center gap-1 cursor-pointer"
              >
                <Copy className="w-3 h-3" />
                <span>Copy URL</span>
              </button>
            </div>
            <code className="block p-2 rounded-lg bg-[#171310] text-[11px] text-[#8F9E83] font-mono break-all border border-[#FAF5ED]/5">
              {currentUrl}
            </code>
            <p className="text-[10px] text-[#C4BCAC]/70">
              Payload size: ~32 bytes (well within the 138-byte capacity of NTAG213 brass tags).
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 pb-safe bg-[#201A16] border-t border-[#FAF5ED]/10 flex justify-end shrink-0">
          <button
            onClick={() => setIsTableModalOpen(false)}
            className="px-5 py-2.5 rounded-xl bg-[#2C1E18] hover:bg-[#3D2B22] text-[#FAF5ED] border border-[#FAF5ED]/10 text-xs font-semibold cursor-pointer min-h-[40px]"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
