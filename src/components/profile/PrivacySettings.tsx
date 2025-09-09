import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Shield, Eye, Users, Globe } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const privacySchema = z.object({
  profile_visibility: z.enum(["public", "members", "private"]),
  contact_visibility: z.enum(["public", "members", "private"]),
  show_online_status: z.boolean(),
});

type PrivacyForm = z.infer<typeof privacySchema>;

interface PrivacySettingsProps {
  profile: any;
  onUpdate: () => void;
}

const visibilityOptions = [
  {
    value: "public",
    label: "Public",
    description: "Visible to everyone, including non-members",
    icon: Globe,
  },
  {
    value: "members",
    label: "Members Only",
    description: "Visible only to registered members",
    icon: Users,
  },
  {
    value: "private",
    label: "Private",
    description: "Only visible to you",
    icon: Eye,
  },
];

export function PrivacySettings({ profile, onUpdate }: PrivacySettingsProps) {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<PrivacyForm>({
    resolver: zodResolver(privacySchema),
    defaultValues: {
      profile_visibility: profile?.profile_visibility || "members",
      contact_visibility: profile?.contact_visibility || "members",
      show_online_status: profile?.show_online_status ?? true,
    },
  });

  const onSubmit = async (data: PrivacyForm) => {
    setLoading(true);
    try {
      const { error } = await supabase
        .from('profiles')
        .update(data)
        .eq('user_id', profile.user_id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Privacy settings updated successfully",
      });
      
      onUpdate();
    } catch (error) {
      console.error('Error updating privacy settings:', error);
      toast({
        title: "Error",
        description: "Failed to update privacy settings",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const getVisibilityIcon = (value: string) => {
    const option = visibilityOptions.find(opt => opt.value === value);
    return option?.icon || Eye;
  };

  const getVisibilityDescription = (value: string) => {
    const option = visibilityOptions.find(opt => opt.value === value);
    return option?.description || "";
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
      {/* Profile Visibility */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Profile Visibility
          </CardTitle>
          <CardDescription>
            Control who can view your profile information
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="profile_visibility">Who can see your profile?</Label>
            <Select
              value={form.watch("profile_visibility")}
              onValueChange={(value) => form.setValue("profile_visibility", value as any)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {visibilityOptions.map((option) => {
                  const IconComponent = option.icon;
                  return (
                    <SelectItem key={option.value} value={option.value}>
                      <div className="flex items-center gap-2">
                        <IconComponent className="h-4 w-4" />
                        <div>
                          <div className="font-medium">{option.label}</div>
                          <div className="text-xs text-muted-foreground">
                            {option.description}
                          </div>
                        </div>
                      </div>
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
            <p className="text-sm text-muted-foreground">
              {getVisibilityDescription(form.watch("profile_visibility"))}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Contact Information Visibility */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Contact Information
          </CardTitle>
          <CardDescription>
            Control who can see your contact details
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="contact_visibility">Who can see your contact information?</Label>
            <Select
              value={form.watch("contact_visibility")}
              onValueChange={(value) => form.setValue("contact_visibility", value as any)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {visibilityOptions.map((option) => {
                  const IconComponent = option.icon;
                  return (
                    <SelectItem key={option.value} value={option.value}>
                      <div className="flex items-center gap-2">
                        <IconComponent className="h-4 w-4" />
                        <div>
                          <div className="font-medium">{option.label}</div>
                          <div className="text-xs text-muted-foreground">
                            {option.description}
                          </div>
                        </div>
                      </div>
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
            <p className="text-sm text-muted-foreground">
              This includes your email address, phone numbers, and other contact details.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Activity and Status Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Eye className="h-5 w-5" />
            Activity & Status
          </CardTitle>
          <CardDescription>
            Control what activity information is shared
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label htmlFor="show_online_status">Show Online Status</Label>
              <p className="text-sm text-muted-foreground">
                Let others see when you're online or recently active
              </p>
            </div>
            <Switch
              id="show_online_status"
              checked={form.watch("show_online_status")}
              onCheckedChange={(checked) => form.setValue("show_online_status", checked)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Privacy Summary */}
      <Card className="border-muted">
        <CardHeader>
          <CardTitle className="text-base">Privacy Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span>Profile visibility:</span>
            <div className="flex items-center gap-2">
              {(() => {
                const IconComponent = getVisibilityIcon(form.watch("profile_visibility"));
                return <IconComponent className="h-4 w-4" />;
              })()}
              <span className="font-medium">
                {visibilityOptions.find(opt => opt.value === form.watch("profile_visibility"))?.label}
              </span>
            </div>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span>Contact information:</span>
            <div className="flex items-center gap-2">
              {(() => {
                const IconComponent = getVisibilityIcon(form.watch("contact_visibility"));
                return <IconComponent className="h-4 w-4" />;
              })()}
              <span className="font-medium">
                {visibilityOptions.find(opt => opt.value === form.watch("contact_visibility"))?.label}
              </span>
            </div>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span>Online status:</span>
            <span className="font-medium">
              {form.watch("show_online_status") ? "Visible" : "Hidden"}
            </span>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button type="submit" disabled={loading}>
          {loading ? "Saving..." : "Save Privacy Settings"}
        </Button>
      </div>
    </form>
  );
}