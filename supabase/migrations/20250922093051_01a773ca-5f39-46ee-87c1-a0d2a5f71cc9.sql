-- Create a function to call the edge function when a new user signs up
CREATE OR REPLACE FUNCTION public.handle_lead_signup()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $$
DECLARE
  response_status INTEGER;
  response_body TEXT;
BEGIN
  -- Call the edge function to process the lead signup
  PERFORM
    net.http_post(
      url := 'https://zvrnwhjiomtraaphfzmk.supabase.co/functions/v1/process-lead-signup',
      headers := jsonb_build_object(
        'Content-Type', 'application/json',
        'Authorization', 'Bearer ' || current_setting('app.settings.service_role_key', true)
      ),
      body := jsonb_build_object(
        'id', NEW.id,
        'email', NEW.email,
        'raw_user_meta_data', NEW.raw_user_meta_data
      )
    );

  -- Log the signup event for audit purposes
  INSERT INTO public.audit_logs (
    user_id,
    action,
    table_name,
    new_values
  ) VALUES (
    NEW.id,
    'LEAD_SIGNUP_PROCESSED',
    'auth.users',
    jsonb_build_object(
      'email', NEW.email,
      'signup_timestamp', NEW.created_at,
      'metadata', NEW.raw_user_meta_data
    )
  );

  RETURN NEW;
END;
$$;

-- Create trigger to fire the function when a new user is created
DROP TRIGGER IF EXISTS on_auth_user_signup_lead_capture ON auth.users;
CREATE TRIGGER on_auth_user_signup_lead_capture
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_lead_signup();