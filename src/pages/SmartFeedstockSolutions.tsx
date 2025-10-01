import React from "react";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { StatsCard } from "@/components/ui/stats-card";
import { LeadCaptureForm } from "@/components/forms/LeadCaptureForm";
import { ArrowLeft, Target, DollarSign, Recycle, Shield, RefreshCw, TrendingUp, Award, Users, CheckCircle } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import powderParticlesHero from "@/assets/powder-particles-hero.png";
import ctaAbstractTech from "@/assets/cta-abstract-tech.jpg";
import Footer from "@/components/Footer";
const SmartFeedstockSolutions = () => {
  const navigate = useNavigate();
  const scrollToForm = () => {
    const formSection = document.querySelector('#lead-capture-form');
    if (formSection) {
      formSection.scrollIntoView({
        behavior: 'smooth'
      });
    }
  };
  const statistics = [{
    title: "Up to 40%",
    subtitle: "Cost Reduction",
    description: "Material cost savings",
    icon: <DollarSign className="w-6 h-6 text-success" />
  }, {
    title: "3-5x",
    subtitle: "Lifecycle Extension",
    description: "Powder reuse cycles",
    icon: <Recycle className="w-6 h-6 text-primary" />
  }];
  const problems = [{
    heading: "High Costs",
    description: "Material costs (£180-250/kg) eating into margins"
  }, {
    heading: "Premature Waste",
    description: "From premature powder disposal"
  }, {
    heading: "Lack of Parameters",
    description: "No validated parameters for cost-effective alternatives"
  }, {
    heading: "No Recovery Strategy",
    description: "No strategy for end-of-life powder value recovery"
  }];
  const benefits = [{
    icon: DollarSign,
    title: "COST OPTIMISATION",
    description: "40% reduction in feedstock costs with expanded size distribution (10-106μm vs standard 10-53μm)",
    features: ["Custom blending strategies for optimal cost/performance", "Strategic sourcing recommendations", "Volume pricing negotiations"]
  }, {
    icon: Recycle,
    title: "LIFECYCLE EXTENSION",
    description: "Safely extend powder reuse from 3-5 to 8-10 cycles",
    features: ["Quality monitoring protocols to track degradation", "Custom reuse protocols for different applications", "Performance validation testing"]
  }, {
    icon: Shield,
    title: "RISK MITIGATION",
    description: "Comprehensive testing before process changes",
    features: ["Validated parameters for multiple configurations", "Quality assurance throughout powder lifecycle", "Failure mode analysis"]
  }, {
    icon: RefreshCw,
    title: "VALUE RECOVERY",
    description: "End-of-life powder assessment and valuation",
    features: ["Marketplace connections for spent powder resale", "Reconditioning feasibility analysis", "Material certification services"]
  }];
  const processSteps = [{
    step: "1",
    title: "ASSESSMENT",
    description: "Current usage analysis",
    activities: ["Powder usage audit", "Cost analysis", "Quality assessment", "Process review"],
    timeline: "1-2 weeks",
    deliverables: "Baseline report"
  }, {
    step: "2",
    title: "STRATEGY",
    description: "Optimisation planning",
    activities: ["Custom strategy development", "Parameter validation", "Risk assessment", "ROI projections"],
    timeline: "2-3 weeks",
    deliverables: "Implementation plan"
  }, {
    step: "3",
    title: "VALIDATION",
    description: "Testing and verification",
    activities: ["Pilot testing", "Quality validation", "Performance verification", "Parameter optimization"],
    timeline: "3-4 weeks",
    deliverables: "Validated protocols"
  }, {
    step: "4",
    title: "IMPLEMENTATION",
    description: "Full deployment",
    activities: ["Process integration", "Staff training", "Quality monitoring", "Continuous optimisation"],
    timeline: "Ongoing",
    deliverables: "Live system"
  }];
  const benefits_list = ["Current powder usage efficiency analysis", "Potential cost savings calculation", "Lifecycle extension opportunities", "Custom optimisation recommendations", "ROI projections for implementation"];
  return <>
      <Helmet>
        <title>Ti64 Powder ROI Optimisation | NCHG Smart Feedstock</title>
        <meta name="description" content="Expert Ti64 powder lifecycle optimisation achieving up to 40% cost reduction with 3-5x lifecycle extension. Optimise your feedstock strategy today." />
        <meta name="keywords" content="Ti64 powder lifecycle, powder reuse optimization, feedstock cost reduction, additive manufacturing, powder optimisation" />
        <link rel="canonical" href="/smart-feedstock-solutions" />
      </Helmet>
      
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="relative pt-24 pb-16 overflow-hidden">
          <div className="absolute inset-0 bg-cover bg-center" style={{
          backgroundImage: `url(${powderParticlesHero})`
        }} />
          <div className="absolute inset-0 bg-primary/75" />
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-6xl mx-auto">
              <div className="text-left mb-8">
                <Link to="/" className="inline-flex items-center text-primary-foreground/80 hover:text-primary-foreground mb-6 transition-colors">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Home
                </Link>
              </div>
              <div className="text-center mb-8">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-primary-foreground mb-6">Maximise Your Ti64 Powder ROI and Lifecycle Value</h1>
                <p className="text-xl text-primary-foreground/90 max-w-4xl mx-auto leading-relaxed mb-8">
                  Expert Ti64 powder lifecycle optimisation and cost reduction strategies that can save up to 
                  <span className="font-bold"> 40% on material costs</span> while extending powder life by 
                  <span className="font-bold"> 3-5x lifecycle extension</span>.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                  <Button variant="hero" size="lg" className="text-lg px-8" onClick={scrollToForm}>
                    Optimise Your Feedstock
                  </Button>
                  <Button variant="glass" size="lg" className="text-lg px-8" onClick={scrollToForm}>
                    Download ROI Calculator
                  </Button>
                </div>
              </div>

              {/* Key Statistics Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 mb-8">
                {statistics.map((stat, index) => <StatsCard key={index} title={stat.title} subtitle={stat.subtitle} description={stat.description} icon={stat.icon} className="bg-card/90 border-primary-foreground/20" />)}
              </div>

              {/* CTA Button Below Header */}
              <div className="flex justify-center">
                
              </div>
            </div>
          </div>
        </section>

        {/* Problem/Solution Section */}
        <section className="py-20 surface-gradient">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground mb-6">
                  The Hidden Costs of Inefficient Ti64 Powder Management
                </h2>
              </div>

              {/* Problem Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                {problems.map((problem, index) => <Card key={index} className="p-8 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                    <div className="flex flex-col items-center text-center space-y-4">
                      <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center flex-shrink-0">
                        <Target className="w-8 h-8 text-destructive" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-foreground mb-2">
                          {problem.heading}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {problem.description}
                        </p>
                      </div>
                    </div>
                  </Card>)}
              </div>

              {/* Solution Statement */}
              <div className="text-center bg-primary/5 rounded-xl p-8 border border-primary/20">
                <h3 className="text-2xl font-display font-bold text-foreground mb-4">We've developed proven methodologies to optimise every aspect of your Ti64 powder lifecycle</h3>
                <p className="text-lg text-muted-foreground mb-6">
                  From initial selection through to end-of-life value recovery
                </p>
                
                {/* CTA After Hidden Costs */}
                <Button variant="outline" size="lg" className="text-lg px-8" onClick={() => navigate('/contact')}>
                  Talk to an Expert
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Key Benefits Section */}
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground mb-4">
                  Transform Your Ti64 Powder Strategy
                </h2>
                <p className="text-xl text-muted-foreground">
                  Four pillars of comprehensive powder optimisation
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {benefits.map((benefit, index) => {
                const IconComponent = benefit.icon;
                return <Card key={index} className="p-8 hover-lift">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center flex-shrink-0">
                          <IconComponent className="w-6 h-6 text-primary-foreground" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-foreground mb-2">{benefit.title}</h3>
                          <p className="text-muted-foreground mb-4">{benefit.description}</p>
                          <ul className="space-y-2">
                            {benefit.features.map((feature, featureIndex) => <li key={featureIndex} className="flex items-center space-x-2 text-sm text-foreground">
                                <CheckCircle className="w-4 h-4 text-success flex-shrink-0" />
                                <span>{feature}</span>
                              </li>)}
                          </ul>
                        </div>
                      </div>
                    </Card>;
              })}
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Process */}
        <section className="py-20 surface-gradient">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground mb-4">
                  How It Works
                </h2>
                <p className="text-xl text-muted-foreground">
                  Our proven 4-step process for Ti64 powder optimisation
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {processSteps.map((step, index) => <Card key={index} className="p-6 text-center hover-lift">
                    <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl font-bold text-primary-foreground">{step.step}</span>
                    </div>
                    <h3 className="text-lg font-bold text-foreground mb-2">{step.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{step.description}</p>
                    <div className="space-y-2 mb-4">
                      {step.activities.map((activity, activityIndex) => <div key={activityIndex} className="text-xs text-foreground">• {activity}</div>)}
                    </div>
                    <div className="text-xs text-primary font-semibold">
                      {step.timeline} • {step.deliverables}
                    </div>
                  </Card>)}
              </div>
            </div>
          </div>
        </section>


        {/* Lead Capture Section */}
        <section id="lead-capture-form" className="py-20 surface-gradient">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground mb-4">
                  Get Your Free Ti64 Powder Lifecycle Assessment
                </h2>
                <p className="text-xl text-muted-foreground">Discover your powder lifecycle optimisation potential with a comprehensive analysis</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                {/* Benefits List */}
                <div>
                  <h3 className="text-2xl font-bold text-foreground mb-6">What You'll Receive:</h3>
                  <div className="space-y-4">
                    {benefits_list.map((benefit, index) => <div key={index} className="flex items-center space-x-3">
                        <CheckCircle className="w-5 h-5 text-success flex-shrink-0" />
                        <span className="text-foreground">{benefit}</span>
                      </div>)}
                  </div>
                  
                  <div className="mt-8 p-6 bg-primary/5 rounded-lg border border-primary/20">
                    <div className="flex items-center space-x-3 mb-3">
                      <Users className="w-5 h-5 text-primary" />
                      <span className="font-semibold text-foreground">Trusted by Industry Leaders</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Join industry leaders already optimising their Ti64 strategy with NCHG</p>
                  </div>
                </div>

                {/* Lead Capture Form */}
                <div className="bg-card p-8 rounded-lg shadow-elegant border">
                  <LeadCaptureForm />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Bottom CTA Section */}
        <section className="relative py-20 pb-32 overflow-hidden bg-gradient-to-br from-primary via-primary/95 to-primary/90">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
              {/* Text Content */}
              <div className="text-center lg:text-left">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-primary-foreground mb-6">
                  Ready to Transform Your Ti64 Powder Strategy?
                </h2>
                <p className="text-xl text-primary-foreground/90 mb-8">
                  Let's discuss how we can help you achieve up to 40% cost reduction and extend your powder lifecycle
                </p>
                <Button 
                  size="lg" 
                  variant="hero"
                  className="text-lg px-10" 
                  onClick={() => navigate('/contact')}
                >
                  Get in Touch Today
                </Button>
              </div>

              {/* Abstract Technical Image */}
              <div className="relative h-64 lg:h-96 rounded-xl overflow-hidden shadow-elegant">
                <img 
                  src={ctaAbstractTech} 
                  alt="Advanced titanium powder particle analysis" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </>;
};
export default SmartFeedstockSolutions;