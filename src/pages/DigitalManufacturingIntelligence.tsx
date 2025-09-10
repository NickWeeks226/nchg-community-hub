import React from "react";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Database, BarChart3, Settings, Monitor } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";

const DigitalManufacturingIntelligence = () => {
  const services = [
    {
      icon: Database,
      title: "AM Dataset Solutions",
      description: "Comprehensive data collection and analysis tools for additive manufacturing processes.",
      features: ["Process parameter optimization", "Quality prediction models", "Material performance tracking", "Historical data analysis"]
    },
    {
      icon: Monitor,
      title: "Shopfloor Solutions",
      description: "Real-time monitoring and control systems for manufacturing operations.",
      features: ["Live process monitoring", "Quality control dashboards", "Automated alerts", "Production optimization"]
    },
    {
      icon: BarChart3,
      title: "Advanced Analytics",
      description: "Data-driven insights and predictive analytics for superior manufacturing performance.",
      features: ["Predictive maintenance", "Yield optimization", "Cost analysis", "Performance benchmarking"]
    }
  ];

  return (
    <>
      <Helmet>
        <title>Digital Manufacturing Intelligence | NCHG - Data-Driven AM Solutions</title>
        <meta name="description" content="Transform your additive manufacturing with digital intelligence solutions. AM datasets, shopfloor monitoring, and advanced analytics for superior operations." />
        <meta name="keywords" content="digital manufacturing, AM datasets, shopfloor solutions, manufacturing analytics, Industry 4.0, additive manufacturing data" />
        <link rel="canonical" href="/digital-manufacturing-intelligence" />
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
                Digital Manufacturing Intelligence
              </h1>
              <p className="text-xl text-primary-foreground/90 max-w-3xl mx-auto leading-relaxed">
                Transform your additive manufacturing operations with data-driven insights, 
                real-time monitoring, and advanced analytics for superior performance and efficiency.
              </p>
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-20 surface-gradient">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground mb-4">
                Our Digital Solutions
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Cutting-edge digital tools and analytics platforms designed to optimize 
                your manufacturing processes and drive operational excellence.
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

            {/* Benefits Section */}
            <div className="bg-card rounded-2xl p-8 mb-16 border border-border">
              <h3 className="text-2xl font-display font-bold text-foreground mb-6 text-center">
                Transform Your Operations
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">25%</div>
                  <div className="text-sm text-muted-foreground">Reduced Waste</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">40%</div>
                  <div className="text-sm text-muted-foreground">Faster Setup</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">99.5%</div>
                  <div className="text-sm text-muted-foreground">Uptime</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">15%</div>
                  <div className="text-sm text-muted-foreground">Cost Savings</div>
                </div>
              </div>
            </div>

            {/* CTA Section */}
            <div className="text-center">
              <h3 className="text-2xl font-display font-semibold text-foreground mb-4">
                Ready to Digitize Your Manufacturing?
              </h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Discover how our digital manufacturing intelligence solutions can transform 
                your operations and drive measurable improvements.
              </p>
              <Button variant="hero" size="lg">
                Request Demo
              </Button>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default DigitalManufacturingIntelligence;