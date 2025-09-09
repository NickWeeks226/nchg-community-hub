-- Fix profiles table RLS policies for proper security
-- Remove the problematic restrictive "Deny public access" policy
DROP POLICY IF EXISTS "Deny public access to profiles" ON public.profiles;

-- The existing permissive policies already provide proper access control:
-- 1. "Users can view their own profile" - allows users to see only their own data
-- 2. "Admins can view all profiles" - allows admins to see all profiles
-- 3. "Users can update their own profile" - allows users to update only their own data

-- Since RLS is enabled and we have specific permissive policies,
-- there's no need for a restrictive "deny all" policy that could block legitimate access.
-- The default behavior when no policies match is to deny access anyway.

-- Let's also ensure the profiles table has proper constraints for data integrity
-- Add constraint to ensure user_id is not null (important for RLS)
ALTER TABLE public.profiles 
ADD CONSTRAINT profiles_user_id_not_null 
CHECK (user_id IS NOT NULL);