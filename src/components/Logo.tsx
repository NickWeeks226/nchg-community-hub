import { useState, useEffect } from "react";

interface LogoProps {
  className?: string;
  alt?: string;
}

const Logo = ({ className = "h-10 w-auto", alt = "NCHG Limited - Sustainable Titanium Solutions" }: LogoProps) => {
  const [logoSrc, setLogoSrc] = useState("/logo.png");
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    // Prefetch primary logo with cache busting
    const img = new Image();
    img.onload = () => {
      console.log("✅ Logo loaded successfully from:", "/logo.png");
      setLogoSrc("/logo.png");
      setLoadError(false);
    };
    img.onerror = () => {
      console.warn("❌ Primary logo failed, using fallback");
      setLogoSrc("/lovable-uploads/d9e642ee-b3a2-4378-a81d-6c44d135bafb.png");
      setLoadError(true);
    };
    img.src = `/logo.png?v=${Date.now()}`;
  }, []);

  const handleImageError = () => {
    if (!loadError) {
      console.warn("❌ Logo load error, switching to fallback");
      setLogoSrc("/lovable-uploads/d9e642ee-b3a2-4378-a81d-6c44d135bafb.png");
      setLoadError(true);
    }
  };

  const handleImageLoad = () => {
    console.log("✅ Logo displayed successfully from:", logoSrc);
  };

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