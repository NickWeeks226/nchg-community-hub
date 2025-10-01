// Google Analytics 4 Event Tracking Utility

export interface GAEvent {
  action: string;
  category: string;
  label?: string;
  value?: number;
}

/**
 * Send a custom event to Google Analytics 4
 */
export const trackEvent = (event: GAEvent) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', event.action, {
      event_category: event.category,
      event_label: event.label,
      value: event.value,
    });
  }
};

/**
 * Track page views in GA4
 */
export const trackPageView = (url: string, title?: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'page_view', {
      page_path: url,
      page_title: title || document.title,
      page_location: window.location.href,
    });
  }
};

/**
 * Track form submissions
 */
export const trackFormSubmission = (formName: string) => {
  trackEvent({
    action: 'form_submission',
    category: 'engagement',
    label: formName,
  });
};

/**
 * Track button clicks
 */
export const trackButtonClick = (buttonName: string, location: string) => {
  trackEvent({
    action: 'button_click',
    category: 'engagement',
    label: `${location} - ${buttonName}`,
  });
};

/**
 * Track external link clicks
 */
export const trackExternalLink = (url: string) => {
  trackEvent({
    action: 'external_link_click',
    category: 'engagement',
    label: url,
  });
};

/**
 * Track file downloads
 */
export const trackDownload = (fileName: string) => {
  trackEvent({
    action: 'file_download',
    category: 'engagement',
    label: fileName,
  });
};

/**
 * Track user engagement time
 */
export const trackEngagement = (contentType: string, timeSpent: number) => {
  trackEvent({
    action: 'user_engagement',
    category: 'engagement',
    label: contentType,
    value: timeSpent,
  });
};

/**
 * Track lead generation events
 */
export const trackLeadGeneration = (leadType: string, value?: number) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'generate_lead', {
      currency: 'GBP',
      value: value || 0,
      lead_type: leadType,
    });
  }
};

/**
 * Track conversion events
 */
export const trackConversion = (conversionType: string, value?: number) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'conversion', {
      send_to: 'G-QZ19MYM39Z',
      currency: 'GBP',
      value: value || 0,
      conversion_type: conversionType,
    });
  }
};

/**
 * Track Ti64 marketplace interactions
 */
export const trackMarketplaceInteraction = (action: string, details?: string) => {
  trackEvent({
    action: `marketplace_${action}`,
    category: 'marketplace',
    label: details,
  });
};

/**
 * Track service page interactions
 */
export const trackServiceInteraction = (serviceName: string, action: string) => {
  trackEvent({
    action: `service_${action}`,
    category: 'services',
    label: serviceName,
  });
};
