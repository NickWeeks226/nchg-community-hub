import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Recycle, Beaker, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

const getPillars = (tr: (en: string, de: string) => string) => [
  {
    icon: CheckCircle2,
    title: tr("Qualify", "Qualifizieren"),
    tagline: tr("Adopt wider-spec feedstock", "Feedstock mit breiterer Spezifikation einsetzen"),
    description:
      tr("A gas flow assessment (reviewed with the National Physical Laboratory and Fraunhofer ILT) plus on-site mechanical testing — using a portable rig, not a 2–3 week external test house — qualifies wider particle size distribution feedstock in 4–8 weeks instead of 6–12 months.", "Eine Gasstrombewertung (geprüft mit dem National Physical Laboratory und Fraunhofer ILT) plus mechanische Prüfung vor Ort – mit einem mobilen Prüfstand statt eines externen Prüflabors mit 2–3 Wochen Vorlauf – qualifiziert Feedstock mit breiterer Partikelgrößenverteilung in 4–8 Wochen statt 6–12 Monaten."),
    points: [
      tr("Gas flow assessment reviewed with NPL and Fraunhofer ILT", "Gasstrombewertung, geprüft mit NPL und Fraunhofer ILT"),
      tr("Portable on-site mechanical testing rig", "Mobiler Prüfstand für mechanische Tests vor Ort"),
      tr("4–8 weeks vs 6–12 months to qualify", "Qualifizierung in 4–8 Wochen statt 6–12 Monaten"),
      tr("Up to 26% lower feedstock cost", "Bis zu 26% niedrigere Feedstock-Kosten"),
    ],
    badge: tr("Up to 26% lower feedstock cost", "Bis zu 26% niedrigere Feedstock-Kosten"),
  },
  {
    icon: Beaker,
    title: tr("Recover", "Rückgewinnen"),
    tagline: tr("Reclaim sieve-rejected powder", "Ausgesiebtes Pulver zurückgewinnen"),
    description:
      tr("The same qualification technique, applied to powder your standard sieving process is currently discarding as waste. At Atherton Bikes, 500–600 kg of sieve-rejected material was assessed and 50% confirmed recoverable.", "Dasselbe Qualifizierungsverfahren, angewandt auf Pulver, das Ihr Standard-Siebprozess derzeit als Abfall aussortiert. Bei Atherton Bikes wurden 500–600 kg ausgesiebtes Material bewertet und 50% als rückgewinnbar bestätigt."),
    points: [
      tr("On-site assessment of sieve-rejected material", "Vor-Ort-Bewertung von ausgesiebtem Material"),
      tr("Coupons built and mechanically tested in the machine", "Probekörper in der Maschine gebaut und mechanisch geprüft"),
      tr("£39,000 net customer value at Atherton Bikes", "£39.000 Netto-Kundennutzen bei Atherton Bikes"),
      tr("4.8 tonnes CO₂ avoided at Atherton Bikes", "4,8 Tonnen CO₂ bei Atherton Bikes vermieden"),
    ],
    badge: tr("£39,000 net value at Atherton Bikes", "£39.000 Nettonutzen bei Atherton Bikes"),
  },
  {
    icon: Recycle,
    title: tr("Recycle", "Recyceln"),
    tagline: tr("Highest-value routing for your scrap", "Höchster Erlös für Ihren Schrott"),
    description:
      tr("NCHG uses its market relationships to route your end-of-life titanium scrap to whichever recycler pays the best value for it, rather than it going to low-value disposal.", "NCHG nutzt seine Marktbeziehungen, um Ihren Titanschrott am Lebensende an den Recycler zu vermitteln, der den besten Preis zahlt – statt ihn minderwertig zu entsorgen."),
    points: [
      tr("Live scrap brokering service", "Aktiver Schrottvermittlungsservice"),
      tr("Access to NCHG's recycler network", "Zugang zum Recycler-Netzwerk von NCHG"),
      tr("Best-value route for end-of-life titanium", "Bester Verwertungsweg für Alt-Titan"),
      tr("Value returned to you, not lost to disposal", "Der Wert fließt an Sie zurück, statt bei der Entsorgung verloren zu gehen"),
    ],
    badge: tr("Best-value route for end-of-life titanium", "Bester Verwertungsweg für Alt-Titan"),
  },
];

const Services = () => {
  const { tr } = useLanguage();
  const pillars = getPillars(tr);
  return (
    <section id="services" className="scroll-mt-16 py-20 surface-gradient">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground mb-4">
            {tr("What We Do", "Leistungen")}
          </h2>
          <p className="text-xl text-foreground/90 max-w-3xl mx-auto mb-4">
            {tr("One shared technique. Two outcomes for your feedstock, plus a live service for your scrap.", "Ein gemeinsames Verfahren. Zwei Ergebnisse für Ihren Feedstock – plus ein aktiver Service für Ihren Schrott.")}
          </p>
          <p className="text-lg text-foreground/80 max-w-4xl mx-auto">
            {tr("Gas flow assessment plus on-site mechanical testing lets us qualify wider-spec feedstock or recover sieve-rejected powder in weeks, not months. Separately, we broker your end-of-life titanium scrap to the highest-value recycler in our network.", "Mit Gasstrombewertung und mechanischer Prüfung vor Ort qualifizieren wir Feedstock mit breiterer Spezifikation oder gewinnen ausgesiebtes Pulver in Wochen statt Monaten zurück. Zusätzlich vermitteln wir Ihren Titanschrott an den Recycler mit dem höchsten Erlös in unserem Netzwerk.")}
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
                      {tr("Book a free assessment", "Kostenlose Bewertung buchen")}
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
            {tr("Not sure which service fits?", "Nicht sicher, welche Leistung passt?")}
          </h3>
          <p className="text-foreground/80 mb-6 max-w-2xl mx-auto">
            {tr("Book a free Ti64 feedstock assessment and we'll show you where the savings are — in your feedstock spec, your sieve waste, or your scrap.", "Buchen Sie eine kostenlose Ti64-Feedstock-Bewertung und wir zeigen Ihnen, wo die Einsparungen liegen – in Ihrer Feedstock-Spezifikation, Ihrem Siebabfall oder Ihrem Schrott.")}
          </p>
          <Button asChild variant="hero" size="lg">
            <Link to="/contact">{tr("Book a free feedstock assessment", "Kostenlose Feedstock-Bewertung buchen")}</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Services;