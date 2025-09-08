-- Fix remaining security issues identified in scan

-- Remove the confusing deny policy on profiles table
DROP POLICY IF EXISTS "Deny public access to profiles" ON public.profiles;

-- Add explicit deny policy for company_profiles table to prevent accidental exposure
CREATE POLICY "Deny public access to company profiles" 
ON public.company_profiles 
FOR SELECT 
TO public 
USING (false);