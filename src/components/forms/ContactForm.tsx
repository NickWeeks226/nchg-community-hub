import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { validateEmail, validatePhoneNumber, sanitizeInput } from "@/lib/validation";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from "@/contexts/LanguageContext";

const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(50, "Name must be less than 50 characters"),
  email: z.string().refine(validateEmail, "Please enter a valid email address"),
  company: z.string().min(2, "Company name must be at least 2 characters").max(100, "Company name must be less than 100 characters"),
  phone: z.string().optional().refine(phone => !phone || validatePhoneNumber(phone), "Please enter a valid phone number"),
  inquiryType: z.string().min(1, "Please select an inquiry type"),
  message: z.string().min(10, "Message must be at least 10 characters").max(1000, "Message must be less than 1000 characters")
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

interface ContactFormProps {
  onSubmit?: (data: ContactFormValues) => void;
}

export function ContactForm({ onSubmit }: ContactFormProps) {
  const { tr } = useLanguage();
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      phone: "",
      inquiryType: "",
      message: ""
    }
  });

  const handleSubmit = async (data: ContactFormValues) => {
    // Sanitize inputs
    const sanitizedData = {
      ...data,
      name: sanitizeInput(data.name),
      company: sanitizeInput(data.company),
      phone: data.phone ? sanitizeInput(data.phone) : undefined,
      message: sanitizeInput(data.message)
    };
    
    try {
      const { error } = await supabase.from('contact_submissions').insert({
        name: sanitizedData.name,
        email: sanitizedData.email,
        company: sanitizedData.company,
        phone: sanitizedData.phone || null,
        inquiry_type: sanitizedData.inquiryType,
        message: sanitizedData.message,
      });

      if (error) {
        throw error;
      }

      // Show success message
      toast({
        title: tr("Message Sent Successfully!", "Nachricht erfolgreich gesendet!"),
        description: tr("Thank you for getting in touch. We'll review your enquiry and get back to you shortly.", "Vielen Dank für Ihre Nachricht. Wir prüfen Ihre Anfrage und melden uns in Kürze bei Ihnen.")
      });

      // Call parent handler if provided
      onSubmit?.(sanitizedData);

      // Reset form
      form.reset();
    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        title: tr("Submission Failed", "Senden fehlgeschlagen"),
        description: tr("Please try again or contact us directly.", "Bitte versuchen Sie es erneut oder kontaktieren Sie uns direkt."),
        variant: "destructive"
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{tr("Name", "Name")} *</FormLabel>
                <FormControl>
                  <Input placeholder={tr("Your full name", "Ihr vollständiger Name")} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{tr("Email", "E-Mail")} *</FormLabel>
                <FormControl>
                  <Input type="email" placeholder={tr("your.email@company.com", "ihre.email@firma.de")} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="company"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{tr("Company", "Unternehmen")} *</FormLabel>
                <FormControl>
                  <Input placeholder={tr("Your company name", "Name Ihres Unternehmens")} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{tr("Phone (Optional)", "Telefon (optional)")}</FormLabel>
                <FormControl>
                  <Input placeholder="+44 7823 489248" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="inquiryType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{tr("Inquiry Type", "Art der Anfrage")} *</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder={tr("Select the type of inquiry", "Art der Anfrage auswählen")} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="qualify">{tr("Qualify — wider-spec feedstock", "Qualifizieren – Feedstock mit breiterer Spezifikation")}</SelectItem>
                  <SelectItem value="recover">{tr("Recover — sieve-rejected powder", "Rückgewinnen – ausgesiebtes Pulver")}</SelectItem>
                  <SelectItem value="recycle">{tr("Recycle — highest-value scrap routing", "Recyceln – Schrottverwertung zum besten Preis")}</SelectItem>
                  <SelectItem value="not-sure">{tr("Not sure yet", "Noch nicht sicher")}</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{tr("Message", "Nachricht")} *</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder={tr("Tell us about your project, requirements, or how we can help you...", "Erzählen Sie uns von Ihrem Projekt, Ihren Anforderungen oder wie wir helfen können...")}
                  className="min-h-[120px]"
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" variant="hero" size="lg" className="w-full" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? tr("Sending...", "Wird gesendet...") : tr("Send Message", "Nachricht senden")}
        </Button>

        <div className="text-center">
          <p className="text-xs text-muted-foreground">
            {tr("We typically respond within 24 hours. For urgent matters, please call us directly.", "Wir antworten in der Regel innerhalb von 24 Stunden. In dringenden Fällen rufen Sie uns bitte direkt an.")}
          </p>
        </div>
      </form>
    </Form>
  );
}