import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { 
  Bell, 
  Globe, 
  Shield, 
  Smartphone,
  Mail,
  Settings as SettingsIcon,
  Download
} from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { useToast } from "@/hooks/use-toast";
import { useSpelling } from "@/hooks/useSpelling";

const notificationSettingsSchema = z.object({
  email_new_message: z.boolean(),
  email_listing_activity: z.boolean(),
  email_price_alert: z.boolean(),
  email_account_updates: z.boolean(),
  email_marketing: z.boolean(),
  email_platform_updates: z.boolean(),
  sms_security_alerts: z.boolean(),
  sms_critical_updates: z.boolean(),
  frequency_messages: z.enum(["immediate", "daily", "weekly", "never"]),
  frequency_listings: z.enum(["immediate", "daily", "weekly", "never"]),
});

const marketplacePreferencesSchema = z.object({
  currency: z.enum(["GBP", "EUR", "USD"]),
  weight_units: z.enum(["kg", "lbs"]),
  temperature_units: z.enum(["celsius", "fahrenheit"]),
  distance_units: z.enum(["km", "miles"]),
  date_format: z.enum(["DD/MM/YYYY", "MM/DD/YYYY"]),
  timezone: z.string(),
  language: z.string(),
  default_search_radius: z.number().min(1).max(500),
  preferred_particle_size_range: z.string().optional(),
  preferred_powder_condition: z.string().optional(),
  price_range_min: z.number().optional(),
  price_range_max: z.number().optional(),
});

type NotificationSettings = z.infer<typeof notificationSettingsSchema>;
type MarketplacePreferences = z.infer<typeof marketplacePreferencesSchema>;

const currencies = [
  { value: "GBP", label: "British Pound (£)", symbol: "£" },
  { value: "EUR", label: "Euro (€)", symbol: "€" },
  { value: "USD", label: "US Dollar ($)", symbol: "$" },
];

const timezones = [
  { value: "Europe/London", label: "London (GMT/BST)" },
  { value: "Europe/Paris", label: "Paris (CET/CEST)" },
  { value: "Europe/Berlin", label: "Berlin (CET/CEST)" },
  { value: "America/New_York", label: "New York (EST/EDT)" },
  { value: "America/Los_Angeles", label: "Los Angeles (PST/PDT)" },
  { value: "Asia/Tokyo", label: "Tokyo (JST)" },
  { value: "Australia/Sydney", label: "Sydney (AEST/AEDT)" },
];

const languages = [
  { value: "en", label: "English" },
  { value: "es", label: "Spanish" },
  { value: "fr", label: "French" },
  { value: "de", label: "German" },
  { value: "it", label: "Italian" },
];

const powderConditions = [
  "Virgin",
  "Recycled",
  "Reprocessed",
  "Mixed"
];

