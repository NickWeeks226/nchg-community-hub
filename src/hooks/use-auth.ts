import { useState, useEffect } from 'react'
import { User, Session } from '@supabase/supabase-js'
import { supabase } from '@/integrations/supabase/client'
import { useSecurityMonitor } from './use-security-monitor'
import { validateEmail, validatePassword } from '@/lib/validation'

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)
  const { logSecurityEvent, checkAuthRateLimit } = useSecurityMonitor()

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session)
        setUser(session?.user ?? null)
        setLoading(false)
      }
    )

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setUser(session?.user ?? null)
      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [])

  const signUp = async (email: string, password: string, metadata?: any) => {
    // Security validations
    if (!validateEmail(email)) {
      const error = new Error('Invalid email format');
      await logSecurityEvent('SIGNUP_INVALID_EMAIL', { email: email.substring(0, 3) + '***' });
      return { data: null, error };
    }

    const passwordValidation = validatePassword(password);
    if (!passwordValidation.isValid) {
      const error = new Error(passwordValidation.errors.join(', '));
      await logSecurityEvent('SIGNUP_WEAK_PASSWORD', { email: email.substring(0, 3) + '***' });
      return { data: null, error };
    }

    // Check rate limiting
    if (!checkAuthRateLimit(email)) {
      const error = new Error('Too many signup attempts. Please try again later.');
      return { data: null, error };
    }

    const redirectUrl = `${window.location.origin}/`
    
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: redirectUrl,
          data: metadata
        }
      })

      if (error) {
        await logSecurityEvent('SIGNUP_FAILED', { 
          email: email.substring(0, 3) + '***',
          error: error.message 
        });
      } else {
        await logSecurityEvent('SIGNUP_SUCCESS', { 
          email: email.substring(0, 3) + '***',
          user_id: data.user?.id 
        });

        // Call the lead signup processing edge function
        if (data.user) {
          try {
            await supabase.functions.invoke('process-lead-signup', {
              body: {
                id: data.user.id,
                email: data.user.email,
                raw_user_meta_data: metadata || {}
              }
            });
          } catch (edgeFunctionError) {
            console.error('Failed to process lead signup:', edgeFunctionError);
            // Don't fail the signup if the edge function fails
          }
        }
      }

      return { data, error }
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Signup failed');
      await logSecurityEvent('SIGNUP_EXCEPTION', { 
        email: email.substring(0, 3) + '***',
        error: error.message 
      });
      return { data: null, error };
    }
  }

  const signIn = async (email: string, password: string) => {
    // Security validations
    if (!validateEmail(email)) {
      const error = new Error('Invalid email format');
      await logSecurityEvent('SIGNIN_INVALID_EMAIL', { email: email.substring(0, 3) + '***' });
      return { data: null, error };
    }

    // Check rate limiting
    if (!checkAuthRateLimit(email)) {
      const error = new Error('Too many signin attempts. Please try again later.');
      return { data: null, error };
    }

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      })

      if (error) {
        await logSecurityEvent('SIGNIN_FAILED', { 
          email: email.substring(0, 3) + '***',
          error: error.message 
        });
      } else {
        await logSecurityEvent('SIGNIN_SUCCESS', { 
          email: email.substring(0, 3) + '***',
          user_id: data.user?.id 
        });
      }

      return { data, error }
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Signin failed');
      await logSecurityEvent('SIGNIN_EXCEPTION', { 
        email: email.substring(0, 3) + '***',
        error: error.message 
      });
      return { data: null, error };
    }
  }

  const signInWithGoogle = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/`
      }
    })
    return { data, error }
  }

  const signInWithLinkedIn = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'linkedin_oidc',
      options: {
        redirectTo: `${window.location.origin}/`
      }
    })
    return { data, error }
  }

  const signOut = async () => {
    const { error } = await supabase.auth.signOut()
    return { error }
  }

  const resetPassword = async (email: string) => {
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/reset-password`
    })
    return { data, error }
  }

  return {
    user,
    session,
    loading,
    signUp,
    signIn,
    signInWithGoogle,
    signInWithLinkedIn,
    signOut,
    resetPassword
  }
}