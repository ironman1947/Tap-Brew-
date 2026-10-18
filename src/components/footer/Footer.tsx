import React from 'react';
import { Coffee, MapPin, Phone, Mail, Clock, Heart } from 'lucide-react';
import { useCart } from '../../context/CartContext';

export const Footer: React.FC = () => {
  const { tableNumber, setIsTableModalOpen, setIsAssistanceModalOpen } = useCart();

  return (
    <footer className="bg-[#120E0C] text-[#C4BCAC] border-t border-[#D9AD68]/20 pt-16 pb-12 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-[#FAF5ED]/10">
          
          {/* Brand Info */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#2C1E18] border border-[#D9AD68]/40 flex items-center justify-center text-[#D9AD68]">
                <Coffee className="w-5 h-5" />
              </div>
              <div>
                <span className="font-heading font-extrabold text-xl text-[#FAF5ED] tracking-tight block">
                  TAP <span className="text-[#D9AD68]">&amp;</span> BREW
                </span>
                <span className="text-[10px] uppercase tracking-widest text-[#C88D56] font-semibold block -mt-1">
                  Smart Café &amp; Roastery
                </span>
              </div>
            </div>

            <p className="text-xs text-[#C4BCAC] leading-relaxed max-w-sm">
              “Good Coffee. One Tap Away.” Bridging specialty coffee craftsmanship with instant table NFC ordering for an effortless café experience.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href="#instagram"
                className="w-9 h-9 rounded-xl bg-[#201A16] hover:bg-[#D9AD68] hover:text-[#171310] border border-[#FAF5ED]/10 flex items-center justify-center text-[#FAF5ED] transition-colors"
                title="Instagram (Demo)"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a
                href="#twitter"
                className="w-9 h-9 rounded-xl bg-[#201A16] hover:bg-[#D9AD68] hover:text-[#171310] border border-[#FAF5ED]/10 flex items-center justify-center text-[#FAF5ED] transition-colors"
                title="Twitter / X (Demo)"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              <a
                href="#facebook"
                className="w-9 h-9 rounded-xl bg-[#201A16] hover:bg-[#D9AD68] hover:text-[#171310] border border-[#FAF5ED]/10 flex items-center justify-center text-[#FAF5ED] transition-colors"
                title="Facebook (Demo)"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.5 5 15.667 5H18V0h-3.808C10.596 0 9 1.583 9 4.615V8z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Navigation */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-heading font-bold text-sm text-[#FAF5ED] uppercase tracking-wider">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#" className="hover:text-[#D9AD68] transition-colors">Home</a>
              </li>
              <li>
                <a href="#digital-menu" className="hover:text-[#D9AD68] transition-colors">Digital Menu</a>
              </li>
              <li>
                <a href="#our-story" className="hover:text-[#D9AD68] transition-colors">Our Story</a>
              </li>
              <li>
                <a href="#our-coffee" className="hover:text-[#D9AD68] transition-colors">Roastery Craft</a>
              </li>
              <li>
                <a href="#experience" className="hover:text-[#D9AD68] transition-colors">NFC Flow</a>
              </li>
            </ul>
          </div>

          {/* Table Services Shortcut */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-heading font-bold text-sm text-[#FAF5ED] uppercase tracking-wider">
              Table Services
            </h4>
            <div className="space-y-2 text-xs">
              <p>
                Currently seated at: <strong className="text-[#D9AD68]">{tableNumber}</strong>
              </p>
              <button
                onClick={() => setIsTableModalOpen(true)}
                className="text-[#D9AD68] hover:underline block font-semibold cursor-pointer"
              >
                Switch Table Number (Demo)
              </button>
              <button
                onClick={() => setIsAssistanceModalOpen(true)}
                className="text-[#8F9E83] hover:underline block font-semibold cursor-pointer"
              >
                Request Water / Server / Wi-Fi
              </button>
            </div>
          </div>

          {/* Hours & Location */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-heading font-bold text-sm text-[#FAF5ED] uppercase tracking-wider">
              Visit Us
            </h4>
            <div className="space-y-2.5 text-xs text-[#C4BCAC]">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#D9AD68] shrink-0 mt-0.5" />
                <span>124 Indiranagar 100ft Road, Bengaluru, Karnataka 560038</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#D9AD68] shrink-0" />
                <span>Mon – Sun: 7:30 AM – 11:00 PM</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#D9AD68] shrink-0" />
                <span>+91 98765 43210</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#D9AD68] shrink-0" />
                <span>hello@tapandbrew.cafe</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Credits & Prototype Disclaimer */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#C4BCAC]/70">
          <p>© {new Date().getFullYear()} TAP &amp; BREW Smart Café &amp; Roastery. All rights reserved.</p>
          <p className="flex items-center gap-1">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-[#B9684A] fill-[#B9684A]" />
            <span>for modern coffee culture • Frontend Demo Prototype</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