export function PreferencesSettings() {
  const { user } = useAuth();
  const { toast } = useToast();
  const { spellingVariant, setSpellingVariant } = useSpelling();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [exporting, setExporting] = useState(false);

  const notificationForm = useForm<NotificationSettings>({
    resolver: zodResolver(notificationSettingsSchema),
    defaultValues: {
      email_new_message: true,
      email_listing_activity: true,
      email_price_alert: true,
      email_account_updates: true,
      email_marketing: false,
      email_platform_updates: true,
      sms_security_alerts: false,
      sms_critical_updates: false,
      frequency_messages: "immediate",
      frequency_listings: "daily",
    },
  });

  const marketplaceForm = useForm<MarketplacePreferences>({
    resolver: zodResolver(marketplacePreferencesSchema),
    defaultValues: {
      currency: "GBP",
      weight_units: "kg",
      temperature_units: "celsius",
      distance_units: "km",
      date_format: "DD/MM/YYYY",
      timezone: "Europe/London",
      language: "en",
      default_search_radius: 50,
      preferred_particle_size_range: "",
      preferred_powder_condition: "",
      price_range_min: 0,
      price_range_max: 1000,
    },
  });

  useEffect(() => {
    if (user) {
      fetchPreferences();
    }
  }, [user]);

  const fetchPreferences = async () => {
    try {
      // Fetch notification settings
      const { data: notifications, error: notError } = await supabase
        .from('user_notification_settings')
        .select('*')
        .eq('user_id', user?.id);

      if (notError) throw notError;

      // Fetch marketplace preferences
      const { data: marketplace, error: marketError } = await supabase
        .from('user_marketplace_preferences')
        .select('*')
        .eq('user_id', user?.id)
        .single();

      if (marketError && marketError.code !== 'PGRST116') {
        throw marketError;
      }

      // Process notification settings
      if (notifications && notifications.length > 0) {
        const notificationMap: any = {};
        notifications.forEach(setting => {
          const key = `${setting.notification_type}_${setting.event_type}`;
          if (key.includes('frequency')) {
            notificationMap[`frequency_${setting.event_type.split('_')[0]}`] = setting.frequency;
          } else {
            notificationMap[key] = setting.is_enabled;
          }
        });
        notificationForm.reset({ ...notificationForm.getValues(), ...notificationMap });
      }

      // Process marketplace preferences
      if (marketplace) {
        const cleanPreferences = {
          currency: marketplace.currency as "GBP" | "EUR" | "USD",
          weight_units: marketplace.weight_units as "kg" | "lbs",
          temperature_units: marketplace.temperature_units as "celsius" | "fahrenheit",
          distance_units: marketplace.distance_units as "km" | "miles",
          date_format: marketplace.date_format as "DD/MM/YYYY" | "MM/DD/YYYY",
          timezone: marketplace.timezone,
          language: marketplace.language,
          default_search_radius: marketplace.default_search_radius,
          preferred_particle_size_range: marketplace.preferred_particle_size_range || "",
          preferred_powder_condition: marketplace.preferred_powder_condition || "",
          price_range_min: marketplace.price_range_min || 0,
          price_range_max: marketplace.price_range_max || 1000,
        };
        marketplaceForm.reset(cleanPreferences);
      }
    } catch (error) {
      console.error('Error fetching preferences:', error);
      toast({
        title: "Error",
        description: "Failed to load preferences",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const onSubmitNotifications = async (data: NotificationSettings) => {
    setSaving(true);
    try {
      // Convert form data to notification settings format
      const settings = [
        { notification_type: 'email', event_type: 'new_message', is_enabled: data.email_new_message, frequency: data.frequency_messages },
        { notification_type: 'email', event_type: 'listing_activity', is_enabled: data.email_listing_activity, frequency: data.frequency_listings },
        { notification_type: 'email', event_type: 'price_alert', is_enabled: data.email_price_alert, frequency: 'immediate' },
        { notification_type: 'email', event_type: 'account_updates', is_enabled: data.email_account_updates, frequency: 'immediate' },
        { notification_type: 'email', event_type: 'marketing', is_enabled: data.email_marketing, frequency: 'weekly' },
        { notification_type: 'email', event_type: 'platform_updates', is_enabled: data.email_platform_updates, frequency: 'weekly' },
        { notification_type: 'sms', event_type: 'security_alerts', is_enabled: data.sms_security_alerts, frequency: 'immediate' },
        { notification_type: 'sms', event_type: 'account_updates', is_enabled: data.sms_critical_updates, frequency: 'immediate' },
      ];

      // Upsert each setting
      for (const setting of settings) {
        const { error } = await supabase
          .from('user_notification_settings')
          .upsert({
            user_id: user?.id,
            ...setting,
          });
        
        if (error) throw error;
      }

      toast({
        title: "Success",
        description: "Notification preferences saved successfully",
      });
    } catch (error) {
      console.error('Error saving notification preferences:', error);
      toast({
        title: "Error",
        description: "Failed to save notification preferences",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const onSubmitMarketplace = async (data: MarketplacePreferences) => {
    setSaving(true);
    try {
      const { error } = await supabase
        .from('user_marketplace_preferences')
        .upsert({
          user_id: user?.id,
          ...data,
        });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Marketplace preferences saved successfully",
      });
    } catch (error) {
      console.error('Error saving marketplace preferences:', error);
      toast({
        title: "Error",
        description: "Failed to save marketplace preferences",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleDataExport = async () => {
    setExporting(true);
    try {
      // In a real implementation, you'd call an edge function to generate the export
      toast({
        title: "Export Started",
        description: "Your data export will be emailed to you within 24 hours.",
      });
    } catch (error) {
      console.error('Error exporting data:', error);
      toast({
        title: "Error",
        description: "Failed to start data export",
        variant: "destructive",
      });
    } finally {
      setExporting(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-muted rounded w-1/3"></div>
          <div className="h-64 bg-muted rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Preferences & Settings</h2>
        <p className="text-muted-foreground">
          Customize your experience and manage your account settings
        </p>
      </div>

      <Tabs defaultValue="notifications" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="marketplace">Marketplace</TabsTrigger>
          <TabsTrigger value="language">Language</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="data">Data & Privacy</TabsTrigger>
        </TabsList>

        <TabsContent value="notifications">
          <form onSubmit={notificationForm.handleSubmit(onSubmitNotifications)} className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="h-5 w-5" />
                  Email Notifications
                </CardTitle>
                <CardDescription>
                  Choose what email notifications you'd like to receive
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label>New Messages</Label>
                      <p className="text-sm text-muted-foreground">Get notified when you receive new messages</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <Switch
                        checked={notificationForm.watch("email_new_message")}
                        onCheckedChange={(checked) => notificationForm.setValue("email_new_message", checked)}
                      />
                      <Select
                        value={notificationForm.watch("frequency_messages")}
                        onValueChange={(value) => notificationForm.setValue("frequency_messages", value as any)}
                      >
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="immediate">Immediate</SelectItem>
                          <SelectItem value="daily">Daily</SelectItem>
                          <SelectItem value="weekly">Weekly</SelectItem>
                          <SelectItem value="never">Never</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label>Listing Activity</Label>
                      <p className="text-sm text-muted-foreground">Updates about views, inquiries on your listings</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <Switch
                        checked={notificationForm.watch("email_listing_activity")}
                        onCheckedChange={(checked) => notificationForm.setValue("email_listing_activity", checked)}
                      />
                      <Select
                        value={notificationForm.watch("frequency_listings")}
                        onValueChange={(value) => notificationForm.setValue("frequency_listings", value as any)}
                      >
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="immediate">Immediate</SelectItem>
                          <SelectItem value="daily">Daily</SelectItem>
                          <SelectItem value="weekly">Weekly</SelectItem>
                          <SelectItem value="never">Never</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label>Price Alerts</Label>
                      <p className="text-sm text-muted-foreground">Get notified when prices match your criteria</p>
                    </div>
                    <Switch
                      checked={notificationForm.watch("email_price_alert")}
                      onCheckedChange={(checked) => notificationForm.setValue("email_price_alert", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label>Account Updates</Label>
                      <p className="text-sm text-muted-foreground">Important account and security notifications</p>
                    </div>
                    <Switch
                      checked={notificationForm.watch("email_account_updates")}
                      onCheckedChange={(checked) => notificationForm.setValue("email_account_updates", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label>Marketing Communications</Label>
                      <p className="text-sm text-muted-foreground">Product updates, tips, and special offers</p>
                    </div>
                    <Switch
                      checked={notificationForm.watch("email_marketing")}
                      onCheckedChange={(checked) => notificationForm.setValue("email_marketing", checked)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Smartphone className="h-5 w-5" />
                  SMS Notifications
                </CardTitle>
                <CardDescription>
                  Receive SMS notifications for critical updates
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label>Security Alerts</Label>
                    <p className="text-sm text-muted-foreground">Login attempts, password changes</p>
                  </div>
                  <Switch
                    checked={notificationForm.watch("sms_security_alerts")}
                    onCheckedChange={(checked) => notificationForm.setValue("sms_security_alerts", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label>Critical Updates</Label>
                    <p className="text-sm text-muted-foreground">High-value inquiries, urgent account matters</p>
                  </div>
                  <Switch
                    checked={notificationForm.watch("sms_critical_updates")}
                    onCheckedChange={(checked) => notificationForm.setValue("sms_critical_updates", checked)}
                  />
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-end">
              <Button type="submit" disabled={saving}>
                {saving ? "Saving..." : "Save Notification Settings"}
              </Button>
            </div>
          </form>
        </TabsContent>

        <TabsContent value="marketplace">
          <form onSubmit={marketplaceForm.handleSubmit(onSubmitMarketplace)} className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5" />
                  Display Preferences
                </CardTitle>
                <CardDescription>
                  Customize how information is displayed throughout the platform
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Currency</Label>
                    <Select
                      value={marketplaceForm.watch("currency")}
                      onValueChange={(value) => marketplaceForm.setValue("currency", value as any)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {currencies.map((currency) => (
                          <SelectItem key={currency.value} value={currency.value}>
                            {currency.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Weight Units</Label>
                    <Select
                      value={marketplaceForm.watch("weight_units")}
                      onValueChange={(value) => marketplaceForm.setValue("weight_units", value as any)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="kg">Kilograms (kg)</SelectItem>
                        <SelectItem value="lbs">Pounds (lbs)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Temperature</Label>
                    <Select
                      value={marketplaceForm.watch("temperature_units")}
                      onValueChange={(value) => marketplaceForm.setValue("temperature_units", value as any)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="celsius">Celsius (°C)</SelectItem>
                        <SelectItem value="fahrenheit">Fahrenheit (°F)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Distance</Label>
                    <Select
                      value={marketplaceForm.watch("distance_units")}
                      onValueChange={(value) => marketplaceForm.setValue("distance_units", value as any)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="km">Kilometres (km)</SelectItem>
                        <SelectItem value="miles">Miles</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Date Format</Label>
                    <Select
                      value={marketplaceForm.watch("date_format")}
                      onValueChange={(value) => marketplaceForm.setValue("date_format", value as any)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                        <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Timezone</Label>
                    <Select
                      value={marketplaceForm.watch("timezone")}
                      onValueChange={(value) => marketplaceForm.setValue("timezone", value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {timezones.map((tz) => (
                          <SelectItem key={tz.value} value={tz.value}>
                            {tz.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Search Defaults</CardTitle>
                <CardDescription>
                  Set your default search preferences to save time
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Default Search Radius (km)</Label>
                    <Input
                      type="number"
                      {...marketplaceForm.register("default_search_radius", { valueAsNumber: true })}
                      min="1"
                      max="500"
                      placeholder="50"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Preferred Powder Condition</Label>
                    <Select
                      value={marketplaceForm.watch("preferred_powder_condition")}
                      onValueChange={(value) => marketplaceForm.setValue("preferred_powder_condition", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Any condition" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">Any condition</SelectItem>
                        {powderConditions.map((condition) => (
                          <SelectItem key={condition} value={condition}>
                            {condition}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Price Range Min ({marketplaceForm.watch("currency")})</Label>
                    <Input
                      type="number"
                      {...marketplaceForm.register("price_range_min", { valueAsNumber: true })}
                      min="0"
                      placeholder="0"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Price Range Max ({marketplaceForm.watch("currency")})</Label>
                    <Input
                      type="number"
                      {...marketplaceForm.register("price_range_max", { valueAsNumber: true })}
                      min="0"
                      placeholder="1000"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-end">
              <Button type="submit" disabled={saving}>
                {saving ? "Saving..." : "Save Marketplace Preferences"}
              </Button>
            </div>
          </form>
        </TabsContent>

        <TabsContent value="language">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                Language & Spelling Preferences
              </CardTitle>
              <CardDescription>
                Customise your language and spelling preferences for the best experience
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label>Spelling Preference</Label>
                    <p className="text-sm text-muted-foreground">
                      Choose between British and American spelling variants
                    </p>
                  </div>
                  <Select
                    value={spellingVariant}
                    onValueChange={(value) => setSpellingVariant(value as 'british' | 'american')}
                  >
                    <SelectTrigger className="w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="british">British English</SelectItem>
                      <SelectItem value="american">American English</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="bg-muted p-4 rounded-lg">
                  <h4 className="font-medium mb-2">Examples:</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <strong>British:</strong>
                      <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                        <li>Optimise, maximise</li>
                        <li>Organisation, realisation</li>
                        <li>Colour, flavour</li>
                        <li>Centre, theatre</li>
                      </ul>
                    </div>
                    <div>
                      <strong>American:</strong>
                      <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                        <li>Optimize, maximize</li>
                        <li>Organization, realization</li>
                        <li>Color, flavor</li>
                        <li>Center, theater</li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="text-xs text-muted-foreground">
                  <strong>Note:</strong> Your preference is automatically saved and will be applied across the entire website.
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Security Settings
              </CardTitle>
              <CardDescription>
                Manage your account security and login preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center py-8">
                <Shield className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-muted-foreground mb-4">
                  Advanced security features coming soon, including two-factor authentication and login alerts.
                </p>
                <Button disabled>
                  Enable 2FA
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="data">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Download className="h-5 w-5" />
                Data & Privacy
              </CardTitle>
              <CardDescription>
                Manage your data and privacy settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label>Export Your Data</Label>
                    <p className="text-sm text-muted-foreground">
                      Download a copy of all your data in JSON format
                    </p>
                  </div>
                  <Button variant="outline" onClick={handleDataExport} disabled={exporting}>
                    <Download className="h-4 w-4 mr-2" />
                    {exporting ? "Preparing..." : "Export Data"}
                  </Button>
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label>Delete Account</Label>
                    <p className="text-sm text-muted-foreground">
                      Permanently delete your account and all associated data
                    </p>
                  </div>
                  <Button variant="destructive" disabled>
                    Delete Account
                  </Button>
                </div>
              </div>

              <div className="bg-muted/50 p-4 rounded-lg">
                <h4 className="font-medium mb-2">Privacy Notice</h4>
                <p className="text-sm text-muted-foreground">
                  We respect your privacy and are committed to protecting your personal data. 
                  Your information is used only for providing our services and is never shared 
                  without your consent. For more details, please review our Privacy Policy.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}