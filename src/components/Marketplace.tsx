import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  ShoppingCart, 
  Package, 
  Shield, 
  TrendingUp, 
  Clock, 
  CheckCircle,
  Star,
  MapPin
} from "lucide-react";

const Marketplace = () => {
  const features = [
    {
      icon: Package,
      title: "Quality Verified",
      description: "All powder listings undergo rigorous quality verification and testing."
    },
    {
      icon: Shield,
      title: "Secure Trading",
      description: "Safe and secure transactions with buyer and seller protection."
    },
    {
      icon: TrendingUp,
      title: "Market Insights",
      description: "Real-time pricing data and market trends for informed decisions."
    },
    {
      icon: Clock,
      title: "Fast Delivery",
      description: "Efficient logistics network for quick and reliable delivery."
    }
  ];

  const listings = [
    {
      id: 1,
      title: "Ti64 Grade 5 Powder",
      supplier: "Advanced Materials Ltd",
      location: "Birmingham, UK",
      quantity: "50kg",
      purity: "99.7%",
      particle: "15-45μm",
      price: "£265/kg",
      rating: 4.9,
      status: "Available",
      verified: true
    },
    {
      id: 2,
      title: "Recycled Ti64 Powder",
      supplier: "GreenTech Manufacturing",
      location: "Sheffield, UK",
      quantity: "25kg",
      purity: "99.5%",
      particle: "20-63μm",
      price: "£240/kg",
      rating: 4.7,
      status: "Low Stock",
      verified: true
    },
    {
      id: 3,
      title: "Virgin Ti64 Powder",
      supplier: "Precision Alloys",
      location: "Manchester, UK",
      quantity: "100kg",
      purity: "99.8%",
      particle: "10-45μm",
      price: "£280/kg",
      rating: 4.8,
      status: "Available",
      verified: true
    }
  ];

  return (
    <section id="marketplace" className="py-20 surface-gradient">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-success/10 border border-success/20 rounded-full px-4 py-2 mb-6">
            <ShoppingCart className="w-4 h-4 text-success" />
            <span className="text-sm font-medium text-success">Ti64 Marketplace</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground mb-4">
            Powder Marketplace
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Creating a marketplace for trading used Ti64 powder, extending material 
            lifecycle and reducing waste while connecting buyers and sellers.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <Card key={index} className="text-center hover-lift bg-card/80 backdrop-blur-sm border-border/50">
                <CardHeader>
                  <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <IconComponent className="w-6 h-6 text-success" />
                  </div>
                  <CardTitle className="text-foreground text-lg">{feature.title}</CardTitle>
                  <CardDescription className="text-muted-foreground">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            );
          })}
        </div>

        {/* Marketplace Listings */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-display font-semibold text-foreground">
              Featured Listings
            </h3>
            <Button variant="outline">
              View All Listings
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {listings.map((listing) => (
              <Card key={listing.id} className="hover-lift bg-card/80 backdrop-blur-sm border-border/50">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg mb-2 text-foreground">{listing.title}</CardTitle>
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="text-sm text-muted-foreground">{listing.supplier}</span>
                        {listing.verified && (
                          <CheckCircle className="w-4 h-4 text-success" />
                        )}
                      </div>
                      <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                        <MapPin className="w-3 h-3" />
                        <span>{listing.location}</span>
                      </div>
                    </div>
                    <Badge 
                      variant={listing.status === "Available" ? "default" : "secondary"}
                      className={listing.status === "Available" ? "bg-success/10 text-success border-success/20" : ""}
                    >
                      {listing.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Quantity:</span>
                      <span className="font-medium text-foreground">{listing.quantity}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Purity:</span>
                      <span className="font-medium text-foreground">{listing.purity}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Particle Size:</span>
                      <span className="font-medium text-foreground">{listing.particle}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground text-sm">Rating:</span>
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 fill-accent text-accent" />
                        <span className="font-medium text-foreground">{listing.rating}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border-t border-border/50 pt-4">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-2xl font-bold text-foreground">{listing.price}</span>
                    </div>
                    <Button variant="default" className="w-full">
                      Contact Supplier
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-success/5 to-primary/5 rounded-xl p-8 text-center">
          <h3 className="text-2xl font-display font-semibold text-foreground mb-4">
            Start Trading on Our Marketplace
          </h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Whether you're looking to buy quality Ti64 powder or sell your surplus materials, 
            our marketplace connects you with verified suppliers and buyers across the UK.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="hero" size="lg">
              List Your Materials
            </Button>
            <Button variant="outline" size="lg">
              Browse Marketplace
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Marketplace;