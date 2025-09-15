import { useCallback, useRef } from 'react';
import { createRateLimiter } from '@/lib/validation';
import { supabase } from '@/integrations/supabase/client';

const authRateLimiter = createRateLimiter(5, 15 * 60 * 1000); // 5 attempts per 15 minutes
const apiRateLimiter = createRateLimiter(100, 60 * 1000); // 100 requests per minute

export const useSecurityMonitor = () => {
  const suspiciousActivityCount = useRef(0);

  const logSecurityEvent = useCallback(async (
    eventType: string, 
    details: Record<string, any> = {}
  ) => {
    try {
      const { data, error } = await supabase.rpc('log_security_event', {
        event_type: eventType,
        event_details: details
      });

      if (error) {
        console.warn('Failed to log security event:', error);
      }
    } catch (err) {
      console.warn('Security logging error:', err);
    }
  }, []);

  const checkAuthRateLimit = useCallback((identifier: string): boolean => {
    const allowed = authRateLimiter(identifier);
    
    if (!allowed) {
      logSecurityEvent('AUTH_RATE_LIMIT_EXCEEDED', {
        identifier: identifier.substring(0, 5) + '***', // Partially mask for privacy
        timestamp: new Date().toISOString()
      });
    }
    
    return allowed;
  }, [logSecurityEvent]);

  const checkApiRateLimit = useCallback((identifier: string): boolean => {
    const allowed = apiRateLimiter(identifier);
    
    if (!allowed) {
      logSecurityEvent('API_RATE_LIMIT_EXCEEDED', {
        identifier: identifier.substring(0, 5) + '***',
        timestamp: new Date().toISOString()
      });
    }
    
    return allowed;
  }, [logSecurityEvent]);

  const detectSuspiciousActivity = useCallback((activity: string, details: Record<string, any> = {}) => {
    suspiciousActivityCount.current++;
    
    if (suspiciousActivityCount.current > 3) {
      logSecurityEvent('SUSPICIOUS_ACTIVITY_DETECTED', {
        activity,
        count: suspiciousActivityCount.current,
        details,
        timestamp: new Date().toISOString()
      });
    }
  }, [logSecurityEvent]);

  const validateSession = useCallback(async (): Promise<boolean> => {
    try {
      const { data: { session }, error } = await supabase.auth.getSession();
      
      if (error) {
        logSecurityEvent('SESSION_VALIDATION_ERROR', { error: error.message });
        return false;
      }
      
      if (!session) {
        return false;
      }
      
      // Check if session is close to expiry (less than 5 minutes)
      const expiresAt = new Date(session.expires_at! * 1000);
      const now = new Date();
      const timeUntilExpiry = expiresAt.getTime() - now.getTime();
      
      if (timeUntilExpiry < 5 * 60 * 1000) {
        logSecurityEvent('SESSION_NEAR_EXPIRY', {
          expires_at: expiresAt.toISOString(),
          time_until_expiry_ms: timeUntilExpiry
        });
        
        // Attempt to refresh the session
        const { error: refreshError } = await supabase.auth.refreshSession();
        if (refreshError) {
          logSecurityEvent('SESSION_REFRESH_FAILED', { error: refreshError.message });
          return false;
        }
      }
      
      return true;
    } catch (err) {
      logSecurityEvent('SESSION_VALIDATION_EXCEPTION', { 
        error: err instanceof Error ? err.message : 'Unknown error' 
      });
      return false;
    }
  }, [logSecurityEvent]);

  const secureApiCall = useCallback(async <T>(
    apiCall: () => Promise<T>,
    identifier: string = 'anonymous'
  ): Promise<T | null> => {
    // Check rate limiting
    if (!checkApiRateLimit(identifier)) {
      throw new Error('Rate limit exceeded. Please try again later.');
    }

    // Validate session
    const isValidSession = await validateSession();
    if (!isValidSession) {
      throw new Error('Invalid or expired session. Please log in again.');
    }

    try {
      const result = await apiCall();
      return result;
    } catch (error) {
      logSecurityEvent('API_CALL_FAILED', {
        identifier: identifier.substring(0, 5) + '***',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
      throw error;
    }
  }, [checkApiRateLimit, validateSession, logSecurityEvent]);

  return {
    logSecurityEvent,
    checkAuthRateLimit,
    checkApiRateLimit,
    detectSuspiciousActivity,
    validateSession,
    secureApiCall
  };
};