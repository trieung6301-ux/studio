'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/use-auth'

interface AuthGuardProps {
  children: React.ReactNode
  redirectTo?: string
  requireAuth?: boolean
}

export function AuthGuard({ 
  children, 
  redirectTo = '/login', 
  requireAuth = true 
}: AuthGuardProps) {
  const { isAuthenticated, isLoading, checkAuth } = useAuth()
  const router = useRouter()

  useEffect(() => {
    // Gọi checkAuth để đảm bảo trạng thái auth được cập nhật
    checkAuth()
  }, [checkAuth])

  useEffect(() => {
    if (!isLoading) {
      if (requireAuth && !isAuthenticated) {
        router.push(redirectTo)
      } else if (!requireAuth && isAuthenticated) {
        // Nếu không cần auth nhưng user đã đăng nhập, redirect về trang chủ
        router.push('/')
      }
    }
  }, [isAuthenticated, isLoading, requireAuth, redirectTo, router])

  // Hiển thị loading khi đang kiểm tra auth
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    )
  }

  // Nếu cần auth nhưng chưa đăng nhập, không hiển thị gì
  if (requireAuth && !isAuthenticated) {
    return null
  }

  // Nếu không cần auth nhưng đã đăng nhập, không hiển thị gì (sẽ redirect)
  if (!requireAuth && isAuthenticated) {
    return null
  }

  return <>{children}</>
}

// Component để bảo vệ route cần đăng nhập
export function ProtectedRoute({ children, redirectTo }: { children: React.ReactNode; redirectTo?: string }) {
  return (
    <AuthGuard requireAuth={true} redirectTo={redirectTo}>
      {children}
    </AuthGuard>
  )
}

// Component để bảo vệ route chỉ dành cho guest (chưa đăng nhập)
export function GuestRoute({ children }: { children: React.ReactNode }) {
  return (
    <AuthGuard requireAuth={false}>
      {children}
    </AuthGuard>
  )
}
