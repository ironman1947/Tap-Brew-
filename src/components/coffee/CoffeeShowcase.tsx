import React, { useState } from 'react';
import { Flame, ArrowRight } from 'lucide-react';

interface BrewMethod {
  id: string;
  name: string;
  tagline: string;
  description: string;
  tastingNotes: string[];
  temp: string;
  ratio: string;
  image: string;
}

export const CoffeeShowcase: React.FC = () => {
  const brewMethods: BrewMethod[] = [
    {
      id: 'espresso',
      name: 'Synesso 9-Bar Espresso',
      tagline: 'High Pressure & Intense Viscosity',
      description: 'Extracted at precisely 93.5°C under 9 bars of pressure. Rich crema emulsion locking in volatile aromatic oils with deep chocolate and toasted hazelnut profiles.',
      tastingNotes: ['Dark Cocoa', 'Toasted Hazelnut', 'Black Cherry'],
      temp: '93.5°C',
      ratio: '1:2.1 Brew Ratio',
      image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=700&q=80',
    },
    {
      id: 'pourover',
      name: 'Hario V60 Single-Origin Pour Over',
      tagline: 'Delicate Nuance & Floral Clarity',
      description: 'Spiral gravity extraction highlighting terroir. Paper-filtered clarity brings out sparkling citrus acidity and bergamot floral notes in our lighter roasts.',
      tastingNotes: ['Bergamot', 'Stone Fruit', 'Honey Blossom'],
      temp: '92°C',
      ratio: '1:16 Brew Ratio',
      image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=700&q=80',
    },
    {
      id: 'coldbrew',
      name: '18-Hour Kyoto Slow-Drip',
      tagline: 'Velvety Sweetness & Zero Bitterness',
      description: 'Slow cold-filtered drop-by-drop infusion over 18 hours. Extracts natural caramel sweetness with remarkably smooth body and almost zero harsh acidity.',
      tastingNotes: ['Vanilla Bean', 'Molasses', 'Bourbon Oak'],
      temp: '4°C Chilled',
      ratio: '1:8 Brew Ratio',
      image: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=700&q=80',
    },
    {
      id: 'aeropress',
      name: 'Inverted AeroPress Method',
      tagline: 'Rich Full Body with Clean Finish',
      description: 'Total immersion brewing followed by rapid pneumatic plunger pressure. Combines the mouthfeel of a French press with the clean profile of a drip brew.',
      tastingNotes: ['Milk Chocolate', 'Pecan', 'Brown Sugar'],
      temp: '88°C',
      ratio: '1:13 Brew Ratio',
      image: 'https://images.unsplash.com/photo-1509785307050-d4066910ec1e?auto=format&fit=crop&w=700&q=80',
    },
  ];

  const [activeMethod, setActiveMethod] = useState<BrewMethod>(brewMethods[0]);

  return (
    <section id="our-coffee" className="py-24 bg-[#171310] relative overflow-hidden border-t border-[#FAF5ED]/5">
      {/* Background glow orb */}
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-[#D9AD68]/10 blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#201A16] border border-[#D9AD68]/20 text-xs font-semibold text-[#D9AD68] uppercase tracking-wider">
            <Flame className="w-3.5 h-3.5 text-[#C88D56]" />
            <span>The Science of Extraction</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#FAF5ED] tracking-tight">
            Our Coffee &amp; Roastery
          </h2>
          <p className="text-sm sm:text-base text-[#C4BCAC] leading-relaxed">
            From green bean sorting to micron-level grind calibration. Explore our specialized brewing methods crafted fresh at our counter.
          </p>
        </div>

        {/* Method Selector Tabs */}
        <div className="flex items-center justify-center gap-2 sm:gap-3 overflow-x-auto pb-4 mb-10 scrollbar-none">
          {brewMethods.map((m) => {
            const isSelected = activeMethod.id === m.id;
            return (
              <button
                key={m.id}
                onClick={() => setActiveMethod(m)}
                className={`px-4 sm:px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-heading font-semibold transition-all whitespace-nowrap cursor-pointer ${
                  isSelected
                    ? 'bg-gradient-to-r from-[#D9AD68] to-[#C88D56] text-[#171310] font-bold shadow-lg scale-102 ring-2 ring-[#D9AD68]/30'
                    : 'bg-[#201A16] hover:bg-[#2C1E18] text-[#FAF5ED]/80 hover:text-[#FAF5ED] border border-[#FAF5ED]/10'
                }`}
              >
                {m.name.split(' ')[0]} {m.name.split(' ')[1]}
              </button>
            );
          })}
        </div>

        {/* Featured Method Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center rounded-3xl glass-panel border border-[#D9AD68]/30 p-6 sm:p-10 shadow-2xl overflow-hidden">
          
          {/* Method Photo */}
          <div className="lg:col-span-6 rounded-2xl overflow-hidden aspect-[4/3] bg-[#2C1E18] relative border border-[#FAF5ED]/10 shadow-inner">
            <img
              src={activeMethod.image}
              alt={activeMethod.name}
              onError={(e) => {
                e.currentTarget.src = 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?auto=format&fit=crop&w=700&q=80';
              }}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#171310] via-transparent to-transparent opacity-50" />
            
            {/* Specs Overlaid */}
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs font-semibold">
              <span className="px-3 py-1 rounded-lg bg-[#171310]/80 text-[#D9AD68] border border-[#D9AD68]/30 backdrop-blur-md">
                {activeMethod.temp}
              </span>
              <span className="px-3 py-1 rounded-lg bg-[#171310]/80 text-[#FAF5ED] border border-[#FAF5ED]/10 backdrop-blur-md">
                {activeMethod.ratio}
              </span>
            </div>
          </div>

          {/* Method Specs & Narrative */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <span className="text-xs font-mono font-bold text-[#D9AD68] uppercase tracking-wider block mb-1">
                BREWING PROFILE
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold text-[#FAF5ED] mb-2 font-heading">
                {activeMethod.name}
              </h3>
              <p className="text-xs font-semibold text-[#C88D56] uppercase tracking-wider">
                {activeMethod.tagline}
              </p>
            </div>

            <p className="text-sm text-[#C4BCAC] leading-relaxed">
              {activeMethod.description}
            </p>

            {/* Tasting Notes */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-[#FAF5ED] uppercase tracking-wider block">
                Primary Flavor Notes
              </span>
              <div className="flex flex-wrap gap-2">
                {activeMethod.tastingNotes.map((note) => (
                  <span
                    key={note}
                    className="px-3 py-1 rounded-full bg-[#2C1E18] text-[#D9AD68] border border-[#D9AD68]/30 text-xs font-semibold shadow-sm"
                  >
                    {note}
                  </span>
                ))}
              </div>
            </div>

            {/* CTA to Menu */}
            <div className="pt-4 border-t border-[#FAF5ED]/10">
              <a
                href="#digital-menu"
                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#D9AD68] hover:text-[#FAF5ED] transition-colors"
              >
                <span>Taste it in our signature menu</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
