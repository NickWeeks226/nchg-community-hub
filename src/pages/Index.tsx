import { Helmet } from "react-helmet-async";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import CaseStudy from "@/components/CaseStudy";
import TrustSignals from "@/components/TrustSignals";
import About from "@/components/About";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>NCHG — Cut cost and carbon from your Ti64 feedstock</title>
        <meta
          name="description"
          content="NCHG qualifies wider-spec Ti64 feedstock, recovers sieve-rejected powder, and brokers your scrap to the highest-value recycler. Book a free feedstock assessment."
        />
        <meta name="keywords" content="Ti64, titanium powder, LPBF, additive manufacturing, feedstock qualification, powder recovery, titanium scrap recycling, UK aerospace AM" />
        <link rel="canonical" href="/" />
        <meta property="og:title" content="NCHG — Cut cost and carbon from your Ti64 feedstock" />
        <meta property="og:description" content="Qualify wider-spec Ti64 feedstock, recover sieve-rejected powder, and route your scrap to the highest-value recycler." />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>
      <main>
        <Hero />
        <Services />
        <CaseStudy />
        <TrustSignals />
        <About />

        <section className="py-20 px-4 bg-primary text-primary-foreground">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-3xl sm:text-4xl font-display font-bold mb-4">
              Book a free Ti64 feedstock assessment
            </h2>
            <p className="text-lg text-primary-foreground/85 mb-8 max-w-2xl mx-auto">
              We'll show you where the savings are — in your feedstock spec, your sieve waste, or your scrap.
            </p>
            <Button asChild variant="secondary" size="lg">
              <Link to="/contact">Get in touch</Link>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
