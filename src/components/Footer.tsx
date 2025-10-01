import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Mail, Phone, MapPin, Linkedin } from "lucide-react";
import Logo from "@/components/Logo";


const Footer = () => {
  
  const quickLinks = [
    { label: "Home", href: "/" },
    { label: "Smart Feedstock", href: "/smart-feedstock-solutions" },
    { label: "Digital Intelligence", href: "/digital-manufacturing-intelligence" },
    { label: "Marketplace", href: "/marketplace-community" },
    { label: "Contact", href: "/contact" },
  ];

  const services = [
    { label: "Ti64 Powder Lifecycle Solutions", href: "/smart-feedstock-solutions" },
    { label: "AM Operational Excellence", href: "/digital-manufacturing-intelligence" },
    { label: "Ti64 Database Development", href: "/digital-manufacturing-intelligence" },
    { label: "Uptimo Software Implementation", href: "/digital-manufacturing-intelligence" },
  ];

  const contact = [
    { icon: Mail, label: "claudia@nchg.co.uk", href: "mailto:claudia@nchg.co.uk", isLink: true },
    { icon: Phone, label: "+44 (0) 7823 489 248", href: "tel:+447823489248", isLink: true },
    { icon: MapPin, label: "Over Peover, Cheshire, United Kingdom", isLink: false },
  ];

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-6">
              <Logo variant="white" className="h-12 w-auto md:h-14" />
            </div>
            <p className="text-primary-foreground/80 mb-6">
              Leading provider of sustainable titanium solutions for additive manufacturing. 
              Securing UK supply chains with eco-friendly Ti64 powder lifecycle solutions.
            </p>
            <div className="flex space-x-4">
              <Button 
                variant="ghost" 
                size="icon" 
                className="text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10"
                asChild
              >
                <a 
                  href="https://www.linkedin.com/company/nchg-limited" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  aria-label="Visit NCHG Limited on LinkedIn"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href}
                    className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Our Services</h3>
            <ul className="space-y-3">
              {services.map((service, index) => (
                <li key={index}>
                  <a 
                    href={service.href}
                    className="text-primary-foreground/80 hover:text-primary-foreground transition-colors text-sm"
                  >
                    {service.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Contact Us</h3>
            <div className="space-y-4">
              {contact.map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <div key={index} className="flex items-center space-x-3">
                    <IconComponent className="w-5 h-5 text-primary-foreground/80" />
                    {item.isLink ? (
                      <a 
                        href={item.href}
                        className="text-primary-foreground/80 hover:text-primary-foreground text-sm transition-colors"
                      >
                        {item.label}
                      </a>
                    ) : (
                      <span className="text-primary-foreground/80 text-sm">
                        {item.label}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
            
            <div className="mt-6">
              <h4 className="font-medium mb-3">Stay Updated</h4>
              <div className="flex space-x-2">
                <input 
                  type="email" 
                  placeholder="Enter your email"
                  className="flex-1 px-3 py-2 bg-primary-foreground/10 border border-primary-foreground/20 rounded-md text-primary-foreground placeholder:text-primary-foreground/60 text-sm"
                />
                <Button variant="accent" size="sm">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
        </div>

        <Separator className="bg-primary-foreground/20 mb-8" />

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
          <div className="text-primary-foreground/80 text-sm">
            © 2025 NCHG Limited. All rights reserved.
          </div>
          <div className="flex space-x-6 text-sm">
            <a href="/privacy-policy" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
              Privacy Policy
            </a>
            <a href="/terms-of-service" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
              Terms of Service
            </a>
            <a href="/cookies-policy" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;