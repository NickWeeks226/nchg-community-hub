-- Remove the problematic trigger and function that uses non-existent net schema
DROP TRIGGER IF EXISTS on_auth_user_signup_lead_capture ON auth.users;
DROP FUNCTION IF EXISTS public.handle_lead_signup() CASCADE;