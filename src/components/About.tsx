import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

// Leadership photos from uploads
const claudiaImg = "/lovable-uploads/5a6d4853-169b-4409-86bb-a981c827fb62.png";
const nickImg = "/lovable-uploads/985b7b3a-ebb7-4c4c-bdef-bad9ddad2998.png";
// Partner logos from uploads
const nplLogo = "/lovable-uploads/815d37d3-7968-4915-a72e-41529be11e35.png";
const powderloopLogo = "/lovable-uploads/7e9ab992-1f81-4fd5-9c1d-256c1cf4d3ce.png";
const rotidebLogo = "/lovable-uploads/64b13dc8-db49-4a83-9438-3611c66ea1b1.png";
const henryRoyceLogo = "/lovable-uploads/6c5ce2ee-ea5b-46ea-b3e3-d2eeb4811e52.png";
const partnerLogo = "/lovable-uploads/336302be-3b77-47e7-873d-d49309ba56bd.png";
// Customer logos from uploads
const athertonLogo = "/customers/customer-1.svg";
const atomikLogo = "/lovable-uploads/ee3a28a5-80b3-410e-8ba0-2ced2f5924f9.png";
const baeLogo = "/customers/customer-2.svg";
const carpenterLogo = "/lovable-uploads/ef4c232d-f9f4-4b7d-8d95-2bc8d58adbab.png";
const metalysisLogo = "/lovable-uploads/851c71bc-295f-483a-b170-f70509574e98.png";
const sheffieldLogo = "/customers/customer-3.svg";

const About = () => {
  const leadership = [
    {
      name: "Claudia",
      role: "Director",
      image: claudiaImg,
      description: "Claudia brings a wealth of experience in brand development, stakeholder engagement, and relationship management. Her strength lies in connecting people, ideas, and opportunities—supporting NCHG's mission by building meaningful partnerships and raising awareness around sustainable innovation in UK manufacturing."
    },
    {
      name: "Nick",
      role: "Director", 
      image: nickImg,
      description: "Nick is a seasoned expert in additive manufacturing with extensive experience leading high-growth companies. As a former COO and director, he combines deep technical knowledge with strategic vision, driving innovation and forging strong industry partnerships. Nick's extensive network and leadership empower NCHG to deliver cutting-edge titanium solutions that advance sustainable manufacturing in the UK."
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
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-12 leading-relaxed">
            NCHG Limited is driving the next generation of titanium powder innovation in the UK. Focused on sustainable Ti64 feedstock solutions, we support additive manufacturing and aerospace applications with a local, circular, and secure supply chain.
          </p>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-12 leading-relaxed">
            Our leadership combines deep technical expertise, strategic industry insight, and a commitment to reshaping British manufacturing through collaboration, sustainability, and innovation.
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
                        console.warn(`Leadership image failed to load for ${person.name}:`, img.src);
                        img.onerror = null; img.src = person.name === "Claudia" ? "/leadership/claudia.svg" : "/placeholder.svg";
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
              <Card key={index} className="hover-lift bg-card/60 backdrop-blur-sm border-primary/10 p-4 flex items-center justify-center min-h-[120px]">
                <img 
                  src={partner.logo} 
                  alt={`${partner.name} logo`}
                  className="max-w-full max-h-20 object-contain filter transition-all duration-300 hover:scale-105"
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
              <Card key={index} className="hover-lift bg-card/60 backdrop-blur-sm border-primary/10 p-4 flex items-center justify-center min-h-[120px]">
                <img 
                  src={customer.logo} 
                  alt={`${customer.name} logo`}
                  className="max-w-full max-h-20 object-contain filter transition-all duration-300 hover:scale-105"
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