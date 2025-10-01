import { Helmet } from "react-helmet-async";
import Footer from "@/components/Footer";

const TermsOfService = () => {
  return (
    <>
      <Helmet>
        <title>Terms of Service | NCHG</title>
        <meta 
          name="description" 
          content="Terms of Service for NCHG Limited. Learn about website usage rules, disclaimers, and legal terms governing our titanium powder lifecycle solutions and digital intelligence tools." 
        />
        <link rel="canonical" href="https://www.nchg.co.uk/terms-of-service" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 max-w-4xl">
          <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
          
          <div className="prose prose-slate max-w-none space-y-8">
            <section>
              <p className="text-muted-foreground">
                <strong>Last Updated:</strong> 1 January 2025
              </p>
              <p className="mt-4">
                These Terms of Service ("Terms") govern your access to and use of the NCHG Limited website 
                (the "Site") and the services provided through it. By accessing or using the Site, you agree 
                to be bound by these Terms. If you do not agree to these Terms, please do not use the Site.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">1. About NCHG Limited</h2>
              <p>
                NCHG Limited ("NCHG", "we", "us", or "our") is a UK-based company specialising in titanium 
                powder lifecycle solutions for additive manufacturing. Our services include:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li>Ti64 powder lifecycle management and optimisation</li>
                <li>Digital intelligence tools for AM operational excellence (including Uptimo software)</li>
                <li>The Ti64 marketplace platform for powder trading and reconditioning services</li>
                <li>Ti64 mechanical properties database development</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">2. Website Usage Rules</h2>
              <p>When using the Site, you agree to:</p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li>Provide accurate, current, and complete information when submitting forms or creating accounts</li>
                <li>Maintain the security of your account credentials (if applicable)</li>
                <li>Not use the Site for any unlawful purpose or in any way that violates these Terms</li>
                <li>Not attempt to gain unauthorised access to any part of the Site, other accounts, or systems</li>
                <li>Not transmit any viruses, malware, or other malicious code</li>
                <li>Not interfere with or disrupt the Site or servers connected to the Site</li>
                <li>Not use automated systems (bots, scrapers, etc.) without our prior written consent</li>
                <li>Not misrepresent your identity or affiliation with any person or entity</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">3. Intellectual Property Rights</h2>
              <p>
                All content on the Site, including text, graphics, logos, images, software, and data compilations, 
                is the property of NCHG Limited or its content suppliers and is protected by UK and international 
                copyright, trademark, and other intellectual property laws.
              </p>
              <p className="mt-4">
                You may view, download, and print content from the Site for personal, non-commercial use only. 
                You may not modify, reproduce, distribute, or create derivative works from Site content without 
                our express written permission.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">4. Information and Content Disclaimer</h2>
              <p>
                The information provided on this Site is for general informational purposes only. While we strive 
                to keep the information accurate and up-to-date, we make no representations or warranties of any 
                kind, express or implied, about:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li>The completeness, accuracy, reliability, or suitability of the information</li>
                <li>The availability or performance of the Site</li>
                <li>The results that may be obtained from using our services</li>
              </ul>
              <p className="mt-4">
                <strong>Important:</strong> Content on this Site does not constitute a formal offer, quotation, 
                or binding agreement unless explicitly stated in a signed written contract between you and NCHG Limited. 
                Technical specifications, capabilities, and service descriptions are subject to change without notice.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">5. Limitation of Liability</h2>
              <p>
                To the fullest extent permitted by law, NCHG Limited shall not be liable for any:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li>Indirect, incidental, special, consequential, or punitive damages</li>
                <li>Loss of profits, revenue, data, or business opportunities</li>
                <li>Damages arising from your use of or inability to use the Site</li>
                <li>Damages arising from any third-party content or conduct on the Site</li>
                <li>Damages arising from unauthorised access to or alteration of your data</li>
              </ul>
              <p className="mt-4">
                Nothing in these Terms shall exclude or limit our liability for death or personal injury caused 
                by negligence, fraud or fraudulent misrepresentation, or any other liability that cannot be 
                excluded or limited under UK law.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">6. Third-Party Links and Services</h2>
              <p>
                The Site may contain links to third-party websites or services that are not owned or controlled 
                by NCHG Limited. We have no control over, and assume no responsibility for, the content, privacy 
                policies, or practices of any third-party websites or services.
              </p>
              <p className="mt-4">
                You acknowledge and agree that NCHG Limited shall not be responsible or liable, directly or 
                indirectly, for any damage or loss caused or alleged to be caused by or in connection with the 
                use of any such third-party content, goods, or services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">7. User-Generated Content (Marketplace)</h2>
              <p>
                If you participate in the Ti64 marketplace or other interactive features, you may submit content 
                such as listings, messages, or reviews. By submitting content, you:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li>Grant NCHG a non-exclusive, worldwide, royalty-free licence to use, display, and distribute your content</li>
                <li>Represent that you have all necessary rights to submit the content</li>
                <li>Agree not to submit content that is unlawful, defamatory, or infringes others' rights</li>
                <li>Acknowledge that NCHG may remove any content that violates these Terms</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">8. Service Availability and Modifications</h2>
              <p>
                We reserve the right to:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li>Modify, suspend, or discontinue any part of the Site or services at any time</li>
                <li>Update these Terms at any time (changes will be posted on this page)</li>
                <li>Restrict or terminate your access to the Site if you violate these Terms</li>
              </ul>
              <p className="mt-4">
                We are not liable for any modification, suspension, or discontinuation of the Site or services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">9. Privacy and Data Protection</h2>
              <p>
                Your use of the Site is also governed by our <a href="/privacy-policy" className="text-primary hover:underline">Privacy Policy</a>, 
                which explains how we collect, use, and protect your personal data in accordance with UK GDPR and 
                the Data Protection Act 2018.
              </p>
              <p className="mt-4">
                For information about our use of cookies, please see our <a href="/cookies-policy" className="text-primary hover:underline">Cookie Policy</a>.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">10. Governing Law and Jurisdiction</h2>
              <p>
                These Terms shall be governed by and construed in accordance with the laws of England and Wales. 
                Any disputes arising from or relating to these Terms or your use of the Site shall be subject to 
                the exclusive jurisdiction of the courts of England and Wales.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">11. Severability</h2>
              <p>
                If any provision of these Terms is found to be unenforceable or invalid under applicable law, 
                such provision shall be modified to the minimum extent necessary to make it enforceable or, 
                if not possible, severed from these Terms. The remaining provisions shall continue in full 
                force and effect.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">12. Entire Agreement</h2>
              <p>
                These Terms, together with our Privacy Policy and Cookie Policy, constitute the entire agreement 
                between you and NCHG Limited regarding your use of the Site and supersede any prior agreements 
                or understandings.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">13. Contact Information</h2>
              <p>
                If you have any questions about these Terms of Service, please contact us:
              </p>
              <div className="mt-4 p-6 bg-muted/30 rounded-lg">
                <p className="font-semibold">NCHG Limited</p>
                <p className="mt-2">Email: <a href="mailto:claudia@nchg.co.uk" className="text-primary hover:underline">claudia@nchg.co.uk</a></p>
                <p>Address: Over Peover, Cheshire, United Kingdom</p>
              </div>
            </section>

            <section className="border-t pt-8 mt-12">
              <p className="text-sm text-muted-foreground italic">
                By continuing to use this Site, you acknowledge that you have read, understood, and agree to be 
                bound by these Terms of Service.
              </p>
            </section>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default TermsOfService;