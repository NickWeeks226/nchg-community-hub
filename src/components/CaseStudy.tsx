import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { TrendingDown, PoundSterling, Leaf, Package } from "lucide-react";

const stats = [
  { icon: Package, label: "Sieve-rejected assessed", value: "500–600 kg" },
  { icon: TrendingDown, label: "Confirmed recoverable", value: "50%" },
  { icon: PoundSterling, label: "Net customer value", value: "£39,000" },
  { icon: Leaf, label: "CO₂ avoided", value: "4.8 tonnes" },
];

const CaseStudy = () => {
  return (
    <section id="case-study" className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2 mb-4">
            <span className="text-sm font-medium text-primary">Flagship case study</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground mb-4">
            Atherton Bikes: recovering sieve-rejected Ti64
          </h2>
          <p className="text-lg text-foreground/80 max-w-3xl mx-auto">
            NCHG applied its on-site qualification technique to Ti64 powder that Atherton Bikes' standard sieving process had rejected as waste — and put half of it back into the machine.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((s) => {
            const Icon = s.icon;
            return (
              <Card key={s.label} className="bg-card border-border">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="text-2xl font-bold text-foreground mb-1">{s.value}</div>
                  <div className="text-sm text-muted-foreground">{s.label}</div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="text-center">
          <Button asChild variant="hero" size="lg">
            <Link to="/contact">Book a free feedstock assessment</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CaseStudy;