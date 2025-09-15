import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Database, BarChart3, Settings, Monitor, TrendingUp, Factory, Award, Users, CheckCircle, Target, Clock, Building } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import { StatsCard } from "@/components/ui/stats-card";
import { CaseStudyCard } from "@/components/ui/case-study-card";
import OperationalExcellenceForm from "@/components/forms/OperationalExcellenceForm";
import Ti64DatabaseForm from "@/components/forms/Ti64DatabaseForm";

const DigitalManufacturingIntelligence = () => {
  const [selectedService, setSelectedService] = useState<'operational' | 'ti64'>('operational');

  const keyStats = [
    { title: "99.8%", subtitle: "On-Time Delivery", description: "Achieved with Uptimo implementation" },
    { title: "1 Week", subtitle: "Lead Times", description: "Reduced to process times" },
    { title: ">100%", subtitle: "Revenue Increase", description: "Typical customer achievement" },
    { title: "3 Month", subtitle: "Typical ROI", description: "Return on investment period" }
  ];

  const operationalBenefits = [
    { icon: TrendingUp, title: "Only AM-Specific Software", features: ["Manage AM operational flow and scheduling", "Quantify OEE (Additive Manufacturing Index)", "AMS7031 and ARP7044 powder compliance", "ERP and MES system integration"] },
    { icon: Factory, title: "Lean Implementation", features: ["FIFO, VSM, SMED for AM environments", "Batch size optimization", "WIP elimination strategies", "Continuous improvement methodologies"] },
    { icon: Award, title: "Proven Results", features: ["99.8% on-time delivery achievement", "Lead times reduced to process times", ">100% revenue increases", "3-month typical ROI"] },
    { icon: Users, title: "Partnership Excellence", features: ["Magnitude: 20+ years metal AM experience", "NCHG: Practical lean implementation", "Combined proven methodologies", "Dedicated AM operational expertise"] }
  ];

  const ti64Benefits = [
    { icon: Database, title: "Comprehensive Database", features: ["Validated mechanical properties", "Multiple AM system data", "Design allowables for aerospace/medical", "Renishaw AM500Q validated parameters"] },
    { icon: Target, title: "Performance Benchmarking", features: ["Process optimization insights", "Comparative analysis capabilities", "Performance tracking tools", "Quality prediction models"] },
    { icon: Clock, title: "Accelerated Qualification", features: ["Months to weeks timeline reduction", "Validated design allowables", "Risk reduction in material adoption", "Faster time-to-market"] },
    { icon: Building, title: "Flexible Participation", features: ["Private database access", "Shared database participation", "Custom data contribution", "Flexible pricing models"] }
  ];

  const howItWorksOperational = [
    { phase: "Assessment & Planning", timeline: "Weeks 1-2", description: "Current state analysis, Uptimo scoping, lean opportunity identification" },
    { phase: "Deployment & Implementation", timeline: "Weeks 3-8", description: "Uptimo system deployment, lean methodology implementation, staff training" },
    { phase: "Optimization & Support", timeline: "Ongoing", description: "Continuous improvement, performance monitoring, optimization support" }
  ];

  const howItWorksTi64 = [
    { phase: "Requirements Analysis", timeline: "Week 1", description: "Application requirements, performance criteria, database access level determination" },
    { phase: "Database Integration", timeline: "Weeks 2-4", description: "Access setup, data integration, workflow establishment" },
    { phase: "Optimization & Expansion", timeline: "Ongoing", description: "Data analysis, performance optimization, database contribution" }
  ];

  return (
    <>
      <Helmet>
        <title>Digital Manufacturing Intelligence | NCHG - Data-Driven AM Excellence</title>
        <meta name="description" content="Transform AM operations with Uptimo software and Ti64 performance database. Achieve 99.8% on-time delivery and accelerate material qualification." />
        <meta name="keywords" content="Uptimo software, Ti64 database, AM operational excellence, lean manufacturing, additive manufacturing intelligence, Magnitude Innovations" />
        <link rel="canonical" href="/digital-manufacturing-intelligence" />
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
                Data-Driven Excellence for Additive Manufacturing Operations
              </h1>
              <p className="text-xl text-primary-foreground/90 max-w-4xl mx-auto leading-relaxed mb-12">
                Transform your AM operations with proven lean methodologies and comprehensive Ti64 performance data. 
                Achieve operational excellence while accelerating material qualification and design optimization.
              </p>
              
              {/* Key Statistics */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
                {keyStats.map((stat, index) => (
                  <StatsCard
                    key={index}
                    title={stat.title}
                    subtitle={stat.subtitle}
                    description={stat.description}
                    className="bg-primary-foreground/10 border-primary-foreground/20 backdrop-blur-sm"
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Two Powerful Solutions Section */}
        <section className="py-20 surface-gradient">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground mb-4">
                Two Powerful Solutions for AM Excellence
              </h2>
              <p className="text-xl text-muted-foreground max-w-4xl mx-auto">
                Choose the solution that best fits your needs, or combine both for maximum impact on your additive manufacturing operations.
              </p>
            </div>

            {/* Service Selection Tabs */}
            <div className="flex justify-center mb-12">
              <div className="bg-card rounded-lg p-1 border border-border inline-flex">
                <button
                  onClick={() => setSelectedService('operational')}
                  className={`px-6 py-3 rounded-md transition-colors font-medium ${
                    selectedService === 'operational' 
                      ? 'bg-primary text-primary-foreground' 
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  AM Operational Excellence
                </button>
                <button
                  onClick={() => setSelectedService('ti64')}
                  className={`px-6 py-3 rounded-md transition-colors font-medium ${
                    selectedService === 'ti64' 
                      ? 'bg-primary text-primary-foreground' 
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  Ti64 Performance Database
                </button>
              </div>
            </div>

            {/* Service 1: AM Operational Excellence */}
            {selectedService === 'operational' && (
              <div className="space-y-12">
                <div className="bg-card rounded-2xl p-8 border border-border">
                  <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-gradient-primary rounded-xl flex items-center justify-center mb-6 mx-auto">
                      <Factory className="w-8 h-8 text-primary-foreground" />
                    </div>
                    <h3 className="text-2xl font-display font-bold text-foreground mb-2">
                      🏭 UPTIMO SOFTWARE + LEAN CONSULTANCY
                    </h3>
                    <p className="text-lg text-primary font-semibold mb-4">Partnership with Magnitude Innovations</p>
                    <p className="text-muted-foreground max-w-3xl mx-auto">
                      Transform your AM shopfloor with the only software designed specifically for additive manufacturing 
                      operational excellence, backed by deep lean consultancy.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-8">
                    {operationalBenefits.map((benefit, index) => {
                      const IconComponent = benefit.icon;
                      return (
                        <Card key={index} className="hover-lift">
                          <CardHeader className="text-center pb-4">
                            <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mb-4 mx-auto">
                              <IconComponent className="w-6 h-6 text-primary-foreground" />
                            </div>
                            <CardTitle className="text-lg font-display font-bold text-foreground">
                              {benefit.title}
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="pt-0">
                            <ul className="space-y-2">
                              {benefit.features.map((feature, featureIndex) => (
                                <li key={featureIndex} className="flex items-start space-x-2 text-sm text-muted-foreground">
                                  <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                                  <span>{feature}</span>
                                </li>
                              ))}
                            </ul>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>

                  {/* How It Works - Operational */}
                  <div className="mt-12 bg-background/50 rounded-xl p-8">
                    <h4 className="text-xl font-display font-bold text-foreground mb-6 text-center">
                      How It Works: Operational Excellence Pathway
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {howItWorksOperational.map((step, index) => (
                        <div key={index} className="text-center">
                          <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-lg mb-4 mx-auto">
                            {index + 1}
                          </div>
                          <h5 className="font-semibold text-foreground mb-2">{step.phase}</h5>
                          <p className="text-sm text-primary font-medium mb-2">{step.timeline}</p>
                          <p className="text-sm text-muted-foreground">{step.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Service 2: Ti64 Performance Database */}
            {selectedService === 'ti64' && (
              <div className="space-y-12">
                <div className="bg-card rounded-2xl p-8 border border-border">
                  <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-gradient-primary rounded-xl flex items-center justify-center mb-6 mx-auto">
                      <Database className="w-8 h-8 text-primary-foreground" />
                    </div>
                    <h3 className="text-2xl font-display font-bold text-foreground mb-2">
                      📊 TI64 MECHANICAL PROPERTY DATABASE
                    </h3>
                    <p className="text-lg text-primary font-semibold mb-4">Design Allowables & Performance Benchmarking</p>
                    <p className="text-muted-foreground max-w-3xl mx-auto">
                      Accelerate Ti64 adoption and optimization with the most comprehensive database of AM Ti64 
                      mechanical properties and performance data.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-8">
                    {ti64Benefits.map((benefit, index) => {
                      const IconComponent = benefit.icon;
                      return (
                        <Card key={index} className="hover-lift">
                          <CardHeader className="text-center pb-4">
                            <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mb-4 mx-auto">
                              <IconComponent className="w-6 h-6 text-primary-foreground" />
                            </div>
                            <CardTitle className="text-lg font-display font-bold text-foreground">
                              {benefit.title}
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="pt-0">
                            <ul className="space-y-2">
                              {benefit.features.map((feature, featureIndex) => (
                                <li key={featureIndex} className="flex items-start space-x-2 text-sm text-muted-foreground">
                                  <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                                  <span>{feature}</span>
                                </li>
                              ))}
                            </ul>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>

                  {/* How It Works - Ti64 */}
                  <div className="mt-12 bg-background/50 rounded-xl p-8">
                    <h4 className="text-xl font-display font-bold text-foreground mb-6 text-center">
                      How It Works: Ti64 Database Pathway
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {howItWorksTi64.map((step, index) => (
                        <div key={index} className="text-center">
                          <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-lg mb-4 mx-auto">
                            {index + 1}
                          </div>
                          <h5 className="font-semibold text-foreground mb-2">{step.phase}</h5>
                          <p className="text-sm text-primary font-medium mb-2">{step.timeline}</p>
                          <p className="text-sm text-muted-foreground">{step.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Problem/Solution Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground mb-4">
                Solving Critical Challenges in AM Operations and Ti64 Adoption
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Operational Challenges */}
              <div className="bg-card rounded-xl p-8 border border-border">
                <h3 className="text-xl font-display font-bold text-foreground mb-6">OPERATIONAL CHALLENGES:</h3>
                <ul className="space-y-4">
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-destructive rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-muted-foreground">Low AM system efficiency (industry average 25-50%)</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-destructive rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-muted-foreground">Manual scheduling and production planning</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-destructive rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-muted-foreground">Extended lead times (8-12 weeks typical)</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-destructive rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-muted-foreground">Poor on-time delivery performance (70-80%)</span>
                  </li>
                </ul>
              </div>

              {/* Ti64 Challenges */}
              <div className="bg-card rounded-xl p-8 border border-border">
                <h3 className="text-xl font-display font-bold text-foreground mb-6">TI64 ADOPTION CHALLENGES:</h3>
                <ul className="space-y-4">
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-destructive rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-muted-foreground">Limited design allowables and performance data</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-destructive rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-muted-foreground">Lengthy material qualification processes</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-destructive rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-muted-foreground">Trial-and-error development approaches</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-destructive rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-muted-foreground">Risk-averse adoption due to unknown performance</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="text-center mt-12">
              <div className="bg-gradient-primary rounded-xl p-8 text-primary-foreground">
                <h3 className="text-2xl font-display font-bold mb-4">
                  Integrated Solution: Operational Excellence + Material Intelligence
                </h3>
                <p className="text-lg opacity-90 max-w-3xl mx-auto">
                  Our comprehensive approach addresses both operational inefficiencies and material adoption challenges, 
                  providing a complete transformation pathway for additive manufacturing success.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Case Studies Section */}
        <section className="py-20 surface-gradient">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground mb-4">
                Proven Results from Real Implementations
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                See how our solutions have transformed operations and accelerated Ti64 adoption for our customers.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <CaseStudyCard
                title="Aerospace Manufacturer Transforms Operations"
                problem="25% AM efficiency, 11-week lead times, 70% on-time delivery performance was limiting growth and customer satisfaction"
                solution="Uptimo software deployment with comprehensive lean consultancy implementation, including FIFO, VSM, and SMED methodologies"
                results="80% improvement in AM system efficiency, lead times reduced from 11 weeks to 1 week, 99.8% on-time delivery, >100% revenue increase"
                ctaText="Learn More About Operational Excellence"
                onCtaClick={() => setSelectedService('operational')}
              />

              <CaseStudyCard
                title="R&D Team Accelerates Ti64 Development"
                problem="5-week trial-and-error development process causing missed opportunities and limiting innovation pace in Ti64 applications"
                solution="Ti64 performance database access with validated process parameters and design allowables integration into development workflow"
                results="Development time reduced from 5 weeks to 2 weeks, £180k revenue protection, targeting 40% feedstock cost reduction and 60% build time reduction"
                ctaText="Access Ti64 Database"
                onCtaClick={() => setSelectedService('ti64')}
              />
            </div>
          </div>
        </section>

        {/* Partnership Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground mb-4">
                Partnership Excellence with Magnitude Innovations
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Combining Magnitude's 20+ years of metal AM experience with NCHG's lean implementation expertise.
              </p>
            </div>

            <div className="bg-card rounded-2xl p-8 border border-border">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                  <h3 className="text-2xl font-display font-bold text-foreground mb-6">
                    Why This Partnership Works
                  </h3>
                  <div className="space-y-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center flex-shrink-0">
                        <Award className="w-6 h-6 text-primary-foreground" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground mb-2">Magnitude Innovations</h4>
                        <p className="text-muted-foreground">20+ years metal AM experience, creator of Uptimo - the only software designed specifically for AM operational excellence</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center flex-shrink-0">
                        <TrendingUp className="w-6 h-6 text-primary-foreground" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground mb-2">NCHG Expertise</h4>
                        <p className="text-muted-foreground">Practical lean implementation expertise with proven methodologies specifically adapted for AM environments</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center flex-shrink-0">
                        <Users className="w-6 h-6 text-primary-foreground" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground mb-2">Combined Value</h4>
                        <p className="text-muted-foreground">Integrated approach delivering both technological solutions and implementation expertise for guaranteed success</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gradient-primary rounded-xl p-8 text-primary-foreground text-center">
                  <h4 className="text-xl font-display font-bold mb-4">Partnership Credentials</h4>
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <div className="text-3xl font-bold opacity-90 mb-2">20+</div>
                      <div className="text-sm opacity-80">Years AM Experience</div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold opacity-90 mb-2">99.8%</div>
                      <div className="text-sm opacity-80">Customer Success Rate</div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold opacity-90 mb-2">100+</div>
                      <div className="text-sm opacity-80">Implementations</div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold opacity-90 mb-2">#1</div>
                      <div className="text-sm opacity-80">AM Software</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Lead Capture Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground mb-4">
                Unlock Your Manufacturing Intelligence Potential
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Choose your pathway to excellence. Access specialized tools and expert consultation 
                tailored to your specific needs and operational goals.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
              {/* Operational Excellence Path */}
              <div className="space-y-6">
                <div className="text-center">
                  <h3 className="text-2xl font-display font-bold text-foreground mb-2">
                    Operational Excellence Assessment
                  </h3>
                  <p className="text-muted-foreground">
                    Perfect for manufacturers looking to transform their AM operations with proven methodologies
                  </p>
                </div>
                <OperationalExcellenceForm />
              </div>

              {/* Ti64 Database Path */}
              <div className="space-y-6">
                <div className="text-center">
                  <h3 className="text-2xl font-display font-bold text-foreground mb-2">
                    Ti64 Database Access
                  </h3>
                  <p className="text-muted-foreground">
                    Ideal for teams working with Ti64 materials seeking design allowables and performance data
                  </p>
                </div>
                <Ti64DatabaseForm />
              </div>
            </div>

            <div className="text-center mt-16">
              <div className="bg-card rounded-xl p-8 border border-border max-w-4xl mx-auto">
                <h3 className="text-xl font-display font-bold text-foreground mb-4">
                  Not sure which solution is right for you?
                </h3>
                <p className="text-muted-foreground mb-6">
                  Our experts can help you determine the best approach for your specific needs and goals.
                </p>
                <Button variant="outline" size="lg">
                  Schedule Expert Consultation
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default DigitalManufacturingIntelligence;