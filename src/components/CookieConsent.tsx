import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { X, Cookie, Settings } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

const COOKIE_CONSENT_KEY = "nchg_cookie_consent";

interface CookiePreferences {
  essential: boolean;
  analytics: boolean;
  marketing: boolean;
}

const CookieConsent = () => {
  const [showBanner, setShowBanner] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    essential: true,
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    const consent = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!consent) {
      setShowBanner(true);
    } else {
      const saved = JSON.parse(consent);
      setPreferences(saved);
      applyConsent(saved);
    }
  }, []);

  const applyConsent = (prefs: CookiePreferences) => {
    // Apply Google Analytics 4 consent based on user preferences
    if (window.gtag) {
      window.gtag("consent", "update", {
        analytics_storage: prefs.analytics ? "granted" : "denied",
        ad_storage: prefs.marketing ? "granted" : "denied",
        ad_user_data: prefs.marketing ? "granted" : "denied",
        ad_personalization: prefs.marketing ? "granted" : "denied",
      });
      
      // Initialize GA4 tracking if analytics is enabled
      if (prefs.analytics) {
        window.gtag("config", "G-QZ19MYM39Z", {
          send_page_view: true,
          anonymize_ip: true,
        });
      }
    }
  };

  const savePreferences = (prefs: CookiePreferences) => {
    localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(prefs));
    setPreferences(prefs);
    applyConsent(prefs);
    setShowBanner(false);
    setShowPreferences(false);
  };

  const acceptAll = () => {
    const allAccepted = {
      essential: true,
      analytics: true,
      marketing: false,
    };
    savePreferences(allAccepted);
  };

  const saveCustomPreferences = () => {
    savePreferences(preferences);
  };

  const openPreferences = () => {
    setShowPreferences(true);
  };

  if (!showBanner) return null;

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border shadow-elegant z-50 animate-slide-up">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-start gap-3 flex-1">
              <Cookie className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
              <div className="space-y-2">
                <h3 className="font-semibold text-foreground">This Website Uses Cookies</h3>
                <p className="text-sm text-muted-foreground">
                  We use cookies to improve your experience and analyse website traffic. You can accept all cookies 
                  or manage your preferences. Essential cookies are always enabled.{" "}
                  <a href="/cookies-policy" className="text-primary hover:underline">
                    Learn more
                  </a>
                </p>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-3 items-center">
              <Button
                variant="outline"
                size="sm"
                onClick={openPreferences}
                className="gap-2"
              >
                <Settings className="h-4 w-4" />
                Manage Preferences
              </Button>
              <Button
                variant="default"
                size="sm"
                onClick={acceptAll}
              >
                Accept All
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Dialog open={showPreferences} onOpenChange={setShowPreferences}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Cookie className="h-5 w-5 text-primary" />
              Cookie Preferences
            </DialogTitle>
            <DialogDescription>
              Choose which cookies you want to allow. Essential cookies cannot be disabled as they are 
              necessary for the website to function properly.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-4">
            <div className="space-y-4">
              <div className="flex items-start justify-between gap-4 p-4 bg-muted/30 rounded-lg">
                <div className="space-y-1 flex-1">
                  <div className="flex items-center gap-2">
                    <Label className="text-base font-semibold">
                      Essential Cookies
                    </Label>
                    <Badge variant="secondary" className="text-xs">
                      Always enabled
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Required for the website to function. These cookies enable core functionality such as 
                    security, authentication, and session management.
                  </p>
                </div>
              </div>

              <div className="flex items-start justify-between gap-4 p-4 bg-muted/30 rounded-lg">
                <div className="space-y-1 flex-1">
                  <Label htmlFor="analytics" className="text-base font-semibold">
                    Analytics Cookies
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Help us understand how visitors interact with our website through Google Analytics 4. 
                    This data is used to improve our content and user experience.
                  </p>
                </div>
                <Switch
                  id="analytics"
                  checked={preferences.analytics}
                  onCheckedChange={(checked) =>
                    setPreferences({ ...preferences, analytics: checked })
                  }
                  aria-label="Analytics cookies toggle"
                  className="mt-1"
                />
              </div>

              <div className="flex items-start justify-between gap-4 p-4 bg-muted/30 rounded-lg">
                <div className="space-y-1 flex-1">
                  <div className="flex items-center gap-2">
                    <Label className="text-base font-semibold">
                      Marketing Cookies
                    </Label>
                    <Badge variant="outline" className="text-xs">
                      Not currently used
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Not currently used. If we introduce marketing cookies in the future, they would be used 
                    to deliver relevant advertisements and measure campaign effectiveness.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center pt-4 border-t">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowPreferences(false)}
              >
                Cancel
              </Button>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => savePreferences({ essential: true, analytics: false, marketing: false })}
                >
                  Essential Only
                </Button>
                <Button
                  size="sm"
                  onClick={saveCustomPreferences}
                >
                  Save Preferences
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CookieConsent;