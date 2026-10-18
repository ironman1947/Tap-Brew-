import React from 'react';
import { useCart } from '../../context/CartContext';
import { Wifi, Compass, Coffee, ArrowUpRight, CheckCircle2 } from 'lucide-react';

export const ExperienceSteps: React.FC = () => {
  const { triggerNfcTapSequence, setIsCartOpen } = useCart();

  const steps = [
    {
      step: '01',
      title: 'TAP',
      subtitle: 'Contactless Table Detection',
      description: 'Gently hold your phone near the brass NFC disc fixed to your tabletop. No apps to install or QR codes to align.',
      icon: Wifi,
      actionText: 'Simulate Tap',
      action: () => triggerNfcTapSequence(),
      badgeColor: 'border-[#D9AD68]/40 text-[#D9AD68]',
    },
    {
      step: '02',
      title: 'EXPLORE',
      subtitle: 'Dynamic Digital Menu',
      description: 'Filter roast profiles, choose plant-based milks, dial in sweetness, and tailor your bakes to exact personal taste.',
      icon: Compass,
      actionText: 'View Menu',
      action: () => {
        const el = document.getElementById('digital-menu');
        el?.scrollIntoView({ behavior: 'smooth' });
      },
      badgeColor: 'border-[#C88D56]/40 text-[#C88D56]',
    },
    {
      step: '03',
      title: 'ENJOY',
      subtitle: 'Artisanal Table Delivery',
      description: 'Review your personalized order in your live cart and send the demo request. Our baristas brew it fresh for your table.',
      icon: Coffee,
      actionText: 'Open Cart',
      action: () => setIsCartOpen(true),
      badgeColor: 'border-[#8F9E83]/40 text-[#8F9E83]',
    },
  ];

  return (
    <section id="experience" className="py-20 bg-[#171310] relative overflow-hidden">
      {/* Decorative accent divider */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#201A16] border border-[#D9AD68]/20 text-xs font-semibold text-[#D9AD68] uppercase tracking-wider">
            <span>The Smart Café Flow</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#FAF5ED] tracking-tight">
            Tap. Explore. Order. Enjoy.
          </h2>
          <p className="text-sm sm:text-base text-[#C4BCAC] leading-relaxed">
            Combining third-wave artisanal coffee culture with effortless modern NFC interaction. Seated to sipping in three intuitive steps.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {steps.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.step}
                className="group relative p-7 sm:p-8 rounded-3xl glass-panel border border-[#FAF5ED]/10 hover:border-[#D9AD68]/50 transition-all duration-300 hover:-translate-y-1.5 shadow-xl flex flex-col justify-between"
              >
                {/* Background watermarked step number */}
                <span className="absolute top-4 right-6 text-6xl font-black text-[#FAF5ED]/5 select-none group-hover:text-[#D9AD68]/10 transition-colors">
                  {item.step}
                </span>

                <div>
                  {/* Icon Header */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-13 h-13 rounded-2xl bg-[#2C1E18] border border-[#D9AD68]/30 flex items-center justify-center text-[#D9AD68] group-hover:scale-110 group-hover:bg-[#D9AD68] group-hover:text-[#171310] transition-all duration-300 shadow-md">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className={`text-xs font-mono font-bold px-2.5 py-1 rounded-full border ${item.badgeColor}`}>
                      STEP {item.step}
                    </span>
                  </div>

                  {/* Title & Subtitle */}
                  <h3 className="text-2xl font-bold text-[#FAF5ED] mb-1 tracking-tight">
                    {item.title}
                  </h3>
                  <h4 className="text-xs font-semibold text-[#C88D56] uppercase tracking-wider mb-3">
                    {item.subtitle}
                  </h4>

                  {/* Description */}
                  <p className="text-sm text-[#C4BCAC] leading-relaxed mb-6">
                    {item.description}
                  </p>
                </div>

                {/* Interactive Action Button */}
                <button
                  onClick={item.action}
                  className="w-full py-2.5 px-4 rounded-xl bg-[#201A16] group-hover:bg-[#2C1E18] border border-[#FAF5ED]/10 group-hover:border-[#D9AD68]/40 text-xs font-semibold text-[#FAF5ED] flex items-center justify-between transition-colors cursor-pointer"
                >
                  <span>{item.actionText}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#D9AD68] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </button>
              </div>
            );
          })}
        </div>

        {/* NFC Tech Specs Callout Banner */}
        <div className="mt-12 p-6 rounded-3xl glass-panel-subtle border border-[#D9AD68]/20 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#8F9E83]/20 text-[#8F9E83] flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-bold text-[#FAF5ED]">Lightweight 138-Byte NFC Compliant</p>
              <p className="text-xs text-[#C4BCAC]">
                Ready for standard NTAG213 / NTAG215 table tags — directly loads HTTPS table URLs.
              </p>
            </div>
          </div>
          <button
            onClick={triggerNfcTapSequence}
            className="px-4 py-2 rounded-xl bg-[#2C1E18] hover:bg-[#3D2B22] border border-[#D9AD68]/30 text-[#D9AD68] text-xs font-semibold whitespace-nowrap cursor-pointer transition-colors"
          >
            Test NFC URL Write Spec
          </button>
        </div>

      </div>
    </section>
  );
};
