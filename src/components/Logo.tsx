const logos = {
  primary: "/lovable-uploads/primary-logo.png",
  white: "/lovable-uploads/logo-white-short.png",
  blue: "/lovable-uploads/logo-blue-short.png"
};

interface LogoProps {
  className?: string;
  alt?: string;
  variant?: 'primary' | 'white' | 'blue';
}

const Logo = ({ 
  className = "h-10 w-auto", 
  alt = "NCHG Limited - Sustainable Titanium Solutions",
  variant = 'primary'
}: LogoProps) => {
  return (
    <img
      src={logos[variant]}
      alt={alt}
      className={className}
      loading="eager"
      decoding="async"
    />
  );
};

export default Logo;