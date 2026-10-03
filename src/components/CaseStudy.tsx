import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { TrendingDown, PoundSterling, Leaf, Package } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const CaseStudy = () => {
  const { tr } = useLanguage();
  const stats = [
  { icon: Package, label: tr("Sieve-rejected assessed", "Bewertetes Siebrückstandspulver"), value: "500–600 kg" },
  { icon: TrendingDown, label: tr("Confirmed recoverable", "Bestätigt rückgewinnbar"), value: "50%" },
  { icon: PoundSterling, label: tr("Net customer value", "Netto-Kundennutzen"), value: "£39,000" },
  { icon: Leaf, label: tr("CO₂ avoided", "Vermiedenes CO₂"), value: tr("4.8 tonnes", "4,8 Tonnen") },
];

  return (
    <section id="case-study" className="scroll-mt-16 py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2 mb-4">
            <span className="text-sm font-medium text-primary">{tr("Flagship case study", "Leuchtturm-Fallstudie")}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground mb-4">
            {tr("Atherton Bikes: recovering sieve-rejected Ti64", "Atherton Bikes: Rückgewinnung von ausgesiebtem Ti64")}
          </h2>
          <p className="text-lg text-foreground/80 max-w-3xl mx-auto">
            {tr("NCHG applied its on-site qualification technique to Ti64 powder that Atherton Bikes' standard sieving process had rejected as waste — and put half of it back into the machine.", "NCHG wendete sein Vor-Ort-Qualifizierungsverfahren auf Ti64-Pulver an, das der Standard-Siebprozess von Atherton Bikes als Abfall aussortiert hatte – und brachte die Hälfte davon zurück in die Maschine.")}
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

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild variant="hero" size="lg">
            <Link to="/contact">{tr("Book a free feedstock assessment", "Kostenlose Feedstock-Bewertung buchen")}</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <a href="/NCHG-AMRC-Ti64-10-90-report.pdf" target="_blank" rel="noopener noreferrer">
              {tr("Download the AMRC report", "AMRC-Bericht herunterladen")}
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CaseStudy;