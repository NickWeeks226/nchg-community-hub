import { Button } from "@/components/ui/button";
import { ArrowRight, PoundSterling, Leaf } from "lucide-react";
import heroImage from "@/assets/hero-titanium.jpg";
import { Link } from "react-router-dom";

import { useLanguage } from "@/contexts/LanguageContext";

const Hero = () => {
  const { tr } = useLanguage();
  return (
    <section id="home" className="relative min-h-[85vh] flex items-center overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Titanium powder for laser powder bed fusion additive manufacturing"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/85 to-background/60"></div>
      </div>

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="max-w-4xl">
          <div className="inline-flex items-center space-x-2 bg-primary/10 border border-primary/20 rounded-lg px-4 py-2 mb-6">
            <PoundSterling className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">{tr("Ti64 feedstock, cost and carbon savings", "Ti64-Feedstock: Kosten- und CO₂-Einsparungen")}</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-foreground mb-6 leading-tight">
            {tr("Cut cost. Cut waste. Cut carbon.", "Weniger Kosten. Weniger Abfall. Weniger CO₂.")}
          </h1>

          <p className="text-xl sm:text-2xl text-foreground/90 mb-6 max-w-3xl leading-relaxed font-medium">
            {tr("NCHG helps UK and European aerospace and advanced manufacturing operators get more value out of their titanium powder — and their scrap.", "NCHG hilft Betreibern aus der britischen und europäischen Luft- und Raumfahrt sowie der fortschrittlichen Fertigung, mehr Wert aus ihrem Titanpulver – und ihrem Schrott – zu holen.")}
          </p>

          <p className="text-lg text-foreground/90 mb-10 max-w-3xl leading-relaxed">
            {tr("Book a free Ti64 feedstock assessment and we'll show you where the savings are: in your feedstock spec, your sieve waste, and your scrap.", "Buchen Sie eine kostenlose Ti64-Feedstock-Bewertung und wir zeigen Ihnen, wo die Einsparungen liegen: in Ihrer Feedstock-Spezifikation, Ihrem Siebabfall und Ihrem Schrott.")}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-10">
            <Button asChild variant="default" size="lg" className="group">
              <Link to="/contact">
                {tr("Book a free feedstock assessment", "Kostenlose Feedstock-Bewertung buchen")}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <a href="#case-study">{tr("See the Atherton Bikes case study", "Fallstudie Atherton Bikes ansehen")}</a>
            </Button>
            <Button asChild variant="outline" size="lg">
              <a href="/NCHG-AMRC-Ti64-10-90-report.pdf" target="_blank" rel="noopener noreferrer">
                {tr("Download the AMRC report", "AMRC-Bericht herunterladen")}
              </a>
            </Button>
          </div>

          <div className="flex flex-col sm:flex-row gap-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <PoundSterling className="w-5 h-5 text-primary" />
              </div>
              <span className="text-foreground font-medium">{tr("Up to 26% lower feedstock cost", "Bis zu 26% niedrigere Feedstock-Kosten")}</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <Leaf className="w-5 h-5 text-primary" />
              </div>
              <span className="text-foreground font-medium">{tr("4.8 tonnes CO₂ avoided at Atherton Bikes", "4,8 Tonnen CO₂ bei Atherton Bikes vermieden")}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
