import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { validateEmail, validatePhoneNumber, sanitizeInput } from "@/lib/validation";
import { toast } from "@/hooks/use-toast";
const leadFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(50, "Name must be less than 50 characters"),
  email: z.string().refine(validateEmail, "Please enter a valid email address"),
  company: z.string().min(2, "Company name must be at least 2 characters").max(100, "Company name must be less than 100 characters"),
  ti64Usage: z.string().min(1, "Please select your Ti64 usage"),
  mainChallenge: z.string().min(1, "Please select your main challenge"),
  phone: z.string().optional().refine(phone => !phone || validatePhoneNumber(phone), "Please enter a valid phone number")
});
type LeadFormValues = z.infer<typeof leadFormSchema>;
interface LeadCaptureFormProps {
  onSubmit?: (data: LeadFormValues) => void;
}
export function LeadCaptureForm({
  onSubmit
}: LeadCaptureFormProps) {
  const form = useForm<LeadFormValues>({
    resolver: zodResolver(leadFormSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      ti64Usage: "",
      mainChallenge: "",
      phone: ""
    }
  });
  const handleSubmit = (data: LeadFormValues) => {
    // Sanitize inputs
    const sanitizedData = {
      ...data,
      name: sanitizeInput(data.name),
      company: sanitizeInput(data.company),
      phone: data.phone ? sanitizeInput(data.phone) : undefined
    };
    console.log("Lead form submitted:", sanitizedData);

    // Show success message
    toast({
      title: "Assessment Request Submitted!",
      description: "We'll contact you within 24 hours to schedule your free Ti64 powder assessment."
    });

    // Call parent handler if provided
    onSubmit?.(sanitizedData);

    // Reset form
    form.reset();
  };
  return <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <FormField control={form.control} name="name" render={({
        field
      }) => <FormItem>
              <FormLabel>Name *</FormLabel>
              <FormControl>
                <Input placeholder="Your name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>} />

        <FormField control={form.control} name="email" render={({
        field
      }) => <FormItem>
              <FormLabel>Email *</FormLabel>
              <FormControl>
                <Input type="email" placeholder="your.email@company.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>} />

        <FormField control={form.control} name="company" render={({
        field
      }) => <FormItem>
              <FormLabel>Company *</FormLabel>
              <FormControl>
                <Input placeholder="Your company name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>} />

        <FormField control={form.control} name="ti64Usage" render={({
        field
      }) => <FormItem>
              <FormLabel>Current Ti64 Usage (kg/month) *</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select usage range" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="<10">Less than 10 kg</SelectItem>
                  <SelectItem value="10-50">10-50 kg</SelectItem>
                  <SelectItem value="50-100">50-100 kg</SelectItem>
                  <SelectItem value="100+">100+ kg</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>} />

        <FormField control={form.control} name="mainChallenge" render={({
        field
      }) => <FormItem>
              <FormLabel>Main Challenge *</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your main challenge" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="cost">High Material Costs</SelectItem>
                  <SelectItem value="quality">Quality Consistency</SelectItem>
                  <SelectItem value="supply">Supply Chain Issues</SelectItem>
                  <SelectItem value="waste">Waste Reduction</SelectItem>
                  <SelectItem value="development">Development Time</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>} />

        <FormField control={form.control} name="phone" render={({
        field
      }) => <FormItem>
              <FormLabel>Phone (Optional)</FormLabel>
              <FormControl>
                <Input placeholder="+44 123 456 7890" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>} />

        <Button type="submit" variant="hero" size="lg" className="w-full">
          Get My Free Assessment
        </Button>

        <div className="text-center">
          <p className="text-xs text-muted-foreground flex items-center justify-center space-x-1">
            <span>🛡️</span>
            <span>Join other industry leaders who are already optimising their Ti64 strategy</span>
          </p>
        </div>
      </form>
    </Form>;
}