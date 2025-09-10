import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  BarChart3, 
  Database, 
  Users,
  ArrowRight 
} from "lucide-react";
import { AuthModal } from "@/components/auth/AuthModal";
import { Link } from "react-router-dom";

const Services = () => {
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const pillars = [
    {
      icon: BarChart3,
      title: "Smart Feedstock Solutions",
      description: "Optimize powder performance & maximize lifecycle value",
      services: ["Consultancy", "Testing", "Lifecycle Max"],
      link: "/smart-feedstock-solutions"
    },
    {
      icon: Database,
      title: "Digital Manufacturing Intelligence",
      description: "Data-driven insights for superior AM operations",
      services: ["AM Dataset", "Shopfloor Solutions"],
      link: "/digital-manufacturing-intelligence"
    },
    {
      icon: Users,
      title: "Marketplace & Community",
      description: "Sustainable trading & knowledge sharing",
      services: ["Powder Trading", "Community", "Reconditioning", "Expert Network"],
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
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Comprehensive titanium solutions from feedstock to finished components, 
            supporting sustainable manufacturing across the entire supply chain.
          </p>
        </div>

        {/* Three Pillars Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {pillars.map((pillar, index) => {
            const IconComponent = pillar.icon;
            return (
               <Card key={index} className="group hover:shadow-elegant transition-all duration-300 hover:-translate-y-1 bg-card border-border h-full flex flex-col">
                <CardHeader className="text-center pb-4">
                  <div className="w-16 h-16 bg-gradient-primary rounded-xl flex items-center justify-center mb-6 mx-auto group-hover:scale-105 transition-transform duration-300">
                    <IconComponent className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <CardTitle className="text-2xl font-display font-bold text-foreground mb-3 uppercase tracking-wide">
                    {pillar.title}
                  </CardTitle>
                  <CardDescription className="text-lg text-muted-foreground leading-relaxed">
                    {pillar.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col justify-between p-6 pt-0">
                  <div className="mb-6">
                    <ul className="space-y-3">
                      {pillar.services.map((service, serviceIndex) => (
                        <li key={serviceIndex} className="flex items-center space-x-3 text-sm font-medium text-foreground">
                          <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                          <span>{service}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <Link to={pillar.link} className="w-full">
                    <Button variant="outline" className="w-full group mt-auto">
                      Learn More
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
            Ready to Transform Your Titanium Supply Chain?
          </h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Get in touch with our experts to discuss how our sustainable solutions 
            can benefit your manufacturing operations.
          </p>
          <Button variant="hero" size="lg" onClick={() => setAuthModalOpen(true)}>
            Schedule Consultation
          </Button>
        </div>
      </div>
      
      <AuthModal open={authModalOpen} onOpenChange={setAuthModalOpen} />
    </section>
  );
};

export default Services;