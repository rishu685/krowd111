import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { Footer, Sidebar, Navbar, ChatAssistant } from './components';
import { Landing, CampaignDetails, CreateCampaign, Home, Profile, PaymentMethods, Withdraw, Analytics, AdminPanel } from './pages';

const App = () => {
  return (
    <div className="relative sm:-8 p-4 bg-[#0a0a0f] min-h-screen flex flex-row">
      <div className="sm:flex hidden tablet-s:mr-6 mr-10 relative">
        <Sidebar />
      </div>

      <div className="flex-1 4k:max-w-[96%] laptop-l:max-w-[92%] laptop:max-w-[90%] tablet-s:max-w-[86%] tablet:max-w-[86%] max-w-[98%] mx-auto sm:pr-5">
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/all-campaigns" element={<Landing />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/create-campaign" element={<CreateCampaign />} />
          <Route path="/campaign-details/:id" element={<CampaignDetails />} />
          <Route path="/payment-methods" element={<PaymentMethods />} />
          <Route path="/withdraw" element={<Withdraw />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/admin" element={<AdminPanel />} />
        </Routes>

        <Footer />
      </div>

      {/* AI Chat Assistant - Available on all pages */}
      <ChatAssistant />
    </div>
  );
};

export default App;