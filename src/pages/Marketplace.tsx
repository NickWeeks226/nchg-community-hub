import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Footer from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Search, Filter, Plus, Grid, List, MapPin, Eye, MessageCircle, Star } from 'lucide-react';
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";
import { toast } from "@/hooks/use-toast";
import { AuthModal } from "@/components/auth/AuthModal";

interface ProductListing {
  id: string;
  title: string;
  description: string | null;
  powder_condition: 'new' | 'used' | 'reconditioned';
  quantity_kg: number;
  price_per_kg: number;
  total_price: number | null;
  listing_status: 'active' | 'sold' | 'suspended';
  location_country: string | null;
  location_region: string | null;
  views_count: number;
  inquiries_count: number;
  created_at: string;
  images: any;
  seller_id: string;
  profiles?: any;
  ti64_specifications?: any[];
  quality_certifications?: any[];
}

const Marketplace = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { user } = useAuth();
  const [listings, setListings] = useState<ProductListing[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [showFilters, setShowFilters] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  
  // Filter states
  const [conditionFilter, setConditionFilter] = useState<('new' | 'used' | 'reconditioned')[]>([]);
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [locationFilter, setLocationFilter] = useState('');
  const [sortBy, setSortBy] = useState('created_at_desc');

  const fetchListings = async () => {
    setLoading(true);
    try {
      let query = supabase
        .from('product_listings')
        .select(`
          *,
          profiles:seller_id (
            first_name,
            last_name,
            company_profiles (company_name)
          ),
          ti64_specifications (*),
          quality_certifications (certification_type, verification_status)
        `)
        .eq('listing_status', 'active');

      // Apply filters
      if (searchQuery) {
        query = query.or(`title.ilike.%${searchQuery}%,description.ilike.%${searchQuery}%`);
      }
      
      if (conditionFilter.length > 0) {
        query = query.in('powder_condition', conditionFilter);
      }
      
      if (locationFilter) {
        query = query.or(`location_country.ilike.%${locationFilter}%,location_region.ilike.%${locationFilter}%`);
      }
      
      query = query.gte('price_per_kg', priceRange[0]).lte('price_per_kg', priceRange[1]);

      // Apply sorting
      const [sortField, sortOrder] = sortBy.split('_');
      const ascending = sortOrder === 'asc';
      
      if (sortField === 'created') {
        query = query.order('created_at', { ascending });
      } else if (sortField === 'price') {
        query = query.order('price_per_kg', { ascending });
      } else if (sortField === 'views') {
        query = query.order('views_count', { ascending });
      }

      const { data, error } = await query;
      
      if (error) throw error;
      
      // Transform the data to match our interface
      const transformedData = (data || []).map(item => ({
        ...item,
        images: Array.isArray(item.images) ? item.images : []
      }));
      
      setListings(transformedData);
    } catch (error) {
      console.error('Error fetching listings:', error);
      toast({
        title: "Error",
        description: "Failed to load marketplace listings",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchListings();
  }, [searchQuery, conditionFilter, priceRange, locationFilter, sortBy]);

  const handleContactSeller = (listingId: string) => {
    if (!user) {
      setAuthModalOpen(true);
      return;
    }
    // TODO: Open messaging interface
    toast({
      title: "Contact Seller",
      description: "Messaging feature will be implemented next",
    });
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP',
    }).format(price);
  };

  const getQualityBadge = (certifications: any[]) => {
    if (!certifications?.length) return null;
    const verified = certifications.some(cert => cert.verification_status === 'verified');
    return (
      <Badge variant={verified ? "default" : "secondary"} className="text-xs">
        {verified ? 'Certified' : 'Pending'}
      </Badge>
    );
  };

  const ListingCard = ({ listing, isListView = false }: { listing: ProductListing; isListView?: boolean }) => (
    <Card className={`cursor-pointer hover:shadow-md transition-shadow ${isListView ? 'flex flex-row' : ''}`}>
      <div className={`${isListView ? 'w-48 flex-shrink-0' : 'w-full h-48'} bg-muted relative overflow-hidden ${isListView ? '' : 'rounded-t-lg'}`}>
        {Array.isArray(listing.images) && listing.images.length > 0 ? (
          <img 
            src={listing.images[0]} 
            alt={listing.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted-foreground">
            No Image
          </div>
        )}
        <div className="absolute top-2 right-2 flex gap-1">
          {getQualityBadge(listing.quality_certifications || [])}
          <Badge variant="outline" className="bg-background/80 text-xs">
            {listing.powder_condition}
          </Badge>
        </div>
      </div>
      
      <CardContent className={`${isListView ? 'flex-1' : ''} p-4`}>
        <div className="flex justify-between items-start mb-2">
          <CardTitle className="text-lg line-clamp-1">{listing.title}</CardTitle>
          <div className="text-right">
            <div className="text-lg font-bold text-primary">{formatPrice(listing.price_per_kg)}/kg</div>
            <div className="text-sm text-muted-foreground">{formatPrice(listing.total_price || 0)} total</div>
          </div>
        </div>
        
        <div className="space-y-2 mb-3">
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span>Qty: {listing.quantity_kg}kg</span>
            {listing.ti64_specifications?.[0]?.particle_size_range && (
              <span>Size: {listing.ti64_specifications[0].particle_size_range}</span>
            )}
          </div>
          
          {listing.location_country && (
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <MapPin className="h-3 w-3" />
              <span>{listing.location_region}, {listing.location_country}</span>
            </div>
          )}
          
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <Eye className="h-3 w-3" />
              <span>{listing.views_count}</span>
            </div>
            <div className="flex items-center gap-1">
              <MessageCircle className="h-3 w-3" />
              <span>{listing.inquiries_count}</span>
            </div>
          </div>
        </div>
        
        <div className="flex justify-between items-center">
          <div className="text-sm">
            <span className="text-muted-foreground">by </span>
            <span className="font-medium">
              {listing.profiles?.company_profiles?.[0]?.company_name || 
               `${listing.profiles?.first_name} ${listing.profiles?.last_name}`}
            </span>
          </div>
          <Button 
            size="sm" 
            onClick={(e) => {
              e.stopPropagation();
              handleContactSeller(listing.id);
            }}
          >
            Contact
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-background pt-16">
      
      <main className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold">Ti64 Powder Marketplace</h1>
            <p className="text-muted-foreground mt-2">
              Find high-quality Ti64 powder from verified suppliers worldwide
            </p>
          </div>
          
          {user && (
            <Button className="w-fit">
              <Plus className="h-4 w-4 mr-2" />
              Create Listing
            </Button>
          )}
        </div>

        {/* Search and Filter Bar */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search listings..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center gap-2"
                >
                  <Filter className="h-4 w-4" />
                  Filters
                </Button>
                
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="created_at_desc">Newest First</SelectItem>
                    <SelectItem value="created_at_asc">Oldest First</SelectItem>
                    <SelectItem value="price_asc">Price: Low to High</SelectItem>
                    <SelectItem value="price_desc">Price: High to Low</SelectItem>
                    <SelectItem value="views_desc">Most Viewed</SelectItem>
                  </SelectContent>
                </Select>
                
                <div className="flex border rounded-md">
                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('grid')}
                    className="rounded-r-none"
                  >
                    <Grid className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('list')}
                    className="rounded-l-none"
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Filters Panel */}
            {showFilters && (
              <div className="mt-4 pt-4 border-t space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {/* Condition Filter */}
                  <div>
                    <label className="text-sm font-medium mb-2 block">Condition</label>
                    <div className="space-y-2">
                      {(['new', 'used', 'reconditioned'] as const).map((condition) => (
                        <div key={condition} className="flex items-center space-x-2">
                          <Checkbox
                            id={condition}
                            checked={conditionFilter.includes(condition)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setConditionFilter([...conditionFilter, condition]);
                              } else {
                                setConditionFilter(conditionFilter.filter(c => c !== condition));
                              }
                            }}
                          />
                          <label htmlFor={condition} className="text-sm capitalize">
                            {condition}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Price Range Filter */}
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Price Range: {formatPrice(priceRange[0])} - {formatPrice(priceRange[1])}/kg
                    </label>
                    <Slider
                      value={priceRange}
                      onValueChange={setPriceRange}
                      max={1000}
                      min={0}
                      step={10}
                      className="w-full"
                    />
                  </div>

                  {/* Location Filter */}
                  <div>
                    <label className="text-sm font-medium mb-2 block">Location</label>
                    <Input
                      placeholder="Country or region..."
                      value={locationFilter}
                      onChange={(e) => setLocationFilter(e.target.value)}
                    />
                  </div>

                  {/* Clear Filters */}
                  <div className="flex items-end">
                    <Button
                      variant="outline"
                      onClick={() => {
                        setConditionFilter([]);
                        setPriceRange([0, 1000]);
                        setLocationFilter('');
                        setSearchQuery('');
                      }}
                      className="w-full"
                    >
                      Clear All
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Results */}
        <div className="mb-4 flex justify-between items-center">
          <p className="text-muted-foreground">
            {loading ? 'Loading...' : `${listings.length} listings found`}
          </p>
        </div>

        {/* Listings Grid/List */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <div className="w-full h-48 bg-muted rounded-t-lg" />
                <CardContent className="p-4 space-y-3">
                  <div className="h-4 bg-muted rounded w-3/4" />
                  <div className="h-3 bg-muted rounded w-1/2" />
                  <div className="h-3 bg-muted rounded w-full" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : listings.length === 0 ? (
          <Card className="p-8 text-center">
            <CardContent>
              <p className="text-muted-foreground mb-4">No listings found matching your criteria</p>
              <Button variant="outline" onClick={() => {
                setConditionFilter([]);
                setPriceRange([0, 1000]);
                setLocationFilter('');
                setSearchQuery('');
              }}>
                Clear Filters
              </Button>
            </CardContent>
          </Card>
        ) : viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {listings.map((listing) => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {listings.map((listing) => (
              <ListingCard key={listing.id} listing={listing} isListView />
            ))}
          </div>
        )}
      </main>

      <Footer />
      
      <AuthModal 
        open={authModalOpen} 
        onOpenChange={setAuthModalOpen}
      />
    </div>
  );
};

export default Marketplace;