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
import { RefreshCw, Clock, CheckCircle } from "lucide-react";

const reconditioningSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  company: z.string().min(2, "Company name is required"),
  jobTitle: z.string().min(2, "Job title is required"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  powderStatus: z.enum(["Used", "Contaminated", "Degraded", "Mixed Grade", "Uncertain"]),
  estimatedVolume: z.enum(["< 50kg", "50-200kg", "200-500kg", "500-1000kg", "1000kg+"]),
  currentCondition: z.string().min(20, "Please describe the current condition"),
  desiredOutcome: z.string().min(20, "Please describe your desired outcome"),
  timeline: z.enum(["Urgent (< 1 week)", "Standard (2-3 weeks)", "Flexible (1-2 months)"]),
  additionalServices: z.string().optional(),
});

type ReconditioningFormData = z.infer<typeof reconditioningSchema>;

interface ReconditioningServicesFormProps {
  onClose?: () => void;
}

const ReconditioningServicesForm = ({ onClose }: ReconditioningServicesFormProps) => {
  const form = useForm<ReconditioningFormData>({
    resolver: zodResolver(reconditioningSchema),
  });

  const onSubmit = async (data: ReconditioningFormData) => {
    try {
      // Submit to edge function
      const response = await fetch(`https://zvrnwhjiomtraaphfzmk.supabase.co/functions/v1/process-form-submission`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          formType: 'reconditioning-services',
          formData: data,
          customerEmail: data.email,
          customerName: `${data.firstName} ${data.lastName}`
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit form');
      }

      toast.success("Reconditioning request submitted! Our team will contact you within 24 hours for assessment.");
      form.reset();
      onClose?.();
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error("Failed to submit request. Please try again.");
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
          <RefreshCw className="w-8 h-8 text-primary-foreground" />
        </div>
        <h3 className="text-2xl font-display font-bold text-foreground">
          Ti64 Reconditioning Services
        </h3>
        <p className="text-muted-foreground">
          Professional powder reconditioning to restore and optimise material properties
        </p>
        <div className="flex items-center justify-center space-x-4 text-sm text-primary font-medium">
          <span className="flex items-center">
            <Clock className="w-4 h-4 mr-1" />
            2-3 weeks
          </span>
          <span className="flex items-center">
            <CheckCircle className="w-4 h-4 mr-1" />
            AS9100 certified
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="powderStatus"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Current Powder Status</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select powder status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Used">Used powder (from AM process)</SelectItem>
                      <SelectItem value="Contaminated">Contaminated powder</SelectItem>
                      <SelectItem value="Degraded">Degraded powder</SelectItem>
                      <SelectItem value="Mixed Grade">Mixed grade powder</SelectItem>
                      <SelectItem value="Uncertain">Uncertain condition</SelectItem>
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
                  <FormLabel>Estimated Volume</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select volume range" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="< 50kg">Less than 50kg</SelectItem>
                      <SelectItem value="50-200kg">50-200kg</SelectItem>
                      <SelectItem value="200-500kg">200-500kg</SelectItem>
                      <SelectItem value="500-1000kg">500-1000kg</SelectItem>
                      <SelectItem value="1000kg+">1000kg+</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="currentCondition"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Current Powder Condition</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Describe the current condition of your Ti64 powder, including any known issues or contamination"
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="desiredOutcome"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Desired Outcome & Specifications</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Describe your desired outcome and any specific quality or performance requirements"
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="timeline"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Project Timeline</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your timeline requirements" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Urgent (< 1 week)">Urgent (less than 1 week)</SelectItem>
                    <SelectItem value="Standard (2-3 weeks)">Standard (2-3 weeks)</SelectItem>
                    <SelectItem value="Flexible (1-2 months)">Flexible (1-2 months)</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="additionalServices"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Additional Services (Optional)</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Any additional services you might need (testing, certification, custom processing, etc.)"
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full" size="lg">
            Request Reconditioning Services
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ReconditioningServicesForm;