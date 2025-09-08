-- Add explicit policy to deny public access to profiles table
CREATE POLICY "Deny public access to profiles" 
ON public.profiles 
FOR SELECT 
TO public 
USING (false);