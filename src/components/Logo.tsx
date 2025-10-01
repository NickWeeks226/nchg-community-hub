const logo = "/lovable-uploads/ae237c9b-1f11-4428-ad49-e3f968cb7995.png";
import logoWhite from "@/assets/nchg-logo-white.svg";

interface LogoProps {
  className?: string;
  alt?: string;
  variant?: "default" | "white";
}

const Logo = ({ className = "h-10 w-auto", alt = "NCHG Limited - Sustainable Titanium Solutions", variant = "default" }: LogoProps) => {
  const logoSrc = variant === "white" ? logoWhite : logo;
  
  return (
    <img
      src={logoSrc}
      alt={alt}
      className={className}
      loading="eager"
      decoding="async"
    />
  );
};

export default Logo;