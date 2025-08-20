import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  console.log('App component rendering')
  
  // Enhanced logo preflight check
  const logoPreflightCheck = async () => {
    try {
      const version = Date.now();
      const response = await fetch(`/logo.png?v=${version}`, { 
        method: 'HEAD',
        cache: 'no-store' 
      });
      
      if (response.ok) {
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.startsWith('image/')) {
          console.log('🚀 Logo preflight: /logo.png verified as valid image');
        } else {
          console.warn('⚠️ Logo preflight: /logo.png exists but may not be an image');
        }
      } else {
        console.warn('⚠️ Logo preflight: /logo.png returned', response.status);
      }
    } catch (error) {
      console.error('❌ Logo preflight failed:', error);
    }
  };
  
  logoPreflightCheck();
  
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  )
}

export default App;
