import { Helmet } from "react-helmet-async";
import Footer from "@/components/Footer";

const CookiesPolicy = () => {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Cookies Policy | NCHG Limited</title>
        <meta name="description" content="Cookies Policy for NCHG Limited. Learn about the cookies we use and how to manage your cookie preferences." />
        <link rel="canonical" href="/cookies-policy" />
      </Helmet>
      
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-24 max-w-4xl">
        <h1 className="text-4xl font-display font-bold text-foreground mb-8">Cookies Policy</h1>
        
        <div className="prose prose-slate max-w-none space-y-6 text-muted-foreground">
          <p className="text-sm text-muted-foreground">
            <strong>Last updated:</strong> {new Date().toLocaleDateString('en-GB', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">1. What Are Cookies?</h2>
            <p>
              Cookies are small text files that are placed on your device (computer, tablet, or mobile phone) when you visit a website. 
              They are widely used to make websites work more efficiently, provide a better user experience, and help website owners 
              understand how visitors interact with their site.
            </p>
            <p>
              Cookies can be "session" cookies (which are deleted when you close your browser) or "persistent" cookies (which remain 
              on your device for a set period or until you delete them manually).
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">2. Why We Use Cookies</h2>
            <p>We use cookies for the following purposes:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>To ensure our website functions properly and securely</li>
              <li>To remember your preferences and settings</li>
              <li>To analyse how visitors use our website and improve performance</li>
              <li>To understand which content is most valuable to our users</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">3. Types of Cookies We Use</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-2">Essential Cookies</h3>
                <p>
                  These cookies are necessary for the website to function properly. They enable core functionality such as security, 
                  authentication, and session management. Without these cookies, certain services cannot be provided.
                </p>
                <div className="bg-muted/30 p-4 rounded-lg mt-2">
                  <p><strong>Examples:</strong></p>
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    <li>Authentication cookies (to keep you logged in)</li>
                    <li>Security cookies (to detect authentication abuse)</li>
                    <li>Session cookies (to maintain your session state)</li>
                  </ul>
                  <p className="mt-2"><strong>Duration:</strong> Session or up to 1 year</p>
                  <p><strong>Can be disabled:</strong> No (required for website functionality)</p>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-foreground mb-2">Analytics Cookies</h3>
                <p>
                  These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously. 
                  We use Google Analytics 4 (GA4) to analyse website traffic and user behaviour.
                </p>
                <div className="bg-muted/30 p-4 rounded-lg mt-2">
                  <p><strong>Provider:</strong> Google Analytics 4 (GA4)</p>
                  <p><strong>Purpose:</strong></p>
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    <li>Track page views and user journeys</li>
                    <li>Measure website performance and load times</li>
                    <li>Understand which content is most popular</li>
                    <li>Identify technical issues</li>
                  </ul>
                  <p className="mt-2"><strong>Data collected:</strong> Pages visited, time on site, device type, general location, referral source</p>
                  <p><strong>Duration:</strong> Up to 2 years</p>
                  <p><strong>Can be disabled:</strong> Yes (via cookie banner or browser settings)</p>
                  <p className="mt-2">
                    <strong>More information:</strong>{" "}
                    <a href="https://policies.google.com/technologies/cookies" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                      Google's cookie policy
                    </a>
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-foreground mb-2">Performance & Functionality Cookies</h3>
                <p>
                  These cookies remember your preferences and choices to provide enhanced, more personalised features. They may also be used 
                  to track whether you've already been shown certain content.
                </p>
                <div className="bg-muted/30 p-4 rounded-lg mt-2">
                  <p><strong>Examples:</strong></p>
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    <li>Cookie consent preferences</li>
                    <li>Language preferences</li>
                    <li>Display settings (e.g., dark mode)</li>
                  </ul>
                  <p className="mt-2"><strong>Duration:</strong> Up to 1 year</p>
                  <p><strong>Can be disabled:</strong> Yes, though this may affect functionality</p>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-foreground mb-2">Marketing Cookies (Future Use)</h3>
                <p>
                  We do not currently use marketing or advertising cookies. If we decide to use them in the future, we will update this 
                  policy and request your consent. These cookies would be used to deliver relevant advertisements and measure the effectiveness 
                  of marketing campaigns.
                </p>
              </div>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">4. Google Analytics & Google Search Console</h2>
            <p>
              We use <strong>Google Analytics 4 (GA4)</strong> and <strong>Google Search Console (GSC)</strong> to understand how visitors 
              find and use our website:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Google Analytics 4:</strong> Collects anonymous data about your visit, including pages viewed, time spent on site, 
                device type, and approximate location. This helps us improve our content and user experience.
              </li>
              <li>
                <strong>Google Search Console:</strong> Helps us understand how people discover our website through search engines. 
                It provides data on search queries, click-through rates, and website performance in search results.
              </li>
            </ul>
            <p className="mt-4">
              Google processes this data on our behalf in accordance with their privacy policy. You can opt out of Google Analytics tracking 
              by using the{" "}
              <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                Google Analytics Opt-out Browser Add-on
              </a>.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">5. How to Manage Cookies</h2>
            <p>You have several options for managing cookies:</p>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Cookie Banner Preferences</h3>
                <p>
                  When you first visit our website, you'll see a cookie consent banner. You can choose to accept all cookies or manage 
                  your preferences to enable or disable specific cookie categories (except essential cookies, which are always enabled).
                </p>
                <p className="mt-2">
                  You can change your cookie preferences at any time by clicking the cookie preferences link in our website footer.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Browser Settings</h3>
                <p>
                  Most web browsers allow you to control cookies through their settings. You can typically:
                </p>
                <ul className="list-disc pl-6 space-y-1 mt-2">
                  <li>View and delete cookies</li>
                  <li>Block all cookies</li>
                  <li>Block third-party cookies</li>
                  <li>Clear cookies when you close your browser</li>
                  <li>Set exceptions for specific websites</li>
                </ul>
                <p className="mt-2">
                  Please note that blocking all cookies may affect your ability to use certain features of our website.
                </p>
                <div className="bg-muted/30 p-4 rounded-lg mt-4">
                  <p className="font-medium mb-2">Browser-specific cookie settings:</p>
                  <ul className="space-y-1">
                    <li>
                      <a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                        Google Chrome
                      </a>
                    </li>
                    <li>
                      <a href="https://support.mozilla.org/en-US/kb/enhanced-tracking-protection-firefox-desktop" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                        Mozilla Firefox
                      </a>
                    </li>
                    <li>
                      <a href="https://support.apple.com/en-gb/guide/safari/sfri11471/mac" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                        Apple Safari
                      </a>
                    </li>
                    <li>
                      <a href="https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                        Microsoft Edge
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">6. Third-Party Cookies</h2>
            <p>
              Some cookies on our website are set by third-party services that appear on our pages. We do not control these cookies, 
              and you should review the privacy policies of these third parties for more information:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                  Google Privacy Policy
                </a>
              </li>
              <li>
                <a href="https://policies.google.com/technologies/cookies" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                  Google Cookie Policy
                </a>
              </li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">7. Updates to This Cookie Policy</h2>
            <p>
              We may update this Cookie Policy from time to time to reflect changes in the cookies we use or for legal or regulatory reasons. 
              We will notify you of any significant changes by posting the updated policy on our website with a new "Last updated" date.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">8. Contact Us</h2>
            <p>
              If you have any questions about our use of cookies, please contact us at:
            </p>
            <div className="bg-muted/30 p-4 rounded-lg">
              <p><strong>Email:</strong> claudia@nchg.co.uk</p>
              <p><strong>Phone:</strong> +44 (0) 7823 489 248</p>
              <p><strong>Address:</strong> NCHG Limited, Over Peover, Cheshire, United Kingdom</p>
            </div>
            <p className="mt-4">
              For more information about how we handle your personal data, please see our{" "}
              <a href="/privacy-policy" className="text-primary hover:underline">Privacy Policy</a>.
            </p>
          </section>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CookiesPolicy;