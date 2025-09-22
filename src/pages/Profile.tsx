import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProfileDashboard } from "@/components/profile/ProfileDashboard";
import { PersonalInfoForm } from "@/components/profile/PersonalInfoForm";
import { AddressManagement } from "@/components/profile/AddressManagement";
import { PrivacySettings } from "@/components/profile/PrivacySettings";
import { CompanyProfileManagement } from "@/components/profile/CompanyProfileManagement";
import { PreferencesSettings } from "@/components/profile/PreferencesSettings";
import { ActivityHistoryAnalytics } from "@/components/profile/ActivityHistoryAnalytics";
import { LayoutDashboard, User, MapPin, Shield } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/Header";

interface UserProfile {
  id: string;
  user_id: string;
  first_name: string;
  last_name: string;
  job_title?: string;
  department?: string;
  bio_description?: string;
  profile_picture_url?: string;
  phone_number?: string;
  secondary_email?: string;
  primary_phone?: string;
  secondary_phone?: string;
  phone_verified: boolean;
  preferred_contact_method: string;
  profile_visibility: string;
  contact_visibility: string;
  show_online_status: boolean;
}

export default function Profile() {
  const { user, loading: authLoading } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    if (user && !authLoading) {
      fetchProfile();
    }
  }, [user, authLoading]);

  const fetchProfile = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', user?.id)
        .single();

      if (error) {
        console.error('Error fetching profile:', error);
        toast({
          title: "Error",
          description: "Failed to load profile",
          variant: "destructive",
        });
        return;
      }

      setProfile(data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (authLoading || loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-muted rounded w-1/3"></div>
            <div className="h-96 bg-muted rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card className="max-w-md mx-auto">
          <CardHeader>
            <CardTitle>Access Denied</CardTitle>
            <CardDescription>
              Please sign in to view your profile.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-8 pt-16">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold">My Profile</h1>
            <p className="text-muted-foreground mt-2">
              Manage your personal information, addresses, and privacy settings.
            </p>
          </div>

        <Tabs defaultValue="dashboard" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="dashboard" className="flex items-center gap-2">
              <LayoutDashboard className="h-4 w-4" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="personal" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              Personal
            </TabsTrigger>
            <TabsTrigger value="addresses" className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              Addresses
            </TabsTrigger>
            <TabsTrigger value="company" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              Company
            </TabsTrigger>
            <TabsTrigger value="preferences" className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              Preferences
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              Analytics
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard">
            <ProfileDashboard />
          </TabsContent>

          <TabsContent value="personal">
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>
                  Update your personal details and contact information.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <PersonalInfoForm 
                  profile={profile} 
                  onUpdate={fetchProfile}
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="addresses">
            <Card>
              <CardHeader>
                <CardTitle>Address Management</CardTitle>
              </CardHeader>
              <CardContent>
                <AddressManagement userId={user.id} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="company">
            <CompanyProfileManagement />
          </TabsContent>

          <TabsContent value="preferences">
            <PreferencesSettings />
          </TabsContent>

          <TabsContent value="analytics">
            <ActivityHistoryAnalytics />
          </TabsContent>

          <TabsContent value="privacy">
            <Card>
              <CardHeader>
                <CardTitle>Privacy Settings</CardTitle>
                <CardDescription>
                  Control your profile visibility and privacy preferences.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <PrivacySettings 
                  profile={profile} 
                  onUpdate={fetchProfile}
                />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        </div>
      </div>
    </div>
  );
}