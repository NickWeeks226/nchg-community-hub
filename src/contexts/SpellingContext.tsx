import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { SpellingVariant, getDefaultSpellingPreference } from '@/lib/spelling';

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
  const [spellingVariant, setSpellingVariantState] = useState<SpellingVariant>('british');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem('spelling_preference') as SpellingVariant | null;
    setSpellingVariantState(stored || getDefaultSpellingPreference());
    setIsLoading(false);
  }, []);

  const setSpellingVariant = (variant: SpellingVariant) => {
    setSpellingVariantState(variant);
    localStorage.setItem('spelling_preference', variant);
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