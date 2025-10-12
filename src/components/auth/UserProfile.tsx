'use client'

import { useAuth } from '@/hooks/use-auth'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { LogOut, RefreshCw, User } from 'lucide-react'

export function UserProfile() {
  const { user, isAuthenticated, isLoading, logout, checkAuth } = useAuth()

  const handleRefreshAuth = async () => {
    await checkAuth()
  }

  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center space-x-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            <span>Đang tải...</span>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (!isAuthenticated || !user) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center">
            <User className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">Chưa đăng nhập</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <User className="h-5 w-5" />
          <span>Thông tin người dùng</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center space-x-4">
          <Avatar>
            <AvatarFallback>
              {user.first_name?.[0] || user.username?.[0] || user.email[0].toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h3 className="font-semibold">
              {user.first_name && user.last_name
                ? `${user.first_name} ${user.last_name}`
                : user.username || user.email}
            </h3>
            <p className="text-sm text-muted-foreground">{user.email}</p>
            {user.role && <p className="text-xs text-muted-foreground">Vai trò: {user.role}</p>}
          </div>
        </div>

        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleRefreshAuth}
            className="flex items-center space-x-2"
          >
            <RefreshCw className="h-4 w-4" />
            <span>Làm mới</span>
          </Button>

          <Button
            variant="destructive"
            size="sm"
            onClick={logout}
            className="flex items-center space-x-2"
          >
            <LogOut className="h-4 w-4" />
            <span>Đăng xuất</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
