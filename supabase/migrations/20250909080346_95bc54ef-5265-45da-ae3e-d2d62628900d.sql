-- Create user dashboard metrics table
CREATE TABLE IF NOT EXISTS public.user_dashboard_metrics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  metric_type TEXT NOT NULL CHECK (metric_type IN ('active_listings', 'total_views', 'messages_pending', 'account_score', 'saved_searches', 'inquiries_sent', 'completion_percentage')),
  metric_value INTEGER NOT NULL DEFAULT 0,
  last_updated TIMESTAMP WITH TIME ZONE DEFAULT now(),
  is_visible BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(user_id, metric_type)
);

-- Create activity feed table  
CREATE TABLE IF NOT EXISTS public.user_activity_feed (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  activity_type TEXT NOT NULL CHECK (activity_type IN ('login', 'logout', 'profile_updated', 'listing_created', 'listing_updated', 'message_sent', 'message_received', 'search_performed', 'inquiry_sent', 'inquiry_received')),
  activity_description TEXT NOT NULL,
  related_entity_type TEXT CHECK (related_entity_type IN ('listing', 'message', 'user', 'transaction', 'search')),
  related_entity_id UUID,
  activity_timestamp TIMESTAMP WITH TIME ZONE DEFAULT now(),
  is_read BOOLEAN DEFAULT false,
  metadata JSONB DEFAULT '{}'::jsonb
);

-- Enable RLS on both tables
ALTER TABLE public.user_dashboard_metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_activity_feed ENABLE ROW LEVEL SECURITY;

-- Create policies for user_dashboard_metrics
CREATE POLICY "Users can manage their own metrics"
ON public.user_dashboard_metrics
FOR ALL
USING (auth.uid() = user_id);

-- Create policies for user_activity_feed  
CREATE POLICY "Users can view their own activity"
ON public.user_activity_feed
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "System can insert activity"
ON public.user_activity_feed
FOR INSERT
WITH CHECK (true);

CREATE POLICY "Users can update read status"
ON public.user_activity_feed
FOR UPDATE
USING (auth.uid() = user_id);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_user_dashboard_metrics_user_id ON public.user_dashboard_metrics(user_id);
CREATE INDEX IF NOT EXISTS idx_user_dashboard_metrics_type ON public.user_dashboard_metrics(user_id, metric_type);
CREATE INDEX IF NOT EXISTS idx_user_activity_feed_user_id ON public.user_activity_feed(user_id);
CREATE INDEX IF NOT EXISTS idx_user_activity_feed_timestamp ON public.user_activity_feed(user_id, activity_timestamp DESC);

-- Create function to initialize default metrics for new users
CREATE OR REPLACE FUNCTION public.initialize_user_metrics(p_user_id UUID)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.user_dashboard_metrics (user_id, metric_type, metric_value) VALUES
    (p_user_id, 'active_listings', 0),
    (p_user_id, 'total_views', 0),
    (p_user_id, 'messages_pending', 0),
    (p_user_id, 'account_score', 75),
    (p_user_id, 'completion_percentage', 25)
  ON CONFLICT (user_id, metric_type) DO NOTHING;
END;
$$;

-- Create function to log user activity
CREATE OR REPLACE FUNCTION public.log_user_activity(
  p_user_id UUID,
  p_activity_type TEXT,
  p_description TEXT,
  p_entity_type TEXT DEFAULT NULL,
  p_entity_id UUID DEFAULT NULL,
  p_metadata JSONB DEFAULT '{}'::jsonb
)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.user_activity_feed (
    user_id, 
    activity_type, 
    activity_description, 
    related_entity_type, 
    related_entity_id, 
    metadata
  ) VALUES (
    p_user_id, 
    p_activity_type, 
    p_description, 
    p_entity_type, 
    p_entity_id, 
    p_metadata
  );
END;
$$;