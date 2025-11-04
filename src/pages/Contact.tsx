import { Helmet } from "react-helmet-async";
import Footer from "@/components/Footer";
import { ContactForm } from "@/components/forms/ContactForm";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import contactHero from "@/assets/contact-hero.jpg";
import { useLanguage } from "@/contexts/LanguageContext";
const Contact = () => {
  const { t } = useLanguage();
  
  return <div className="min-h-screen bg-background">
      <Helmet>
        <title>Contact NCHG - Titanium & Ti64 Solutions Experts | UK</title>
        <meta name="description" content="Contact NCHG for sustainable titanium solutions, Ti64 powder optimization, and additive manufacturing intelligence. 24-hour response time guaranteed." />
        <meta name="keywords" content="contact NCHG, titanium solutions, Ti64 powder, additive manufacturing, UK" />
      </Helmet>
      
      <main className="pt-16">
        {/* Hero Section */}
        <section className="relative py-32 px-4 overflow-hidden">
          <div className="absolute inset-0 bg-cover bg-center" style={{
            backgroundImage: `url(${contactHero})`
          }} />
          <div className="absolute inset-0 bg-primary/75" />
          <div className="container mx-auto max-w-6xl text-center relative z-10">
            <h1 className="text-4xl md:text-6xl font-display font-bold text-primary-foreground mb-6">
              {t('contact.hero.title')}
            </h1>
            <p className="text-xl text-primary-foreground/90 max-w-3xl mx-auto">{t('contact.hero.subtitle')}</p>
          </div>
        </section>

        {/* Contact Content */}
        <section className="py-24 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="grid lg:grid-cols-2 gap-12">
              
              {/* Contact Form */}
              <div>
                <h2 className="text-3xl font-display font-bold text-foreground mb-6">
                  {t('contact.form.heading')}
                </h2>
                <p className="text-muted-foreground mb-8">
                  {t('contact.form.subtitle')}
                </p>
                <ContactForm />
              </div>

              {/* Contact Information */}
              <div className="space-y-8">
                <div>
                  <h2 className="text-3xl font-display font-bold text-foreground mb-6">
                    {t('contact.info.heading')}
                  </h2>
                  <p className="text-muted-foreground mb-8">
                    {t('contact.info.subtitle')}
                  </p>
                </div>

                <div className="space-y-6">
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <Mail className="h-6 w-6 text-primary mt-1" />
                        <div>
                          <h3 className="font-semibold text-foreground mb-1">{t('contact.email.heading')}</h3>
                          <a href="mailto:claudia@nchg.co.uk" className="text-primary hover:underline">
                            claudia@nchg.co.uk
                          </a>
                          <p className="text-sm text-muted-foreground mt-1">{t('contact.email.description')}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <Phone className="h-6 w-6 text-primary mt-1" />
                        <div>
                          <h3 className="font-semibold text-foreground mb-1">{t('contact.phone.heading')}</h3>
                          <a href="tel:+447823489248" className="text-primary hover:underline">
                            +44 (0) 7823 489 248
                          </a>
                          <p className="text-sm text-muted-foreground mt-1">{t('contact.phone.hours')}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <MapPin className="h-6 w-6 text-primary mt-1" />
                        <div>
                          <h3 className="font-semibold text-foreground mb-1">{t('contact.address.heading')}</h3>
                          <p className="text-muted-foreground">
                            Over Peover, Cheshire, United Kingdom
                          </p>
                          <p className="text-sm text-muted-foreground mt-1">{t('contact.address.note')}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <Clock className="h-6 w-6 text-primary mt-1" />
                        <div>
                          <h3 className="font-semibold text-foreground mb-1">{t('contact.response.heading')}</h3>
                          <p className="text-muted-foreground">{t('contact.response.time')}</p>
                          <p className="text-sm text-muted-foreground mt-1">{t('contact.response.guarantee')}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Business Hours */}
                <div className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-xl p-6">
                  <h3 className="font-semibold text-foreground mb-4">{t('contact.hours.heading')}</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">{t('contact.hours.weekday')}</span>
                      <span className="text-foreground">{t('contact.hours.weekdayTime')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">{t('contact.hours.saturday')}</span>
                      <span className="text-foreground">{t('contact.hours.saturdayTime')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">{t('contact.hours.sunday')}</span>
                      <span className="text-foreground">{t('contact.hours.sundayTime')}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>;
};
export default Contact;