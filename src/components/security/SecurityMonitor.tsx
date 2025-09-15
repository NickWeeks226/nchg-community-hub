import { useEffect } from 'react'
import { useSecurity } from '@/hooks/use-security'
import { useAuth } from '@/hooks/use-auth'

export const SecurityMonitor = () => {
  const { logSecurityEvent } = useSecurity()
  const { user } = useAuth()

  useEffect(() => {
    // Log page visits for security monitoring
    const logPageVisit = () => {
      if (user) {
        logSecurityEvent('PAGE_VISIT', {
          page: window.location.pathname,
          referrer: document.referrer,
          user_id: user.id
        })
      }
    }

    // Log when user becomes active/inactive
    const handleVisibilityChange = () => {
      if (user) {
        logSecurityEvent(document.hidden ? 'USER_INACTIVE' : 'USER_ACTIVE', {
          user_id: user.id,
          page: window.location.pathname
        })
      }
    }

    // Log suspicious activity (multiple rapid clicks, etc.)
    let clickCount = 0
    let clickTimer: NodeJS.Timeout

    const handleSuspiciousActivity = () => {
      clickCount++
      clearTimeout(clickTimer)
      
      if (clickCount > 10) {
        logSecurityEvent('SUSPICIOUS_ACTIVITY', {
          type: 'RAPID_CLICKS',
          count: clickCount,
          user_id: user?.id,
          page: window.location.pathname
        })
        clickCount = 0
      }
      
      clickTimer = setTimeout(() => {
        clickCount = 0
      }, 1000)
    }

    // Set up event listeners
    logPageVisit()
    document.addEventListener('visibilitychange', handleVisibilityChange)
    document.addEventListener('click', handleSuspiciousActivity)

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      document.removeEventListener('click', handleSuspiciousActivity)
      clearTimeout(clickTimer)
    }
  }, [user, logSecurityEvent])

  return null // This is a monitoring component with no UI
}