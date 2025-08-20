import logo from "@/assets/nchg-logo.png";

interface LogoProps {
  className?: string;
  alt?: string;
}

const Logo = ({ className = "h-10 w-auto", alt = "NCHG Limited - Sustainable Titanium Solutions" }: LogoProps) => {
  return (
    <img
      src={logo}
      alt={alt}
      className={className}
      loading="eager"
      decoding="async"
    />
  );
};

export default Logo;