import React from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { ToastContainer } from './components/common/ToastContainer';
import { Hero } from './components/customer/Hero';
import { TrustSection } from './components/customer/TrustSection';
import { FeaturedCollection } from './components/customer/FeaturedCollection';
import { FitWisePromo } from './components/customer/FitWisePromo';
import { ProductDetail } from './components/customer/ProductDetail';
import { FitAssistantPage } from './components/customer/FitAssistantPage';
import { CartView } from './components/customer/CartView';
import { OrdersPage } from './components/customer/OrdersPage';
import { FitWiseAIChatDrawer } from './components/ai/FitWiseAIChatDrawer';
import { FilmShowcasePage } from './components/video/FilmShowcasePage';

import { AdminLayout } from './components/admin/AdminLayout';
import { OverviewTab } from './components/admin/tabs/OverviewTab';
import { ReturnAnalyticsTab } from './components/admin/tabs/ReturnAnalyticsTab';
import { AISizingInsightsTab } from './components/admin/tabs/AISizingInsightsTab';
import { SizeIntelligenceTab } from './components/admin/tabs/SizeIntelligenceTab';
import { KnowledgeCenterTab } from './components/admin/tabs/KnowledgeCenterTab';
import { BusinessCalculatorTab } from './components/admin/tabs/BusinessCalculatorTab';

const AppContent: React.FC = () => {
  const { appMode, customerTab, adminTab } = useStore();

  if (appMode === 'admin') {
    return (
      <AdminLayout>
        {adminTab === 'overview' && <OverviewTab />}
        {adminTab === 'analytics' && <ReturnAnalyticsTab />}
        {adminTab === 'insights' && <AISizingInsightsTab />}
        {adminTab === 'size-intelligence' && <SizeIntelligenceTab />}
        {adminTab === 'knowledge' && <KnowledgeCenterTab />}
        {adminTab === 'calculator' && <BusinessCalculatorTab />}
        <ToastContainer />
      </AdminLayout>
    );
  }

  return (
    <div className="min-h-screen flex flex-col justify-between bg-brand-ivory text-brand-charcoal">
      <Header />
      
      <main className="flex-1">
        {customerTab === 'home' && (
          <>
            <Hero />
            <TrustSection />
            <FeaturedCollection />
            <FitWisePromo />
          </>
        )}

        {customerTab === 'shop' && (
          <div className="py-6">
            <FeaturedCollection />
          </div>
        )}

        {customerTab === 'product' && <ProductDetail />}

        {customerTab === 'fit-assistant' && <FitAssistantPage />}

        {customerTab === 'profile' && <FitAssistantPage />}

        {customerTab === 'cart' && <CartView />}

        {customerTab === 'orders' && <OrdersPage />}

        {customerTab === 'film' && <FilmShowcasePage />}
      </main>

      <Footer />
      <FitWiseAIChatDrawer />
      <ToastContainer />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <StoreProvider>
      <AppContent />
    </StoreProvider>
  );
};

export default App;
