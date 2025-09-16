import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ArrowLeft, ShoppingCart, Users, RefreshCw, Network, Crown, TrendingUp, MapPin, Clock, CheckCircle, Shield, Target, Recycle, Award, UserCheck, Star, Globe, Clock3, FileCheck } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import FoundingMemberForm from "@/components/forms/FoundingMemberForm";
import MarketplaceEarlyAccessForm from "@/components/forms/MarketplaceEarlyAccessForm";
import ReconditioningServicesForm from "@/components/forms/ReconditioningServicesForm";

const MarketplaceCommunity = () => {
  const [activeModal, setActiveModal] = useState<string | null>(null);

  const ecosystemFeatures = [
    {
      icon: ShoppingCart,
      title: "Secure Marketplace",
      description: "Quality-verified Ti64 trading platform with escrow services, sustainability tracking, and transparent pricing.",
      features: ["Verified supplier network", "Escrow payment protection", "Quality certification", "Sustainability metrics"],
      ctaText: "Request Early Access",
      action: () => setActiveModal("marketplace")
    },
    {
      icon: Users,
      title: "Expert Community",
      description: "The UK's premier Ti64 professional network - launching soon with founding member opportunities.",
      features: ["Founding member benefits", "Expert knowledge sharing", "Industry networking", "Technical forums"],
      ctaText: "Join as Founding Member",
      action: () => setActiveModal("founding")
    },
    {
      icon: RefreshCw,
      title: "Professional Reconditioning Services",
      description: "Extending Ti64 powder lifecycle through certified reconditioning processes and quality restoration.",
      features: ["AS9100 certified process", "2-3 week turnaround", "Quality validation", "Traceability documentation"],
      ctaText: "Request Service",
      action: () => setActiveModal("reconditioning")
    }
  ];

  const industryProblems = [
    {
      icon: Target,
      title: "Fragmented Supply Chain",
      description: "Disconnected suppliers and buyers struggle to find reliable partners, leading to inefficiencies and higher costs."
    },
    {
      icon: Recycle,
      title: "Powder Waste",
      description: "Millions of pounds worth of used Ti64 powder is discarded annually due to lack of reconditioning options."
    },
    {
      icon: Network,
      title: "Isolated Professionals",
      description: "Ti64 experts work in isolation without a central platform for knowledge sharing and collaboration."
    }
  ];

  const marketplaceBenefits = [
    {
      icon: Shield,
      title: "Trusted Trading Platform",
      description: "Secure transactions with verified suppliers, escrow services, and quality guarantees."
    },
    {
      icon: Recycle,
      title: "Sustainability Focus",
      description: "Promoting circular economy through powder reconditioning and waste reduction."
    },
    {
      icon: TrendingUp,
      title: "Market Intelligence",
      description: "Real-time pricing data, supply trends, and market insights for informed decisions."
    }
  ];

  const communityBenefits = [
    {
      icon: Crown,
      title: "Founding Member Advantages",
      description: "Lifetime recognition, priority access, and direct input into platform development."
    },
    {
      icon: UserCheck,
      title: "Professional Networking",
      description: "Connect with the UK's leading Ti64 professionals and industry experts."
    },
    {
      icon: Award,
      title: "Knowledge Sharing",
      description: "Access to best practices, technical discussions, and industry insights."
    }
  ];

  const reconditioningSteps = [
    {
      step: "01",
      title: "Assessment & Analysis",
      description: "Comprehensive powder characterisation, contamination analysis, and feasibility assessment.",
      features: ["Particle size analysis", "Chemical composition", "Contamination detection", "Feasibility report"],
      timeline: "2-3 days"
    },
    {
      step: "02", 
      title: "Reconditioning Process",
      description: "Professional sieving, purification, blending, and quality verification procedures.",
      features: ["Advanced sieving", "Contamination removal", "Powder blending", "Quality verification"],
      timeline: "1-2 weeks"
    },
    {
      step: "03",
      title: "Certification & Delivery",
      description: "Final testing, traceability documentation, and coordinated delivery to your facility.",
      features: ["Final quality testing", "Certification documents", "Traceability records", "Delivery coordination"],
      timeline: "2-3 days"
    }
  ];

  return (
    <>
      <Helmet>
        <title>Ti64 Marketplace & Community | NCHG - Launching 2025</title>
        <meta name="description" content="Join the UK's premier Ti64 ecosystem launching in 2025. Founding members wanted for sustainable powder trading, expert community, and reconditioning services." />
        <meta name="keywords" content="Ti64 marketplace, titanium powder trading, founding members, reconditioning services, sustainable manufacturing, UK Ti64 community" />
        <link rel="canonical" href="/marketplace-community" />
      </Helmet>
      
      <Header />
      
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="hero-gradient pt-24 pb-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto text-center">
              <Link to="/" className="inline-flex items-center text-primary-foreground/80 hover:text-primary-foreground mb-6 transition-colors">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Link>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-primary-foreground mb-6">
                The UK's Premier Ti64 Ecosystem
              </h1>
              <p className="text-xl sm:text-2xl text-primary-foreground/90 mb-2 font-semibold">
                Coming Soon • Founding Members Wanted
              </p>
              <p className="text-lg text-primary-foreground/80 max-w-4xl mx-auto leading-relaxed mb-8">
                Join the revolution in sustainable Ti64 trading, expert networking, and powder reconditioning. 
                Shape the future of the UK titanium industry as a founding member.
              </p>
              
              {/* Key Stats Row */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="bg-white/10 backdrop-blur-md rounded-lg p-3 border border-white/20">
                  <div className="text-lg font-bold text-primary-foreground">Launching 2025</div>
                  <div className="text-sm text-primary-foreground/80">Platform Launch</div>
                </div>
                <div className="bg-white/10 backdrop-blur-md rounded-lg p-3 border border-white/20">
                  <div className="text-lg font-bold text-primary-foreground">5/20 Confirmed</div>
                  <div className="text-sm text-primary-foreground/80">Founding Members</div>
                </div>
                <div className="bg-white/10 backdrop-blur-md rounded-lg p-3 border border-white/20">
                  <div className="text-lg font-bold text-primary-foreground">Quality Verified</div>
                  <div className="text-sm text-primary-foreground/80">Trading Platform</div>
                </div>
                <div className="bg-white/10 backdrop-blur-md rounded-lg p-3 border border-white/20">
                  <div className="text-lg font-bold text-primary-foreground">Circular Economy</div>
                  <div className="text-sm text-primary-foreground/80">Sustainability Focus</div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  variant="hero" 
                  size="lg"
                  onClick={() => setActiveModal("founding")}
                  className="flex items-center space-x-2"
                >
                  <Crown className="w-5 h-5" />
                  <span>Join as Founding Member</span>
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  onClick={() => setActiveModal("reconditioning")}
                  className="border-white/30 text-white hover:bg-white/20"
                >
                  Learn About Reconditioning
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Ecosystem Overview */}
        <section className="py-20 surface-gradient">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground mb-4">
                Integrated Ti64 Ecosystem
              </h2>
              <p className="text-xl text-muted-foreground max-w-4xl mx-auto">
                Three interconnected services working together to create the UK's most comprehensive 
                Ti64 platform - combining secure trading, expert community, and professional reconditioning.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
              {ecosystemFeatures.map((feature, index) => {
                const IconComponent = feature.icon;
                return (
                  <Card key={index} className="hover:shadow-elegant transition-all duration-300 hover:-translate-y-1">
                    <CardHeader>
                      <div className="flex flex-col items-center text-center space-y-4">
                        <div className="w-16 h-16 bg-gradient-primary rounded-xl flex items-center justify-center">
                          <IconComponent className="w-8 h-8 text-primary-foreground" />
                        </div>
                        <div>
                          <CardTitle className="text-xl font-display font-bold text-foreground mb-2">
                            {feature.title}
                          </CardTitle>
                          <CardDescription className="text-muted-foreground">
                            {feature.description}
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <ul className="space-y-3 mb-6">
                        {feature.features.map((item, featureIndex) => (
                          <li key={featureIndex} className="flex items-center space-x-3 text-sm text-foreground">
                            <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                      <Button 
                        variant="outline" 
                        className="w-full"
                        onClick={feature.action}
                      >
                        {feature.ctaText}
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Problem/Solution Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground mb-4">
                  Transforming Ti64 Supply Chain Challenges
                </h2>
                <p className="text-xl text-muted-foreground max-w-4xl mx-auto">
                  The UK Ti64 industry faces fragmentation, waste, and isolation. NCHG's integrated platform 
                  addresses these challenges with a comprehensive ecosystem approach.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                {industryProblems.map((problem, index) => {
                  const IconComponent = problem.icon;
                  return (
                    <div key={index} className="text-center space-y-4">
                      <div className="w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center mx-auto">
                        <IconComponent className="w-8 h-8 text-destructive" />
                      </div>
                      <h3 className="text-lg font-display font-bold text-foreground">{problem.title}</h3>
                      <p className="text-muted-foreground">{problem.description}</p>
                    </div>
                  );
                })}
              </div>

              <div className="bg-card rounded-2xl p-8 border border-border">
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto">
                    <Target className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <h3 className="text-2xl font-display font-bold text-foreground">
                    NCHG's Integrated Solution
                  </h3>
                  <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                    A unified platform combining secure marketplace trading, expert community networking, 
                    and professional reconditioning services - creating the UK's first comprehensive Ti64 ecosystem 
                    focused on sustainability and circular economy principles.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Sections */}
        <section className="py-20 surface-gradient">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto space-y-16">
              
              {/* Marketplace Benefits */}
              <div>
                <h2 className="text-3xl font-display font-bold text-foreground mb-8 text-center">
                  Marketplace Benefits
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {marketplaceBenefits.map((benefit, index) => {
                    const IconComponent = benefit.icon;
                    return (
                      <div key={index} className="text-center space-y-4">
                        <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mx-auto">
                          <IconComponent className="w-6 h-6 text-primary-foreground" />
                        </div>
                        <h3 className="text-lg font-display font-bold text-foreground">{benefit.title}</h3>
                        <p className="text-muted-foreground">{benefit.description}</p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Community Benefits */}
              <div>
                <h2 className="text-3xl font-display font-bold text-foreground mb-8 text-center">
                  Community Benefits
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {communityBenefits.map((benefit, index) => {
                    const IconComponent = benefit.icon;
                    return (
                      <div key={index} className="text-center space-y-4">
                        <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mx-auto">
                          <IconComponent className="w-6 h-6 text-primary-foreground" />
                        </div>
                        <h3 className="text-lg font-display font-bold text-foreground">{benefit.title}</h3>
                        <p className="text-muted-foreground">{benefit.description}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Reconditioning Services Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground mb-4">
                  Professional Ti64 Reconditioning Process
                </h2>
                <p className="text-xl text-muted-foreground max-w-4xl mx-auto">
                  Our AS9100-certified 3-step reconditioning process extends powder lifecycle, 
                  reduces waste, and delivers quality-verified Ti64 ready for immediate use.
                </p>
                <div className="flex items-center justify-center space-x-6 mt-6 text-sm text-primary font-medium">
                  <span className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    2-3 week turnaround
                  </span>
                  <span className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-1" />
                    AS9100 certified
                  </span>
                  <span className="flex items-center">
                    <FileCheck className="w-4 h-4 mr-1" />
                    Full traceability
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                {reconditioningSteps.map((step, index) => (
                  <Card key={index} className="relative">
                    <CardHeader>
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center text-primary-foreground font-bold text-lg">
                          {step.step}
                        </div>
                        <div>
                          <CardTitle className="text-lg font-display font-bold text-foreground">
                            {step.title}
                          </CardTitle>
                          <div className="text-sm text-primary font-medium">{step.timeline}</div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground mb-4">{step.description}</p>
                      <ul className="space-y-2">
                        {step.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-center space-x-2 text-sm text-foreground">
                            <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="text-center">
                <Button 
                  size="lg"
                  onClick={() => setActiveModal("reconditioning")}
                >
                  Request Reconditioning Services
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Community Launch Section */}
        <section className="py-20 hero-gradient">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <Crown className="w-16 h-16 text-primary-foreground mx-auto mb-6" />
              <h2 className="text-3xl sm:text-4xl font-display font-bold text-primary-foreground mb-6">
                Join the Founding Community
              </h2>
              <p className="text-xl text-primary-foreground/90 mb-8">
                Shape the Future of Ti64 Trading & Networking
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 border border-white/20">
                  <Award className="w-8 h-8 text-primary-foreground mx-auto mb-3" />
                  <h3 className="text-lg font-bold text-primary-foreground mb-2">Exclusive Founding Benefits</h3>
                  <p className="text-primary-foreground/80 text-sm">Lifetime founding member recognition and priority access to all features</p>
                </div>
                <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 border border-white/20">
                  <UserCheck className="w-8 h-8 text-primary-foreground mx-auto mb-3" />
                  <h3 className="text-lg font-bold text-primary-foreground mb-2">Direct Input</h3>
                  <p className="text-primary-foreground/80 text-sm">Help shape platform development and community guidelines</p>
                </div>
                <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 border border-white/20">
                  <Globe className="w-8 h-8 text-primary-foreground mx-auto mb-3" />
                  <h3 className="text-lg font-bold text-primary-foreground mb-2">Personal Onboarding</h3>
                  <p className="text-primary-foreground/80 text-sm">One-on-one consultation to maximise your platform experience</p>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 border border-white/20 mb-8">
                <h3 className="text-xl font-bold text-primary-foreground mb-4">What We're Building Together</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-primary-foreground/90">
                  <div>
                    <strong>Knowledge Hub:</strong> Best practices, technical guides, and industry insights
                  </div>
                  <div>
                    <strong>Technical Forums:</strong> Expert discussions on Ti64 applications and innovations
                  </div>
                  <div>
                    <strong>Market Intelligence:</strong> Real-time trading data and supply chain insights
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-center space-x-4 mb-8 text-primary-foreground">
                <Clock3 className="w-5 h-5" />
                <span className="text-lg font-medium">5 of 20 founding spots confirmed • 15 remaining</span>
              </div>

              <Button 
                variant="hero" 
                size="lg"
                onClick={() => setActiveModal("founding")}
                className="text-lg px-8 py-4"
              >
                Become a Founding Member
              </Button>
            </div>
          </div>
        </section>

        {/* Three-Path Lead Capture Section */}
        <section className="py-20 surface-gradient">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground mb-4">
                  Choose Your Path Forward
                </h2>
                <p className="text-xl text-muted-foreground max-w-4xl mx-auto">
                  Three distinct opportunities to engage with the UK's premier Ti64 ecosystem. 
                  Select the path that best matches your goals and requirements.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Founding Member Path */}
                <Card className="hover:shadow-elegant transition-all duration-300 hover:-translate-y-1 border-2 border-primary/20">
                  <CardHeader className="text-center pb-4">
                    <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                      <Crown className="w-8 h-8 text-primary-foreground" />
                    </div>
                    <CardTitle className="text-xl font-display font-bold text-foreground">
                      Path A: Founding Community Member
                    </CardTitle>
                    <CardDescription>
                      Shape the future of Ti64 trading and networking
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <ul className="space-y-3 text-sm">
                      <li className="flex items-center space-x-3">
                        <Star className="w-4 h-4 text-primary flex-shrink-0" />
                        <span>Lifetime founding member recognition</span>
                      </li>
                      <li className="flex items-center space-x-3">
                        <UserCheck className="w-4 h-4 text-primary flex-shrink-0" />
                        <span>Direct input into platform development</span>
                      </li>
                      <li className="flex items-center space-x-3">
                        <Globe className="w-4 h-4 text-primary flex-shrink-0" />
                        <span>Personal onboarding consultation</span>
                      </li>
                      <li className="flex items-center space-x-3">
                        <Award className="w-4 h-4 text-primary flex-shrink-0" />
                        <span>Priority access to all features</span>
                      </li>
                    </ul>
                    <div className="bg-primary/10 rounded-lg p-3 text-center">
                      <div className="text-sm font-medium text-primary">Limited to 20 founding members</div>
                      <div className="text-xs text-muted-foreground">5 confirmed • 15 remaining</div>
                    </div>
                    <Button 
                      className="w-full" 
                      onClick={() => setActiveModal("founding")}
                    >
                      Apply as Founding Member
                    </Button>
                  </CardContent>
                </Card>

                {/* Marketplace Early Access Path */}
                <Card className="hover:shadow-elegant transition-all duration-300 hover:-translate-y-1">
                  <CardHeader className="text-center pb-4">
                    <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                      <ShoppingCart className="w-8 h-8 text-primary-foreground" />
                    </div>
                    <CardTitle className="text-xl font-display font-bold text-foreground">
                      Path B: Marketplace Early Access
                    </CardTitle>
                    <CardDescription>
                      Get priority access to secure Ti64 trading
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <ul className="space-y-3 text-sm">
                      <li className="flex items-center space-x-3">
                        <TrendingUp className="w-4 h-4 text-primary flex-shrink-0" />
                        <span>Priority access when platform launches</span>
                      </li>
                      <li className="flex items-center space-x-3">
                        <Shield className="w-4 h-4 text-primary flex-shrink-0" />
                        <span>Preferred seller verification process</span>
                      </li>
                      <li className="flex items-center space-x-3">
                        <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                        <span>Early adopter benefits and pricing</span>
                      </li>
                      <li className="flex items-center space-x-3">
                        <MapPin className="w-4 h-4 text-primary flex-shrink-0" />
                        <span>Regional market intelligence access</span>
                      </li>
                    </ul>
                    <div className="bg-muted/50 rounded-lg p-3 text-center">
                      <div className="text-sm font-medium text-foreground">Launching Q2 2025</div>
                      <div className="text-xs text-muted-foreground">UK's premier Ti64 marketplace</div>
                    </div>
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => setActiveModal("marketplace")}
                    >
                      Request Early Access
                    </Button>
                  </CardContent>
                </Card>

                {/* Reconditioning Services Path */}
                <Card className="hover:shadow-elegant transition-all duration-300 hover:-translate-y-1">
                  <CardHeader className="text-center pb-4">
                    <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                      <RefreshCw className="w-8 h-8 text-primary-foreground" />
                    </div>
                    <CardTitle className="text-xl font-display font-bold text-foreground">
                      Path C: Reconditioning Services
                    </CardTitle>
                    <CardDescription>
                      Professional Ti64 powder reconditioning available now
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <ul className="space-y-3 text-sm">
                      <li className="flex items-center space-x-3">
                        <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                        <span>Comprehensive powder assessment</span>
                      </li>
                      <li className="flex items-center space-x-3">
                        <FileCheck className="w-4 h-4 text-primary flex-shrink-0" />
                        <span>Custom reconditioning protocols</span>
                      </li>
                      <li className="flex items-center space-x-3">
                        <Award className="w-4 h-4 text-primary flex-shrink-0" />
                        <span>AS9100 quality certification</span>
                      </li>
                      <li className="flex items-center space-x-3">
                        <Clock className="w-4 h-4 text-primary flex-shrink-0" />
                        <span>2-3 week turnaround time</span>
                      </li>
                    </ul>
                    <div className="bg-success/10 rounded-lg p-3 text-center">
                      <div className="text-sm font-medium text-success">Available Now</div>
                      <div className="text-xs text-muted-foreground">Professional reconditioning services</div>
                    </div>
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => setActiveModal("reconditioning")}
                    >
                      Request Service Quote
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground mb-6">
                Ready to Transform Ti64 Together?
              </h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
                Join the revolution in sustainable Ti64 trading, expert networking, and powder reconditioning. 
                The future of the UK titanium industry starts with pioneers like you.
              </p>
              
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
                  <div className="space-y-2">
                    <div className="font-semibold text-foreground">The Opportunity</div>
                    <div className="text-muted-foreground">Be part of the UK's first comprehensive Ti64 ecosystem</div>
                  </div>
                  <div className="space-y-2">
                    <div className="font-semibold text-foreground">Your Role</div>
                    <div className="text-muted-foreground">Shape the platform that will define Ti64 trading</div>
                  </div>
                  <div className="space-y-2">
                    <div className="font-semibold text-foreground">Next Steps</div>
                    <div className="text-muted-foreground">Choose your path and join our growing community</div>
                  </div>
                </div>

                <div className="bg-primary/10 rounded-lg p-6 border border-primary/20">
                  <div className="flex items-center justify-center space-x-4 text-primary font-medium">
                    <Clock3 className="w-5 h-5" />
                    <span>Founding Member Opportunity - 15 of 20 spots remaining</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button 
                    variant="hero" 
                    size="lg"
                    onClick={() => setActiveModal("founding")}
                  >
                    Join as Founding Member
                  </Button>
                  <Button 
                    variant="outline" 
                    size="lg"
                    onClick={() => setActiveModal("marketplace")}
                  >
                    Request Early Access
                  </Button>
                </div>

                <div className="text-sm text-muted-foreground pt-4">
                  Questions? Contact us at{" "}
                  <a href="mailto:claudia@nchg.co.uk" className="text-primary hover:underline">
                    claudia@nchg.co.uk
                  </a>
                  {" "}or{" "}
                  <a href="tel:+447823489248" className="text-primary hover:underline">
                    +44 7823 489248
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Modal Dialogs */}
      <Dialog open={activeModal === "founding"} onOpenChange={() => setActiveModal(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <FoundingMemberForm onClose={() => setActiveModal(null)} />
        </DialogContent>
      </Dialog>

      <Dialog open={activeModal === "marketplace"} onOpenChange={() => setActiveModal(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <MarketplaceEarlyAccessForm onClose={() => setActiveModal(null)} />
        </DialogContent>
      </Dialog>

      <Dialog open={activeModal === "reconditioning"} onOpenChange={() => setActiveModal(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <ReconditioningServicesForm onClose={() => setActiveModal(null)} />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default MarketplaceCommunity;