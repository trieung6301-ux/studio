import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import api from '@/lib/axios'
import { deleteCookie, getCookie, setCookie } from 'cookies-next/client'

interface User {
  id: string
  email: string
  username?: string
  first_name?: string
  last_name?: string
  role?: string
}

interface AuthResponse {
  access_token: string
  user: User
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const token = getCookie('token')
    if (token) {
      setIsLoading(false)
      setIsAuthenticated(true)
    }
  }, [])

  const checkAuth = async () => {
    const token = getCookie('token')

    if (!token) {
      setIsLoading(false)
      setIsAuthenticated(false)
      return
    }

    try {
      // Kiểm tra token có hợp lệ không bằng cách gọi API
      const response = await api.get('/auth/me')
      const userData = response.data

      setUser(userData)
      setIsAuthenticated(true)
    } catch (error) {
      // Token không hợp lệ hoặc hết hạn
      deleteCookie('token')
      deleteCookie('user')
      setIsAuthenticated(false)
    } finally {
      setIsLoading(false)
    }
  }

  const login = async (username: string, password: string): Promise<void> => {
    try {
      setIsLoading(true)
      const response = await api.post<AuthResponse>('/login', {
        username,
        password,
      })
      const { access_token, user } = response.data

      setCookie('token', access_token, {
        maxAge: 60 * 60 * 24 * 7, // 7 days
        path: '/',
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
      })

      setCookie('user', JSON.stringify(user), {
        maxAge: 60 * 60 * 24 * 7, // 7 days
        path: '/',
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
      })

      setUser(user)
      setIsAuthenticated(true)
      window.location.href = '/'
    } catch (error) {
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const signup = async (
    email: string,
    password: string,
    username: string,
    first_name: string,
    last_name: string,
  ): Promise<void> => {
    try {
      setIsLoading(true)
      const response = await api.post<AuthResponse>('/register', {
        email,
        password,
        username,
        first_name,
        last_name,
      })
      const { access_token, user } = response.data

      setCookie('token', access_token, {
        maxAge: 60 * 60 * 24 * 7, // 7 days
        path: '/',
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
      })

      setCookie('user', JSON.stringify(user), {
        maxAge: 60 * 60 * 24 * 7, // 7 days
        path: '/',
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
      })

      setUser(user)
      setIsAuthenticated(true)
      router.push('/login')
    } catch (error) {
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    deleteCookie('token')
    deleteCookie('user')
    setUser(null)
    setIsAuthenticated(false)
    router.push('/login')
  }

  return {
    user,
    isAuthenticated,
    isLoading,
    login,
    signup,
    logout,
    checkAuth,
  }
}
