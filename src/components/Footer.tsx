import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Mail, Phone, MapPin, Linkedin } from "lucide-react";
import Logo from "@/components/Logo";
import { useLanguage } from "@/contexts/LanguageContext";


const Footer = () => {
  const { t } = useLanguage();
  
  const quickLinks = [
    { label: t('nav.home'), href: "/" },
    { label: t('nav.smartFeedstock'), href: "/smart-feedstock-solutions" },
    { label: t('nav.digitalIntelligence'), href: "/digital-manufacturing-intelligence" },
    { label: t('nav.marketplace'), href: "/marketplace-community" },
    { label: t('nav.contact'), href: "/contact" },
  ];

  const services = [
    { label: t('footer.service1'), href: "/smart-feedstock-solutions" },
    { label: t('footer.service2'), href: "/digital-manufacturing-intelligence" },
    { label: t('footer.service3'), href: "/digital-manufacturing-intelligence" },
    { label: t('footer.service4'), href: "/digital-manufacturing-intelligence" },
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
              {t('footer.description')}
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
            <h3 className="font-semibold text-lg mb-4">{t('footer.quickLinks')}</h3>
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
            <h3 className="font-semibold text-lg mb-4">{t('footer.services')}</h3>
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
            <h3 className="font-semibold text-lg mb-4">{t('footer.contact')}</h3>
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
              <h4 className="font-medium mb-3">{t('footer.stayUpdated')}</h4>
              <div className="flex space-x-2">
                <input 
                  type="email" 
                  placeholder={t('footer.emailPlaceholder')}
                  className="flex-1 px-3 py-2 bg-primary-foreground/10 border border-primary-foreground/20 rounded-md text-primary-foreground placeholder:text-primary-foreground/60 text-sm"
                />
                <Button variant="accent" size="sm">
                  {t('footer.subscribe')}
                </Button>
              </div>
            </div>
          </div>
        </div>

        <Separator className="bg-primary-foreground/20 mb-8" />

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
          <div className="text-primary-foreground/80 text-sm">
            {t('footer.copyright')}
          </div>
          <div className="flex space-x-6 text-sm">
            <a href="/privacy-policy" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
              {t('footer.privacy')}
            </a>
            <a href="/terms-of-service" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
              {t('footer.terms')}
            </a>
            <a href="/cookies-policy" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
              {t('footer.cookies')}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;