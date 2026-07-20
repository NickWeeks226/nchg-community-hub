import { Button } from "@/components/ui/button";
import { ArrowRight, PoundSterling, Leaf } from "lucide-react";
import heroImage from "@/assets/hero-titanium.jpg";
import { Link } from "react-router-dom";

const Hero = () => {
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
            <span className="text-sm font-medium text-primary">Ti64 feedstock, cost and carbon savings</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-foreground mb-6 leading-tight">
            Cut cost. Cut waste. Cut carbon.
          </h1>

          <p className="text-xl sm:text-2xl text-foreground/90 mb-6 max-w-3xl leading-relaxed font-medium">
            NCHG helps UK and European aerospace and advanced manufacturing operators get more value out of their titanium powder — and their scrap.
          </p>

          <p className="text-lg text-foreground/90 mb-10 max-w-3xl leading-relaxed">
            Book a free Ti64 feedstock assessment and we'll show you where the savings are: in your feedstock spec, your sieve waste, and your scrap.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-10">
            <Button asChild variant="default" size="lg" className="group">
              <Link to="/contact">
                Book a free feedstock assessment
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <a href="#case-study">See the Atherton Bikes case study</a>
            </Button>
          </div>

          <div className="flex flex-col sm:flex-row gap-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <PoundSterling className="w-5 h-5 text-primary" />
              </div>
              <span className="text-foreground font-medium">Up to 26% lower feedstock cost</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <Leaf className="w-5 h-5 text-primary" />
              </div>
              <span className="text-foreground font-medium">4.8 tonnes CO₂ avoided at Atherton Bikes</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
