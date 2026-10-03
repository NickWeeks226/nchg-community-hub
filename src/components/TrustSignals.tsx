import { Card, CardContent } from "@/components/ui/card";
import { ShieldCheck, FlaskConical, Building2, MapPin } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const TrustSignals = () => {
  const { tr } = useLanguage();
  const signals = [
  {
    icon: FlaskConical,
    title: tr("NPL collaboration", "Zusammenarbeit mit dem NPL"),
    description: tr("Gas flow assessment methodology developed in collaboration with the National Physical Laboratory.", "Methodik zur Gasstrombewertung, entwickelt in Zusammenarbeit mit dem National Physical Laboratory."),
  },
  {
    icon: ShieldCheck,
    title: tr("Fraunhofer ILT-reviewed", "Von Fraunhofer ILT geprüft"),
    description: tr("Qualification protocol reviewed by Fraunhofer ILT.", "Qualifizierungsprotokoll vom Fraunhofer ILT geprüft."),
  },
  {
    icon: Building2,
    title: "Companies House 16015518",
    description: tr("NCHG Limited is a UK registered company (16015518).", "NCHG Limited ist ein im Vereinigten Königreich eingetragenes Unternehmen (16015518)."),
  },
  {
    icon: MapPin,
    title: tr("UK-based delivery", "Leistungserbringung aus Großbritannien"),
    description: tr("On-site engagements delivered by a UK-based team.", "Vor-Ort-Einsätze durch ein Team mit Sitz in Großbritannien."),
  },
];

  return (
    <section id="trust" className="py-16 surface-gradient">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-foreground mb-2">
            {tr("Why trust NCHG", "Warum NCHG vertrauen")}
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