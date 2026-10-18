import React from 'react';
import { CartProvider } from './context/CartContext';
import { Navbar } from './components/navbar/Navbar';
import { HeroSection } from './components/hero/HeroSection';
import { ExperienceSteps } from './components/experience/ExperienceSteps';
import { MenuSection } from './components/menu/MenuSection';
import { AboutSection } from './components/about/AboutSection';
import { CoffeeShowcase } from './components/coffee/CoffeeShowcase';
import { Footer } from './components/footer/Footer';
import { FloatingCartBar } from './components/cart/FloatingCartBar';
import { CartDrawer } from './components/cart/CartDrawer';
import { ItemCustomizerModal } from './components/menu/ItemCustomizerModal';
import { CheckoutModal } from './components/cart/CheckoutModal';
import { TableSelectorModal } from './components/table/TableSelectorModal';
import { TableAssistanceModal } from './components/table/TableAssistanceModal';
import { Toast } from './components/common/Toast';

export const App: React.FC = () => {
  return (
    <CartProvider>
      <div className="min-h-screen bg-[#171310] text-[#FAF5ED] font-sans antialiased selection:bg-[#C88D56] selection:text-[#171310] relative overflow-x-hidden">
        {/* Navigation Bar */}
        <Navbar />

        {/* Main Content Sections */}
        <main>
          {/* Hero Section with 3D Tabletop Experience */}
          <HeroSection />

          {/* Customer Experience: TAP -> EXPLORE -> ENJOY */}
          <ExperienceSteps />

          {/* Interactive Digital Menu */}
          <MenuSection />

          {/* About the Café */}
          <AboutSection />

          {/* Our Coffee & Roastery Science */}
          <CoffeeShowcase />
        </main>

        {/* Footer */}
        <Footer />

        {/* Global Floating Modals & Drawers */}
        <FloatingCartBar />
        <CartDrawer />
        <ItemCustomizerModal />
        <CheckoutModal />
        <TableSelectorModal />
        <TableAssistanceModal />
        <Toast />
      </div>
    </CartProvider>
  );
};

export default App;
