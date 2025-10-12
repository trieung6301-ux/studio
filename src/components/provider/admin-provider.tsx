'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/use-auth'

interface AdminProviderProps {
  children: React.ReactNode
}

export function AdminProvider({ children }: AdminProviderProps) {
  const { user, isAuthenticated, isLoading } = useAuth()
  const [isAdmin, setIsAdmin] = useState(false)
  const [isChecking, setIsChecking] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const checkAdminStatus = () => {
      if (isLoading) {
        return
      }

      if (!isAuthenticated) {
        // User is not authenticated, redirect to login
        router.push('/login')
        return
      }

      //   if (user && user.role === 'admin') {
      //     setIsAdmin(true)
      //     setIsChecking(false)
      //   } else {
      //     // User is authenticated but not admin, redirect to homepage
      //     router.push('/')
      //     return
      //   }
    }

    checkAdminStatus()
  }, [user, isAuthenticated, isLoading, router])

  // Show loading state while checking authentication and admin status
  if (isLoading || isChecking) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  // Only render children if user is admin
  if (isAdmin) {
    return <>{children}</>
  }

  // This should not be reached due to redirect, but just in case
  return null
}
