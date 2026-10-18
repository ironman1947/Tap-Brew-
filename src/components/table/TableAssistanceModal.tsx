import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { useModalLock } from '../../hooks/useModalLock';
import { X, Wifi, GlassWater, BellRing, Receipt, Star, Copy, Check, AlertCircle } from 'lucide-react';

export const TableAssistanceModal: React.FC = () => {
  const { isAssistanceModalOpen, setIsAssistanceModalOpen, tableNumber, showToast } = useCart();
  const [wifiCopied, setWifiCopied] = useState(false);
  const [selectedRating, setSelectedRating] = useState(5);
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  useModalLock(isAssistanceModalOpen, () => setIsAssistanceModalOpen(false));

  if (!isAssistanceModalOpen) return null;

  const copyWifiPassword = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText('tapandbrew2026');
      setWifiCopied(true);
      showToast('Wi-Fi password copied: tapandbrew2026');
      setTimeout(() => setWifiCopied(false), 3000);
    }
  };

  const handleServiceRequest = (serviceName: string) => {
    showToast(`${serviceName} recorded for ${tableNumber} (Demo simulation)`);
  };

  const handleReviewSubmit = () => {
    setReviewSubmitted(true);
    showToast(`Thank you! ${selectedRating}-star rating recorded (Demo)`);
  };

  return (
    <div
      onClick={() => setIsAssistanceModalOpen(false)}
      className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-end sm:items-center justify-center p-0 sm:p-4 animate-fade-in"
    >
      <div
        className="w-full max-w-lg bg-[#1B1613] border border-[#D9AD68]/40 rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden animate-slide-up max-h-[90dvh] flex flex-col justify-between"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-[#FAF5ED]/10 flex items-center justify-between bg-[#201A16]">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#2C1E18] text-[#8F9E83] border border-[#8F9E83]/30 flex items-center justify-center">
              <Wifi className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-heading font-bold text-lg text-[#FAF5ED]">Table Assistance</h3>
              <p className="text-xs text-[#C4BCAC]">Support services for <strong className="text-[#D9AD68]">{tableNumber}</strong></p>
            </div>
          </div>

          <button
            onClick={() => setIsAssistanceModalOpen(false)}
            className="w-8 h-8 rounded-full bg-[#171310] text-[#C4BCAC] hover:text-[#FAF5ED] flex items-center justify-center border border-[#FAF5ED]/10 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Services List */}
        <div className="p-6 space-y-5 max-h-[75vh] overflow-y-auto">
          
          {/* 1. Wi-Fi Access Card */}
          <div className="p-4 rounded-2xl bg-[#201A16] border border-[#D9AD68]/20 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#2C1E18] text-[#D9AD68] flex items-center justify-center">
                  <Wifi className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#FAF5ED]">High-Speed Guest Wi-Fi</h4>
                  <p className="text-[11px] text-[#C4BCAC]">Network: <strong className="text-[#FAF5ED]">TapAndBrew_Guest</strong></p>
                </div>
              </div>

              <button
                onClick={copyWifiPassword}
                className="px-3 py-1.5 rounded-xl bg-[#2C1E18] hover:bg-[#3D2B22] border border-[#D9AD68]/40 text-xs font-semibold text-[#D9AD68] flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                {wifiCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{wifiCopied ? 'Copied' : 'Copy Password'}</span>
              </button>
            </div>

            <div className="flex items-center justify-between text-xs bg-[#171310] p-2 rounded-xl border border-[#FAF5ED]/5">
              <span className="text-[#C4BCAC]">Password:</span>
              <code className="text-[#D9AD68] font-mono font-bold tracking-wider">tapandbrew2026</code>
            </div>
          </div>

          {/* 2. Quick Table Service Actions */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#FAF5ED]">Instant Table Requests</h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              
              {/* Request Water */}
              <button
                onClick={() => handleServiceRequest('Water requested')}
                className="p-3.5 rounded-2xl bg-[#201A16] hover:bg-[#2C1E18] border border-[#FAF5ED]/10 hover:border-[#8F9E83]/50 text-left transition-all flex flex-col justify-between group cursor-pointer"
              >
                <div className="w-8 h-8 rounded-lg bg-[#171310] text-[#8F9E83] flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                  <GlassWater className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-[#FAF5ED]">Request Water</p>
                  <p className="text-[10px] text-[#C4BCAC]">Chilled or warm</p>
                </div>
              </button>

              {/* Call Server */}
              <button
                onClick={() => handleServiceRequest('Server assistance requested')}
                className="p-3.5 rounded-2xl bg-[#201A16] hover:bg-[#2C1E18] border border-[#FAF5ED]/10 hover:border-[#D9AD68]/50 text-left transition-all flex flex-col justify-between group cursor-pointer"
              >
                <div className="w-8 h-8 rounded-lg bg-[#171310] text-[#D9AD68] flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                  <BellRing className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-[#FAF5ED]">Call Server</p>
                  <p className="text-[10px] text-[#C4BCAC]">Personal assistance</p>
                </div>
              </button>

              {/* Request Bill */}
              <button
                onClick={() => handleServiceRequest('Bill requested')}
                className="p-3.5 rounded-2xl bg-[#201A16] hover:bg-[#2C1E18] border border-[#FAF5ED]/10 hover:border-[#C88D56]/50 text-left transition-all flex flex-col justify-between group cursor-pointer"
              >
                <div className="w-8 h-8 rounded-lg bg-[#171310] text-[#C88D56] flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                  <Receipt className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-[#FAF5ED]">Request Bill</p>
                  <p className="text-[10px] text-[#C4BCAC]">UPI / Card at table</p>
                </div>
              </button>

            </div>
          </div>

          {/* 3. Leave a Google Review */}
          <div className="p-4 rounded-2xl bg-[#201A16] border border-[#FAF5ED]/10 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-xs font-bold text-[#FAF5ED] uppercase tracking-wider">Leave a Review</h4>
                <p className="text-[11px] text-[#C4BCAC]">Rate your experience at Tap &amp; Brew</p>
              </div>

              {/* Star selector */}
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setSelectedRating(star)}
                    className="p-1 text-[#D9AD68] hover:scale-120 transition-transform cursor-pointer"
                  >
                    <Star
                      className={`w-4 h-4 ${star <= selectedRating ? 'fill-[#D9AD68]' : 'text-[#FAF5ED]/20'}`}
                    />
                  </button>
                ))}
              </div>
            </div>

            {reviewSubmitted ? (
              <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
                <Check className="w-4 h-4" />
                <span>Thank you! Your simulated review feedback was recorded.</span>
              </div>
            ) : (
              <div className="flex items-center justify-between pt-1">
                <span className="text-[11px] text-[#C4BCAC]">Rated {selectedRating} of 5 stars</span>
                <button
                  onClick={handleReviewSubmit}
                  className="px-3 py-1.5 rounded-xl bg-[#2C1E18] hover:bg-[#D9AD68] hover:text-[#171310] border border-[#D9AD68]/40 text-[#FAF5ED] text-xs font-bold transition-all cursor-pointer"
                >
                  Submit Demo Review
                </button>
              </div>
            )}
          </div>

          {/* Prototype simulation disclaimer */}
          <div className="p-3 rounded-xl bg-[#2C1E18]/60 border border-[#D9AD68]/20 flex items-start gap-2.5 text-xs text-[#C4BCAC]">
            <AlertCircle className="w-4 h-4 text-[#D9AD68] shrink-0 mt-0.5" />
            <span>
              <strong>Frontend Simulation:</strong> Table requests and reviews are simulated client-side. No actual café staff is alerted.
            </span>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 pb-safe bg-[#201A16] border-t border-[#FAF5ED]/10 flex justify-end shrink-0">
          <button
            onClick={() => setIsAssistanceModalOpen(false)}
            className="px-5 py-2.5 rounded-xl bg-[#2C1E18] hover:bg-[#3D2B22] text-[#FAF5ED] border border-[#FAF5ED]/10 text-xs font-semibold cursor-pointer min-h-[40px]"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
