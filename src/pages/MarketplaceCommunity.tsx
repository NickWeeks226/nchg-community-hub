import React from "react";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, ShoppingCart, Users, RefreshCw, Network } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";

const MarketplaceCommunity = () => {
  const services = [
    {
      icon: ShoppingCart,
      title: "Powder Trading",
      description: "Secure marketplace for buying and selling high-quality titanium powders with verified suppliers.",
      features: ["Quality-assured suppliers", "Competitive pricing", "Secure transactions", "Global network"]
    },
    {
      icon: Users,
      title: "Community Platform",
      description: "Connect with industry professionals, share knowledge, and collaborate on projects.",
      features: ["Expert forums", "Best practice sharing", "Industry insights", "Networking events"]
    },
    {
      icon: RefreshCw,
      title: "Reconditioning Services",
      description: "Professional powder reconditioning to restore and optimize material properties.",
      features: ["Quality restoration", "Performance validation", "Cost-effective solutions", "Sustainability focus"]
    },
    {
      icon: Network,
      title: "Expert Network",
      description: "Access to industry experts and specialized consultants for technical guidance.",
      features: ["Technical consulting", "Project support", "Training programs", "Knowledge transfer"]
    }
  ];

  return (
    <>
      <Helmet>
        <title>Marketplace & Community | NCHG - Sustainable Titanium Trading Platform</title>
        <meta name="description" content="Join NCHG's marketplace and community for sustainable titanium powder trading, reconditioning services, and expert knowledge sharing." />
        <meta name="keywords" content="titanium marketplace, powder trading, community platform, reconditioning services, expert network, sustainable manufacturing" />
        <link rel="canonical" href="/marketplace-community" />
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
                Marketplace & Community
              </h1>
              <p className="text-xl text-primary-foreground/90 max-w-3xl mx-auto leading-relaxed">
                Connect, trade, and collaborate in the world's leading sustainable titanium 
                marketplace, fostering innovation and knowledge sharing across the industry.
              </p>
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-20 surface-gradient">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground mb-4">
                Platform Features
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                A comprehensive ecosystem designed to connect the titanium community 
                and enable sustainable, efficient trading and collaboration.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
              {services.map((service, index) => {
                const IconComponent = service.icon;
                return (
                  <Card key={index} className="hover:shadow-elegant transition-all duration-300 hover:-translate-y-1">
                    <CardHeader>
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center flex-shrink-0">
                          <IconComponent className="w-6 h-6 text-primary-foreground" />
                        </div>
                        <div>
                          <CardTitle className="text-xl font-display font-bold text-foreground mb-2">
                            {service.title}
                          </CardTitle>
                          <CardDescription className="text-muted-foreground">
                            {service.description}
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
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

            {/* Community Stats */}
            <div className="bg-card rounded-2xl p-8 mb-16 border border-border">
              <h3 className="text-2xl font-display font-bold text-foreground mb-8 text-center">
                Join Our Growing Community
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary mb-2">500+</div>
                  <div className="text-lg font-medium text-foreground mb-1">Active Members</div>
                  <div className="text-sm text-muted-foreground">Industry professionals worldwide</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary mb-2">£2M+</div>
                  <div className="text-lg font-medium text-foreground mb-1">Trade Volume</div>
                  <div className="text-sm text-muted-foreground">Annual marketplace transactions</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary mb-2">98%</div>
                  <div className="text-lg font-medium text-foreground mb-1">Satisfaction Rate</div>
                  <div className="text-sm text-muted-foreground">Member satisfaction score</div>
                </div>
              </div>
            </div>

            {/* CTA Section */}
            <div className="text-center">
              <h3 className="text-2xl font-display font-semibold text-foreground mb-4">
                Ready to Join the Community?
              </h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Become part of the leading titanium community and access exclusive 
                trading opportunities, expert knowledge, and industry connections.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="hero" size="lg">
                  Join Marketplace
                </Button>
                <Button variant="outline" size="lg">
                  Explore Community
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default MarketplaceCommunity;