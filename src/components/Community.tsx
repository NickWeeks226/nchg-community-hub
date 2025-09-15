import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, MessageSquare, Calendar, Trophy, TrendingUp, Globe, Lock } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { AuthModal } from "@/components/auth/AuthModal";

const Community = () => {
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const { user } = useAuth();
  const features = [
    {
      icon: MessageSquare,
      title: "Discussion Forums",
      description: "Connect with industry professionals to share knowledge and solve challenges together."
    },
    {
      icon: Calendar,
      title: "Industry Events",
      description: "Access exclusive webinars, workshops, and networking opportunities."
    },
    {
      icon: Trophy,
      title: "Best Practices",
      description: "Learn from successful case studies and proven methodologies."
    },
    {
      icon: TrendingUp,
      title: "Market Insights",
      description: "Stay updated with the latest industry trends and market developments."
    }
  ];

  const goals = [
    { label: "Target Launch", value: "Q2 2025", icon: Calendar },
    { label: "Founding Members", value: "50+", icon: Users },
    { label: "Discussion Topics", value: "Ready", icon: MessageSquare },
    { label: "Expert Network", value: "Building", icon: TrendingUp }
  ];

  return (
    <section id="community" className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-accent/10 border border-accent/20 rounded-full px-4 py-2 mb-6">
            <Users className="w-4 h-4 text-accent" />
            <span className="text-sm font-medium text-accent">Join Our Community</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground mb-4">
            Building Our Industry Community
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Join us in creating the UK's premier titanium industry community. Be a founding member 
            and help shape the future of sustainable manufacturing collaboration.
          </p>
        </div>

        {/* Launch Timeline */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {goals.map((goal, index) => {
            const IconComponent = goal.icon;
            return (
              <div key={index} className="text-center p-6 rounded-lg bg-card/50 border border-border/50">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <IconComponent className="w-6 h-6 text-primary" />
                </div>
                <div className="text-2xl font-bold text-foreground mb-1">{goal.value}</div>
                <div className="text-sm text-muted-foreground">{goal.label}</div>
              </div>
            );
          })}
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <Card key={index} className="hover-lift bg-card/80 backdrop-blur-sm border-border/50">
                <CardHeader className="flex flex-row items-center space-y-0 space-x-4">
                  <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                    <IconComponent className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <CardTitle className="text-foreground">{feature.title}</CardTitle>
                    <CardDescription className="text-muted-foreground mt-2">
                      {feature.description}
                    </CardDescription>
                  </div>
                </CardHeader>
              </Card>
            );
          })}
        </div>

        {/* Forum Preview */}
        <div className="bg-gradient-to-r from-primary/5 to-accent/5 rounded-xl p-8 mb-12">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-display font-semibold text-foreground mb-4">
              Preview: Future Community Discussions
            </h3>
            <p className="text-muted-foreground">
              These are the types of discussions our community will enable when we launch
            </p>
          </div>
          
          <div className="space-y-4 max-w-4xl mx-auto">
            {[
              {
                title: "Ti64 Powder Recycling Best Practices",
                author: "Sarah M.",
                replies: 23,
                time: "2 hours ago"
              },
              {
                title: "AM Process Parameter Optimisation",
                author: "James R.",
                replies: 18,
                time: "5 hours ago"
              },
              {
                title: "Supply Chain Sustainability Metrics",
                author: "Dr. Chen",
                replies: 31,
                time: "1 day ago"
              }
            ].map((topic, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-card/60 rounded-lg border border-border/30">
                <div className="flex-1">
                  <h4 className="font-medium text-foreground mb-1">{topic.title}</h4>
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <span>by {topic.author}</span>
                    <span>•</span>
                    <span>{topic.replies} replies</span>
                    <span>•</span>
                    <span>{topic.time}</span>
                  </div>
                </div>
                {user ? (
                  <Button variant="ghost" size="sm">
                    View
                  </Button>
                ) : (
                  <Button variant="ghost" size="sm" onClick={() => setAuthModalOpen(true)}>
                    <Lock className="w-3 h-3 mr-1" />
                    Sign In
                  </Button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <h3 className="text-2xl font-display font-semibold text-foreground mb-4">
            Become a Founding Community Member
          </h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Help us build the UK's premier titanium industry community. Founding members will 
            shape the platform and gain exclusive early access to all community features.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="hero" size="lg" onClick={() => setAuthModalOpen(true)}>
              Become a Founding Member
            </Button>
            <Button variant="outline" size="lg" onClick={() => setAuthModalOpen(true)}>
              Get Early Access
            </Button>
          </div>
        </div>
      </div>
      
      <AuthModal open={authModalOpen} onOpenChange={setAuthModalOpen} />
    </section>
  );
};

export default Community;