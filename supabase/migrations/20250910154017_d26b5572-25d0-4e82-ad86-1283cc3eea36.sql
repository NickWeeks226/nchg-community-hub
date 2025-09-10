-- Add spelling preference to profiles table
ALTER TABLE public.profiles 
ADD COLUMN spelling_preference text DEFAULT 'british' CHECK (spelling_preference IN ('british', 'american'));