import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle, Database } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Ti64DatabaseForm = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    jobTitle: "",
    ti64UsageStage: "",
    applications: "",
    designChallenges: "",
    dataSharingPreference: "",
    currentDevelopmentCycle: "",
    additionalInfo: ""
  });

  const benefits = [
    "Ti64 performance database trial access",
    "Design allowables evaluation for your applications",
    "Performance benchmarking analysis",
    "Custom data integration assessment",
    "Material optimisation consultation"
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Submit to edge function
      const response = await fetch(`https://zvrnwhjiomtraaphfzmk.supabase.co/functions/v1/process-form-submission`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          formType: 'ti64-database',
          formData: formData,
          customerEmail: formData.email,
          customerName: formData.name
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit form');
      }
      
      toast({
        title: "Request submitted successfully!",
        description: "Our Ti64 database team will contact you within 24 hours to provide access and consultation.",
      });
      
      // Reset form
      setFormData({
        name: "",
        email: "",
        company: "",
        jobTitle: "",
        ti64UsageStage: "",
        applications: "",
        designChallenges: "",
        dataSharingPreference: "",
        currentDevelopmentCycle: "",
        additionalInfo: ""
      });
    } catch (error) {
      console.error('Error submitting form:', error);
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
          <Database className="w-8 h-8 text-primary-foreground" />
        </div>
        <CardTitle className="text-2xl font-display font-bold text-foreground">
          Ti64 Performance Database Access
        </CardTitle>
        <CardDescription className="text-muted-foreground">
          Get instant access to comprehensive Ti64 mechanical property data and design allowables
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
            <Label htmlFor="ti64UsageStage">Ti64 Usage Stage *</Label>
            <Select value={formData.ti64UsageStage} onValueChange={(value) => handleInputChange("ti64UsageStage", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select your current Ti64 usage stage" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="research">Research & Development</SelectItem>
                <SelectItem value="prototyping">Prototyping</SelectItem>
                <SelectItem value="qualification">Material Qualification</SelectItem>
                <SelectItem value="production">Small-scale Production</SelectItem>
                <SelectItem value="full-production">Full Production</SelectItem>
                <SelectItem value="evaluation">Evaluating Ti64 adoption</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="applications">Primary Applications</Label>
              <Select value={formData.applications} onValueChange={(value) => handleInputChange("applications", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select primary application" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="aerospace">Aerospace Components</SelectItem>
                  <SelectItem value="medical">Medical Devices</SelectItem>
                  <SelectItem value="automotive">Automotive</SelectItem>
                  <SelectItem value="marine">Marine Applications</SelectItem>
                  <SelectItem value="industrial">Industrial Equipment</SelectItem>
                  <SelectItem value="research">Research Applications</SelectItem>
                  <SelectItem value="multiple">Multiple Applications</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="designChallenges">Main Design Challenge</Label>
              <Select value={formData.designChallenges} onValueChange={(value) => handleInputChange("designChallenges", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select main challenge" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="allowables">Design allowables definition</SelectItem>
                  <SelectItem value="fatigue">Fatigue performance</SelectItem>
                  <SelectItem value="strength">Mechanical strength</SelectItem>
                  <SelectItem value="qualification">Material qualification</SelectItem>
                  <SelectItem value="optimization">Process optimisation</SelectItem>
                  <SelectItem value="consistency">Property consistency</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="dataSharingPreference">Data Sharing Preference</Label>
              <Select value={formData.dataSharingPreference} onValueChange={(value) => handleInputChange("dataSharingPreference", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select preference" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="private">Private access only</SelectItem>
                  <SelectItem value="shared">Shared database participation</SelectItem>
                  <SelectItem value="contribute">Willing to contribute data</SelectItem>
                  <SelectItem value="discuss">Discuss options</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="currentDevelopmentCycle">Current Development Cycle</Label>
              <Select value={formData.currentDevelopmentCycle} onValueChange={(value) => handleInputChange("currentDevelopmentCycle", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select cycle time" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="<1-week">Less than 1 week</SelectItem>
                  <SelectItem value="1-2-weeks">1-2 weeks</SelectItem>
                  <SelectItem value="3-4-weeks">3-4 weeks</SelectItem>
                  <SelectItem value="5-8-weeks">5-8 weeks</SelectItem>
                  <SelectItem value="8+-weeks">8+ weeks</SelectItem>
                  <SelectItem value="months">Multiple months</SelectItem>
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
              placeholder="Tell us more about your specific Ti64 needs or challenges..."
              rows={3}
            />
          </div>

          <Button 
            type="submit" 
            size="lg" 
            className="w-full" 
            disabled={isSubmitting || !formData.name || !formData.email || !formData.company || !formData.ti64UsageStage}
          >
            {isSubmitting ? "Submitting..." : "Access Ti64 Database"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default Ti64DatabaseForm;