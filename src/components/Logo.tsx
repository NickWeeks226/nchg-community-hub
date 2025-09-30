const logo = "/lovable-uploads/ae237c9b-1f11-4428-ad49-e3f968cb7995.png";

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