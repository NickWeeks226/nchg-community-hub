import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Upload, X, Plus, Save, Eye } from 'lucide-react';
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";
import { toast } from "@/hooks/use-toast";
import { validateCompanyName, sanitizeInput } from "@/lib/validation";

interface ListingFormData {
  title: string;
  description: string;
  powder_condition: 'new' | 'used' | 'reconditioned';
  quantity_kg: number;
  price_per_kg: number;
  location_country: string;
  location_region: string;
  
  // Ti64 Specifications
  particle_size_range: string;
  d10_microns: number | null;
  d50_microns: number | null;
  d90_microns: number | null;
  flowability_rating: string;
  apparent_density: number | null;
  tap_density: number | null;
  moisture_content: number | null;
  oxygen_content_ppm: number | null;
  nitrogen_content_ppm: number | null;
  carbon_content_ppm: number | null;
  hydrogen_content_ppm: number | null;
  manufacturing_method: 'gas_atomized' | 'plasma_atomized' | 'other' | null;
  previous_use_cycles: number | null;
  storage_conditions: string;
  shelf_life_remaining: string;
  
  // Quality Certifications
  certifications: Array<{
    certification_type: 'material_certificate' | 'coa' | 'astm' | 'ams' | 'other';
    issuing_authority: string;
    certificate_number: string;
    issue_date: string;
    expiry_date: string;
    document_url: string;
  }>;
  
  // Images
  images: string[];
}

