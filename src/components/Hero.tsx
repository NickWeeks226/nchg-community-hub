import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Recycle, Factory } from "lucide-react";
import heroImage from "@/assets/hero-titanium.jpg";

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img 
          src={heroImage} 
          alt="Advanced titanium manufacturing facility"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/60"></div>
      </div>
      
      {/* Content */}
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-4xl">
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2 mb-6">
            <Shield className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Sustainable Manufacturing Leader</span>
          </div>
          
          {/* Main Heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-foreground mb-6 leading-tight">
            Sustainable{" "}
            <span className="text-gradient-primary">Titanium Solutions</span>
          </h1>
          
          {/* Subheading */}
          <p className="text-xl sm:text-2xl text-muted-foreground mb-8 max-w-3xl leading-relaxed">
            Making your business more resilient for a more sustainable future through 
            innovative titanium feedstock solutions and additive manufacturing expertise.
          </p>
          
          {/* Key Points */}
          <div className="flex flex-col sm:flex-row gap-6 mb-10">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <Recycle className="w-5 h-5 text-primary" />
              </div>
              <span className="text-foreground font-medium">100% UK Source by 2030</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                <Factory className="w-5 h-5 text-accent" />
              </div>
              <span className="text-foreground font-medium">Reduce, Re-use, Recycle</span>
            </div>
          </div>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button variant="hero" size="lg" className="group">
              Explore Our Services
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button variant="outline" size="lg">
              Join Our Community
            </Button>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-16 pt-8 border-t border-border/50">
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-primary mb-1">4,000T</div>
              <div className="text-sm text-muted-foreground">Global Annual Demand</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-accent mb-1">14%</div>
              <div className="text-sm text-muted-foreground">Growth Rate</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-primary mb-1">£250-280</div>
              <div className="text-sm text-muted-foreground">Price per kg</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-accent mb-1">2030</div>
              <div className="text-sm text-muted-foreground">UK Source Target</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;