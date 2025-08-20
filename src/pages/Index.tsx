import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import About from "@/components/About";
import Community from "@/components/Community";
import Marketplace from "@/components/Marketplace";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <Services />
        <About />
        <Community />
        <Marketplace />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
