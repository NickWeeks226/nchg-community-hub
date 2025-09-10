import { HelmetProvider } from 'react-helmet-async';

export const HelmetProviderWrapper = ({ children }: { children: React.ReactNode }) => (
  <HelmetProvider>{children}</HelmetProvider>
);