import { useState, useEffect } from "react";
import { toast } from "sonner";

interface LogoProps {
  className?: string;
  alt?: string;
}

const FALLBACK_LOGO = "/lovable-uploads/d9e642ee-b3a2-4378-a81d-6c44d135bafb.png";
const PRIMARY_LOGO = "/logo.png";
const VERSION_KEY = "logo-version";

const Logo = ({ className = "h-10 w-auto", alt = "NCHG Limited - Sustainable Titanium Solutions" }: LogoProps) => {
  const [logoSrc, setLogoSrc] = useState(() => {
    // Check if we've already determined the working logo
    const stored = sessionStorage.getItem(VERSION_KEY);
    return stored === "fallback" ? FALLBACK_LOGO : PRIMARY_LOGO;
  });
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    const verifyLogo = async () => {
      try {
        // Create a version string for cache busting
        const version = Date.now();
        const testUrl = `${PRIMARY_LOGO}?v=${version}`;
        
        // Test image load with proper validation
        const img = new Image();
        
        const loadPromise = new Promise<boolean>((resolve) => {
          img.onload = () => {
            // Verify it's actually an image with dimensions
            if (img.naturalWidth > 0 && img.naturalHeight > 0) {
              console.log("✅ Primary logo verified and loaded successfully");
              resolve(true);
            } else {
              console.warn("❌ Primary logo loaded but has no dimensions");
              resolve(false);
            }
          };
          img.onerror = () => {
            console.warn("❌ Primary logo failed to load");
            resolve(false);
          };
        });

        img.src = testUrl;
        const isValid = await loadPromise;

        if (isValid) {
          setLogoSrc(PRIMARY_LOGO);
          sessionStorage.setItem(VERSION_KEY, "primary");
          console.log("🚀 Using primary logo:", PRIMARY_LOGO);
        } else {
          setLogoSrc(FALLBACK_LOGO);
          sessionStorage.setItem(VERSION_KEY, "fallback");
          console.warn("⚠️ Switching to fallback logo:", FALLBACK_LOGO);
          
          // Show dev notification
          if (process.env.NODE_ENV === "development") {
            toast.info("Using fallback logo - primary logo unavailable");
          }
        }
        
        setIsVerified(true);
      } catch (error) {
        console.error("❌ Logo verification failed:", error);
        setLogoSrc(FALLBACK_LOGO);
        sessionStorage.setItem(VERSION_KEY, "fallback");
        setIsVerified(true);
      }
    };

    verifyLogo();
  }, []);

  const handleImageError = () => {
    if (logoSrc !== FALLBACK_LOGO) {
      console.warn("❌ Image error occurred, switching to fallback");
      setLogoSrc(FALLBACK_LOGO);
      sessionStorage.setItem(VERSION_KEY, "fallback");
    }
  };

  const handleImageLoad = () => {
    console.log("✅ Logo rendered successfully from:", logoSrc);
  };

  if (!isVerified) {
    return (
      <div className={`${className} bg-muted animate-pulse rounded`} 
           aria-label="Loading logo..." />
    );
  }

  return (
    <img
      src={logoSrc}
      alt={alt}
      className={className}
      onError={handleImageError}
      onLoad={handleImageLoad}
    />
  );
};

export default Logo;