import { useState, useEffect } from 'react'
import { supabase } from '@/integrations/supabase/client'
import { useAuth } from './use-auth'

interface SecurityContext {
  user_id: string | null
  user_role: string | null
  is_authenticated: boolean
  session_timestamp: string
}

export const useSecurity = () => {
  const [securityContext, setSecurityContext] = useState<SecurityContext | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const { user } = useAuth()

  useEffect(() => {
    const fetchSecurityContext = async () => {
      if (!user) {
        setSecurityContext(null)
        setIsLoading(false)
        return
      }

      try {
        const { data, error } = await supabase.rpc('get_security_context')
        
        if (error) {
          console.error('Security context error:', error)
          return
        }

        setSecurityContext(data as unknown as SecurityContext)
      } catch (err) {
        console.error('Failed to fetch security context:', err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchSecurityContext()
  }, [user])

  const logSecurityEvent = async (eventType: string, details: Record<string, any> = {}) => {
    try {
      await supabase.rpc('log_security_event', {
        event_type: eventType,
        event_details: {
          ...details,
          timestamp: new Date().toISOString(),
          user_agent: navigator.userAgent
        }
      })
    } catch (err) {
      console.error('Failed to log security event:', err)
    }
  }

  const validateUserSession = async () => {
    try {
      const { data } = await supabase.rpc('is_authenticated_user')
      return data
    } catch (err) {
      console.error('Session validation failed:', err)
      return false
    }
  }

  return {
    securityContext,
    isLoading,
    logSecurityEvent,
    validateUserSession
  }
}