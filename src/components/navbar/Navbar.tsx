import React, { useState, useEffect } from 'react';
import { useCart } from '../../context/CartContext';
import { useModalLock } from '../../hooks/useModalLock';
import { ShoppingBag, Coffee, Menu as MenuIcon, X, MapPin, Wifi, Sparkles, ChevronDown } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { itemCount, setIsCartOpen, tableNumber, setIsTableModalOpen, setIsAssistanceModalOpen } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Lock body scroll when mobile menu is open
  useModalLock(isMobileMenuOpen, () => setIsMobileMenuOpen(false));

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#' },
    { label: 'Our Story', href: '#our-story' },
    { label: 'Digital Menu', href: '#digital-menu' },
    { label: 'Our Coffee', href: '#our-coffee' },
    { label: 'Experience', href: '#experience' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'glass-panel py-3 shadow-xl border-b border-[#D9AD68]/20'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a href="#" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#2C1E18] to-[#171310] border border-[#D9AD68]/50 flex items-center justify-center shadow-lg group-hover:border-[#D9AD68] transition-colors">
                <Coffee className="w-5 h-5 text-[#D9AD68] group-hover:rotate-6 transition-transform" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="font-heading font-extrabold text-lg sm:text-xl tracking-tight text-[#FAF5ED]">
                    TAP <span className="text-[#D9AD68]">&amp;</span> BREW
                  </span>
                </div>
                <span className="text-[10px] uppercase tracking-widest text-[#C88D56] font-semibold -mt-1">
                  Smart Café &amp; Roastery
                </span>
              </div>
            </a>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-7">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-sm font-medium text-[#FAF5ED]/80 hover:text-[#D9AD68] transition-colors relative py-1 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-[#D9AD68] after:scale-x-0 hover:after:scale-x-100 after:transition-transform"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* Right action group: Table Badge, Assistance, Cart, Explore button */}
            <div className="flex items-center gap-2.5 sm:gap-3.5">
              {/* Table Selector Button */}
              <button
                onClick={() => setIsTableModalOpen(true)}
                className="px-2.5 sm:px-3 py-1.5 rounded-full glass-panel-subtle hover:border-[#D9AD68] border border-[#D9AD68]/30 text-xs font-semibold text-[#FAF5ED] flex items-center gap-1.5 transition-all shadow-sm cursor-pointer min-h-[38px]"
                title="Change Table Number"
              >
                <MapPin className="w-3.5 h-3.5 text-[#D9AD68] shrink-0" />
                <span className="hidden sm:inline">{tableNumber}</span>
                <span className="sm:hidden">{tableNumber.replace('Table ', 'T-')}</span>
                <ChevronDown className="w-3 h-3 text-[#C4BCAC] shrink-0" />
              </button>

              {/* Table Assistance Shortcut */}
              <button
                onClick={() => setIsAssistanceModalOpen(true)}
                className="hidden lg:flex px-3 py-1.5 rounded-full bg-[#201A16] hover:bg-[#2C1E18] border border-[#FAF5ED]/10 hover:border-[#D9AD68]/40 text-xs font-medium text-[#C4BCAC] hover:text-[#FAF5ED] items-center gap-1.5 transition-all cursor-pointer min-h-[38px]"
                title="Table Assistance & Wi-Fi"
              >
                <Wifi className="w-3.5 h-3.5 text-[#8F9E83]" />
                <span>Assistance</span>
              </button>

              {/* Cart Button */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative p-2.5 rounded-2xl bg-[#201A16] hover:bg-[#2C1E18] border border-[#D9AD68]/30 hover:border-[#D9AD68] text-[#FAF5ED] transition-all shadow-md group cursor-pointer min-w-[40px] min-h-[40px] flex items-center justify-center"
                aria-label="Shopping Cart"
              >
                <ShoppingBag className="w-5 h-5 text-[#D9AD68] group-hover:scale-110 transition-transform" />
                {itemCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-[#B9684A] text-white text-[10px] font-bold flex items-center justify-center ring-2 ring-[#171310] animate-bounce">
                    {itemCount}
                  </span>
                )}
              </button>

              {/* Explore Menu CTA */}
              <a
                href="#digital-menu"
                className="hidden sm:inline-flex px-4 py-2 rounded-xl bg-gradient-to-r from-[#D9AD68] to-[#C88D56] hover:from-[#C88D56] hover:to-[#B9684A] text-[#171310] text-xs font-bold uppercase tracking-wider items-center gap-1.5 shadow-md hover:scale-105 active:scale-95 transition-all min-h-[38px]"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Explore Menu</span>
              </a>

              {/* Mobile Menu Hamburger */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="w-10 h-10 rounded-xl md:hidden text-[#FAF5ED] hover:bg-[#201A16] flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Toggle Navigation Menu"
                aria-expanded={isMobileMenuOpen}
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-30 md:hidden bg-[#171310]/95 backdrop-blur-xl pt-24 px-6 flex flex-col justify-between pb-safe h-[100dvh] overflow-y-auto"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <div onClick={(e) => e.stopPropagation()} className="flex flex-col justify-between h-full">
            <nav className="flex flex-col gap-3 text-center pt-2">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-lg font-semibold text-[#FAF5ED] py-2.5 border-b border-[#FAF5ED]/5 hover:text-[#D9AD68] active:text-[#D9AD68] transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsAssistanceModalOpen(true);
                }}
                className="text-lg font-semibold text-[#D9AD68] py-2.5 flex items-center justify-center gap-2 cursor-pointer hover:underline"
              >
                <Wifi className="w-5 h-5 text-[#8F9E83]" />
                <span>Table Assistance &amp; Wi-Fi</span>
              </button>
            </nav>

            <div className="space-y-3 pt-6 pb-4">
              <div className="p-4 rounded-2xl bg-[#201A16] border border-[#D9AD68]/20 flex items-center justify-between">
                <div>
                  <p className="text-xs text-[#C4BCAC]">Current Table</p>
                  <p className="text-base font-bold text-[#FAF5ED]">{tableNumber}</p>
                </div>
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    setIsTableModalOpen(true);
                  }}
                  className="px-3 py-1.5 rounded-lg bg-[#2C1E18] text-[#D9AD68] text-xs font-semibold border border-[#D9AD68]/30 cursor-pointer"
                >
                  Switch Table
                </button>
              </div>

              <a
                href="#digital-menu"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#D9AD68] to-[#C88D56] text-[#171310] font-bold text-center flex items-center justify-center gap-2 shadow-lg"
              >
                <Sparkles className="w-4 h-4" />
                <span>Browse Digital Menu</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
