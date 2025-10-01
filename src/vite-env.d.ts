/// <reference types="vite/client" />

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

declare module "*.svg" {
  const src: string
  export default src
}

export {}

