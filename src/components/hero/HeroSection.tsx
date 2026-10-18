import React, { Suspense, lazy } from 'react';
import { useCart } from '../../context/CartContext';
import { Sparkles, ArrowRight, ShieldCheck, Flame, Coffee, Wifi } from 'lucide-react';

const Hero3DScene = lazy(() => import('../3d/Hero3DScene'));

export const HeroSection: React.FC = () => {
  const { triggerNfcTapSequence, nfcScanActive, tableNumber } = useCart();

  return (
    <section className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden bg-grain">
      {/* Ambient background glow orbs */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-[#C88D56]/10 blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 -right-32 w-96 h-96 rounded-full bg-[#D9AD68]/10 blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* Left Column: Headlines & CTAs */}
          <div className="lg:col-span-6 space-y-7 text-center lg:text-left">
            
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

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#FAF5ED] leading-[1.12]">
              Your Coffee. <br />
              <span className="brass-gradient-text">Your Way.</span> <br />
              One Tap Away.
            </h1>

            {/* Supporting Copy */}
            <p className="text-base sm:text-lg text-[#C4BCAC] max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal">
              Discover handcrafted coffee, fresh bakes, and café favourites through a smarter, seamless ordering experience. Simply tap your phone on your table disc to explore.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 sm:gap-4 pt-2">
              <a
                href="#digital-menu"
                className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-gradient-to-r from-[#D9AD68] via-[#C88D56] to-[#B9684A] hover:opacity-95 text-[#171310] font-heading font-bold text-sm tracking-wide uppercase flex items-center justify-center gap-2 shadow-xl hover:scale-105 active:scale-95 transition-all cursor-pointer"
              >
                <span>Explore the Menu</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <button
                onClick={triggerNfcTapSequence}
                disabled={nfcScanActive}
                className={`w-full sm:w-auto px-6 py-3.5 rounded-2xl glass-panel border border-[#D9AD68]/40 hover:border-[#D9AD68] text-[#FAF5ED] font-heading font-semibold text-sm flex items-center justify-center gap-2 hover:bg-[#2C1E18]/80 transition-all cursor-pointer ${
                  nfcScanActive ? 'ring-2 ring-emerald-500/50 bg-emerald-950/20' : ''
                }`}
              >
                <Sparkles className="w-4 h-4 text-[#D9AD68] animate-spin-slow" />
                <span>{nfcScanActive ? 'NFC Connected!' : 'Experience NFC Tap'}</span>
              </button>
            </div>

            {/* Trust Indicators */}
            <div className="pt-6 border-t border-[#FAF5ED]/10 grid grid-cols-3 gap-3 max-w-md mx-auto lg:mx-0">
              <div className="flex flex-col items-center lg:items-start">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-[#FAF5ED]">
                  <Coffee className="w-3.5 h-3.5 text-[#D9AD68]" />
                  <span>Freshly Brewed</span>
                </div>
                <span className="text-[11px] text-[#C4BCAC]">Single-origin beans</span>
              </div>

              <div className="flex flex-col items-center lg:items-start">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-[#FAF5ED]">
                  <Flame className="w-3.5 h-3.5 text-[#C88D56]" />
                  <span>Crafted with Care</span>
                </div>
                <span className="text-[11px] text-[#C4BCAC]">Artisanal precision</span>
              </div>

              <div className="flex flex-col items-center lg:items-start">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-[#FAF5ED]">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#8F9E83]" />
                  <span>Smart Ordering</span>
                </div>
                <span className="text-[11px] text-[#C4BCAC]">Direct table NFC</span>
              </div>
            </div>

          </div>

          {/* Right Column: Interactive 3D Café Scene with Suspense */}
          <div className="lg:col-span-6 w-full">
            <Suspense
              fallback={
                <div className="relative w-full h-[460px] sm:h-[520px] lg:h-[580px] rounded-3xl glass-panel border border-[#D9AD68]/20 flex flex-col items-center justify-center p-6 text-center shadow-xl">
                  <div className="w-16 h-16 rounded-2xl bg-[#2C1E18] text-[#D9AD68] border border-[#D9AD68]/40 flex items-center justify-center mb-4 animate-pulse">
                    <Coffee className="w-8 h-8 animate-bounce" />
                  </div>
                  <h4 className="font-heading font-bold text-lg text-[#FAF5ED] mb-1">
                    Loading 3D Café Scene...
                  </h4>
                  <p className="text-xs text-[#C4BCAC]">Crafting procedural tabletop &amp; lighting</p>
                </div>
              }
            >
              <Hero3DScene />
            </Suspense>
          </div>

        </div>
      </div>
    </section>
  );
};
