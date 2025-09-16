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
import { Crown, Users, Lightbulb } from "lucide-react";

const foundingMemberSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  company: z.string().min(2, "Company name is required"),
  jobTitle: z.string().min(2, "Job title is required"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  ti64Experience: z.enum(["< 1 year", "1-3 years", "3-5 years", "5-10 years", "10+ years"]),
  expertiseArea: z.string().min(10, "Please describe your expertise area"),
  contributionInterest: z.string().min(20, "Please describe how you'd like to contribute"),
  networkingGoals: z.string().min(20, "Please describe your networking goals"),
});

type FoundingMemberFormData = z.infer<typeof foundingMemberSchema>;

interface FoundingMemberFormProps {
  onClose?: () => void;
}

const FoundingMemberForm = ({ onClose }: FoundingMemberFormProps) => {
  const form = useForm<FoundingMemberFormData>({
    resolver: zodResolver(foundingMemberSchema),
  });

  const onSubmit = async (data: FoundingMemberFormData) => {
    try {
      console.log("Founding Member application:", data);
      toast.success("Application submitted! We'll contact you within 24 hours about founding member status.");
      form.reset();
      onClose?.();
    } catch (error) {
      toast.error("Failed to submit application. Please try again.");
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
          <Crown className="w-8 h-8 text-primary-foreground" />
        </div>
        <h3 className="text-2xl font-display font-bold text-foreground">
          Join as Founding Member
        </h3>
        <p className="text-muted-foreground">
          Shape the future of Ti64 trading and become part of our founding community
        </p>
        <div className="flex items-center justify-center space-x-4 text-sm text-primary font-medium">
          <span className="flex items-center">
            <Users className="w-4 h-4 mr-1" />
            5/20 confirmed
          </span>
          <span className="flex items-center">
            <Lightbulb className="w-4 h-4 mr-1" />
            Limited time
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
                  <Input placeholder="+44 7823 489248" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="ti64Experience"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ti64 Experience Level</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your experience level" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="< 1 year">Less than 1 year</SelectItem>
                    <SelectItem value="1-3 years">1-3 years</SelectItem>
                    <SelectItem value="3-5 years">3-5 years</SelectItem>
                    <SelectItem value="5-10 years">5-10 years</SelectItem>
                    <SelectItem value="10+ years">10+ years</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="expertiseArea"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Primary Expertise Area</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Describe your primary area of expertise in Ti64 (e.g., aerospace applications, medical devices, powder metallurgy, etc.)"
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="contributionInterest"
            render={({ field }) => (
              <FormItem>
                <FormLabel>How would you like to contribute to the community?</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Describe how you'd like to contribute to the founding community (sharing knowledge, mentoring, technical discussions, etc.)"
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="networkingGoals"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Networking & Collaboration Goals</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="What are your main goals for networking and collaboration within the Ti64 community?"
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full" size="lg">
            Submit Founding Member Application
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default FoundingMemberForm;