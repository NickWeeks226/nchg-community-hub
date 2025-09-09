-- Fix the search path security issue by dropping trigger first, then function, then recreating both
DROP TRIGGER IF EXISTS update_profile_timestamp ON public.profiles;
DROP FUNCTION IF EXISTS public.update_last_profile_update();

CREATE OR REPLACE FUNCTION public.update_last_profile_update()
RETURNS TRIGGER 
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  NEW.last_profile_update = now();
  RETURN NEW;
END;
$$;

-- Recreate the trigger
CREATE TRIGGER update_profile_timestamp
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_last_profile_update();