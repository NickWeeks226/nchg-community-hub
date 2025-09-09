import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { 
  Building, 
  Upload, 
  Users, 
  CheckCircle, 
  AlertCircle, 
  FileText,
  Plus,
  Trash2
} from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { useToast } from "@/hooks/use-toast";

const companyInfoSchema = z.object({
  company_name: z.string().min(1, "Company name is required"),
  trading_name: z.string().optional(),
  registration_number: z.string().min(1, "Registration number is required"),
  vat_number: z.string().optional(),
  industry_sector: z.string().min(1, "Please select an industry sector"),
  employee_count: z.number().min(1, "Please specify employee count"),
  founded_year: z.number().min(1800).max(new Date().getFullYear()),
  annual_revenue_range: z.string().optional(),
  website_url: z.string().url("Please enter a valid URL").optional().or(z.literal("")),
  description: z.string().max(1000, "Description must be 1000 characters or less").optional(),
});

type CompanyInfoForm = z.infer<typeof companyInfoSchema>;

interface CompanyProfile {
  id: string;
  company_name: string;
  registration_number: string;
  vat_number?: string;
  industry_sector: string;
  employee_count?: number;
  annual_revenue_range?: string;
  website_url?: string;
  description?: string;
  verification_status: string;
  created_at: string;
  updated_at: string;
}

interface Document {
  id: string;
  document_type: string;
  document_name: string;
  document_url: string;
  verification_status: string;
  upload_date: string;
  expiry_date?: string;
  rejection_reason?: string;
}

interface TeamMember {
  id: string;
  invitation_email: string;
  role: string;
  status: string;
  invitation_date: string;
  joined_date?: string;
  user_id?: string;
}

const industrySectors = [
  "Aerospace & Defense",
  "Medical & Healthcare",
  "Automotive",
  "Energy & Power",
  "Industrial Manufacturing",
  "Research & Development",
  "Education",
  "Other"
];

const employeeRanges = [
  { value: 5, label: "1-10 employees" },
  { value: 25, label: "11-50 employees" },
  { value: 125, label: "51-200 employees" },
  { value: 500, label: "200+ employees" },
];

const revenueRanges = [
  "Under £100K",
  "£100K - £500K",
  "£500K - £1M",
  "£1M - £5M",
  "£5M - £10M",
  "Over £10M",
  "Prefer not to say"
];

const documentTypes = [
  { value: "incorporation", label: "Certificate of Incorporation", required: true },
  { value: "vat", label: "VAT Registration Certificate", required: false },
  { value: "insurance", label: "Professional Indemnity Insurance", required: true },
  { value: "certification", label: "Quality Certifications (AS9100, ISO13485, etc.)", required: false },
  { value: "bank_statement", label: "Recent Bank Statement", required: true },
  { value: "other", label: "Other Documentation", required: false },
];

const teamRoles = [
  { value: "admin", label: "Company Admin", description: "Full access to all features" },
  { value: "procurement_manager", label: "Procurement Manager", description: "Can buy, search, and message" },
  { value: "sales_manager", label: "Sales Manager", description: "Can sell, list, and message" },
  { value: "viewer", label: "Viewer", description: "Read-only access" },
];

