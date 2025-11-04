import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Target, 
  TrendingUp, 
  Handshake,
  ArrowRight 
} from "lucide-react";
import { AuthModal } from "@/components/auth/AuthModal";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

const Services = () => {
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const { t } = useLanguage();
  
  const pillars = [
    {
      icon: Target,
      title: t('services.pillar1.title'),
      tagline: t('services.pillar1.tagline'),
      description: t('services.pillar1.description'),
      services: [
        t('services.pillar1.service1'),
        t('services.pillar1.service2'), 
        t('services.pillar1.service3'),
        t('services.pillar1.service4')
      ],
      resultsBadge: t('services.pillar1.results'),
      ctaText: t('services.pillar1.cta'),
      link: "/smart-feedstock-solutions"
    },
    {
      icon: TrendingUp,
      title: t('services.pillar2.title'),
      tagline: t('services.pillar2.tagline'),
      description: t('services.pillar2.description'),
      services: [
        t('services.pillar2.service1'),
        t('services.pillar2.service2'),
        t('services.pillar2.service3'),
        t('services.pillar2.service4')
      ],
      resultsBadge: t('services.pillar2.results'),
      ctaText: t('services.pillar2.cta'),
      link: "/digital-manufacturing-intelligence"
    },
    {
      icon: Handshake,
      title: t('services.pillar3.title'),
      tagline: t('services.pillar3.tagline'),
      description: t('services.pillar3.description'),
      services: [
        t('services.pillar3.service1'),
        t('services.pillar3.service2'),
        t('services.pillar3.service3'),
        t('services.pillar3.service4')
      ],
      resultsBadge: t('services.pillar3.results'),
      ctaText: t('services.pillar3.cta'),
      link: "/marketplace-community"
    }
  ];

  return (
    <section id="services" className="py-20 surface-gradient">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground mb-4">
            {t('services.heading')}
          </h2>
          <p className="text-xl text-foreground/90 max-w-3xl mx-auto mb-4">
            {t('services.subtitle')}
          </p>
          <p className="text-lg text-foreground/80 max-w-4xl mx-auto">
            {t('services.description')}
          </p>
        </div>

        {/* Three Pillars Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {pillars.map((pillar, index) => {
            const IconComponent = pillar.icon;
            return (
               <Card key={index} className="group hover:shadow-elegant transition-all duration-300 hover:-translate-y-1 bg-card border-border h-full flex flex-col relative">
                <CardHeader className="text-center pb-4">
                  <div className="w-16 h-16 bg-gradient-primary rounded-xl flex items-center justify-center mb-6 mx-auto group-hover:scale-105 transition-transform duration-300">
                    <IconComponent className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <CardTitle className="text-2xl font-display font-bold text-foreground mb-3 uppercase tracking-wide">
                    {pillar.title}
                  </CardTitle>
                  <div className="text-base font-medium text-primary mb-3">
                    {pillar.tagline}
                  </div>
                  <CardDescription className="text-sm text-foreground/80 leading-relaxed">
                    {pillar.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col justify-between p-6 pt-0">
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-foreground mb-3 uppercase tracking-wide">Key Services:</h4>
                    <ul className="space-y-2">
                      {pillar.services.map((service, serviceIndex) => (
                        <li key={serviceIndex} className="flex items-start space-x-3 text-sm text-foreground">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full flex-shrink-0 mt-2"></div>
                          <span className="leading-relaxed">{service}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="mb-6">
                    <Badge variant="secondary" className="w-full flex items-center justify-center text-center p-3 text-xs font-bold bg-gradient-primary text-primary-foreground rounded-full">
                      {pillar.resultsBadge}
                    </Badge>
                  </div>
                  
                  <Link to={pillar.link} className="w-full">
                    <Button variant="outline" className="w-full group mt-auto">
                      {pillar.ctaText}
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <h3 className="text-2xl font-display font-semibold text-foreground mb-4">
            {t('services.cta.heading')}
          </h3>
          <p className="text-foreground/80 mb-6 max-w-2xl mx-auto">
            {t('services.cta.text')}
          </p>
          <Button variant="hero" size="lg" onClick={() => setAuthModalOpen(true)}>
            {t('services.cta.button')}
          </Button>
        </div>
      </div>
      
      <AuthModal open={authModalOpen} onOpenChange={setAuthModalOpen} />
    </section>
  );
};

export default Services;