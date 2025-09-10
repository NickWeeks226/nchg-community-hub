import React from 'react';
import { useSpelling } from '@/hooks/useSpelling';

interface SpellProps {
  children: string;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
}

/**
 * Component that automatically renders text with correct spelling variant
 */
export function Spell({ children, className, as = 'span' }: SpellProps) {
  const { convertText } = useSpelling();
  const Component = as;
  
  return (
    <Component className={className}>
      {convertText(children)}
    </Component>
  );
}

interface SpellWordProps {
  word: string;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
}

/**
 * Component for single words that need spelling conversion
 */
export function SpellWord({ word, className, as = 'span' }: SpellWordProps) {
  const { spell } = useSpelling();
  const Component = as;
  
  return (
    <Component className={className}>
      {spell(word)}
    </Component>
  );
}