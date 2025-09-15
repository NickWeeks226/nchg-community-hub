-- Security Fix: Strengthen RLS policies and add additional security measures (Corrected)

-- 1. Add stricter RLS policies for profiles table
DROP POLICY IF EXISTS "Users can view their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;

CREATE POLICY "Users can view their own profile" 
ON public.profiles 
FOR SELECT 
TO authenticated 
USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile" 
ON public.profiles 
FOR UPDATE 
TO authenticated 
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- 2. Ensure company_profiles has proper RLS
DROP POLICY IF EXISTS "Users can view their own company profile" ON public.company_profiles;
DROP POLICY IF EXISTS "Users can insert their own company profile" ON public.company_profiles;
DROP POLICY IF EXISTS "Users can update their own company profile" ON public.company_profiles;

CREATE POLICY "Users can view their own company profile" 
ON public.company_profiles 
FOR SELECT 
TO authenticated 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own company profile" 
ON public.company_profiles 
FOR INSERT 
TO authenticated 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own company profile" 
ON public.company_profiles 
FOR UPDATE 
TO authenticated 
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- 3. Strengthen message thread policies
DROP POLICY IF EXISTS "Participants can view their threads" ON public.message_threads;
DROP POLICY IF EXISTS "Participants can update their threads" ON public.message_threads;
DROP POLICY IF EXISTS "Users can create threads" ON public.message_threads;

CREATE POLICY "Participants can view their threads" 
ON public.message_threads 
FOR SELECT 
TO authenticated 
USING (participants ? (auth.uid())::text);

CREATE POLICY "Participants can update their threads" 
ON public.message_threads 
FOR UPDATE 
TO authenticated 
USING (participants ? (auth.uid())::text)
WITH CHECK (participants ? (auth.uid())::text);

CREATE POLICY "Users can create threads" 
ON public.message_threads 
FOR INSERT 
TO authenticated 
WITH CHECK (participants ? (auth.uid())::text);

-- 4. Strengthen messages policies
DROP POLICY IF EXISTS "Participants can view their messages" ON public.messages;
DROP POLICY IF EXISTS "Recipients can update read status" ON public.messages;
DROP POLICY IF EXISTS "Users can send messages" ON public.messages;

CREATE POLICY "Participants can view their messages" 
ON public.messages 
FOR SELECT 
TO authenticated 
USING (sender_id = auth.uid() OR recipient_id = auth.uid());

CREATE POLICY "Recipients can update read status" 
ON public.messages 
FOR UPDATE 
TO authenticated 
USING (recipient_id = auth.uid())
WITH CHECK (recipient_id = auth.uid());

CREATE POLICY "Users can send messages" 
ON public.messages 
FOR INSERT 
TO authenticated 
WITH CHECK (sender_id = auth.uid());

-- 5. Ensure user_addresses has proper authentication
DROP POLICY IF EXISTS "Users can manage their own addresses" ON public.user_addresses;

CREATE POLICY "Users can manage their own addresses" 
ON public.user_addresses 
FOR ALL 
TO authenticated 
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- 6. Add security function to validate user sessions
CREATE OR REPLACE FUNCTION public.is_authenticated_user()
RETURNS boolean
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path = public
AS $$
  SELECT auth.uid() IS NOT NULL;
$$;

-- 7. Add function to log security events
CREATE OR REPLACE FUNCTION public.log_security_event(
  event_type text,
  event_details jsonb DEFAULT '{}'::jsonb
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.audit_logs (
    user_id, 
    action, 
    table_name, 
    new_values
  ) VALUES (
    auth.uid(), 
    'SECURITY_EVENT', 
    event_type, 
    event_details
  );
END;
$$;

-- 8. Ensure audit_logs has restricted access
DROP POLICY IF EXISTS "Admins can view audit logs" ON public.audit_logs;
DROP POLICY IF EXISTS "System can insert audit logs" ON public.audit_logs;

CREATE POLICY "Admins can view audit logs" 
ON public.audit_logs 
FOR SELECT 
TO authenticated 
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "System can insert audit logs" 
ON public.audit_logs 
FOR INSERT 
TO authenticated 
WITH CHECK (true);

-- 9. Add data validation triggers for sensitive fields (Fixed syntax)
CREATE OR REPLACE FUNCTION public.validate_profile_data()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Only proceed if this is an UPDATE operation
  IF TG_OP = 'UPDATE' THEN
    -- Validate email format if provided
    IF NEW.secondary_email IS NOT NULL AND NEW.secondary_email !~ '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$' THEN
      RAISE EXCEPTION 'Invalid email format for secondary_email';
    END IF;
    
    -- Sanitize text fields
    NEW.first_name = TRIM(NEW.first_name);
    NEW.last_name = TRIM(NEW.last_name);
    
    -- Log profile updates for security monitoring
    PERFORM public.log_security_event('PROFILE_UPDATE', jsonb_build_object(
      'user_id', NEW.user_id,
      'updated_fields', jsonb_build_object(
        'first_name_changed', (OLD.first_name IS DISTINCT FROM NEW.first_name),
        'last_name_changed', (OLD.last_name IS DISTINCT FROM NEW.last_name),
        'email_changed', (OLD.secondary_email IS DISTINCT FROM NEW.secondary_email)
      )
    ));
  END IF;
  
  RETURN NEW;
END;
$$;

-- Create trigger for profile validation
DROP TRIGGER IF EXISTS validate_profile_trigger ON public.profiles;
CREATE TRIGGER validate_profile_trigger
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.validate_profile_data();

-- 10. Add security context function
CREATE OR REPLACE FUNCTION public.get_security_context()
RETURNS jsonb
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path = public
AS $$
  SELECT jsonb_build_object(
    'user_id', auth.uid(),
    'user_role', (SELECT user_role FROM public.profiles WHERE user_id = auth.uid()),
    'is_authenticated', auth.uid() IS NOT NULL,
    'session_timestamp', now()
  );
$$;