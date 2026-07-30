import React, { useState, useEffect } from 'react';
import { PageType, Product } from './types';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { WhatsAppButton } from './components/WhatsAppButton';
import { ProductModal } from './components/ProductModal';
import { CartDrawer, CartItem } from './components/CartDrawer';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ProductsPage } from './pages/ProductsPage';
import { ContactPage } from './pages/ContactPage';
import { Check, Sparkles } from 'lucide-react';

export default function App() {
  const [activePage, setActivePage] = useState<PageType>('home');
  const [darkMode, setDarkMode] = useState<boolean>(true);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync dark mode class on HTML document
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const handleAddToCart = (
    product: Product,
    selectedWeight: string,
    price: number,
    qty: number = 1
  ) => {
    const itemId = `${product.id}-${selectedWeight}`;
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === itemId);
      if (existing) {
        return prev.map((item) =>
          item.id === itemId ? { ...item, qty: item.qty + qty } : item
        );
      }
      return [...prev, { id: itemId, product, selectedWeight, price, qty }];
    });

    setToastMessage(`Added ${qty}x ${product.name} (${selectedWeight}) to Order Basket!`);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleUpdateQty = (id: string, newQty: number) => {
    setCartItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, qty: newQty } : item))
    );
  };

  const handleRemoveItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const totalCartCount = cartItems.reduce((sum, item) => sum + item.qty, 0);

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#FAFAF7] dark:bg-[#120A07] text-[#1F1511] dark:text-[#FAF5EF] selection:bg-[#D4AF37] selection:text-[#120A07]">
      {/* Toast Notification Popup */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 p-4 rounded-2xl bg-gradient-to-r from-[#8B0000] to-[#500000] text-[#FAF5EF] border-2 border-[#D4AF37] shadow-2xl flex items-center gap-3 animate-fadeIn">
          <div className="p-1 rounded-full bg-[#D4AF37] text-[#120A07]">
            <Check className="w-4 h-4" />
          </div>
          <span className="text-xs sm:text-sm font-bold">{toastMessage}</span>
        </div>
      )}

      {/* Sticky Navbar */}
      <Navbar
        activePage={activePage}
        setActivePage={setActivePage}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        cartCount={totalCartCount}
        openCart={() => setCartOpen(true)}
      />

      {/* Page Content */}
      <main className="flex-1">
        {activePage === 'home' && (
          <HomePage
            onQuickView={(p) => setSelectedProduct(p)}
            onAddToCart={handleAddToCart}
            setActivePage={setActivePage}
          />
        )}

        {activePage === 'about' && <AboutPage />}

        {activePage === 'products' && (
          <ProductsPage
            onQuickView={(p) => setSelectedProduct(p)}
            onAddToCart={handleAddToCart}
          />
        )}

        {activePage === 'contact' && <ContactPage />}
      </main>

      {/* Footer */}
      <Footer setActivePage={setActivePage} />

      {/* Floating WhatsApp Quick Action Button */}
      <WhatsAppButton />

      {/* Quick View Product Modal */}
      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
      />

      {/* Order Basket Slide-over Drawer */}
      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        cartItems={cartItems}
        onUpdateQty={handleUpdateQty}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />
    </div>
  );
}
