-- Set up storage buckets for images and documents
INSERT INTO storage.buckets (id, name, public) VALUES 
  ('listing-images', 'listing-images', true),
  ('certificates', 'certificates', false);

-- Create policies for listing images (public)
CREATE POLICY "Anyone can view listing images" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'listing-images');

CREATE POLICY "Authenticated users can upload listing images" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'listing-images' AND auth.uid() IS NOT NULL);

CREATE POLICY "Users can update their own listing images" 
ON storage.objects 
FOR UPDATE 
USING (bucket_id = 'listing-images' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can delete their own listing images" 
ON storage.objects 
FOR DELETE 
USING (bucket_id = 'listing-images' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Create policies for certificates (private)
CREATE POLICY "Users can view certificates for their own listings" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'certificates' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Authenticated users can upload certificates" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'certificates' AND auth.uid() IS NOT NULL);

CREATE POLICY "Users can update their own certificates" 
ON storage.objects 
FOR UPDATE 
USING (bucket_id = 'certificates' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can delete their own certificates" 
ON storage.objects 
FOR DELETE 
USING (bucket_id = 'certificates' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Also allow certificate viewing for listing inquiries
CREATE POLICY "Users can view certificates for active listings they're inquiring about" 
ON storage.objects 
FOR SELECT 
USING (
  bucket_id = 'certificates' AND 
  EXISTS (
    SELECT 1 FROM product_listings pl
    WHERE pl.listing_status = 'active' AND
    pl.id::text = split_part((storage.foldername(name))[2], '-', 1)
  )
);