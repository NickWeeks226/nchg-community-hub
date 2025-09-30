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

const Services = () => {
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const pillars = [
    {
      icon: Target,
      title: "Smart Feedstock Solutions",
      tagline: "Maximize powder ROI & lifecycle value",
      description: "Expert feedstock optimisation, lifecycle extension, and cost reduction strategies that can save up to 40% on material costs while extending powder life by 3-5 cycles.",
      services: [
        "Feedstock Consultancy & Optimisation",
        "Commercial Viability Testing & Validation", 
        "Powder Lifecycle Extension (3-5x cycles)",
        "Strategic Cost Reduction Programs"
      ],
      resultsBadge: "Up to 40% Cost Reduction & 3-5x Lifecycle Extension",
      ctaText: "Optimize Your Feedstock",
      link: "/smart-feedstock-solutions"
    },
    {
      icon: TrendingUp,
      title: "Digital Manufacturing Intelligence",
      tagline: "Data-driven operational excellence for AM operations",
      description: "Comprehensive digital solutions combining advanced analytics, process optimisation, and mechanical properties databases to maximise manufacturing efficiency and quality control.",
      services: [
        "Uptimo Software & Lean Consultancy",
        "Ti64 Mechanical Properties Database",
        "Process Optimisation & Analytics",
        "Quality Control Systems"
      ],
      resultsBadge: "30% Efficiency Gains & Certified Data Standards",
      ctaText: "Transform Your Operations",
      link: "/digital-manufacturing-intelligence"
    },
    {
      icon: Handshake,
      title: "Ti64 Marketplace & Community",
      tagline: "Sustainable ecosystem for trading & knowledge sharing",
      description: "The UK's premier Ti64 trading platform and professional community, connecting manufacturers, suppliers, and experts in a secure, sustainable marketplace focused on circular economy principles.",
      services: [
        "Secure Marketplace Platform",
        "Expert Community Network",
        "Professional Reconditioning Services",
        "Sustainability & Circular Economy Focus"
      ],
      resultsBadge: "Founding Members - Exclusive Early Access",
      ctaText: "Join the Community",
      link: "/marketplace-community"
    }
  ];

  return (
    <section id="services" className="py-20 surface-gradient">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground mb-4">
            What We Do
          </h2>
          <p className="text-xl text-foreground/90 max-w-3xl mx-auto mb-4">
            Transforming titanium manufacturing through smart feedstock optimisation, 
            data-driven operational excellence, and the UK's premier Ti64 ecosystem.
          </p>
          <p className="text-lg text-foreground/80 max-w-4xl mx-auto">
            From powder lifecycle optimisation to digital manufacturing intelligence and sustainable trading - 
            we provide comprehensive solutions for the entire Ti64 value chain.
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
                    <Badge variant="secondary" className="w-full text-center p-2 text-xs font-bold bg-gradient-primary text-primary-foreground">
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
            Help Us Build the Future of Titanium Manufacturing
          </h3>
          <p className="text-foreground/80 mb-6 max-w-2xl mx-auto">
            Join us in developing sustainable solutions for the titanium industry. 
            Partner with us to shape the future of UK manufacturing.
          </p>
          <Button variant="hero" size="lg" onClick={() => setAuthModalOpen(true)}>
            Partner With Us
          </Button>
        </div>
      </div>
      
      <AuthModal open={authModalOpen} onOpenChange={setAuthModalOpen} />
    </section>
  );
};

export default Services;