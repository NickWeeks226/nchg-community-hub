import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'de';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const translations: Record<Language, Record<string, string>> = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.smartFeedstock': 'Smart Feedstock',
    'nav.digitalIntelligence': 'Digital Intelligence',
    'nav.marketplace': 'Marketplace',
    'nav.contact': 'Contact',
    'nav.signIn': 'Sign In',
    
    // Common
    'common.learnMore': 'Learn More',
    'common.getStarted': 'Get Started',
    'common.contactUs': 'Contact Us',
    
    // Hero Section
    'hero.badge': 'Sustainable Manufacturing Leader',
    'hero.headline': 'Resilient. Sustainable. British.',
    'hero.subheadline': 'Titanium solutions for a stronger, greener future.',
    'hero.para1': 'At NCHG Limited, we are committed to creating a resilient and sustainable future for British industry. By embracing the core principles of Reduce, Re-use, and Recycle, we aim to educate, empower, and connect a community of UK businesses dedicated to sustainable manufacturing.',
    'hero.para2': 'Our mission is to establish a secure, 100% UK-sourced supply of Titanium by 2030, supporting the energy and mobility sectors with reliable, environmentally conscious solutions. In doing so, we help mitigate global supply chain risks while promoting local innovation and sustainability.',
    'hero.para3': 'Join us in reshaping the future - where resilience, sustainability, and circular economy practices drive British manufacturing forward.',
    'hero.keypoint1': '100% UK Source by 2030',
    'hero.keypoint2': 'Reduce, Re-use, Recycle',
    'hero.cta1': 'Explore Our Solutions',
    'hero.cta2': 'Join the Movement',
    
    // Services Section
    'services.heading': 'What We Do',
    'services.subtitle': 'Transforming titanium manufacturing through smart feedstock optimisation, data-driven operational excellence, and the UK\'s premier Ti64 ecosystem.',
    'services.description': 'From powder lifecycle optimisation to digital manufacturing intelligence and sustainable trading - we provide comprehensive solutions for the entire Ti64 value chain.',
    'services.pillar1.title': 'Smart Feedstock Solutions',
    'services.pillar1.tagline': 'Maximise powder ROI & lifecycle value',
    'services.pillar1.description': 'Expert feedstock optimisation, lifecycle extension, and cost reduction strategies that can save up to 40% on material costs whilst extending powder life by 3-5 cycles.',
    'services.pillar1.service1': 'Feedstock Consultancy & Optimisation',
    'services.pillar1.service2': 'Commercial Viability Testing & Validation',
    'services.pillar1.service3': 'Powder Lifecycle Extension (3-5x cycles)',
    'services.pillar1.service4': 'Strategic Cost Reduction Programmes',
    'services.pillar1.results': 'Up to 40% Cost Reduction & 3-5x Lifecycle Extension',
    'services.pillar1.cta': 'Optimise Your Feedstock',
    'services.pillar2.title': 'Digital Manufacturing Intelligence',
    'services.pillar2.tagline': 'Data-driven operational excellence for AM operations',
    'services.pillar2.description': 'Comprehensive digital solutions combining advanced analytics, process optimisation, and mechanical properties databases to maximise manufacturing efficiency and quality control.',
    'services.pillar2.service1': 'Uptimo Software & Lean Consultancy',
    'services.pillar2.service2': 'Ti64 Mechanical Properties Database',
    'services.pillar2.service3': 'Process Optimisation & Analytics',
    'services.pillar2.service4': 'Quality Control Systems',
    'services.pillar2.results': '30% Efficiency Gains & Certified Data Standards',
    'services.pillar2.cta': 'Transform Your Operations',
    'services.pillar3.title': 'Ti64 Marketplace & Community',
    'services.pillar3.tagline': 'Sustainable ecosystem for trading & knowledge sharing',
    'services.pillar3.description': 'The UK\'s premier Ti64 trading platform and professional community, connecting manufacturers, suppliers, and experts in a secure, sustainable marketplace focused on circular economy principles.',
    'services.pillar3.service1': 'Secure Marketplace Platform',
    'services.pillar3.service2': 'Expert Community Network',
    'services.pillar3.service3': 'Professional Reconditioning Services',
    'services.pillar3.service4': 'Sustainability & Circular Economy Focus',
    'services.pillar3.results': 'Founding Members - Exclusive Early Access',
    'services.pillar3.cta': 'Join the Community',
    'services.cta.heading': 'Help Us Build the Future of Titanium Manufacturing',
    'services.cta.text': 'Join us in developing sustainable solutions for the titanium industry. Partner with us to shape the future of UK manufacturing.',
    'services.cta.button': 'Partner With Us',
    
    // About Section  
    'about.heading': 'About NCHG Limited',
    'about.intro1': 'NCHG Limited is driving the next generation of titanium powder innovation in the UK. Focused on sustainable Ti64 feedstock solutions, we support additive manufacturing and aerospace applications with a local, circular, and secure supply chain.',
    'about.intro2': 'Our leadership combines deep technical expertise, strategic industry insight, and a commitment to reshaping British manufacturing through collaboration, sustainability, and innovation.',
    'about.partners': 'Trusted Partners',
    'about.customers': 'Valued Customers',
    
    // Footer
    'footer.description': 'Leading provider of sustainable titanium solutions for additive manufacturing. Securing UK supply chains with eco-friendly Ti64 powder lifecycle solutions.',
    'footer.quickLinks': 'Quick Links',
    'footer.services': 'Our Services',
    'footer.contact': 'Contact Us',
    'footer.stayUpdated': 'Stay Updated',
    'footer.emailPlaceholder': 'Enter your email',
    'footer.subscribe': 'Subscribe',
    'footer.copyright': '© 2025 NCHG Limited. All rights reserved.',
    'footer.privacy': 'Privacy Policy',
    'footer.terms': 'Terms of Service',
    'footer.cookies': 'Cookie Policy',
    'footer.service1': 'Ti64 Powder Lifecycle Solutions',
    'footer.service2': 'AM Operational Excellence',
    'footer.service3': 'Ti64 Database Development',
    'footer.service4': 'Uptimo Software Implementation',
    
    // Contact Page
    'contact.hero.title': 'Get In Touch',
    'contact.hero.subtitle': 'Ready to transform your titanium manufacturing? Our experts are here to help you optimise your Ti64 processes and unlock sustainable growth opportunities.',
    'contact.form.heading': 'Send Us a Message',
    'contact.form.subtitle': 'Tell us about your project and we\'ll get back to you within 24 hours with a tailored solution.',
    'contact.info.heading': 'Contact Information',
    'contact.info.subtitle': 'Speak directly with our titanium experts and discover how we can accelerate your manufacturing success.',
    'contact.email.heading': 'Email',
    'contact.email.description': 'For all inquiries and partnerships',
    'contact.phone.heading': 'Phone',
    'contact.phone.hours': 'Monday - Friday, 9:00 AM - 6:00 PM GMT',
    'contact.address.heading': 'Address',
    'contact.address.note': 'By appointment only',
    'contact.response.heading': 'Response Time',
    'contact.response.time': 'Within 24 hours',
    'contact.response.guarantee': 'Guaranteed response to all inquiries',
    'contact.hours.heading': 'Business Hours',
    'contact.hours.weekday': 'Monday - Friday',
    'contact.hours.weekdayTime': '9:00 AM - 6:00 PM GMT',
    'contact.hours.saturday': 'Saturday',
    'contact.hours.saturdayTime': '10:00 AM - 2:00 PM GMT',
    'contact.hours.sunday': 'Sunday',
    'contact.hours.sundayTime': 'Closed',
    
    // Not Found
    'notFound.title': '404',
    'notFound.description': 'Oops! Page not found',
    'notFound.returnHome': 'Return to Home',
  },
  de: {
    // Navigation
    'nav.home': 'Startseite',
    'nav.smartFeedstock': 'Intelligente Feedstock-Lösungen',
    'nav.digitalIntelligence': 'Digitale Intelligenz',
    'nav.marketplace': 'Marktplatz',
    'nav.contact': 'Kontakt',
    'nav.signIn': 'Anmelden',
    
    // Common
    'common.learnMore': 'Mehr erfahren',
    'common.getStarted': 'Jetzt starten',
    'common.contactUs': 'Kontaktieren Sie uns',
    
    // Hero Section
    'hero.badge': 'Führend in nachhaltiger Fertigung',
    'hero.headline': 'Widerstandsfähig. Nachhaltig. Britisch.',
    'hero.subheadline': 'Titanium-Lösungen für eine stärkere, grünere Zukunft.',
    'hero.para1': 'Bei NCHG Limited sind wir der Schaffung einer widerstandsfähigen und nachhaltigen Zukunft für die britische Industrie verpflichtet. Indem wir die Kernprinzipien Reduzieren, Wiederverwenden und Recyceln umsetzen, möchten wir eine Gemeinschaft britischer Unternehmen ausbilden, stärken und verbinden, die sich der nachhaltigen Fertigung verschrieben haben.',
    'hero.para2': 'Unsere Mission ist es, bis 2030 eine sichere, zu 100 % aus Großbritannien stammende Titanversorgung zu etablieren, die den Energie- und Mobilitätssektor mit zuverlässigen, umweltbewussten Lösungen unterstützt. Dabei helfen wir, globale Lieferkettenrisiken zu mindern und gleichzeitig lokale Innovation und Nachhaltigkeit zu fördern.',
    'hero.para3': 'Gestalten Sie mit uns die Zukunft – wo Widerstandsfähigkeit, Nachhaltigkeit und Kreislaufwirtschaftspraktiken die britische Fertigung vorantreiben.',
    'hero.keypoint1': '100 % aus Großbritannien bis 2030',
    'hero.keypoint2': 'Reduzieren, Wiederverwenden, Recyceln',
    'hero.cta1': 'Unsere Lösungen erkunden',
    'hero.cta2': 'Werden Sie Teil der Bewegung',
    
    // Services Section
    'services.heading': 'Was wir tun',
    'services.subtitle': 'Transformation der Titanfertigung durch intelligente Feedstock-Optimierung, datengetriebene operative Exzellenz und das führende Ti64-Ökosystem Großbritanniens.',
    'services.description': 'Von Pulver-Lebenszyklus-Optimierung über digitale Fertigungsintelligenz bis hin zu nachhaltigem Handel – wir bieten umfassende Lösungen für die gesamte Ti64-Wertschöpfungskette.',
    'services.pillar1.title': 'Intelligente Feedstock-Lösungen',
    'services.pillar1.tagline': 'ROI und Lebenszyklus-Wert des Pulvers maximieren',
    'services.pillar1.description': 'Experten-Feedstock-Optimierung, Lebenszyklus-Verlängerung und Kostenreduzierungsstrategien, die bis zu 40 % der Materialkosten einsparen und die Pulverlebensdauer um das 3- bis 5-Fache verlängern können.',
    'services.pillar1.service1': 'Feedstock-Beratung & Optimierung',
    'services.pillar1.service2': 'Tests zur kommerziellen Machbarkeit & Validierung',
    'services.pillar1.service3': 'Pulver-Lebenszyklus-Verlängerung (3- bis 5-fach)',
    'services.pillar1.service4': 'Strategische Kostenreduzierungsprogramme',
    'services.pillar1.results': 'Bis zu 40 % Kostenreduzierung & 3- bis 5-fache Lebenszyklus-Verlängerung',
    'services.pillar1.cta': 'Optimieren Sie Ihr Feedstock',
    'services.pillar2.title': 'Digitale Fertigungsintelligenz',
    'services.pillar2.tagline': 'Datengetriebene operative Exzellenz für AM-Operationen',
    'services.pillar2.description': 'Umfassende digitale Lösungen, die erweiterte Analytik, Prozessoptimierung und mechanische Eigenschaften-Datenbanken kombinieren, um Fertigungseffizienz und Qualitätskontrolle zu maximieren.',
    'services.pillar2.service1': 'Uptimo-Software & Lean-Beratung',
    'services.pillar2.service2': 'Ti64-Datenbank für mechanische Eigenschaften',
    'services.pillar2.service3': 'Prozessoptimierung & Analytik',
    'services.pillar2.service4': 'Qualitätskontrollsysteme',
    'services.pillar2.results': '30 % Effizienzsteigerung & zertifizierte Datenstandards',
    'services.pillar2.cta': 'Transformieren Sie Ihre Operationen',
    'services.pillar3.title': 'Ti64-Marktplatz & Community',
    'services.pillar3.tagline': 'Nachhaltiges Ökosystem für Handel & Wissensaustausch',
    'services.pillar3.description': 'Die führende Ti64-Handelsplattform und professionelle Community Großbritanniens, die Hersteller, Lieferanten und Experten auf einem sicheren, nachhaltigen Marktplatz mit Fokus auf Kreislaufwirtschaft verbindet.',
    'services.pillar3.service1': 'Sichere Marktplatz-Plattform',
    'services.pillar3.service2': 'Experten-Community-Netzwerk',
    'services.pillar3.service3': 'Professionelle Aufbereitungsdienste',
    'services.pillar3.service4': 'Nachhaltigkeit & Fokus auf Kreislaufwirtschaft',
    'services.pillar3.results': 'Gründungsmitglieder - Exklusiver Frühzugang',
    'services.pillar3.cta': 'Treten Sie der Community bei',
    'services.cta.heading': 'Helfen Sie uns, die Zukunft der Titanfertigung zu gestalten',
    'services.cta.text': 'Entwickeln Sie mit uns nachhaltige Lösungen für die Titanindustrie. Werden Sie unser Partner und gestalten Sie die Zukunft der britischen Fertigung.',
    'services.cta.button': 'Werden Sie unser Partner',
    
    // About Section
    'about.heading': 'Über NCHG Limited',
    'about.intro1': 'NCHG Limited treibt die nächste Generation der Titanpulver-Innovation in Großbritannien voran. Mit Fokus auf nachhaltige Ti64-Feedstock-Lösungen unterstützen wir additive Fertigung und Luft- und Raumfahrtanwendungen mit einer lokalen, zirkulären und sicheren Lieferkette.',
    'about.intro2': 'Unsere Führung vereint tiefe technische Expertise, strategischen Brancheneinblick und das Engagement, die britische Fertigung durch Zusammenarbeit, Nachhaltigkeit und Innovation neu zu gestalten.',
    'about.partners': 'Vertrauenswürdige Partner',
    'about.customers': 'Geschätzte Kunden',
    
    // Footer
    'footer.description': 'Führender Anbieter nachhaltiger Titanium-Lösungen für additive Fertigung. Sicherung britischer Lieferketten mit umweltfreundlichen Ti64-Pulver-Lebenszyklus-Lösungen.',
    'footer.quickLinks': 'Schnellzugriff',
    'footer.services': 'Unsere Dienstleistungen',
    'footer.contact': 'Kontaktieren Sie uns',
    'footer.stayUpdated': 'Auf dem Laufenden bleiben',
    'footer.emailPlaceholder': 'Geben Sie Ihre E-Mail ein',
    'footer.subscribe': 'Abonnieren',
    'footer.copyright': '© 2025 NCHG Limited. Alle Rechte vorbehalten.',
    'footer.privacy': 'Datenschutzrichtlinie',
    'footer.terms': 'Nutzungsbedingungen',
    'footer.cookies': 'Cookie-Richtlinie',
    'footer.service1': 'Ti64-Pulver-Lebenszyklus-Lösungen',
    'footer.service2': 'AM Operative Exzellenz',
    'footer.service3': 'Ti64-Datenbankentwicklung',
    'footer.service4': 'Uptimo-Software-Implementierung',
    
    // Contact Page
    'contact.hero.title': 'Kontaktieren Sie uns',
    'contact.hero.subtitle': 'Bereit, Ihre Titanfertigung zu transformieren? Unsere Experten helfen Ihnen gerne, Ihre Ti64-Prozesse zu optimieren und nachhaltige Wachstumschancen zu erschließen.',
    'contact.form.heading': 'Senden Sie uns eine Nachricht',
    'contact.form.subtitle': 'Erzählen Sie uns von Ihrem Projekt und wir melden uns innerhalb von 24 Stunden mit einer maßgeschneiderten Lösung bei Ihnen.',
    'contact.info.heading': 'Kontaktinformationen',
    'contact.info.subtitle': 'Sprechen Sie direkt mit unseren Titanium-Experten und entdecken Sie, wie wir Ihren Fertigungserfolg beschleunigen können.',
    'contact.email.heading': 'E-Mail',
    'contact.email.description': 'Für alle Anfragen und Partnerschaften',
    'contact.phone.heading': 'Telefon',
    'contact.phone.hours': 'Montag - Freitag, 9:00 - 18:00 Uhr GMT',
    'contact.address.heading': 'Adresse',
    'contact.address.note': 'Nur nach Vereinbarung',
    'contact.response.heading': 'Antwortzeit',
    'contact.response.time': 'Innerhalb von 24 Stunden',
    'contact.response.guarantee': 'Garantierte Antwort auf alle Anfragen',
    'contact.hours.heading': 'Geschäftszeiten',
    'contact.hours.weekday': 'Montag - Freitag',
    'contact.hours.weekdayTime': '9:00 - 18:00 Uhr GMT',
    'contact.hours.saturday': 'Samstag',
    'contact.hours.saturdayTime': '10:00 - 14:00 Uhr GMT',
    'contact.hours.sunday': 'Sonntag',
    'contact.hours.sundayTime': 'Geschlossen',
    
    // Not Found
    'notFound.title': '404',
    'notFound.description': 'Hoppla! Seite nicht gefunden',
    'notFound.returnHome': 'Zurück zur Startseite',
  },
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('language');
    return (saved === 'de' ? 'de' : 'en') as Language;
  });

  useEffect(() => {
    localStorage.setItem('language', language);
    document.documentElement.lang = language;
  }, [language]);

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
