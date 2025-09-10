import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { SpellingVariant, getDefaultSpellingPreference } from '@/lib/spelling';
import { useAuth } from '@/hooks/use-auth';
import { supabase } from '@/integrations/supabase/client';

interface SpellingContextType {
  spellingVariant: SpellingVariant;
  setSpellingVariant: (variant: SpellingVariant) => void;
  isLoading: boolean;
}

const SpellingContext = createContext<SpellingContextType | undefined>(undefined);

interface SpellingProviderProps {
  children: ReactNode;
}

export function SpellingProvider({ children }: SpellingProviderProps) {
  const { user } = useAuth();
  const [spellingVariant, setSpellingVariantState] = useState<SpellingVariant>('british');
  const [isLoading, setIsLoading] = useState(true);

  // Load spelling preference on mount and when user changes
  useEffect(() => {
    loadSpellingPreference();
  }, [user]);

  const loadSpellingPreference = async () => {
    setIsLoading(true);
    
    try {
      if (user) {
        // Try to load from user profile
        const { data: profile, error } = await supabase
          .from('profiles')
          .select('spelling_preference')
          .eq('user_id', user.id)
          .single();

        if (!error && profile?.spelling_preference) {
          setSpellingVariantState(profile.spelling_preference as SpellingVariant);
        } else {
          // Fall back to localStorage or default
          const stored = localStorage.getItem('spelling_preference') as SpellingVariant;
          setSpellingVariantState(stored || getDefaultSpellingPreference());
        }
      } else {
        // Not logged in - use localStorage or default
        const stored = localStorage.getItem('spelling_preference') as SpellingVariant;
        setSpellingVariantState(stored || getDefaultSpellingPreference());
      }
    } catch (error) {
      console.error('Error loading spelling preference:', error);
      setSpellingVariantState(getDefaultSpellingPreference());
    } finally {
      setIsLoading(false);
    }
  };

  const setSpellingVariant = async (variant: SpellingVariant) => {
    setSpellingVariantState(variant);
    
    // Save to localStorage immediately
    localStorage.setItem('spelling_preference', variant);
    
    // Save to database if user is logged in
    if (user) {
      try {
        const { error } = await supabase
          .from('profiles')
          .update({ spelling_preference: variant })
          .eq('user_id', user.id);
        
        if (error) {
          console.error('Error saving spelling preference:', error);
        }
      } catch (error) {
        console.error('Error saving spelling preference:', error);
      }
    }
  };

  const value: SpellingContextType = {
    spellingVariant,
    setSpellingVariant,
    isLoading,
  };

  return (
    <SpellingContext.Provider value={value}>
      {children}
    </SpellingContext.Provider>
  );
}

export function useSpelling() {
  const context = useContext(SpellingContext);
  if (context === undefined) {
    throw new Error('useSpelling must be used within a SpellingProvider');
  }
  return context;
}