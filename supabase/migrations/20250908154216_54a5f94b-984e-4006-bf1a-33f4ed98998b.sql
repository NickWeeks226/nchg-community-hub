-- Create enum types
CREATE TYPE public.app_role AS ENUM ('individual', 'company_rep', 'verified_supplier', 'service_provider', 'admin');
CREATE TYPE public.account_status AS ENUM ('active', 'suspended', 'pending');
CREATE TYPE public.verification_status AS ENUM ('pending', 'verified', 'rejected');
CREATE TYPE public.powder_condition AS ENUM ('new', 'used', 'reconditioned');
CREATE TYPE public.listing_status AS ENUM ('active', 'sold', 'suspended');
CREATE TYPE public.certification_type AS ENUM ('material_certificate', 'coa', 'astm', 'ams', 'other');
CREATE TYPE public.manufacturing_method AS ENUM ('gas_atomized', 'plasma_atomized', 'other');
CREATE TYPE public.message_type AS ENUM ('inquiry', 'response', 'general');
CREATE TYPE public.thread_status AS ENUM ('active', 'archived', 'closed');

-- Create profiles table for additional user information
CREATE TABLE public.profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    phone_number TEXT,
    user_role public.app_role NOT NULL DEFAULT 'individual',
    account_status public.account_status NOT NULL DEFAULT 'pending',
    email_verified BOOLEAN NOT NULL DEFAULT false,
    last_login TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create company profiles table
CREATE TABLE public.company_profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
    company_name TEXT NOT NULL,
    registration_number TEXT,
    vat_number TEXT,
    industry_sector TEXT,
    employee_count INTEGER,
    annual_revenue_range TEXT,
    website_url TEXT,
    description TEXT,
    certifications JSONB DEFAULT '[]',
    verification_status public.verification_status NOT NULL DEFAULT 'pending',
    verification_documents JSONB DEFAULT '[]',
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create user roles table for role management
CREATE TABLE public.user_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    role public.app_role NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    UNIQUE(user_id, role)
);

-- Create product listings table
CREATE TABLE public.product_listings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    seller_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    powder_condition public.powder_condition NOT NULL,
    quantity_kg DECIMAL(10,2) NOT NULL CHECK (quantity_kg > 0),
    price_per_kg DECIMAL(10,2) NOT NULL CHECK (price_per_kg > 0),
    total_price DECIMAL(10,2) GENERATED ALWAYS AS (quantity_kg * price_per_kg) STORED,
    listing_status public.listing_status NOT NULL DEFAULT 'active',
    location_country TEXT,
    location_region TEXT,
    images JSONB DEFAULT '[]',
    views_count INTEGER NOT NULL DEFAULT 0,
    inquiries_count INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create Ti64 specifications table
CREATE TABLE public.ti64_specifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    listing_id UUID NOT NULL REFERENCES public.product_listings(id) ON DELETE CASCADE,
    particle_size_range TEXT,
    d10_microns DECIMAL(8,2),
    d50_microns DECIMAL(8,2),
    d90_microns DECIMAL(8,2),
    flowability_rating TEXT,
    apparent_density DECIMAL(8,2),
    tap_density DECIMAL(8,2),
    moisture_content DECIMAL(8,4),
    oxygen_content_ppm INTEGER,
    nitrogen_content_ppm INTEGER,
    carbon_content_ppm INTEGER,
    hydrogen_content_ppm INTEGER,
    manufacturing_method public.manufacturing_method,
    previous_use_cycles INTEGER,
    storage_conditions TEXT,
    shelf_life_remaining TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create quality certifications table
CREATE TABLE public.quality_certifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    listing_id UUID NOT NULL REFERENCES public.product_listings(id) ON DELETE CASCADE,
    certification_type public.certification_type NOT NULL,
    issuing_authority TEXT,
    certificate_number TEXT,
    issue_date DATE,
    expiry_date DATE,
    document_url TEXT,
    verification_status public.verification_status NOT NULL DEFAULT 'pending',
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create message threads table
CREATE TABLE public.message_threads (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    participants JSONB NOT NULL,
    subject TEXT,
    thread_status public.thread_status NOT NULL DEFAULT 'active',
    related_listing_id UUID REFERENCES public.product_listings(id),
    last_message_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create messages table
CREATE TABLE public.messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    thread_id UUID NOT NULL REFERENCES public.message_threads(id) ON DELETE CASCADE,
    sender_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    recipient_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    listing_id UUID REFERENCES public.product_listings(id),
    subject TEXT,
    message_content TEXT NOT NULL,
    attachments JSONB DEFAULT '[]',
    message_type public.message_type NOT NULL DEFAULT 'general',
    read_status BOOLEAN NOT NULL DEFAULT false,
    sent_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create saved searches table
CREATE TABLE public.saved_searches (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    search_name TEXT NOT NULL,
    search_parameters JSONB NOT NULL,
    alert_enabled BOOLEAN NOT NULL DEFAULT false,
    last_run TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.company_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_listings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ti64_specifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quality_certifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.message_threads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.saved_searches ENABLE ROW LEVEL SECURITY;

-- Create security definer function to check user roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role public.app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- Create function to get current user profile
CREATE OR REPLACE FUNCTION public.get_current_user_profile()
RETURNS TABLE (
    user_id UUID,
    user_role public.app_role,
    account_status public.account_status
)
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT user_id, user_role, account_status
  FROM public.profiles
  WHERE user_id = auth.uid()
$$;

-- Create RLS policies for profiles
CREATE POLICY "Users can view their own profile" ON public.profiles
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile" ON public.profiles
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all profiles" ON public.profiles
    FOR SELECT USING (public.has_role(auth.uid(), 'admin'));

-- Create RLS policies for company profiles
CREATE POLICY "Users can view their own company profile" ON public.company_profiles
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own company profile" ON public.company_profiles
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own company profile" ON public.company_profiles
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all company profiles" ON public.company_profiles
    FOR SELECT USING (public.has_role(auth.uid(), 'admin'));

-- Create RLS policies for user roles
CREATE POLICY "Users can view their own roles" ON public.user_roles
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage all roles" ON public.user_roles
    FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- Create RLS policies for product listings
CREATE POLICY "Anyone can view active listings" ON public.product_listings
    FOR SELECT USING (listing_status = 'active');

CREATE POLICY "Users can create their own listings" ON public.product_listings
    FOR INSERT WITH CHECK (auth.uid() = seller_id);

CREATE POLICY "Users can update their own listings" ON public.product_listings
    FOR UPDATE USING (auth.uid() = seller_id);

CREATE POLICY "Users can delete their own listings" ON public.product_listings
    FOR DELETE USING (auth.uid() = seller_id);

CREATE POLICY "Admins can manage all listings" ON public.product_listings
    FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- Create RLS policies for specifications
CREATE POLICY "Anyone can view specifications for active listings" ON public.ti64_specifications
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.product_listings 
            WHERE id = listing_id AND listing_status = 'active'
        )
    );

