import React from "react";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { StatsCard } from "@/components/ui/stats-card";
import { CaseStudyCard } from "@/components/ui/case-study-card";
import { LeadCaptureForm } from "@/components/forms/LeadCaptureForm";
import { ArrowLeft, Target, DollarSign, Recycle, Shield, RefreshCw, TrendingUp, Award, Users, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
const SmartFeedstockSolutions = () => {
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
  const problems = ["High material costs (£180-250/kg) eating into margins", "Waste from premature powder disposal", "Lack of validated parameters for cost-effective alternatives", "No strategy for end-of-life powder value recovery"];
  const benefits = [{
    icon: DollarSign,
    title: "COST OPTIMIZATION",
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
    description: "Optimization planning",
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
    activities: ["Process integration", "Staff training", "Quality monitoring", "Continuous optimization"],
    timeline: "Ongoing",
    deliverables: "Live system"
  }];
  const caseStudies = [{
    title: "SME R&D Project Prevents £180k Revenue Loss",
    problem: "5-week trial-and-error process causing missed opportunities and delayed project delivery",
    solution: "Ti64 database + optimized process parameters with validated alternatives",
    results: "Development time reduced from 5 weeks to 2 weeks, preventing ~£180k revenue loss",
    ctaText: "Read Full Case Study",
    onCtaClick: () => console.log("Case study 1 clicked")
  }, {
    title: "Lifecycle Optimization Extends Powder Value",
    problem: "Premature powder disposal increasing costs and environmental impact",
    solution: "Custom reuse protocols + quality monitoring system implementation",
    results: "Extended powder life from 4 to 9 cycles, achieving £78k annual savings",
    ctaText: "Download Case Study PDF",
    onCtaClick: () => console.log("Case study 2 clicked")
  }];
  const benefits_list = ["Current powder usage efficiency analysis", "Potential cost savings calculation", "Lifecycle extension opportunities", "Custom optimization recommendations", "ROI projections for implementation"];
  return <>
      <Helmet>
        <title>Maximize Your Ti64 Powder ROI and Lifecycle Value | NCHG Smart Feedstock Solutions</title>
        <meta name="description" content="Expert feedstock optimization, lifecycle extension, and cost reduction strategies that can save up to 40% on material costs while extending powder life by 3-5 cycles." />
        <meta name="keywords" content="Ti64 powder optimization, titanium feedstock solutions, powder lifecycle extension, cost reduction, additive manufacturing, ROI calculator" />
        <link rel="canonical" href="/smart-feedstock-solutions" />
      </Helmet>
      
      <Header />
      
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="hero-gradient pt-24 pb-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="text-left mb-8">
                <Link to="/" className="inline-flex items-center text-primary-foreground/80 hover:text-primary-foreground mb-6 transition-colors">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Home
                </Link>
              </div>
              <div className="text-center mb-8">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-primary-foreground mb-6">
                  Maximize Your Ti64 Powder ROI and Lifecycle Value
                </h1>
                <p className="text-xl text-primary-foreground/90 max-w-4xl mx-auto leading-relaxed mb-8">
                  Expert feedstock optimization, lifecycle extension, and cost reduction strategies that can save up to 
                  <span className="font-bold"> 40% on material costs</span> while extending powder life by 
                  <span className="font-bold"> 3-5 cycles</span>.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                  <Button variant="hero" size="lg" className="text-lg px-8">
                    Get Your Free Powder Assessment
                  </Button>
                  <Button variant="glass" size="lg" className="text-lg px-8">
                    Download ROI Calculator
                  </Button>
                </div>
              </div>

              {/* Key Statistics Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
                {statistics.map((stat, index) => <StatsCard key={index} title={stat.title} subtitle={stat.subtitle} description={stat.description} icon={stat.icon} className="bg-card/90 border-primary-foreground/20" />)}
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
                {problems.map((problem, index) => <Card key={index} className="p-6 hover-lift">
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 rounded-full bg-destructive/10 flex items-center justify-center flex-shrink-0 mt-1">
                        <Target className="w-3 h-3 text-destructive" />
                      </div>
                      <p className="text-sm text-foreground">{problem}</p>
                    </div>
                  </Card>)}
              </div>

              {/* Solution Statement */}
              <div className="text-center bg-primary/5 rounded-xl p-8 border border-primary/20">
                <h3 className="text-2xl font-display font-bold text-foreground mb-4">We've developed proven methodologies to optimise every aspect of your Ti64 powder strategy</h3>
                <p className="text-lg text-muted-foreground">
                  From initial selection through to end-of-life value recovery
                </p>
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
                  Four pillars of comprehensive powder optimization
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
                  Our proven 4-step process for Ti64 powder optimization
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

        {/* Case Studies Section */}
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground mb-4">
                  Real Results from Real Customers
                </h2>
                <p className="text-xl text-muted-foreground">
                  See how our Ti64 optimization strategies deliver measurable value
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {caseStudies.map((caseStudy, index) => <CaseStudyCard key={index} title={caseStudy.title} problem={caseStudy.problem} solution={caseStudy.solution} results={caseStudy.results} ctaText={caseStudy.ctaText} onCtaClick={caseStudy.onCtaClick} />)}
              </div>
            </div>
          </div>
        </section>

        {/* Lead Capture Section */}
        <section className="py-20 surface-gradient">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground mb-4">
                  Get Your Free Ti64 Powder Optimization Assessment
                </h2>
                <p className="text-xl text-muted-foreground">Discover your powder optimisation potential with a comprehensive analysis</p>
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
      </main>
    </>;
};
export default SmartFeedstockSolutions;