import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Users, 
  ShoppingCart, 
  BarChart3, 
  Settings, 
  Database, 
  Recycle,
  ArrowRight 
} from "lucide-react";

const Services = () => {
  const services = [
    {
      icon: BarChart3,
      title: "Feedstock Consultancy",
      description: "Expert consultation to help aid positive decisions on all things feedstock related for your titanium applications.",
      features: ["Material Assessment", "Process Optimisation", "Quality Assurance"]
    },
    {
      icon: Database,
      title: "Commercial Viability Testing",
      description: "Proving out commercial viability of 10-106μm PSD feedstock for additive manufacturing applications.",
      features: ["PSD Analysis", "AM Testing", "Performance Validation"]
    },
    {
      icon: Settings,
      title: "Ti64 AM Dataset Development",
      description: "Comprehensive dataset for Ti64 AM components that can be purchased, validated and continually expanded.",
      features: ["Data Collection", "Process Parameters", "Quality Standards"]
    },
    {
      icon: Users,
      title: "Digital Shopfloor Solutions",
      description: "Additive manufacturing lean consultancy with digital solutions for traceability and scheduling optimisation.",
      features: ["Digital Tracking", "Process Optimisation", "Lean Implementation"]
    },
    {
      icon: ShoppingCart,
      title: "Ti64 Marketplace",
      description: "Creating a marketplace for trading used Ti64 powder, extending material lifecycle and reducing waste.",
      features: ["Powder Trading", "Quality Verification", "Lifecycle Extension"]
    },
    {
      icon: Recycle,
      title: "Swarf-to-Powder Processing",
      description: "Cost-efficient processes for converting machining swarf into wire and powder feedstock materials.",
      features: ["Swarf Conversion", "Cost Efficiency", "Material Recovery"]
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

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <Card key={index} className="hover-lift bg-card/80 backdrop-blur-sm border-border/50">
                <CardHeader>
                  <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mb-4">
                    <IconComponent className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <CardTitle className="text-foreground">{service.title}</CardTitle>
                  <CardDescription className="text-muted-foreground">
                    {service.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button variant="ghost" className="w-full mt-6 group">
                    Learn More
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
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
          <Button variant="hero" size="lg">
            Schedule Consultation
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Services;