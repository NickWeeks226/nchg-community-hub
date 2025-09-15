import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { toast } from "sonner";
import { ShoppingCart, TrendingUp, MapPin } from "lucide-react";

const marketplaceSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  company: z.string().min(2, "Company name is required"),
  jobTitle: z.string().min(2, "Job title is required"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  tradingInterest: z.enum(["Buyer", "Seller", "Both"]),
  estimatedVolume: z.enum(["< 100kg/year", "100-500kg/year", "500-1000kg/year", "1000-5000kg/year", "5000kg+/year"]),
  geographicFocus: z.string().min(2, "Geographic focus is required"),
  materialRequirements: z.string().min(20, "Please describe your material requirements"),
  currentChallenges: z.string().min(20, "Please describe your current supply chain challenges"),
});

type MarketplaceFormData = z.infer<typeof marketplaceSchema>;

interface MarketplaceEarlyAccessFormProps {
  onClose?: () => void;
}

const MarketplaceEarlyAccessForm = ({ onClose }: MarketplaceEarlyAccessFormProps) => {
  const form = useForm<MarketplaceFormData>({
    resolver: zodResolver(marketplaceSchema),
  });

  const onSubmit = async (data: MarketplaceFormData) => {
    try {
      console.log("Marketplace early access request:", data);
      toast.success("Early access request submitted! We'll contact you when the marketplace launches.");
      form.reset();
      onClose?.();
    } catch (error) {
      toast.error("Failed to submit request. Please try again.");
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
          <ShoppingCart className="w-8 h-8 text-primary-foreground" />
        </div>
        <h3 className="text-2xl font-display font-bold text-foreground">
          Marketplace Early Access
        </h3>
        <p className="text-muted-foreground">
          Get priority access to the UK's premier Ti64 trading platform
        </p>
        <div className="flex items-center justify-center space-x-4 text-sm text-primary font-medium">
          <span className="flex items-center">
            <TrendingUp className="w-4 h-4 mr-1" />
            Launching 2025
          </span>
          <span className="flex items-center">
            <MapPin className="w-4 h-4 mr-1" />
            UK focused
          </span>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Your first name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Your last name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email Address</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="your.email@company.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="company"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company</FormLabel>
                  <FormControl>
                    <Input placeholder="Your company name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="jobTitle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Job Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Your position" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input placeholder="+44 123 456 7890" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="tradingInterest"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Trading Interest</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your primary interest" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Buyer">Buyer</SelectItem>
                      <SelectItem value="Seller">Seller</SelectItem>
                      <SelectItem value="Both">Both Buyer & Seller</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="estimatedVolume"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Estimated Annual Volume</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select volume range" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="< 100kg/year">Less than 100kg/year</SelectItem>
                      <SelectItem value="100-500kg/year">100-500kg/year</SelectItem>
                      <SelectItem value="500-1000kg/year">500-1000kg/year</SelectItem>
                      <SelectItem value="1000-5000kg/year">1000-5000kg/year</SelectItem>
                      <SelectItem value="5000kg+/year">5000kg+/year</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="geographicFocus"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Geographic Focus</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., UK, Europe, Global" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="materialRequirements"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Material Requirements & Specifications</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Describe your Ti64 powder requirements, specifications, or quality standards"
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="currentChallenges"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Current Supply Chain Challenges</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="What challenges do you face with Ti64 powder sourcing or selling?"
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full" size="lg">
            Request Early Access
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default MarketplaceEarlyAccessForm;