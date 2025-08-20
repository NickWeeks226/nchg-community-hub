import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

// Leadership photos from uploads
const claudiaImg = "/lovable-uploads/c4b97b77-1c05-4e22-890c-63def67da262.png";
const nickImg = "/lovable-uploads/985b7b3a-ebb7-4c4c-bdef-bad9ddad2998.png";
import nplLogo from "@/assets/partners/npl.svg";
import powderloopLogo from "@/assets/partners/powderloop.svg";
import rotidebLogo from "@/assets/partners/rotideb.svg";
import henryRoyceLogo from "@/assets/partners/henry-royce.svg";
import partnerLogo from "@/assets/partners/partner.svg";
// Customer logos from uploads
const athertonLogo = "/lovable-uploads/30605f4b-f121-4d4e-9f83-188e8f693c5e.png";
const atomikLogo = "/lovable-uploads/ee3a28a5-80b3-410e-8ba0-2ced2f5924f9.png";
const baeLogo = "/lovable-uploads/63f4cb82-66dd-4680-bc51-adc1faf64f8e.png";
const carpenterLogo = "/lovable-uploads/ef4c232d-f9f4-4b7d-8d95-2bc8d58adbab.png";
const metalysisLogo = "/lovable-uploads/851c71bc-295f-483a-b170-f70509574e98.png";
const sheffieldLogo = "/lovable-uploads/48fd4c6a-1153-464f-b139-8bd0f4ebe240.png";

const About = () => {
  const leadership = [
    {
      name: "Claudia",
      role: "Director",
      image: claudiaImg,
      description: "Leading innovation in titanium powder solutions with extensive expertise in materials science and business development."
    },
    {
      name: "Nick",
      role: "Director", 
      image: nickImg,
      description: "Driving technical excellence and strategic partnerships in advanced manufacturing and powder metallurgy."
    }
  ];

  const partners = [
    {
      name: "NPL",
      logo: nplLogo
    },
    {
      name: "Powderloop",
      logo: powderloopLogo
    },
    {
      name: "Rotideb Company Limited",
      logo: rotidebLogo
    },
    {
      name: "Henry Royce Institute",
      logo: henryRoyceLogo
    },
    {
      name: "Partner",
      logo: partnerLogo
    }
  ];

  const customers = [
    {
      name: "Atherton Bikes",
      logo: athertonLogo
    },
    {
      name: "Atomik", 
      logo: atomikLogo
    },
    {
      name: "BAE Systems",
      logo: baeLogo
    },
    {
      name: "Carpenter Additive",
      logo: carpenterLogo
    },
    {
      name: "Metalysis",
      logo: metalysisLogo
    },
    {
      name: "University of Sheffield",
      logo: sheffieldLogo
    }
  ];

  return (
    <section id="about" className="py-20 surface-gradient">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Leadership Team */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground mb-4">About NCHG Limited</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-12">
            NCHG Limited is at the forefront of titanium powder innovation, specializing in Ti64 powder solutions 
            for additive manufacturing and advanced aerospace applications. Our experienced leadership team brings 
            decades of expertise in materials science and manufacturing excellence.
          </p>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {leadership.map((person) => (
              <Card key={person.name} className="hover-lift bg-card/80 backdrop-blur-sm border-primary/20">
                <CardHeader className="text-center pb-4">
                  <Avatar className="w-32 h-32 mx-auto mb-4 ring-4 ring-primary/20">
                    <AvatarImage 
                      src={person.image} 
                      alt={`${person.name}, ${person.role} at NCHG Limited`}
                      className="object-cover"
                      loading="lazy"
                      decoding="async"
                      onError={(e) => {
                        const img = e.currentTarget as HTMLImageElement;
                        console.warn("Leadership image failed to load:", img.src);
                        img.src = "/placeholder.svg";
                      }}
                    />
                    <AvatarFallback className="text-2xl font-semibold bg-gradient-primary text-primary-foreground">
                      {person.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <CardTitle className="text-2xl mb-1">{person.name}</CardTitle>
                  <p className="text-primary font-medium">{person.role}</p>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-center leading-relaxed">
                    {person.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Partners Section */}
        <div className="text-center mb-16">
          <h3 className="text-2xl font-display font-semibold text-foreground mb-8">Trusted Partners</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {partners.map((partner, index) => (
              <Card key={index} className="hover-lift bg-card/60 backdrop-blur-sm border-primary/10 p-6 flex items-center justify-center min-h-[120px]">
                <img 
                  src={partner.logo} 
                  alt={`${partner.name} logo`}
                  className="max-w-full max-h-16 object-contain filter transition-all duration-300 hover:scale-105"
                  loading="lazy"
                  decoding="async"
                  onError={(e) => {
                    const img = e.currentTarget as HTMLImageElement;
                    console.warn("Partner logo failed to load:", img.src);
                    img.src = "/placeholder.svg";
                  }}
                />
              </Card>
            ))}
          </div>
        </div>

        {/* Customers Section */}
        <div className="text-center">
          <h3 className="text-2xl font-display font-semibold text-foreground mb-8">Valued Customers</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {customers.map((customer, index) => (
              <Card key={index} className="hover-lift bg-card/60 backdrop-blur-sm border-primary/10 p-6 flex items-center justify-center min-h-[120px]">
                <img 
                  src={customer.logo} 
                  alt={`${customer.name} logo`}
                  className="max-w-full max-h-16 object-contain filter transition-all duration-300 hover:scale-105"
                  loading="lazy"
                  decoding="async"
                  onError={(e) => {
                    const img = e.currentTarget as HTMLImageElement;
                    console.warn("Customer logo failed to load:", img.src);
                    img.src = "/placeholder.svg";
                  }}
                />
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;