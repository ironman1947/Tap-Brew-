import React, { Suspense, lazy, useState, useEffect } from 'react';
import { useCart } from '../../context/CartContext';
import { Sparkles, ArrowRight, ShieldCheck, Flame, Coffee, Wifi } from 'lucide-react';

const Hero3DScene = lazy(() => import('../3d/Hero3DScene'));

export const HeroSection: React.FC = () => {
  const { triggerNfcTapSequence, nfcScanActive, tableNumber } = useCart();
  const [load3D, setLoad3D] = useState(false);

  // Defer heavy 3D Three.js bundle download until after critical initial render
  useEffect(() => {
    if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
      const handle = (window as unknown as { requestIdleCallback: (cb: () => void) => number }).requestIdleCallback(() => {
        setLoad3D(true);
      });
      return () => {
        (window as unknown as { cancelIdleCallback: (id: number) => void }).cancelIdleCallback(handle);
      };
    } else {
      const timer = setTimeout(() => setLoad3D(true), 150);
      return () => clearTimeout(timer);
    }
  }, []);

  const fallbackPlaceholder = (
    <div className="relative w-full h-[340px] xs:h-[380px] sm:h-[460px] lg:h-[540px] rounded-3xl glass-panel border border-[#D9AD68]/20 flex flex-col items-center justify-center p-6 text-center shadow-xl">
      <div className="w-14 h-14 rounded-2xl bg-[#2C1E18] text-[#D9AD68] border border-[#D9AD68]/40 flex items-center justify-center mb-4 animate-pulse">
        <Coffee className="w-7 h-7" />
      </div>
      <h4 className="font-heading font-bold text-base sm:text-lg text-[#FAF5ED] mb-1">
        Interactive 3D Café Table
      </h4>
      <p className="text-xs text-[#C4BCAC] max-w-xs mb-4">
        Handcrafted single-origin brew &amp; contactless NFC tag at <strong className="text-[#D9AD68]">{tableNumber}</strong>
      </p>
      <button
        onClick={() => setLoad3D(true)}
        className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#D9AD68] to-[#C88D56] text-[#171310] font-heading font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-md active:scale-95 cursor-pointer"
      >
        <Sparkles className="w-3.5 h-3.5" />
        <span>Load 3D View</span>
      </button>
    </div>
  );

  return (
    <section className="relative pt-24 pb-14 sm:pt-32 sm:pb-20 md:pt-36 md:pb-24 overflow-hidden bg-grain">
      {/* Ambient background glow orbs */}
      <div className="absolute top-1/4 -left-32 w-80 sm:w-96 h-80 sm:h-96 rounded-full bg-[#C88D56]/10 blur-[100px] sm:blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 -right-32 w-80 sm:w-96 h-80 sm:h-96 rounded-full bg-[#D9AD68]/10 blur-[110px] sm:blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-8 items-center">
          
          {/* Left Column: Headlines & CTAs */}
          <div className="lg:col-span-6 space-y-6 sm:space-y-7 text-center lg:text-left">
            
            {/* Table NFC Status Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel-subtle border border-[#D9AD68]/30 shadow-sm animate-fade-in">
              <span className="w-2.5 h-2.5 rounded-full bg-[#8F9E83] animate-pulse" />
              <span className="text-xs font-semibold text-[#FAF5ED]">
                Active at <strong className="text-[#D9AD68]">{tableNumber}</strong>
              </span>
              <span className="text-[#C4BCAC]/40">•</span>
              <span className="text-[11px] text-[#C4BCAC] flex items-center gap-1">
                <Wifi className="w-3 h-3 text-[#D9AD68]" />
                NFC Ready
              </span>
            </div>

            {/* Main Headline with fluid responsive typography */}
            <h1 className="text-3xl xs:text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#FAF5ED] leading-[1.15] sm:leading-[1.12]">
              Your Coffee. <br />
              <span className="brass-gradient-text">Your Way.</span> <br />
              One Tap Away.
            </h1>

            {/* Supporting Copy */}
            <p className="text-sm sm:text-base lg:text-lg text-[#C4BCAC] max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal">
              Discover handcrafted coffee, fresh bakes, and café favourites through a smarter, seamless ordering experience. Simply tap your phone on your table disc to explore.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-1">
              <a
                href="#digital-menu"
                className="w-full sm:w-auto px-6 sm:px-7 py-3.5 rounded-2xl bg-gradient-to-r from-[#D9AD68] via-[#C88D56] to-[#B9684A] hover:opacity-95 text-[#171310] font-heading font-bold text-xs sm:text-sm tracking-wide uppercase flex items-center justify-center gap-2 shadow-xl hover:scale-105 active:scale-95 transition-all cursor-pointer min-h-[46px]"
              >
                <span>Explore the Menu</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <button
                onClick={triggerNfcTapSequence}
                disabled={nfcScanActive}
                className={`w-full sm:w-auto px-5 sm:px-6 py-3.5 rounded-2xl glass-panel border border-[#D9AD68]/40 hover:border-[#D9AD68] text-[#FAF5ED] font-heading font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 hover:bg-[#2C1E18]/80 transition-all cursor-pointer min-h-[46px] ${
                  nfcScanActive ? 'ring-2 ring-emerald-500/50 bg-emerald-950/20' : ''
                }`}
              >
                <Sparkles className="w-4 h-4 text-[#D9AD68] animate-spin-slow" />
                <span>{nfcScanActive ? 'NFC Connected!' : 'Experience NFC Tap'}</span>
              </button>
            </div>

            {/* Trust Indicators */}
            <div className="pt-5 sm:pt-6 border-t border-[#FAF5ED]/10 grid grid-cols-3 gap-2 xs:gap-3 max-w-md mx-auto lg:mx-0">
              <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
                <div className="flex items-center gap-1.5 text-[11px] xs:text-xs font-semibold text-[#FAF5ED]">
                  <Coffee className="w-3.5 h-3.5 text-[#D9AD68] shrink-0" />
                  <span>Fresh Brewed</span>
                </div>
                <span className="text-[10px] xs:text-[11px] text-[#C4BCAC]">Single-origin</span>
              </div>

              <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
                <div className="flex items-center gap-1.5 text-[11px] xs:text-xs font-semibold text-[#FAF5ED]">
                  <Flame className="w-3.5 h-3.5 text-[#C88D56] shrink-0" />
                  <span>Artisanal Care</span>
                </div>
                <span className="text-[10px] xs:text-[11px] text-[#C4BCAC]">Small batches</span>
              </div>

              <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
                <div className="flex items-center gap-1.5 text-[11px] xs:text-xs font-semibold text-[#FAF5ED]">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#8F9E83] shrink-0" />
                  <span>Smart NFC</span>
                </div>
                <span className="text-[10px] xs:text-[11px] text-[#C4BCAC]">Direct table sync</span>
              </div>
            </div>

          </div>

          {/* Right Column: Interactive 3D Café Scene with Suspense */}
          <div className="lg:col-span-6 w-full">
            {load3D ? (
              <Suspense fallback={fallbackPlaceholder}>
                <Hero3DScene />
              </Suspense>
            ) : (
              fallbackPlaceholder
            )}
          </div>

        </div>
      </div>
    </section>
  );
};
