// Spelling system utility functions
export type SpellingVariant = 'british' | 'american';

// Comprehensive spelling mapping object
export const spellingMappings: Record<string, Record<SpellingVariant, string>> = {
  // -ize/-ise endings
  'optimize': { british: 'optimise', american: 'optimize' },
  'optimization': { british: 'optimisation', american: 'optimization' },
  'optimizing': { british: 'optimising', american: 'optimizing' },
  'optimized': { british: 'optimised', american: 'optimized' },
  'realize': { british: 'realise', american: 'realize' },
  'realizing': { british: 'realising', american: 'realizing' },
  'realized': { british: 'realised', american: 'realized' },
  'realization': { british: 'realisation', american: 'realization' },
  'recognize': { british: 'recognise', american: 'recognize' },
  'recognizing': { british: 'recognising', american: 'recognizing' },
  'recognized': { british: 'recognised', american: 'recognized' },
  'recognition': { british: 'recognition', american: 'recognition' },
  'organize': { british: 'organise', american: 'organize' },
  'organizing': { british: 'organising', american: 'organizing' },
  'organized': { british: 'organised', american: 'organized' },
  'organization': { british: 'organisation', american: 'organization' },
  'utilize': { british: 'utilise', american: 'utilize' },
  'utilizing': { british: 'utilising', american: 'utilizing' },
  'utilized': { british: 'utilised', american: 'utilized' },
  'utilization': { british: 'utilisation', american: 'utilization' },
  'maximize': { british: 'maximise', american: 'maximize' },
  'maximizing': { british: 'maximising', american: 'maximizing' },
  'maximized': { british: 'maximised', american: 'maximized' },
  'minimization': { british: 'minimisation', american: 'minimization' },
  'minimize': { british: 'minimise', american: 'minimize' },
  'minimizing': { british: 'minimising', american: 'minimizing' },
  'minimized': { british: 'minimised', american: 'minimized' },
  'analyze': { british: 'analyse', american: 'analyze' },
  'analyzing': { british: 'analysing', american: 'analyzing' },
  'analyzed': { british: 'analysed', american: 'analyzed' },
  'analysis': { british: 'analysis', american: 'analysis' },
  'customize': { british: 'customise', american: 'customize' },
  'customizing': { british: 'customising', american: 'customizing' },
  'customized': { british: 'customised', american: 'customized' },
  'customization': { british: 'customisation', american: 'customization' },
  'specialize': { british: 'specialise', american: 'specialize' },
  'specializing': { british: 'specialising', american: 'specializing' },
  'specialized': { british: 'specialised', american: 'specialized' },
  'specialization': { british: 'specialisation', american: 'specialization' },

  // -or/-our endings
  'color': { british: 'colour', american: 'color' },
  'colors': { british: 'colours', american: 'colors' },
  'colored': { british: 'coloured', american: 'colored' },
  'coloring': { british: 'colouring', american: 'coloring' },
  'flavor': { british: 'flavour', american: 'flavor' },
  'flavors': { british: 'flavours', american: 'flavors' },
  'honor': { british: 'honour', american: 'honor' },
  'honors': { british: 'honours', american: 'honors' },
  'behavior': { british: 'behaviour', american: 'behavior' },
  'behaviors': { british: 'behaviours', american: 'behaviors' },

  // -er/-re endings  
  'center': { british: 'centre', american: 'center' },
  'centers': { british: 'centres', american: 'centers' },
  'centered': { british: 'centred', american: 'centered' },
  'centering': { british: 'centring', american: 'centering' },
  'theater': { british: 'theatre', american: 'theater' },
  'theaters': { british: 'theatres', american: 'theaters' },
  'meter': { british: 'metre', american: 'meter' },
  'meters': { british: 'metres', american: 'meters' },
  'fiber': { british: 'fibre', american: 'fiber' },
  'fibers': { british: 'fibres', american: 'fibers' },

  // -ense/-ence
  'defense': { british: 'defence', american: 'defense' },
  'license': { british: 'licence', american: 'license' },
  'offense': { british: 'offence', american: 'offense' },

  // Double l
  'modeling': { british: 'modelling', american: 'modeling' },
  'modeled': { british: 'modelled', american: 'modeled' },
  'traveling': { british: 'travelling', american: 'traveling' },
  'traveled': { british: 'travelled', american: 'traveled' },
  'canceling': { british: 'cancelling', american: 'canceling' },
  'canceled': { british: 'cancelled', american: 'canceled' },

  // Other common differences
  'gray': { british: 'grey', american: 'gray' },
  'aluminum': { british: 'aluminium', american: 'aluminum' },
  'check': { british: 'check', american: 'check' }, // Same in both
  'program': { british: 'programme', american: 'program' },
  'programs': { british: 'programmes', american: 'programs' },
};

/**
 * Get the correct spelling variant for a word
 */
export function getSpelling(word: string, variant: SpellingVariant): string {
  const lowerWord = word.toLowerCase();
  const mapping = spellingMappings[lowerWord];
  
  if (!mapping) {
    return word; // Return original word if no mapping exists
  }
  
  const correctSpelling = mapping[variant];
  
  // Preserve original case
  if (word === word.toUpperCase()) {
    return correctSpelling.toUpperCase();
  } else if (word[0] === word[0].toUpperCase()) {
    return correctSpelling.charAt(0).toUpperCase() + correctSpelling.slice(1);
  }
  
  return correctSpelling;
}

/**
 * Convert a text string to use the specified spelling variant
 */
export function convertTextSpelling(text: string, variant: SpellingVariant): string {
  let result = text;
  
  // Sort by length descending to handle longer words first
  const sortedWords = Object.keys(spellingMappings).sort((a, b) => b.length - a.length);
  
  for (const word of sortedWords) {
    const mapping = spellingMappings[word];
    const targetSpelling = mapping[variant];
    
    // Replace all case variations
    const patterns = [
      new RegExp(`\\b${word}\\b`, 'g'), // lowercase
      new RegExp(`\\b${word.charAt(0).toUpperCase()}${word.slice(1)}\\b`, 'g'), // Title case
      new RegExp(`\\b${word.toUpperCase()}\\b`, 'g'), // UPPERCASE
    ];
    
    const replacements = [
      targetSpelling,
      targetSpelling.charAt(0).toUpperCase() + targetSpelling.slice(1),
      targetSpelling.toUpperCase(),
    ];
    
    patterns.forEach((pattern, index) => {
      result = result.replace(pattern, replacements[index]);
    });
  }
  
  return result;
}

/**
 * Get default spelling preference based on locale
 */
export function getDefaultSpellingPreference(): SpellingVariant {
  if (typeof window !== 'undefined') {
    const locale = navigator.language || 'en-GB';
    return locale.startsWith('en-US') ? 'american' : 'british';
  }
  return 'british'; // Default to British for NCHG
}
