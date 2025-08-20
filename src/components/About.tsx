import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const About = () => {
  const leadership = [
    {
      name: "Claudia",
      role: "Director",
      image: "/lovable-uploads/ba88c750-f5a7-4e2d-824f-1aafce351d35.png",
      description: "Leading innovation in titanium powder solutions with extensive expertise in materials science and business development."
    },
    {
      name: "Nick",
      role: "Director", 
      image: "/lovable-uploads/ea2ef244-79c9-4cc9-9587-ae990e63995c.png",
      description: "Driving technical excellence and strategic partnerships in advanced manufacturing and powder metallurgy."
    }
  ];

  const partners = [
    {
      name: "NPL",
      logo: "/lovable-uploads/ec8306f6-c324-4d1e-896a-f8b62f29145b.png"
    },
    {
      name: "Powderloop",
      logo: "/lovable-uploads/fd733536-c5a3-4fd2-ba72-6e3eee150ea9.png"
    },
    {
      name: "Rotideb Company Limited",
      logo: "/lovable-uploads/fba5e0f2-e60b-4071-b795-a901f0028e5c.png"
    },
    {
      name: "Henry Royce Institute",
      logo: "/lovable-uploads/82ec4ace-67c6-4dd8-9d3c-f5714f92b231.png"
    },
    {
      name: "Partner",
      logo: "/lovable-uploads/50037427-6dd1-4b24-9d32-66f7ed4909dc.png"
    }
  ];

  const customers = [
    {
      name: "Customer 1",
      logo: "/lovable-uploads/d6a3b4f4-f0c8-46ea-82e6-f346c5ac02d3.png"
    },
    {
      name: "Customer 2", 
      logo: "/lovable-uploads/f9beea6f-d68e-4a90-9c46-bcf3e35cce7c.png"
    },
    {
      name: "Customer 3",
      logo: "/lovable-uploads/1e8cbd25-5e30-4b4f-91c9-c28a55b5c69e.png"
    },
    {
      name: "Customer 4",
      logo: "/lovable-uploads/10b39b8b-b86c-49c3-9f93-17b28f3b32b3.png"
    },
    {
      name: "Customer 5",
      logo: "/lovable-uploads/d2c4b1c5-62b7-4dd7-b20a-a2ef93c1af75.png"
    },
    {
      name: "Customer 6",
      logo: "/lovable-uploads/d1ffef3f-b1a1-41c3-be92-6cea6b635ac1.png"
    }
  ];

  return (
    <section id="about" className="section-padding bg-surface-gradient">
      <div className="container mx-auto">
        {/* Leadership Team */}
        <div className="text-center mb-16">
          <h2 className="heading-xl gradient-text mb-6">About NCHG Limited</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-12">
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
          <h3 className="heading-lg mb-8">Trusted Partners</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {partners.map((partner, index) => (
              <Card key={index} className="hover-lift bg-card/60 backdrop-blur-sm border-primary/10 p-6 flex items-center justify-center min-h-[120px]">
                <img 
                  src={partner.logo} 
                  alt={`${partner.name} logo`}
                  className="max-w-full max-h-16 object-contain filter transition-all duration-300 hover:scale-105"
                />
              </Card>
            ))}
          </div>
        </div>

        {/* Customers Section */}
        <div className="text-center">
          <h3 className="heading-lg mb-8">Valued Customers</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {customers.map((customer, index) => (
              <Card key={index} className="hover-lift bg-card/60 backdrop-blur-sm border-primary/10 p-6 flex items-center justify-center min-h-[120px]">
                <img 
                  src={customer.logo} 
                  alt={`${customer.name} logo`}
                  className="max-w-full max-h-16 object-contain filter transition-all duration-300 hover:scale-105"
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