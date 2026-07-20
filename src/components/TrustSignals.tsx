import { Card, CardContent } from "@/components/ui/card";
import { ShieldCheck, FlaskConical, Building2, MapPin } from "lucide-react";

const signals = [
  {
    icon: FlaskConical,
    title: "NPL collaboration",
    description: "Gas flow assessment methodology developed in collaboration with the National Physical Laboratory.",
  },
  {
    icon: ShieldCheck,
    title: "Fraunhofer ILT-reviewed",
    description: "Qualification protocol reviewed by Fraunhofer ILT.",
  },
  {
    icon: Building2,
    title: "Companies House 16015518",
    description: "NCHG Limited is a UK registered company (16015518).",
  },
  {
    icon: MapPin,
    title: "UK-based delivery",
    description: "On-site engagements delivered by a UK-based team.",
  },
];

const TrustSignals = () => {
  return (
    <section id="trust" className="py-16 surface-gradient">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-foreground mb-2">
            Trust signals
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {signals.map((s) => {
            const Icon = s.icon;
            return (
              <Card key={s.title} className="bg-card border-border h-full">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{s.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{s.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TrustSignals;