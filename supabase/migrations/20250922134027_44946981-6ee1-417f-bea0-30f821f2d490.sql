-- Remove the problematic trigger function that uses non-existent net schema
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS public.handle_lead_signup();