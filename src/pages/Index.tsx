import { useState } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import About from "@/components/About";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { AuthModal } from "@/components/auth/AuthModal";

const Index = () => {
  const [authModalOpen, setAuthModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <Services />
        <About />
        
        {/* Marketplace CTA Section */}
        <section className="py-24 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="bg-gradient-to-r from-success/5 to-primary/5 rounded-xl p-8 text-center">
              <h3 className="text-2xl font-display font-semibold text-foreground mb-4">
                Help Us Build the UK's Premier Ti64 Marketplace
              </h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Be part of creating the UK's first dedicated Ti64 trading platform. 
                Early supporters will shape our marketplace and gain exclusive access at launch.
              </p>
              <div className="flex justify-center">
                <Button variant="outline" size="lg" onClick={() => setAuthModalOpen(true)}>
                  Request Early Access
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      
      <AuthModal open={authModalOpen} onOpenChange={setAuthModalOpen} />
    </div>
  );
};

export default Index;
