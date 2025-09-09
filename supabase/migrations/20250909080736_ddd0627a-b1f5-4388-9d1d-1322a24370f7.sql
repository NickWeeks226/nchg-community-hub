-- Company Profile Management Tables
CREATE TABLE IF NOT EXISTS public.company_verification_documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_profile_id UUID NOT NULL REFERENCES public.company_profiles(id) ON DELETE CASCADE,
  document_type TEXT NOT NULL CHECK (document_type IN ('incorporation', 'vat', 'insurance', 'certification', 'bank_statement', 'other')),
  document_name TEXT NOT NULL,
  document_url TEXT NOT NULL,
  upload_date TIMESTAMP WITH TIME ZONE DEFAULT now(),
  verification_status TEXT DEFAULT 'pending' CHECK (verification_status IN ('pending', 'approved', 'rejected')),
  rejection_reason TEXT,
  expiry_date DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.team_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_profile_id UUID NOT NULL REFERENCES public.company_profiles(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('admin', 'procurement_manager', 'sales_manager', 'viewer')),
  invited_by_user_id UUID NOT NULL REFERENCES auth.users(id),
  invitation_email TEXT NOT NULL,
  invitation_date TIMESTAMP WITH TIME ZONE DEFAULT now(),
  joined_date TIMESTAMP WITH TIME ZONE,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'active', 'suspended')),
  permissions JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- User Preferences Tables
CREATE TABLE IF NOT EXISTS public.user_notification_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  notification_type TEXT NOT NULL CHECK (notification_type IN ('email', 'sms', 'in_app')),
  event_type TEXT NOT NULL CHECK (event_type IN ('new_message', 'listing_activity', 'price_alert', 'account_updates', 'marketing', 'platform_updates', 'security_alerts')),
  is_enabled BOOLEAN DEFAULT true,
  frequency TEXT DEFAULT 'immediate' CHECK (frequency IN ('immediate', 'daily', 'weekly', 'never')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(user_id, notification_type, event_type)
);

CREATE TABLE IF NOT EXISTS public.user_marketplace_preferences (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  currency TEXT DEFAULT 'GBP' CHECK (currency IN ('GBP', 'EUR', 'USD')),
  weight_units TEXT DEFAULT 'kg' CHECK (weight_units IN ('kg', 'lbs')),
  temperature_units TEXT DEFAULT 'celsius' CHECK (temperature_units IN ('celsius', 'fahrenheit')),
  distance_units TEXT DEFAULT 'km' CHECK (distance_units IN ('km', 'miles')),
  date_format TEXT DEFAULT 'DD/MM/YYYY' CHECK (date_format IN ('DD/MM/YYYY', 'MM/DD/YYYY')),
  timezone TEXT DEFAULT 'Europe/London',
  language TEXT DEFAULT 'en',
  default_search_radius INTEGER DEFAULT 50,
  preferred_particle_size_range TEXT,
  preferred_powder_condition TEXT,
  price_range_min DECIMAL,
  price_range_max DECIMAL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(user_id)
);

-- Activity History & Analytics Tables
CREATE TABLE IF NOT EXISTS public.user_analytics_summary (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  metric_date DATE NOT NULL,
  total_logins INTEGER DEFAULT 0,
  total_listings_created INTEGER DEFAULT 0,
  total_messages_sent INTEGER DEFAULT 0,
  total_searches_performed INTEGER DEFAULT 0,
  total_listings_viewed INTEGER DEFAULT 0,
  total_inquiries_received INTEGER DEFAULT 0,
  response_rate_percentage DECIMAL DEFAULT 0,
  average_response_time_hours DECIMAL DEFAULT 0,
  revenue_amount DECIMAL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(user_id, metric_date)
);

-- Enable RLS on all new tables
ALTER TABLE public.company_verification_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_notification_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_marketplace_preferences ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_analytics_summary ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for company verification documents
CREATE POLICY "Company owners can manage verification documents"
ON public.company_verification_documents
FOR ALL
USING (
  EXISTS (
    SELECT 1 FROM public.company_profiles 
    WHERE id = company_verification_documents.company_profile_id 
    AND user_id = auth.uid()
  )
);

-- Create RLS policies for team members
CREATE POLICY "Company admins can manage team members"
ON public.team_members
FOR ALL
USING (
  EXISTS (
    SELECT 1 FROM public.company_profiles 
    WHERE id = team_members.company_profile_id 
    AND user_id = auth.uid()
  )
);

CREATE POLICY "Team members can view their own record"
ON public.team_members
FOR SELECT
USING (user_id = auth.uid());

-- Create RLS policies for notification settings
CREATE POLICY "Users can manage their own notification settings"
ON public.user_notification_settings
FOR ALL
USING (auth.uid() = user_id);

-- Create RLS policies for marketplace preferences
CREATE POLICY "Users can manage their own marketplace preferences"
ON public.user_marketplace_preferences
FOR ALL
USING (auth.uid() = user_id);

-- Create RLS policies for analytics summary
CREATE POLICY "Users can view their own analytics"
ON public.user_analytics_summary
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "System can insert analytics"
ON public.user_analytics_summary
FOR INSERT
WITH CHECK (true);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_company_verification_documents_company_id ON public.company_verification_documents(company_profile_id);
CREATE INDEX IF NOT EXISTS idx_team_members_company_id ON public.team_members(company_profile_id);
CREATE INDEX IF NOT EXISTS idx_team_members_user_id ON public.team_members(user_id);
CREATE INDEX IF NOT EXISTS idx_user_notification_settings_user_id ON public.user_notification_settings(user_id);
CREATE INDEX IF NOT EXISTS idx_user_marketplace_preferences_user_id ON public.user_marketplace_preferences(user_id);
CREATE INDEX IF NOT EXISTS idx_user_analytics_summary_user_date ON public.user_analytics_summary(user_id, metric_date);

-- Create triggers for updated_at
CREATE TRIGGER update_company_verification_documents_updated_at
  BEFORE UPDATE ON public.company_verification_documents
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_team_members_updated_at
  BEFORE UPDATE ON public.team_members
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_user_notification_settings_updated_at
  BEFORE UPDATE ON public.user_notification_settings
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_user_marketplace_preferences_updated_at
  BEFORE UPDATE ON public.user_marketplace_preferences
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_user_analytics_summary_updated_at
  BEFORE UPDATE ON public.user_analytics_summary
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();