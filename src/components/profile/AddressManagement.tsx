import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MapPin, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const addressSchema = z.object({
  street_address: z.string().min(1, "Street address is required"),
  address_line_2: z.string().optional(),
  city: z.string().min(1, "City is required"),
  county_state: z.string().optional(),
  postal_code: z.string().min(1, "Postal code is required"),
  country_code: z.string().min(2, "Please select a country"),
});

type AddressForm = z.infer<typeof addressSchema>;

interface Address {
  id: string;
  address_type: string;
  street_address: string;
  address_line_2?: string;
  city: string;
  county_state?: string;
  postal_code: string;
  country_code: string;
  is_default: boolean;
}

interface AddressManagementProps {
  userId: string;
}

const addressTypes = [
  { value: "primary", label: "Primary Address" },
  { value: "billing", label: "Billing Address" },
  { value: "shipping", label: "Shipping Address" },
];

const countries = [
  { value: "GB", label: "United Kingdom" },
  { value: "US", label: "United States" },
  { value: "CA", label: "Canada" },
  { value: "DE", label: "Germany" },
  { value: "FR", label: "France" },
  { value: "ES", label: "Spain" },
  { value: "IT", label: "Italy" },
  { value: "NL", label: "Netherlands" },
];

export function AddressManagement({ userId }: AddressManagementProps) {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  const form = useForm<AddressForm>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      street_address: "",
      address_line_2: "",
      city: "",
      county_state: "",
      postal_code: "",
      country_code: "GB",
    },
  });

  useEffect(() => {
    fetchAddresses();
  }, [userId]);

  const fetchAddresses = async () => {
    try {
      const { data, error } = await supabase
        .from('user_addresses')
        .select('*')
        .eq('user_id', userId)
        .order('address_type');

      if (error) throw error;
      setAddresses(data || []);
    } catch (error) {
      console.error('Error fetching addresses:', error);
      toast({
        title: "Error",
        description: "Failed to load addresses",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data: AddressForm, addressType: string) => {
    setSaving(true);
    try {
      const { error } = await supabase
        .from('user_addresses')
        .upsert({
          user_id: userId,
          address_type: addressType,
          ...data,
          is_default: addressType === 'primary',
        });

      if (error) throw error;

      toast({
        title: "Success",
        description: `${addressTypes.find(t => t.value === addressType)?.label} saved successfully`,
      });
      
      await fetchAddresses();
    } catch (error) {
      console.error('Error saving address:', error);
      toast({
        title: "Error",
        description: "Failed to save address",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const loadAddressData = (addressType: string) => {
    const address = addresses.find(a => a.address_type === addressType);
    if (address) {
      form.reset({
        street_address: address.street_address,
        address_line_2: address.address_line_2 || "",
        city: address.city,
        county_state: address.county_state || "",
        postal_code: address.postal_code,
        country_code: address.country_code,
      });
    } else {
      form.reset({
        street_address: "",
        address_line_2: "",
        city: "",
        county_state: "",
        postal_code: "",
        country_code: "GB",
      });
    }
  };

  const AddressForm = ({ addressType }: { addressType: string }) => {
    const address = addresses.find(a => a.address_type === addressType);
    
    return (
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                {addressTypes.find(t => t.value === addressType)?.label}
              </CardTitle>
              <CardDescription>
                {address ? "Update your address details" : "Add a new address"}
              </CardDescription>
            </div>
            {address && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => loadAddressData(addressType)}
              >
                Edit
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          {address && !form.formState.isDirty ? (
            <div className="space-y-2 text-sm">
              <p>{address.street_address}</p>
              {address.address_line_2 && <p>{address.address_line_2}</p>}
              <p>{address.city}, {address.county_state} {address.postal_code}</p>
              <p>{countries.find(c => c.value === address.country_code)?.label}</p>
            </div>
          ) : (
            <form
              onSubmit={form.handleSubmit((data) => onSubmit(data, addressType))}
              className="space-y-4"
            >
              <div className="space-y-2">
                <Label htmlFor={`street_address_${addressType}`}>Street Address *</Label>
                <Input
                  id={`street_address_${addressType}`}
                  {...form.register("street_address")}
                  placeholder="123 Main Street"
                />
                {form.formState.errors.street_address && (
                  <p className="text-sm text-destructive">
                    {form.formState.errors.street_address.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor={`address_line_2_${addressType}`}>Address Line 2</Label>
                <Input
                  id={`address_line_2_${addressType}`}
                  {...form.register("address_line_2")}
                  placeholder="Apartment, suite, etc. (optional)"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor={`city_${addressType}`}>City *</Label>
                  <Input
                    id={`city_${addressType}`}
                    {...form.register("city")}
                    placeholder="London"
                  />
                  {form.formState.errors.city && (
                    <p className="text-sm text-destructive">
                      {form.formState.errors.city.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`county_state_${addressType}`}>County/State</Label>
                  <Input
                    id={`county_state_${addressType}`}
                    {...form.register("county_state")}
                    placeholder="Greater London"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor={`postal_code_${addressType}`}>Postal Code *</Label>
                  <Input
                    id={`postal_code_${addressType}`}
                    {...form.register("postal_code")}
                    placeholder="SW1A 1AA"
                  />
                  {form.formState.errors.postal_code && (
                    <p className="text-sm text-destructive">
                      {form.formState.errors.postal_code.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`country_${addressType}`}>Country *</Label>
                  <Select
                    value={form.watch("country_code")}
                    onValueChange={(value) => form.setValue("country_code", value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {countries.map((country) => (
                        <SelectItem key={country.value} value={country.value}>
                          {country.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex justify-end">
                <Button type="submit" disabled={saving}>
                  {saving ? "Saving..." : address ? "Update Address" : "Save Address"}
                </Button>
              </div>
            </form>
          )}
        </CardContent>
      </Card>
    );
  };

  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-32 bg-muted rounded animate-pulse"></div>
        ))}
      </div>
    );
  }

  return (
    <Tabs defaultValue="primary" className="space-y-6">
      <TabsList className="grid w-full grid-cols-3">
        {addressTypes.map((type) => (
          <TabsTrigger
            key={type.value}
            value={type.value}
            onClick={() => loadAddressData(type.value)}
          >
            {type.label}
          </TabsTrigger>
        ))}
      </TabsList>

      {addressTypes.map((type) => (
        <TabsContent key={type.value} value={type.value}>
          <AddressForm addressType={type.value} />
        </TabsContent>
      ))}
    </Tabs>
  );
}