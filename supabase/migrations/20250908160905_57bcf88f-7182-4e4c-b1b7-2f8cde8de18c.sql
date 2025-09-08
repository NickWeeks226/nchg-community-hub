-- Add explicit deny policies to all sensitive tables to prevent anonymous access

-- Profiles table - deny public access
CREATE POLICY "Deny public access to profiles" 
ON public.profiles 
FOR SELECT 
TO public 
USING (false);

-- Messages table - deny public access
CREATE POLICY "Deny public access to messages" 
ON public.messages 
FOR SELECT 
TO public 
USING (false);

-- Message threads table - deny public access
CREATE POLICY "Deny public access to message threads" 
ON public.message_threads 
FOR SELECT 
TO public 
USING (false);

-- Saved searches table - deny public access
CREATE POLICY "Deny public access to saved searches" 
ON public.saved_searches 
FOR SELECT 
TO public 
USING (false);

-- User roles table - deny public access
CREATE POLICY "Deny public access to user roles" 
ON public.user_roles 
FOR SELECT 
TO public 
USING (false);

-- Audit logs table - deny public access
CREATE POLICY "Deny public access to audit logs" 
ON public.audit_logs 
FOR SELECT 
TO public 
USING (false);