CREATE POLICY "Listing owners can manage specifications" ON public.ti64_specifications
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.product_listings 
            WHERE id = listing_id AND seller_id = auth.uid()
        )
    );

-- Create RLS policies for certifications
CREATE POLICY "Anyone can view certifications for active listings" ON public.quality_certifications
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.product_listings 
            WHERE id = listing_id AND listing_status = 'active'
        )
    );

CREATE POLICY "Listing owners can manage certifications" ON public.quality_certifications
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.product_listings 
            WHERE id = listing_id AND seller_id = auth.uid()
        )
    );

-- Create RLS policies for message threads
CREATE POLICY "Participants can view their threads" ON public.message_threads
    FOR SELECT USING (participants ? auth.uid()::text);

CREATE POLICY "Users can create threads" ON public.message_threads
    FOR INSERT WITH CHECK (participants ? auth.uid()::text);

CREATE POLICY "Participants can update their threads" ON public.message_threads
    FOR UPDATE USING (participants ? auth.uid()::text);

-- Create RLS policies for messages
CREATE POLICY "Participants can view their messages" ON public.messages
    FOR SELECT USING (sender_id = auth.uid() OR recipient_id = auth.uid());

CREATE POLICY "Users can send messages" ON public.messages
    FOR INSERT WITH CHECK (sender_id = auth.uid());

CREATE POLICY "Recipients can update read status" ON public.messages
    FOR UPDATE USING (recipient_id = auth.uid());

-- Create RLS policies for saved searches
CREATE POLICY "Users can manage their own saved searches" ON public.saved_searches
    FOR ALL USING (auth.uid() = user_id);

-- Create function to handle new user profile creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (user_id, first_name, last_name, user_role)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data ->> 'first_name', 'User'),
    COALESCE(NEW.raw_user_meta_data ->> 'last_name', ''),
    COALESCE((NEW.raw_user_meta_data ->> 'user_role')::public.app_role, 'individual')
  );
  
  -- Insert default role
  INSERT INTO public.user_roles (user_id, role)
  VALUES (NEW.id, COALESCE((NEW.raw_user_meta_data ->> 'user_role')::public.app_role, 'individual'));
  
  RETURN NEW;
END;
$$;

-- Create trigger for new user profile creation
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_profiles_updated_at
    BEFORE UPDATE ON public.profiles
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_company_profiles_updated_at
    BEFORE UPDATE ON public.company_profiles
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_product_listings_updated_at
    BEFORE UPDATE ON public.product_listings
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_ti64_specifications_updated_at
    BEFORE UPDATE ON public.ti64_specifications
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_quality_certifications_updated_at
    BEFORE UPDATE ON public.quality_certifications
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_message_threads_updated_at
    BEFORE UPDATE ON public.message_threads
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_saved_searches_updated_at
    BEFORE UPDATE ON public.saved_searches
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

-- Create indexes for better performance
CREATE INDEX idx_profiles_user_id ON public.profiles(user_id);
CREATE INDEX idx_company_profiles_user_id ON public.company_profiles(user_id);
CREATE INDEX idx_user_roles_user_id ON public.user_roles(user_id);
CREATE INDEX idx_product_listings_seller_id ON public.product_listings(seller_id);
CREATE INDEX idx_product_listings_status ON public.product_listings(listing_status);
CREATE INDEX idx_product_listings_condition ON public.product_listings(powder_condition);
CREATE INDEX idx_ti64_specifications_listing_id ON public.ti64_specifications(listing_id);
CREATE INDEX idx_quality_certifications_listing_id ON public.quality_certifications(listing_id);
CREATE INDEX idx_messages_thread_id ON public.messages(thread_id);
CREATE INDEX idx_messages_sender_id ON public.messages(sender_id);
CREATE INDEX idx_messages_recipient_id ON public.messages(recipient_id);
CREATE INDEX idx_saved_searches_user_id ON public.saved_searches(user_id);