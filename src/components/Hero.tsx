import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Recycle, Factory } from "lucide-react";
import heroImage from "@/assets/hero-titanium.jpg";
import { AuthModal } from "@/components/auth/AuthModal";
import { useLanguage } from "@/contexts/LanguageContext";

const Hero = () => {
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const { t } = useLanguage();
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
            <span className="text-sm font-medium text-primary">{t('hero.badge')}</span>
          </div>
          
          {/* Main Heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-foreground mb-6 leading-tight">
            {t('hero.headline')}
          </h1>
          
          {/* Subheading */}
          <p className="text-xl sm:text-2xl text-foreground/90 mb-8 max-w-3xl leading-relaxed font-medium">
            {t('hero.subheadline')}
          </p>
          
          {/* Body Text */}
          <div className="text-lg text-foreground mb-8 max-w-4xl leading-relaxed">
            <p className="mb-4">
              {t('hero.para1')}
            </p>
            <p className="mb-4">
              {t('hero.para2')}
            </p>
            <p>
              {t('hero.para3')}
            </p>
          </div>
          
          {/* Key Points */}
          <div className="flex flex-col sm:flex-row gap-6 mb-10">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <Recycle className="w-5 h-5 text-primary" />
              </div>
              <span className="text-foreground font-medium">{t('hero.keypoint1')}</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <Factory className="w-5 h-5 text-primary" />
              </div>
              <span className="text-foreground font-medium">{t('hero.keypoint2')}</span>
            </div>
          </div>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button variant="default" size="lg" className="group" onClick={() => setAuthModalOpen(true)}>
              {t('hero.cta1')}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button variant="outline" size="lg" onClick={() => setAuthModalOpen(true)}>
              {t('hero.cta2')}
            </Button>
          </div>
          
        </div>
      </div>
      
      <AuthModal open={authModalOpen} onOpenChange={setAuthModalOpen} />
    </section>
  );
};

export default Hero;
