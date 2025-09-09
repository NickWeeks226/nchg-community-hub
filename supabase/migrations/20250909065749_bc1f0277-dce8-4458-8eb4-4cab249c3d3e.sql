-- Fix the search path security issue for the update function
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