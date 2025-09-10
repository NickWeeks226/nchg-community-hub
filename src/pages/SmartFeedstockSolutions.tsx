import React from "react";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Microscope, TestTube, FlaskConical, BarChart3 } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";

const SmartFeedstockSolutions = () => {
  const services = [
    {
      icon: Microscope,
      title: "Expert Consultancy",
      description: "Strategic guidance on powder selection, optimization, and lifecycle management from industry experts.",
      features: ["Powder characterization analysis", "Process optimization strategies", "Quality assurance protocols", "Cost-benefit analysis"]
    },
    {
      icon: TestTube,
      title: "Advanced Testing",
      description: "Comprehensive testing services to validate powder performance and quality metrics.",
      features: ["Particle size distribution", "Chemical composition analysis", "Flowability assessment", "Contamination screening"]
    },
    {
      icon: FlaskConical,
      title: "Lifecycle Maximization",
      description: "Innovative solutions to extend powder lifecycle and maximize return on investment.",
      features: ["Reuse optimization", "Degradation analysis", "Performance tracking", "Reconditioning protocols"]
    }
  ];

  return (
    <>
      <Helmet>
        <title>Smart Feedstock Solutions | NCHG - Titanium Powder Optimization</title>
        <meta name="description" content="Expert titanium feedstock solutions including consultancy, testing, and lifecycle maximization. Optimize powder performance and maximize value with NCHG's comprehensive services." />
        <meta name="keywords" content="titanium powder, feedstock optimization, powder testing, lifecycle management, additive manufacturing, AM powder" />
        <link rel="canonical" href="/smart-feedstock-solutions" />
      </Helmet>
      
      <Header />
      
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="hero-gradient pt-24 pb-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <Link to="/" className="inline-flex items-center text-primary-foreground/80 hover:text-primary-foreground mb-6 transition-colors">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Link>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-primary-foreground mb-6">
                Smart Feedstock Solutions
              </h1>
              <p className="text-xl text-primary-foreground/90 max-w-3xl mx-auto leading-relaxed">
                Optimize powder performance and maximize lifecycle value with our comprehensive 
                titanium feedstock solutions, backed by industry-leading expertise and testing capabilities.
              </p>
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-20 surface-gradient">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground mb-4">
                Our Services
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Comprehensive solutions designed to optimize your titanium powder performance 
                and maximize return on investment throughout the entire lifecycle.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
              {services.map((service, index) => {
                const IconComponent = service.icon;
                return (
                  <Card key={index} className="hover:shadow-elegant transition-all duration-300 hover:-translate-y-1">
                    <CardHeader className="text-center">
                      <div className="w-16 h-16 bg-gradient-primary rounded-xl flex items-center justify-center mb-6 mx-auto">
                        <IconComponent className="w-8 h-8 text-primary-foreground" />
                      </div>
                      <CardTitle className="text-xl font-display font-bold text-foreground mb-2">
                        {service.title}
                      </CardTitle>
                      <CardDescription className="text-muted-foreground">
                        {service.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3">
                        {service.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-center space-x-3 text-sm text-foreground">
                            <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* CTA Section */}
            <div className="text-center">
              <h3 className="text-2xl font-display font-semibold text-foreground mb-4">
                Ready to Optimize Your Feedstock?
              </h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Get in touch with our feedstock experts to discuss how our solutions 
                can improve your powder performance and reduce costs.
              </p>
              <Button variant="hero" size="lg">
                Schedule Consultation
              </Button>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default SmartFeedstockSolutions;