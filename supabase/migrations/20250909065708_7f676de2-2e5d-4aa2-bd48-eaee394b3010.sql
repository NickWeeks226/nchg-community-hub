-- Extend the existing profiles table with additional personal information fields
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS job_title TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS department TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS bio_description TEXT CHECK (char_length(bio_description) <= 500);
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS profile_picture_url TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS secondary_email TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS primary_phone TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS secondary_phone TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS phone_verified BOOLEAN DEFAULT false;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS preferred_contact_method TEXT DEFAULT 'email' CHECK (preferred_contact_method IN ('email', 'phone', 'platform_messages'));
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS profile_visibility TEXT DEFAULT 'members' CHECK (profile_visibility IN ('public', 'members', 'private'));
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS contact_visibility TEXT DEFAULT 'members' CHECK (contact_visibility IN ('public', 'members', 'private'));
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS show_online_status BOOLEAN DEFAULT true;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS last_profile_update TIMESTAMP WITH TIME ZONE DEFAULT now();

-- Create user addresses table
CREATE TABLE IF NOT EXISTS public.user_addresses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  address_type TEXT NOT NULL CHECK (address_type IN ('primary', 'billing', 'shipping')),
  street_address TEXT NOT NULL,
  address_line_2 TEXT,
  city TEXT NOT NULL,
  county_state TEXT,
  postal_code TEXT NOT NULL,
  country_code TEXT NOT NULL DEFAULT 'GB',
  is_default BOOLEAN DEFAULT false,
  address_verified BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(user_id, address_type)
);

-- Enable RLS on user_addresses table
ALTER TABLE public.user_addresses ENABLE ROW LEVEL SECURITY;

-- Create policies for user_addresses
CREATE POLICY "Users can manage their own addresses"
ON public.user_addresses
FOR ALL
USING (auth.uid() = user_id);

-- Create function to update the last_profile_update timestamp
CREATE OR REPLACE FUNCTION public.update_last_profile_update()
RETURNS TRIGGER AS $$
BEGIN
  NEW.last_profile_update = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to automatically update last_profile_update
DROP TRIGGER IF EXISTS update_profile_timestamp ON public.profiles;
CREATE TRIGGER update_profile_timestamp
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_last_profile_update();

-- Create trigger for updated_at on user_addresses
CREATE TRIGGER update_user_addresses_updated_at
  BEFORE UPDATE ON public.user_addresses
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();