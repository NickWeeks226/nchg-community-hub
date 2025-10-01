import { Helmet } from "react-helmet-async";
import Footer from "@/components/Footer";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Privacy Policy | NCHG Limited</title>
        <meta name="description" content="Privacy Policy for NCHG Limited. Learn how we collect, use, and protect your personal data in compliance with GDPR and UK GDPR." />
        <link rel="canonical" href="/privacy-policy" />
      </Helmet>
      
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-24 max-w-4xl">
        <h1 className="text-4xl font-display font-bold text-foreground mb-8">Privacy Policy</h1>
        
        <div className="prose prose-slate max-w-none space-y-6 text-muted-foreground">
          <p className="text-sm text-muted-foreground">
            <strong>Last updated:</strong> {new Date().toLocaleDateString('en-GB', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">1. Introduction</h2>
            <p>
              NCHG Limited ("we", "our", or "us") is committed to protecting your personal data and respecting your privacy. 
              This Privacy Policy explains how we collect, use, and safeguard your information when you visit our website or 
              use our services, in accordance with the General Data Protection Regulation (GDPR) and UK GDPR.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">2. Data Controller</h2>
            <p>
              NCHG Limited is the data controller responsible for your personal data. If you have any questions about this 
              Privacy Policy or how we handle your data, please contact us at:
            </p>
            <div className="bg-muted/30 p-4 rounded-lg">
              <p><strong>Email:</strong> <a href="mailto:claudia@nchg.co.uk" className="text-primary hover:underline">claudia@nchg.co.uk</a></p>
              <p><strong>Address:</strong> Over Peover, Cheshire, United Kingdom</p>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">3. Information We Collect</h2>
            <p>We collect personal data that you provide to us directly through:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Contact forms:</strong> When you contact us via forms on our website, we collect your name, email address, and message content.</li>
              <li><strong>Newsletter subscriptions:</strong> Your email address when you subscribe to our updates.</li>
              <li><strong>User accounts:</strong> Information you provide when creating an account, including authentication details.</li>
            </ul>
            <p className="mt-4">We also automatically collect:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Analytics data:</strong> We use Google Analytics 4 (GA4) and Google Search Console (GSC) to understand how visitors use our website. This includes information such as pages visited, time spent on site, device type, and general location data.</li>
              <li><strong>Technical data:</strong> IP addresses, browser types, and device information for security and functionality purposes.</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">4. How We Use Your Information</h2>
            <p>We use your personal data for the following purposes:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>To respond to your enquiries and provide customer support</li>
              <li>To send you newsletters and updates (only if you've opted in)</li>
              <li>To improve our website and services through analytics</li>
              <li>To comply with legal obligations</li>
              <li>To protect our business and prevent fraud</li>
            </ul>
            <p className="mt-4">
              <strong>Legal basis:</strong> We process your data based on consent (for marketing communications), contractual necessity 
              (to provide services you've requested), legitimate interests (to improve our services and website), and legal obligations.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">5. Data Retention</h2>
            <p>We retain your personal data only for as long as necessary to fulfil the purposes outlined in this Privacy Policy:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Contact form enquiries:</strong> Up to 2 years from the date of submission</li>
              <li><strong>User accounts:</strong> Until you request deletion or your account is inactive for 3 years</li>
              <li><strong>Analytics data:</strong> Retained for 26 months in Google Analytics (standard retention period)</li>
              <li><strong>Legal compliance data:</strong> Retained as required by applicable law</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">6. Data Sharing</h2>
            <p>We do not sell your personal data. We may share your data with:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Service providers:</strong> Google (for analytics), authentication providers, and hosting services that help us operate our website</li>
              <li><strong>Legal authorities:</strong> When required by law or to protect our rights</li>
            </ul>
            <p className="mt-4">
              All third-party service providers are required to maintain appropriate security measures and process your data only as instructed by us.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">7. Your Rights Under GDPR</h2>
            <p>Under the GDPR and UK GDPR, you have the following rights:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Right of access:</strong> Request a copy of the personal data we hold about you</li>
              <li><strong>Right to rectification:</strong> Request correction of inaccurate or incomplete data</li>
              <li><strong>Right to erasure:</strong> Request deletion of your personal data ("right to be forgotten")</li>
              <li><strong>Right to restrict processing:</strong> Request that we limit how we use your data</li>
              <li><strong>Right to data portability:</strong> Receive your data in a structured, commonly used format</li>
              <li><strong>Right to object:</strong> Object to processing based on legitimate interests or for direct marketing</li>
              <li><strong>Right to withdraw consent:</strong> Where processing is based on consent, you may withdraw it at any time</li>
            </ul>
            <p className="mt-4">
              To exercise any of these rights, please contact us at <a href="mailto:claudia@nchg.co.uk" className="text-primary hover:underline"><strong>claudia@nchg.co.uk</strong></a>. 
              We will respond to your request within one month.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">8. Security</h2>
            <p>
              We implement appropriate technical and organisational measures to protect your personal data against unauthorised access, 
              alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure, and we cannot 
              guarantee absolute security.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">9. International Transfers</h2>
            <p>
              Your data may be transferred to and processed in countries outside the UK and European Economic Area (EEA). 
              Where this occurs, we ensure appropriate safeguards are in place, such as Standard Contractual Clauses approved 
              by the European Commission.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">10. Cookies</h2>
            <p>
              Our website uses cookies to enhance your browsing experience and analyse website traffic. 
              For detailed information about the cookies we use, please see our <a href="/cookies-policy" className="text-primary hover:underline">Cookies Policy</a>.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">11. Changes to This Privacy Policy</h2>
            <p>
              We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. 
              We will notify you of any significant changes by posting the updated policy on our website with a new "Last updated" date.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">12. Complaints</h2>
            <p>
              If you believe we have not handled your data in accordance with this Privacy Policy or applicable data protection laws, 
              you have the right to lodge a complaint with the UK Information Commissioner's Office (ICO):
            </p>
            <div className="bg-muted/30 p-4 rounded-lg">
              <p><strong>Website:</strong> <a href="https://ico.org.uk" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">ico.org.uk</a></p>
              <p><strong>Telephone:</strong> 0303 123 1113</p>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">13. Contact Us</h2>
            <p>
              If you have any questions, concerns, or requests regarding this Privacy Policy or how we handle your personal data, 
              please contact us at:
            </p>
            <div className="bg-muted/30 p-4 rounded-lg">
              <p><strong>Email:</strong> <a href="mailto:claudia@nchg.co.uk" className="text-primary hover:underline">claudia@nchg.co.uk</a></p>
              <p><strong>Phone:</strong> <a href="tel:+447823489248" className="text-primary hover:underline">+44 (0) 7823 489 248</a></p>
              <p><strong>Address:</strong> NCHG Limited, Over Peover, Cheshire, United Kingdom</p>
            </div>
          </section>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;