const CreateListing = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('basic');
  const [saving, setSaving] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);
  
  const [formData, setFormData] = useState<ListingFormData>({
    title: '',
    description: '',
    powder_condition: 'new',
    quantity_kg: 0,
    price_per_kg: 0,
    location_country: 'United Kingdom',
    location_region: '',
    
    particle_size_range: '',
    d10_microns: null,
    d50_microns: null,
    d90_microns: null,
    flowability_rating: '',
    apparent_density: null,
    tap_density: null,
    moisture_content: null,
    oxygen_content_ppm: null,
    nitrogen_content_ppm: null,
    carbon_content_ppm: null,
    hydrogen_content_ppm: null,
    manufacturing_method: null,
    previous_use_cycles: null,
    storage_conditions: '',
    shelf_life_remaining: '',
    
    certifications: [],
    images: []
  });

  const [uploadingImages, setUploadingImages] = useState(false);
  const [uploadingCerts, setUploadingCerts] = useState(false);

  const updateFormData = (field: keyof ListingFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const calculateTotalPrice = () => {
    return formData.quantity_kg * formData.price_per_kg;
  };

  const handleImageUpload = async (files: FileList) => {
    if (!user) return;
    
    setUploadingImages(true);
    try {
      const uploadPromises = Array.from(files).map(async (file) => {
        const fileExt = file.name.split('.').pop();
        const fileName = `${user.id}/${Date.now()}.${fileExt}`;
        
        const { data, error } = await supabase.storage
          .from('listing-images')
          .upload(fileName, file);
          
        if (error) throw error;
        
        const { data: urlData } = supabase.storage
          .from('listing-images')
          .getPublicUrl(fileName);
          
        return urlData.publicUrl;
      });
      
      const urls = await Promise.all(uploadPromises);
      updateFormData('images', [...formData.images, ...urls]);
      
      toast({
        title: "Success",
        description: `${files.length} image(s) uploaded successfully`,
      });
    } catch (error) {
      console.error('Error uploading images:', error);
      toast({
        title: "Error",
        description: "Failed to upload images",
        variant: "destructive",
      });
    } finally {
      setUploadingImages(false);
    }
  };

  const handleCertificateUpload = async (file: File, certIndex: number) => {
    if (!user) return;
    
    setUploadingCerts(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}/cert-${Date.now()}.${fileExt}`;
      
      const { data, error } = await supabase.storage
        .from('certificates')
        .upload(fileName, file);
        
      if (error) throw error;
      
      const { data: urlData } = supabase.storage
        .from('certificates')
        .getPublicUrl(fileName);
      
      const updatedCerts = [...formData.certifications];
      updatedCerts[certIndex].document_url = urlData.publicUrl;
      updateFormData('certifications', updatedCerts);
      
      toast({
        title: "Success",
        description: "Certificate uploaded successfully",
      });
    } catch (error) {
      console.error('Error uploading certificate:', error);
      toast({
        title: "Error",
        description: "Failed to upload certificate",
        variant: "destructive",
      });
    } finally {
      setUploadingCerts(false);
    }
  };

  const addCertification = () => {
    updateFormData('certifications', [
      ...formData.certifications,
      {
        certification_type: 'material_certificate' as const,
        issuing_authority: '',
        certificate_number: '',
        issue_date: '',
        expiry_date: '',
        document_url: ''
      }
    ]);
  };

  const removeCertification = (index: number) => {
    const updated = formData.certifications.filter((_, i) => i !== index);
    updateFormData('certifications', updated);
  };

  const validateForm = () => {
    const errors: string[] = [];
    
    if (!formData.title.trim()) errors.push('Title is required');
    if (!formData.description.trim()) errors.push('Description is required');
    if (formData.quantity_kg <= 0) errors.push('Quantity must be greater than 0');
    if (formData.price_per_kg <= 0) errors.push('Price per kg must be greater than 0');
    if (!formData.location_region.trim()) errors.push('Location region is required');
    
    return errors;
  };

  const saveListing = async () => {
    const errors = validateForm();
    if (errors.length > 0) {
      toast({
        title: "Validation Error",
        description: errors.join(', '),
        variant: "destructive",
      });
      return;
    }

    setSaving(true);
    try {
      // Create the listing
      const { data: listing, error: listingError } = await supabase
        .from('product_listings')
        .insert({
          seller_id: user!.id,
          title: sanitizeInput(formData.title),
          description: sanitizeInput(formData.description),
          powder_condition: formData.powder_condition,
          quantity_kg: formData.quantity_kg,
          price_per_kg: formData.price_per_kg,
          total_price: calculateTotalPrice(),
          location_country: formData.location_country,
          location_region: sanitizeInput(formData.location_region),
          images: formData.images
        })
        .select()
        .single();
        
      if (listingError) throw listingError;

      // Create Ti64 specifications
      if (listing) {
        const { error: specError } = await supabase
          .from('ti64_specifications')
          .insert({
            listing_id: listing.id,
            particle_size_range: formData.particle_size_range,
            d10_microns: formData.d10_microns,
            d50_microns: formData.d50_microns,
            d90_microns: formData.d90_microns,
            flowability_rating: formData.flowability_rating,
            apparent_density: formData.apparent_density,
            tap_density: formData.tap_density,
            moisture_content: formData.moisture_content,
            oxygen_content_ppm: formData.oxygen_content_ppm,
            nitrogen_content_ppm: formData.nitrogen_content_ppm,
            carbon_content_ppm: formData.carbon_content_ppm,
            hydrogen_content_ppm: formData.hydrogen_content_ppm,
            manufacturing_method: formData.manufacturing_method,
            previous_use_cycles: formData.previous_use_cycles,
            storage_conditions: formData.storage_conditions,
            shelf_life_remaining: formData.shelf_life_remaining
          });
          
        if (specError) throw specError;

        // Create quality certifications
        if (formData.certifications.length > 0) {
          const certData = formData.certifications.map(cert => ({
            listing_id: listing.id,
            certification_type: cert.certification_type,
            issuing_authority: cert.issuing_authority,
            certificate_number: cert.certificate_number,
            issue_date: cert.issue_date || null,
            expiry_date: cert.expiry_date || null,
            document_url: cert.document_url
          }));
          
          const { error: certError } = await supabase
            .from('quality_certifications')
            .insert(certData);
            
          if (certError) throw certError;
        }
      }

      toast({
        title: "Success",
        description: "Listing created successfully",
      });
      
      navigate('/marketplace');
    } catch (error) {
      console.error('Error creating listing:', error);
      toast({
        title: "Error",
        description: "Failed to create listing",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <Card className="max-w-md mx-auto text-center">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">Authentication Required</h2>
              <p className="text-muted-foreground mb-4">
                You need to be logged in to create a listing.
              </p>
              <Button onClick={() => navigate('/marketplace')}>
                Go to Marketplace
              </Button>
            </CardContent>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => navigate('/marketplace')}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Marketplace
            </Button>
            <div>
              <h1 className="text-3xl font-bold">Create Ti64 Powder Listing</h1>
              <p className="text-muted-foreground">
                List your Ti64 powder for sale to qualified buyers
              </p>
            </div>
          </div>
          
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => setPreviewMode(!previewMode)}
            >
              <Eye className="h-4 w-4 mr-2" />
              {previewMode ? 'Edit' : 'Preview'}
            </Button>
            <Button 
              onClick={saveListing}
              disabled={saving}
            >
              <Save className="h-4 w-4 mr-2" />
              {saving ? 'Saving...' : 'Save Listing'}
            </Button>
          </div>
        </div>

        {previewMode ? (
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4">{formData.title || 'Untitled Listing'}</h2>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                  <div>
                    <h3 className="font-semibold mb-2">Description</h3>
                    <p className="text-muted-foreground">{formData.description || 'No description provided'}</p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold mb-2">Specifications</h3>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>Condition: <span className="capitalize">{formData.powder_condition}</span></div>
                      <div>Particle Size: {formData.particle_size_range || 'Not specified'}</div>
                      <div>D50: {formData.d50_microns ? `${formData.d50_microns}μm` : 'Not specified'}</div>
                      <div>Manufacturing: {formData.manufacturing_method?.replace('_', ' ') || 'Not specified'}</div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <Card>
                    <CardContent className="p-4">
                      <div className="text-2xl font-bold text-primary">
                        £{formData.price_per_kg}/kg
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Total: £{calculateTotalPrice()}
                      </div>
                      <div className="text-sm mt-2">
                        Quantity: {formData.quantity_kg}kg available
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="basic">Basic Info</TabsTrigger>
              <TabsTrigger value="specifications">Specifications</TabsTrigger>
              <TabsTrigger value="certifications">Certifications</TabsTrigger>
              <TabsTrigger value="pricing">Pricing</TabsTrigger>
              <TabsTrigger value="images">Images</TabsTrigger>
            </TabsList>

            <TabsContent value="basic" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Basic Information</CardTitle>
                  <CardDescription>
                    Provide the essential details about your Ti64 powder listing
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="title">Listing Title *</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => updateFormData('title', e.target.value)}
                      placeholder="e.g., High-grade Ti64 Powder 15-45μm"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="description">Description *</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => updateFormData('description', e.target.value)}
                      placeholder="Detailed description of your Ti64 powder..."
                      rows={4}
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="condition">Powder Condition *</Label>
                      <Select 
                        value={formData.powder_condition} 
                        onValueChange={(value: 'new' | 'used' | 'reconditioned') => updateFormData('powder_condition', value)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="new">New</SelectItem>
                          <SelectItem value="used">Used</SelectItem>
                          <SelectItem value="reconditioned">Reconditioned</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label htmlFor="country">Country *</Label>
                      <Select 
                        value={formData.location_country} 
                        onValueChange={(value) => updateFormData('location_country', value)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="United Kingdom">United Kingdom</SelectItem>
                          <SelectItem value="Germany">Germany</SelectItem>
                          <SelectItem value="United States">United States</SelectItem>
                          <SelectItem value="France">France</SelectItem>
                          <SelectItem value="Italy">Italy</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label htmlFor="region">Region/City *</Label>
                      <Input
                        id="region"
                        value={formData.location_region}
                        onChange={(e) => updateFormData('location_region', e.target.value)}
                        placeholder="e.g., London, Birmingham"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="specifications">
              <Card>
                <CardHeader>
                  <CardTitle>Ti64 Powder Specifications</CardTitle>
                  <CardDescription>
                    Detailed technical specifications for your powder
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="particle_size">Particle Size Range</Label>
                      <Input
                        id="particle_size"
                        value={formData.particle_size_range}
                        onChange={(e) => updateFormData('particle_size_range', e.target.value)}
                        placeholder="e.g., 15-45μm"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="d10">D10 (μm)</Label>
                      <Input
                        id="d10"
                        type="number"
                        value={formData.d10_microns || ''}
                        onChange={(e) => updateFormData('d10_microns', e.target.value ? parseFloat(e.target.value) : null)}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="d50">D50 (μm)</Label>
                      <Input
                        id="d50"
                        type="number"
                        value={formData.d50_microns || ''}
                        onChange={(e) => updateFormData('d50_microns', e.target.value ? parseFloat(e.target.value) : null)}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="d90">D90 (μm)</Label>
                      <Input
                        id="d90"
                        type="number"
                        value={formData.d90_microns || ''}
                        onChange={(e) => updateFormData('d90_microns', e.target.value ? parseFloat(e.target.value) : null)}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="manufacturing">Manufacturing Method</Label>
                      <Select 
                        value={formData.manufacturing_method || ''} 
                        onValueChange={(value: 'gas_atomized' | 'plasma_atomized' | 'other') => updateFormData('manufacturing_method', value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select method" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="gas_atomized">Gas Atomized</SelectItem>
                          <SelectItem value="plasma_atomized">Plasma Atomized</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label htmlFor="oxygen">Oxygen Content (ppm)</Label>
                      <Input
                        id="oxygen"
                        type="number"
                        value={formData.oxygen_content_ppm || ''}
                        onChange={(e) => updateFormData('oxygen_content_ppm', e.target.value ? parseInt(e.target.value) : null)}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="certifications">
              <Card>
                <CardHeader>
                  <CardTitle>Quality Certifications</CardTitle>
                  <CardDescription>
                    Upload quality certificates and documentation
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {formData.certifications.map((cert, index) => (
                    <Card key={index} className="p-4">
                      <div className="flex justify-between items-start mb-4">
                        <h4 className="font-medium">Certificate {index + 1}</h4>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeCertification(index)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label>Certificate Type</Label>
                          <Select
                            value={cert.certification_type}
                            onValueChange={(value: any) => {
                              const updated = [...formData.certifications];
                              updated[index].certification_type = value;
                              updateFormData('certifications', updated);
                            }}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="material_certificate">Material Certificate</SelectItem>
                              <SelectItem value="coa">Certificate of Analysis</SelectItem>
                              <SelectItem value="astm">ASTM Certification</SelectItem>
                              <SelectItem value="ams">AMS Certification</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div>
                          <Label>Issuing Authority</Label>
                          <Input
                            value={cert.issuing_authority}
                            onChange={(e) => {
                              const updated = [...formData.certifications];
                              updated[index].issuing_authority = e.target.value;
                              updateFormData('certifications', updated);
                            }}
                            placeholder="e.g., BSI, TÜV, ASTM"
                          />
                        </div>
                        
                        <div>
                          <Label>Certificate Number</Label>
                          <Input
                            value={cert.certificate_number}
                            onChange={(e) => {
                              const updated = [...formData.certifications];
                              updated[index].certificate_number = e.target.value;
                              updateFormData('certifications', updated);
                            }}
                          />
                        </div>
                        
                        <div>
                          <Label>Upload Document</Label>
                          <div className="flex gap-2">
                            <Input
                              type="file"
                              accept=".pdf,.doc,.docx"
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) handleCertificateUpload(file, index);
                              }}
                              disabled={uploadingCerts}
                            />
                            {cert.document_url && (
                              <Badge variant="outline">Uploaded</Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                  
                  <Button
                    variant="outline"
                    onClick={addCertification}
                    className="w-full"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Certificate
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="pricing">
              <Card>
                <CardHeader>
                  <CardTitle>Pricing & Inventory</CardTitle>
                  <CardDescription>
                    Set your pricing and quantity information
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="quantity">Quantity Available (kg) *</Label>
                      <Input
                        id="quantity"
                        type="number"
                        value={formData.quantity_kg}
                        onChange={(e) => updateFormData('quantity_kg', parseFloat(e.target.value) || 0)}
                        min="0"
                        step="0.1"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="price_per_kg">Price per kg (GBP) *</Label>
                      <Input
                        id="price_per_kg"
                        type="number"
                        value={formData.price_per_kg}
                        onChange={(e) => updateFormData('price_per_kg', parseFloat(e.target.value) || 0)}
                        min="0"
                        step="0.01"
                      />
                    </div>
                    
                    <div>
                      <Label>Total Price (GBP)</Label>
                      <div className="text-2xl font-bold text-primary mt-2">
                        £{calculateTotalPrice().toFixed(2)}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="images">
              <Card>
                <CardHeader>
                  <CardTitle>Product Images</CardTitle>
                  <CardDescription>
                    Upload images of your Ti64 powder and packaging
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="border-2 border-dashed border-muted rounded-lg p-8 text-center">
                    <Upload className="h-8 w-8 mx-auto mb-4 text-muted-foreground" />
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">
                        Drag and drop images here, or click to browse
                      </p>
                      <Input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={(e) => {
                          const files = e.target.files;
                          if (files) handleImageUpload(files);
                        }}
                        disabled={uploadingImages}
                        className="hidden"
                        id="image-upload"
                      />
                      <Button
                        variant="outline"
                        onClick={() => document.getElementById('image-upload')?.click()}
                        disabled={uploadingImages}
                      >
                        {uploadingImages ? 'Uploading...' : 'Choose Files'}
                      </Button>
                    </div>
                  </div>
                  
                  {formData.images.length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {formData.images.map((url, index) => (
                        <div key={index} className="relative group">
                          <img
                            src={url}
                            alt={`Product ${index + 1}`}
                            className="w-full h-24 object-cover rounded-lg"
                          />
                          <Button
                            variant="destructive"
                            size="sm"
                            className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={() => {
                              const updated = formData.images.filter((_, i) => i !== index);
                              updateFormData('images', updated);
                            }}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default CreateListing;
