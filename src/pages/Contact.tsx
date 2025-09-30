import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ContactForm } from "@/components/forms/ContactForm";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
const Contact = () => {
  return <div className="min-h-screen bg-background">
      <Helmet>
        <title>Contact NCHG - Titanium & Ti64 Solutions Experts | UK</title>
        <meta name="description" content="Contact NCHG for sustainable titanium solutions, Ti64 powder optimization, and additive manufacturing intelligence. 24-hour response time guaranteed." />
        <meta name="keywords" content="contact NCHG, titanium solutions, Ti64 powder, additive manufacturing, UK" />
      </Helmet>
      
      <Header />
      
      <main className="pt-16">
        {/* Hero Section */}
        <section className="py-24 px-4 bg-gradient-to-br from-primary/5 to-secondary/5">
          <div className="container mx-auto max-w-6xl text-center">
            <h1 className="text-4xl md:text-6xl font-display font-bold text-foreground mb-6">
              Get In Touch
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Ready to transform your titanium manufacturing? Our experts are here to help you optimize 
              your Ti64 processes and unlock sustainable growth opportunities.
            </p>
          </div>
        </section>

        {/* Contact Content */}
        <section className="py-24 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="grid lg:grid-cols-2 gap-12">
              
              {/* Contact Form */}
              <div>
                <h2 className="text-3xl font-display font-bold text-foreground mb-6">
                  Send Us a Message
                </h2>
                <p className="text-muted-foreground mb-8">
                  Tell us about your project and we'll get back to you within 24 hours with a tailored solution.
                </p>
                <ContactForm />
              </div>

              {/* Contact Information */}
              <div className="space-y-8">
                <div>
                  <h2 className="text-3xl font-display font-bold text-foreground mb-6">
                    Contact Information
                  </h2>
                  <p className="text-muted-foreground mb-8">
                    Speak directly with our titanium experts and discover how we can accelerate your manufacturing success.
                  </p>
                </div>

                <div className="space-y-6">
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <Mail className="h-6 w-6 text-primary mt-1" />
                        <div>
                          <h3 className="font-semibold text-foreground mb-1">Email</h3>
                          <p className="text-muted-foreground">Claudia@nchg.co.uk</p>
                          <p className="text-sm text-muted-foreground mt-1">For all inquiries and partnerships</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <Phone className="h-6 w-6 text-primary mt-1" />
                        <div>
                          <h3 className="font-semibold text-foreground mb-1">Phone</h3>
                          <p className="text-muted-foreground">+44 (0) 7823 489 248</p>
                          <p className="text-sm text-muted-foreground mt-1">Monday - Friday, 9:00 AM - 6:00 PM GMT</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <MapPin className="h-6 w-6 text-primary mt-1" />
                        <div>
                          <h3 className="font-semibold text-foreground mb-1">Address</h3>
                          <p className="text-muted-foreground">
                            Over Peover, Cheshire, United Kingdom
                          </p>
                          <p className="text-sm text-muted-foreground mt-1">By appointment only</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <Clock className="h-6 w-6 text-primary mt-1" />
                        <div>
                          <h3 className="font-semibold text-foreground mb-1">Response Time</h3>
                          <p className="text-muted-foreground">Within 24 hours</p>
                          <p className="text-sm text-muted-foreground mt-1">Guaranteed response to all inquiries</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Business Hours */}
                <div className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-xl p-6">
                  <h3 className="font-semibold text-foreground mb-4">Business Hours</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Monday - Friday</span>
                      <span className="text-foreground">9:00 AM - 6:00 PM GMT</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Saturday</span>
                      <span className="text-foreground">10:00 AM - 2:00 PM GMT</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Sunday</span>
                      <span className="text-foreground">Closed</span>
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