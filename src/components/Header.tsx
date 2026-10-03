import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import Logo from "@/components/Logo";
import { LanguageSelector } from "@/components/LanguageSelector";
import { useLanguage } from "@/contexts/LanguageContext";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { tr } = useLanguage();

  const navItems = [
    { label: tr("Home", "Startseite"), href: "/" },
    { label: tr("What We Do", "Leistungen"), href: "/#services" },
    { label: tr("Case Study", "Fallstudie"), href: "/#case-study" },
    { label: tr("Team", "Team"), href: "/#team" },
    { label: tr("Contact", "Kontakt"), href: "/contact" },
  ];

  const linkClass = (href: string) =>
    `${
      location.pathname === href && !location.hash
        ? "font-bold text-primary"
        : "font-medium text-foreground hover:text-primary"
    } transition-colors duration-300`;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 header-white border-b border-border/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <Logo className="h-14 w-auto md:h-16" />
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link key={item.href} to={item.href} className={linkClass(item.href)}>
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center">
            <LanguageSelector />
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </Button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden border-t border-border/50 py-4">
            <nav className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className={linkClass(item.href)}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <div className="pt-4 border-t border-border/50">
                <LanguageSelector />
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
