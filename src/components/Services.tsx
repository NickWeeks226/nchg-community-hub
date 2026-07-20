import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Recycle, Beaker, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const pillars = [
  {
    icon: CheckCircle2,
    title: "Qualify",
    tagline: "Adopt wider-spec feedstock",
    description:
      "A gas flow assessment (reviewed with the National Physical Laboratory and Fraunhofer ILT) plus on-site mechanical testing — using a portable rig, not a 2–3 week external test house — qualifies wider particle size distribution feedstock in 4–8 weeks instead of 6–12 months.",
    points: [
      "Gas flow assessment reviewed with NPL and Fraunhofer ILT",
      "Portable on-site mechanical testing rig",
      "4–8 weeks vs 6–12 months to qualify",
      "Up to 26% lower feedstock cost",
    ],
    badge: "Up to 26% lower feedstock cost",
  },
  {
    icon: Beaker,
    title: "Recover",
    tagline: "Reclaim sieve-rejected powder",
    description:
      "The same qualification technique, applied to powder your standard sieving process is currently discarding as waste. At Atherton Bikes, 500–600 kg of sieve-rejected material was assessed and 50% confirmed recoverable.",
    points: [
      "On-site assessment of sieve-rejected material",
      "Coupons built and mechanically tested in the machine",
      "£39,000 net customer value at Atherton Bikes",
      "4.8 tonnes CO₂ avoided at Atherton Bikes",
    ],
    badge: "£39,000 net value at Atherton Bikes",
  },
  {
    icon: Recycle,
    title: "Recycle",
    tagline: "Highest-value routing for your scrap",
    description:
      "NCHG uses its market relationships to route your end-of-life titanium scrap to whichever recycler pays the best value for it, rather than it going to low-value disposal.",
    points: [
      "Live scrap brokering service",
      "Access to NCHG's recycler network",
      "Best-value route for end-of-life titanium",
      "Value returned to you, not lost to disposal",
    ],
    badge: "Best-value route for end-of-life titanium",
  },
];

const Services = () => {
  return (
    <section id="services" className="py-20 surface-gradient">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground mb-4">
            What We Do
          </h2>
          <p className="text-xl text-foreground/90 max-w-3xl mx-auto mb-4">
            One shared technique. Two outcomes for your feedstock, plus a live service for your scrap.
          </p>
          <p className="text-lg text-foreground/80 max-w-4xl mx-auto">
            Gas flow assessment plus on-site mechanical testing lets us qualify wider-spec feedstock or recover sieve-rejected powder in weeks, not months. Separately, we broker your end-of-life titanium scrap to the highest-value recycler in our network.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {pillars.map((p) => {
            const Icon = p.icon;
            return (
              <Card key={p.title} className="group hover:shadow-elegant transition-all duration-300 hover:-translate-y-1 bg-card border-border h-full flex flex-col">
                <CardHeader className="text-center pb-4">
                  <div className="w-16 h-16 bg-gradient-primary rounded-xl flex items-center justify-center mb-6 mx-auto group-hover:scale-105 transition-transform duration-300">
                    <Icon className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <CardTitle className="text-2xl font-display font-bold text-foreground mb-3 uppercase tracking-wide">
                    {p.title}
                  </CardTitle>
                  <div className="text-base font-medium text-primary mb-3">{p.tagline}</div>
                  <CardDescription className="text-sm text-foreground/80 leading-relaxed">
                    {p.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col justify-between p-6 pt-0">
                  <ul className="space-y-2 mb-6">
                    {p.points.map((s) => (
                      <li key={s} className="flex items-start space-x-3 text-sm text-foreground">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full flex-shrink-0 mt-2"></div>
                        <span className="leading-relaxed">{s}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mb-6">
                    <Badge variant="secondary" className="w-full flex items-center justify-center text-center p-3 text-xs font-bold bg-gradient-primary text-primary-foreground rounded-full">
                      {p.badge}
                    </Badge>
                  </div>
                  <Button asChild variant="outline" className="w-full group mt-auto">
                    <Link to="/contact">
                      Book a free assessment
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="text-center">
          <h3 className="text-2xl font-display font-semibold text-foreground mb-4">
            Not sure which service fits?
          </h3>
          <p className="text-foreground/80 mb-6 max-w-2xl mx-auto">
            Book a free Ti64 feedstock assessment and we'll show you where the savings are — in your feedstock spec, your sieve waste, or your scrap.
          </p>
          <Button asChild variant="hero" size="lg">
            <Link to="/contact">Book a free feedstock assessment</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Services;