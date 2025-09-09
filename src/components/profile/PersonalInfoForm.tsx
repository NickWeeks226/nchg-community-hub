import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Camera, Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const personalInfoSchema = z.object({
  first_name: z.string().min(1, "First name is required"),
  last_name: z.string().min(1, "Last name is required"),
  job_title: z.string().optional(),
  department: z.string().optional(),
  bio_description: z.string().max(500, "Bio must be 500 characters or less").optional(),
  secondary_email: z.string().email("Invalid email").optional().or(z.literal("")),
  primary_phone: z.string().optional(),
  secondary_phone: z.string().optional(),
  preferred_contact_method: z.enum(["email", "phone", "platform_messages"]),
});

type PersonalInfoForm = z.infer<typeof personalInfoSchema>;

interface PersonalInfoFormProps {
  profile: any;
  onUpdate: () => void;
}

export function PersonalInfoForm({ profile, onUpdate }: PersonalInfoFormProps) {
  const [loading, setLoading] = useState(false);
  const [imageUploading, setImageUploading] = useState(false);
  const { toast } = useToast();

  const form = useForm<PersonalInfoForm>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: {
      first_name: profile?.first_name || "",
      last_name: profile?.last_name || "",
      job_title: profile?.job_title || "",
      department: profile?.department || "",
      bio_description: profile?.bio_description || "",
      secondary_email: profile?.secondary_email || "",
      primary_phone: profile?.primary_phone || "",
      secondary_phone: profile?.secondary_phone || "",
      preferred_contact_method: profile?.preferred_contact_method || "email",
    },
  });

  const onSubmit = async (data: PersonalInfoForm) => {
    setLoading(true);
    try {
      const { error } = await supabase
        .from('profiles')
        .update(data)
        .eq('user_id', profile.user_id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Profile updated successfully",
      });
      
      onUpdate();
    } catch (error) {
      console.error('Error updating profile:', error);
      toast({
        title: "Error",
        description: "Failed to update profile",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast({
        title: "Error",
        description: "Please select an image file",
        variant: "destructive",
      });
      return;
    }

    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "Error",
        description: "Image must be less than 5MB",
        variant: "destructive",
      });
      return;
    }

    setImageUploading(true);
    try {
      // Create a unique filename
      const fileExt = file.name.split('.').pop();
      const fileName = `${profile.user_id}-${Date.now()}.${fileExt}`;
      
      // For now, we'll store the file as a data URL
      // In a production app, you'd upload to Supabase Storage
      const reader = new FileReader();
      reader.onload = async (e) => {
        const imageUrl = e.target?.result as string;
        
        const { error } = await supabase
          .from('profiles')
          .update({ profile_picture_url: imageUrl })
          .eq('user_id', profile.user_id);

        if (error) throw error;

        toast({
          title: "Success",
          description: "Profile picture updated successfully",
        });
        
        onUpdate();
      };
      
      reader.readAsDataURL(file);
    } catch (error) {
      console.error('Error uploading image:', error);
      toast({
        title: "Error",
        description: "Failed to upload image",
        variant: "destructive",
      });
    } finally {
      setImageUploading(false);
    }
  };

  const getInitials = () => {
    const firstName = profile?.first_name || "";
    const lastName = profile?.last_name || "";
    return `${firstName[0]}${lastName[0]}`.toUpperCase();
  };

  return (
    <div className="space-y-6">
      {/* Profile Picture Section */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center space-x-6">
            <div className="relative">
              <Avatar className="h-24 w-24">
                <AvatarImage src={profile?.profile_picture_url} />
                <AvatarFallback className="text-lg">
                  {getInitials()}
                </AvatarFallback>
              </Avatar>
              <label 
                htmlFor="profile-image" 
                className="absolute -bottom-2 -right-2 p-2 bg-primary rounded-full cursor-pointer hover:bg-primary/90 transition-colors"
              >
                <Camera className="h-4 w-4 text-primary-foreground" />
              </label>
              <input
                id="profile-image"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                disabled={imageUploading}
              />
            </div>
            <div>
              <h3 className="text-lg font-medium">Profile Picture</h3>
              <p className="text-sm text-muted-foreground">
                Upload a profile picture. JPG or PNG, max 5MB.
              </p>
              {imageUploading && (
                <div className="flex items-center gap-2 mt-2">
                  <Upload className="h-4 w-4 animate-spin" />
                  <span className="text-sm">Uploading...</span>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Personal Details Form */}
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="first_name">First Name *</Label>
            <Input
              id="first_name"
              {...form.register("first_name")}
              placeholder="Enter your first name"
            />
            {form.formState.errors.first_name && (
              <p className="text-sm text-destructive">
                {form.formState.errors.first_name.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="last_name">Last Name *</Label>
            <Input
              id="last_name"
              {...form.register("last_name")}
              placeholder="Enter your last name"
            />
            {form.formState.errors.last_name && (
              <p className="text-sm text-destructive">
                {form.formState.errors.last_name.message}
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="job_title">Job Title</Label>
            <Input
              id="job_title"
              {...form.register("job_title")}
              placeholder="e.g. Senior Engineer"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="department">Department</Label>
            <Input
              id="department"
              {...form.register("department")}
              placeholder="e.g. Manufacturing"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="bio_description">Bio</Label>
          <Textarea
            id="bio_description"
            {...form.register("bio_description")}
            placeholder="Tell us about yourself (max 500 characters)"
            className="min-h-[100px]"
            maxLength={500}
          />
          <div className="text-xs text-muted-foreground text-right">
            {form.watch("bio_description")?.length || 0}/500
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="secondary_email">Secondary Email</Label>
            <Input
              id="secondary_email"
              type="email"
              {...form.register("secondary_email")}
              placeholder="secondary@email.com"
            />
            {form.formState.errors.secondary_email && (
              <p className="text-sm text-destructive">
                {form.formState.errors.secondary_email.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="preferred_contact_method">Preferred Contact Method</Label>
            <Select
              value={form.watch("preferred_contact_method")}
              onValueChange={(value) => form.setValue("preferred_contact_method", value as any)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="email">Email</SelectItem>
                <SelectItem value="phone">Phone</SelectItem>
                <SelectItem value="platform_messages">Platform Messages</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="primary_phone">Primary Phone</Label>
            <Input
              id="primary_phone"
              {...form.register("primary_phone")}
              placeholder="+44 7700 900000"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="secondary_phone">Secondary Phone</Label>
            <Input
              id="secondary_phone"
              {...form.register("secondary_phone")}
              placeholder="+44 7700 900001"
            />
          </div>
        </div>

        <div className="flex justify-end">
          <Button type="submit" disabled={loading}>
            {loading ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </form>
    </div>
  );
}