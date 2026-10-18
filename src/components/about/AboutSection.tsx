import React from 'react';
import { Heart, Coffee } from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <section id="our-story" className="py-24 bg-[#171310] relative overflow-hidden">
      {/* Background radial warmth */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-[#C88D56]/10 blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Layered Editorial Imagery */}
          <div className="lg:col-span-6 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Primary Image: Barista Crafting Pour-Over */}
              <div className="rounded-3xl overflow-hidden border border-[#D9AD68]/30 shadow-2xl relative z-10 aspect-[4/5] bg-[#2C1E18]">
                <img
                  src="https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=800&q=80"
                  alt="Barista brewing specialty coffee at Tap & Brew"
                  width={800}
                  height={1000}
                  loading="lazy"
                  decoding="async"
                  onError={(e) => {
                    e.currentTarget.src = 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?auto=format&fit=crop&w=800&q=80';
                  }}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#171310] via-transparent to-transparent opacity-60" />
              </div>

              {/* Floating Accent Card: Small Roastery Atmosphere */}
              <div className="hidden sm:block absolute -bottom-8 -right-6 z-20 w-52 p-4 rounded-2xl glass-panel border border-[#D9AD68]/40 shadow-2xl">
                <div className="flex items-center gap-2 mb-2 text-[#D9AD68]">
                  <Coffee className="w-4 h-4" />
                  <span className="text-xs font-bold uppercase tracking-wider">Fresh Roasts</span>
                </div>
                <p className="text-[11px] text-[#FAF5ED] font-medium leading-relaxed">
                  Batch roasted weekly on small-drum fluid-bed roasters for maximum aromatics.
                </p>
              </div>

              {/* Decorative brass outline frame */}
              <div className="absolute -top-4 -left-4 w-full h-full rounded-3xl border-2 border-[#D9AD68]/20 -z-0 pointer-events-none hidden sm:block" />
            </div>
          </div>

          {/* Right Column: Editorial Copy */}
          <div className="lg:col-span-6 space-y-6">
            
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#201A16] border border-[#D9AD68]/20 text-xs font-semibold text-[#D9AD68] uppercase tracking-wider">
              <Heart className="w-3.5 h-3.5 text-[#B9684A]" />
              <span>Our Philosophy</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#FAF5ED] tracking-tight leading-[1.15]">
              More Than Coffee. <br />
              <span className="brass-gradient-text">A Little Everyday Magic.</span>
            </h2>

            <div className="space-y-4 text-sm sm:text-base text-[#C4BCAC] leading-relaxed">
              <p>
                At Tap &amp; Brew, we believe the best moments of your day happen over an exceptional cup of coffee. Founded as a sanctuary for craft coffee lovers, our space unites the warmth of an intimate neighbourhood roastery with the speed and elegance of modern contactless NFC dining.
              </p>
              <p>
                From single-origin beans sourced directly from misty estates in Chikmagalur and Coorg, to hand-laminated French croissants baked fresh every morning, every offering is calibrated to delight your senses.
              </p>
              <p>
                No waiting in lines, no shouting over espresso grinders. Just tap your table disc, explore the flavors, and let the conversation flow.
              </p>
            </div>

            {/* Feature Highlights Grid */}
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-[#FAF5ED]/10">
              <div className="p-4 rounded-2xl bg-[#201A16] border border-[#FAF5ED]/5">
                <span className="text-xl font-bold text-[#D9AD68] font-heading block">100% Arabica</span>
                <span className="text-xs text-[#C4BCAC]">Estate-grown shade coffee</span>
              </div>

              <div className="p-4 rounded-2xl bg-[#201A16] border border-[#FAF5ED]/5">
                <span className="text-xl font-bold text-[#D9AD68] font-heading block">Contactless NFC</span>
                <span className="text-xs text-[#C4BCAC]">Instant digital table menu</span>
              </div>
            </div>

            {/* Quote / Callout */}
            <div className="p-4 rounded-2xl glass-panel-subtle border-l-4 border-l-[#C88D56] text-xs text-[#FAF5ED]/90 italic leading-relaxed">
              "We designed Tap &amp; Brew so the technology disappears, leaving you with nothing between you, your loved ones, and an unforgettable cup of coffee."
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
