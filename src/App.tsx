import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SpellingProvider } from "@/contexts/SpellingContext";
import { SecurityMonitor } from "@/components/security/SecurityMonitor";
import CookieConsent from "@/components/CookieConsent";
import ScrollToTop from "@/components/ScrollToTop";
import Header from "@/components/Header";
import Index from "./pages/Index";
import Profile from "./pages/Profile";
import Marketplace from "./pages/Marketplace";
import CreateListing from "./pages/CreateListing";
import Messages from "./pages/Messages";
import NotFound from "./pages/NotFound";
import SmartFeedstockSolutions from "./pages/SmartFeedstockSolutions";
import DigitalManufacturingIntelligence from "./pages/DigitalManufacturingIntelligence";
import MarketplaceCommunity from "./pages/MarketplaceCommunity";
import Contact from "./pages/Contact";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import CookiesPolicy from "./pages/CookiesPolicy";
import TermsOfService from "./pages/TermsOfService";

const queryClient = new QueryClient();

const App = () => {
  console.log('App component rendering')
  
  
  return (
    <QueryClientProvider client={queryClient}>
      <SpellingProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <SecurityMonitor />
          <CookieConsent />
          <BrowserRouter>
            <ScrollToTop />
            <Header />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/marketplace" element={<Marketplace />} />
              <Route path="/create-listing" element={<CreateListing />} />
              <Route path="/messages" element={<Messages />} />
              <Route path="/smart-feedstock-solutions" element={<SmartFeedstockSolutions />} />
              <Route path="/digital-manufacturing-intelligence" element={<DigitalManufacturingIntelligence />} />
              <Route path="/marketplace-community" element={<MarketplaceCommunity />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/cookies-policy" element={<CookiesPolicy />} />
              <Route path="/terms-of-service" element={<TermsOfService />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </SpellingProvider>
    </QueryClientProvider>
  )
}

export default App;
