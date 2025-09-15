import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle, Factory } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const OperationalExcellenceForm = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    jobTitle: "",
    amEquipment: "",
    systemsCount: "",
    productionVolume: "",
    currentLeadTimes: "",
    mainChallenge: "",
    additionalInfo: ""
  });

  const benefits = [
    "Uptimo software demonstration and trial access",
    "Operational efficiency analysis and assessment",
    "Custom lean implementation roadmap",
    "ROI calculation specific to your operation",
    "Expert consultation on deployment strategy"
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Here you would integrate with your form handling service
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      
      toast({
        title: "Request submitted successfully!",
        description: "Our operational excellence team will contact you within 24 hours to schedule your assessment.",
      });
      
      // Reset form
      setFormData({
        name: "",
        email: "",
        company: "",
        jobTitle: "",
        amEquipment: "",
        systemsCount: "",
        productionVolume: "",
        currentLeadTimes: "",
        mainChallenge: "",
        additionalInfo: ""
      });
    } catch (error) {
      toast({
        title: "Submission failed",
        description: "Please try again or contact us directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader className="text-center">
        <div className="w-16 h-16 bg-gradient-primary rounded-xl flex items-center justify-center mb-4 mx-auto">
          <Factory className="w-8 h-8 text-primary-foreground" />
        </div>
        <CardTitle className="text-2xl font-display font-bold text-foreground">
          AM Operational Excellence Assessment
        </CardTitle>
        <CardDescription className="text-muted-foreground">
          Get instant access to Uptimo demonstration and operational efficiency analysis
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Benefits List */}
        <div className="bg-background/50 rounded-lg p-6">
          <h3 className="font-semibold text-foreground mb-4">Get Instant Access To:</h3>
          <ul className="space-y-3">
            {benefits.map((benefit, index) => (
              <li key={index} className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <span className="text-sm text-muted-foreground">{benefit}</span>
              </li>
            ))}
          </ul>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                required
                placeholder="Your full name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                required
                placeholder="your.email@company.com"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="company">Company *</Label>
              <Input
                id="company"
                value={formData.company}
                onChange={(e) => handleInputChange("company", e.target.value)}
                required
                placeholder="Company name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="jobTitle">Job Title</Label>
              <Input
                id="jobTitle"
                value={formData.jobTitle}
                onChange={(e) => handleInputChange("jobTitle", e.target.value)}
                placeholder="Your job title"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="amEquipment">Primary AM Equipment *</Label>
            <Select value={formData.amEquipment} onValueChange={(value) => handleInputChange("amEquipment", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select your primary AM equipment" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="renishaw">Renishaw</SelectItem>
                <SelectItem value="eos">EOS</SelectItem>
                <SelectItem value="slm-solutions">SLM Solutions</SelectItem>
                <SelectItem value="3d-systems">3D Systems</SelectItem>
                <SelectItem value="stratasys">Stratasys</SelectItem>
                <SelectItem value="markforged">Markforged</SelectItem>
                <SelectItem value="multiple">Multiple Manufacturers</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="systemsCount">Number of AM Systems</Label>
              <Select value={formData.systemsCount} onValueChange={(value) => handleInputChange("systemsCount", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select system count" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 System</SelectItem>
                  <SelectItem value="2-3">2-3 Systems</SelectItem>
                  <SelectItem value="4-10">4-10 Systems</SelectItem>
                  <SelectItem value="10+">10+ Systems</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="productionVolume">Monthly Production Volume</Label>
              <Select value={formData.productionVolume} onValueChange={(value) => handleInputChange("productionVolume", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select volume range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="<100">Less than 100 parts</SelectItem>
                  <SelectItem value="100-500">100-500 parts</SelectItem>
                  <SelectItem value="500-1000">500-1000 parts</SelectItem>
                  <SelectItem value="1000+">1000+ parts</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="currentLeadTimes">Current Lead Times</Label>
              <Select value={formData.currentLeadTimes} onValueChange={(value) => handleInputChange("currentLeadTimes", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select typical lead time" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="<1-week">Less than 1 week</SelectItem>
                  <SelectItem value="1-2-weeks">1-2 weeks</SelectItem>
                  <SelectItem value="3-4-weeks">3-4 weeks</SelectItem>
                  <SelectItem value="5-8-weeks">5-8 weeks</SelectItem>
                  <SelectItem value="8+-weeks">8+ weeks</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="mainChallenge">Main Operational Challenge</Label>
              <Select value={formData.mainChallenge} onValueChange={(value) => handleInputChange("mainChallenge", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select primary challenge" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="efficiency">Low system efficiency</SelectItem>
                  <SelectItem value="scheduling">Manual scheduling issues</SelectItem>
                  <SelectItem value="lead-times">Long lead times</SelectItem>
                  <SelectItem value="delivery">Poor on-time delivery</SelectItem>
                  <SelectItem value="quality">Quality consistency</SelectItem>
                  <SelectItem value="costs">High operational costs</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="additionalInfo">Additional Information</Label>
            <Textarea
              id="additionalInfo"
              value={formData.additionalInfo}
              onChange={(e) => handleInputChange("additionalInfo", e.target.value)}
              placeholder="Tell us more about your specific challenges or goals..."
              rows={3}
            />
          </div>

          <Button 
            type="submit" 
            size="lg" 
            className="w-full" 
            disabled={isSubmitting || !formData.name || !formData.email || !formData.company || !formData.amEquipment}
          >
            {isSubmitting ? "Submitting..." : "Access Operational Excellence Tools"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default OperationalExcellenceForm;