export function CompanyProfileManagement() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [companyProfile, setCompanyProfile] = useState<CompanyProfile | null>(null);
  const [documents, setDocuments] = useState<Document[]>([]);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  const form = useForm<CompanyInfoForm>({
    resolver: zodResolver(companyInfoSchema),
    defaultValues: {
      company_name: "",
      trading_name: "",
      registration_number: "",
      vat_number: "",
      industry_sector: "",
      employee_count: 5,
      founded_year: new Date().getFullYear(),
      annual_revenue_range: "",
      website_url: "",
      description: "",
    },
  });

  useEffect(() => {
    if (user) {
      fetchCompanyProfile();
    }
  }, [user]);

  const fetchCompanyProfile = async () => {
    try {
      const { data: profile, error: profileError } = await supabase
        .from('company_profiles')
        .select('*')
        .eq('user_id', user?.id)
        .single();

      if (profileError && profileError.code !== 'PGRST116') {
        throw profileError;
      }

      if (profile) {
        setCompanyProfile(profile);
        form.reset({
          company_name: profile.company_name,
          trading_name: "",
          registration_number: profile.registration_number,
          vat_number: profile.vat_number || "",
          industry_sector: profile.industry_sector,
          employee_count: profile.employee_count || 5,
          founded_year: new Date().getFullYear(),
          annual_revenue_range: profile.annual_revenue_range || "",
          website_url: profile.website_url || "",
          description: profile.description || "",
        });

        // Fetch documents and team members
        await Promise.all([
          fetchDocuments(profile.id),
          fetchTeamMembers(profile.id)
        ]);
      }
    } catch (error) {
      console.error('Error fetching company profile:', error);
      toast({
        title: "Error",
        description: "Failed to load company profile",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchDocuments = async (companyId: string) => {
    try {
      const { data, error } = await supabase
        .from('company_verification_documents')
        .select('*')
        .eq('company_profile_id', companyId)
        .order('upload_date', { ascending: false });

      if (error) throw error;
      setDocuments(data || []);
    } catch (error) {
      console.error('Error fetching documents:', error);
    }
  };

  const fetchTeamMembers = async (companyId: string) => {
    try {
      const { data, error } = await supabase
        .from('team_members')
        .select('*')
        .eq('company_profile_id', companyId)
        .order('invitation_date', { ascending: false });

      if (error) throw error;
      setTeamMembers(data || []);
    } catch (error) {
      console.error('Error fetching team members:', error);
    }
  };

  const onSubmitCompanyInfo = async (data: CompanyInfoForm) => {
    setSaving(true);
    try {
      // Only send columns that actually exist in the company_profiles table
      const { trading_name: _omitTradingName, founded_year: _omitFoundedYear, ...rest } = data;

      const companyData = {
        user_id: user?.id,
        company_name: rest.company_name,
        registration_number: rest.registration_number,
        vat_number: rest.vat_number || null,
        industry_sector: rest.industry_sector,
        employee_count: rest.employee_count ?? null,
        annual_revenue_range: rest.annual_revenue_range || null,
        website_url: rest.website_url || null,
        description: rest.description || null,
      };

      if (companyProfile) {
        const { error } = await supabase
          .from('company_profiles')
          .update(companyData)
          .eq('id', companyProfile.id);

        if (error) throw error;
      } else {
        const { data: newProfile, error } = await supabase
          .from('company_profiles')
          .insert(companyData)
          .select()
          .single();

        if (error) throw error;
        setCompanyProfile(newProfile);
      }

      toast({
        title: "Success",
        description: "Company information saved successfully",
      });

      await fetchCompanyProfile();
    } catch (error) {
      console.error('Error saving company info:', error);
      toast({
        title: "Error",
        description: "Failed to save company information",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleDocumentUpload = async (event: React.ChangeEvent<HTMLInputElement>, documentType: string) => {
    const file = event.target.files?.[0];
    if (!file || !companyProfile) return;

    setUploading(true);
    try {
      // In a real implementation, you'd upload to Supabase Storage
      // For now, we'll create a mock document entry
      const mockDocumentUrl = `mock://documents/${file.name}`;
      
      const { error } = await supabase
        .from('company_verification_documents')
        .insert({
          company_profile_id: companyProfile.id,
          document_type: documentType,
          document_name: file.name,
          document_url: mockDocumentUrl,
        });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Document uploaded successfully",
      });

      await fetchDocuments(companyProfile.id);
    } catch (error) {
      console.error('Error uploading document:', error);
      toast({
        title: "Error",
        description: "Failed to upload document",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  const getVerificationProgress = () => {
    const requiredDocs = documentTypes.filter(doc => doc.required);
    const uploadedRequiredDocs = documents.filter(doc => 
      requiredDocs.some(required => required.value === doc.document_type)
    );
    
    const progress = (uploadedRequiredDocs.length / requiredDocs.length) * 100;
    return { progress, completed: uploadedRequiredDocs.length, total: requiredDocs.length };
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

  const verificationStatus = companyProfile?.verification_status || 'pending';
  const { progress, completed, total } = getVerificationProgress();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Company Profile</h2>
          <p className="text-muted-foreground">
            Manage your company information and verification status
          </p>
        </div>
        <Badge variant={verificationStatus === 'approved' ? 'default' : 'secondary'}>
          {verificationStatus === 'approved' && <CheckCircle className="w-3 h-3 mr-1" />}
          {verificationStatus === 'pending' && <AlertCircle className="w-3 h-3 mr-1" />}
          {verificationStatus.charAt(0).toUpperCase() + verificationStatus.slice(1)}
        </Badge>
      </div>

      <Tabs defaultValue="info" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="info">Company Info</TabsTrigger>
          <TabsTrigger value="verification">Verification</TabsTrigger>
          <TabsTrigger value="team">Team Management</TabsTrigger>
        </TabsList>

        <TabsContent value="info">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building className="h-5 w-5" />
                Company Information
              </CardTitle>
              <CardDescription>
                Update your company details and business information
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={form.handleSubmit(onSubmitCompanyInfo)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="company_name">Company Name *</Label>
                    <Input
                      id="company_name"
                      {...form.register("company_name")}
                      placeholder="ACME Manufacturing Ltd"
                    />
                    {form.formState.errors.company_name && (
                      <p className="text-sm text-destructive">
                        {form.formState.errors.company_name.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="trading_name">Trading Name</Label>
                    <Input
                      id="trading_name"
                      {...form.register("trading_name")}
                      placeholder="ACME (if different from legal name)"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="registration_number">Company Registration Number *</Label>
                    <Input
                      id="registration_number"
                      {...form.register("registration_number")}
                      placeholder="12345678"
                    />
                    {form.formState.errors.registration_number && (
                      <p className="text-sm text-destructive">
                        {form.formState.errors.registration_number.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="vat_number">VAT Number</Label>
                    <Input
                      id="vat_number"
                      {...form.register("vat_number")}
                      placeholder="GB123456789"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="industry_sector">Industry Sector *</Label>
                    <Select
                      value={form.watch("industry_sector")}
                      onValueChange={(value) => form.setValue("industry_sector", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select industry" />
                      </SelectTrigger>
                      <SelectContent>
                        {industrySectors.map((sector) => (
                          <SelectItem key={sector} value={sector}>
                            {sector}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="employee_count">Company Size</Label>
                    <Select
                      value={form.watch("employee_count")?.toString()}
                      onValueChange={(value) => form.setValue("employee_count", parseInt(value))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {employeeRanges.map((range) => (
                          <SelectItem key={range.value} value={range.value.toString()}>
                            {range.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="founded_year">Founded Year</Label>
                    <Input
                      id="founded_year"
                      type="number"
                      {...form.register("founded_year", { valueAsNumber: true })}
                      min="1800"
                      max={new Date().getFullYear()}
                      placeholder="2020"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="annual_revenue_range">Annual Revenue</Label>
                    <Select
                      value={form.watch("annual_revenue_range")}
                      onValueChange={(value) => form.setValue("annual_revenue_range", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select revenue range" />
                      </SelectTrigger>
                      <SelectContent>
                        {revenueRanges.map((range) => (
                          <SelectItem key={range} value={range}>
                            {range}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="website_url">Website URL</Label>
                    <Input
                      id="website_url"
                      type="url"
                      {...form.register("website_url")}
                      placeholder="https://www.acme.com"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Company Description</Label>
                  <Textarea
                    id="description"
                    {...form.register("description")}
                    placeholder="Brief description of your company and services (max 1000 characters)"
                    className="min-h-[100px]"
                    maxLength={1000}
                  />
                  <div className="text-xs text-muted-foreground text-right">
                    {form.watch("description")?.length || 0}/1000
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button type="submit" disabled={saving}>
                    {saving ? "Saving..." : "Save Company Information"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="verification">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Verification Progress
                </CardTitle>
                <CardDescription>
                  Upload required documents to verify your company
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Required Documents</span>
                    <span>{completed}/{total} uploaded</span>
                  </div>
                  <Progress value={progress} className="h-2" />
                </div>
                
                <div className="text-sm text-muted-foreground">
                  Upload all required documents to complete your company verification process.
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Document Upload</CardTitle>
                <CardDescription>
                  Upload your company verification documents
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {!companyProfile && (
                  <div className="text-center py-6">
                    <AlertCircle className="h-12 w-12 mx-auto mb-2 text-muted-foreground" />
                    <p className="text-muted-foreground">
                      Please complete your company information first before uploading documents.
                    </p>
                  </div>
                )}

                {companyProfile && documentTypes.map((docType) => {
                  const existingDoc = documents.find(doc => doc.document_type === docType.value);
                  
                  return (
                    <div key={docType.value} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{docType.label}</span>
                          {docType.required && <Badge variant="secondary" className="text-xs">Required</Badge>}
                        </div>
                        {existingDoc && (
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-sm text-muted-foreground">{existingDoc.document_name}</span>
                            <Badge variant={existingDoc.verification_status === 'approved' ? 'default' : 'secondary'}>
                              {existingDoc.verification_status}
                            </Badge>
                          </div>
                        )}
                      </div>
                      
                      <div className="flex items-center gap-2">
                        {existingDoc ? (
                          <Button variant="outline" size="sm">
                            Replace
                          </Button>
                        ) : (
                          <label>
                            <Button variant="outline" size="sm" asChild>
                              <span>
                                <Upload className="h-4 w-4 mr-2" />
                                Upload
                              </span>
                            </Button>
                            <input
                              type="file"
                              className="hidden"
                              accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                              onChange={(e) => handleDocumentUpload(e, docType.value)}
                              disabled={uploading}
                            />
                          </label>
                        )}
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="team">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Team Management
              </CardTitle>
              <CardDescription>
                Invite team members and manage their roles
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <Users className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-muted-foreground mb-4">
                  Team management will be available after company verification is complete.
                </p>
                <Button disabled>
                  <Plus className="h-4 w-4 mr-2" />
                  Invite Team Member
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}