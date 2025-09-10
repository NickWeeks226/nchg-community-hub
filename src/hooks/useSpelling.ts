import { useSpelling as useSpellingContext } from '@/contexts/SpellingContext';
import { getSpelling, convertTextSpelling, SpellingVariant } from '@/lib/spelling';

/**
 * Hook for getting correctly spelled words and text
 */
export function useSpelling() {
  const { spellingVariant, setSpellingVariant, isLoading } = useSpellingContext();

  /**
   * Get the correct spelling of a word based on current preference
   */
  const spell = (word: string): string => {
    return getSpelling(word, spellingVariant);
  };

  /**
   * Convert entire text to use current spelling preference
   */
  const convertText = (text: string): string => {
    return convertTextSpelling(text, spellingVariant);
  };

  /**
   * Get a specific spelling variant regardless of current preference
   */
  const getVariant = (word: string, variant: SpellingVariant): string => {
    return getSpelling(word, variant);
  };

  return {
    spell,
    convertText,
    getVariant,
    spellingVariant,
    setSpellingVariant,
    isLoading,
  };
}