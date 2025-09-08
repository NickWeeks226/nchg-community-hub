
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Recycle, Factory } from "lucide-react";
import heroImage from "@/assets/hero-titanium.jpg";
import { AuthModal } from "@/components/auth/AuthModal";

const Hero = () => {
  const [authModalOpen, setAuthModalOpen] = useState(false);
  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img 
          src={heroImage} 
          alt="Advanced titanium manufacturing facility"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/85 to-background/70"></div>
      </div>
      
      {/* Content */}
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-4xl">
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 bg-primary/10 border border-primary/20 rounded-lg px-4 py-2 mb-6">
            <Shield className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Sustainable Manufacturing Leader</span>
          </div>
          
          {/* Main Heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-foreground mb-6 leading-tight">
            Resilient. Sustainable. British.
          </h1>
          
          {/* Subheading */}
          <p className="text-xl sm:text-2xl text-muted-foreground mb-8 max-w-3xl leading-relaxed font-medium">
            Titanium solutions for a stronger, greener future.
          </p>
          
          {/* Body Text */}
          <div className="text-lg text-muted-foreground mb-8 max-w-4xl leading-relaxed">
            <p className="mb-4">
              At NCHG Limited, we are committed to creating a resilient and sustainable future for British industry. By embracing the core principles of Reduce, Re-use, and Recycle, we aim to educate, empower, and connect a community of UK businesses dedicated to sustainable manufacturing.
            </p>
            <p className="mb-4">
              Our mission is to establish a secure, 100% UK-sourced supply of Titanium by 2030, supporting the energy and mobility sectors with reliable, environmentally conscious solutions. In doing so, we help mitigate global supply chain risks while promoting local innovation and sustainability.
            </p>
            <p>
              Join us in reshaping the future - where resilience, sustainability, and circular economy practices drive British manufacturing forward.
            </p>
          </div>
          
          {/* Key Points */}
          <div className="flex flex-col sm:flex-row gap-6 mb-10">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <Recycle className="w-5 h-5 text-primary" />
              </div>
              <span className="text-foreground font-medium">100% UK Source by 2030</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <Factory className="w-5 h-5 text-primary" />
              </div>
              <span className="text-foreground font-medium">Reduce, Re-use, Recycle</span>
            </div>
          </div>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button variant="default" size="lg" className="group" onClick={() => setAuthModalOpen(true)}>
              Explore Our Solutions
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button variant="outline" size="lg" onClick={() => setAuthModalOpen(true)}>
              Join the Movement
            </Button>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-16 pt-8 border-t border-border/50">
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-primary mb-1">4,000T</div>
              <div className="text-sm text-muted-foreground font-medium">Global Annual Demand</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-primary mb-1">14%</div>
              <div className="text-sm text-muted-foreground font-medium">Growth Rate</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-primary mb-1">£250-280</div>
              <div className="text-sm text-muted-foreground font-medium">Price per kg</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-primary mb-1">2030</div>
              <div className="text-sm text-muted-foreground font-medium">UK Source Target</div>
            </div>
          </div>
        </div>
      </div>
      
      <AuthModal open={authModalOpen} onOpenChange={setAuthModalOpen} />
    </section>
  );
};

export default Hero;
