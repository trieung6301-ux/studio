import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import api from '@/lib/axios'

interface User {
  id: string
  email: string
  username?: string
  first_name?: string
  last_name?: string
}

interface AuthResponse {
  token: string
  user: User
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const router = useRouter()

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    const token = localStorage.getItem('token')

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
      localStorage.removeItem('token')
      localStorage.removeItem('user')
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
      const { token, user } = response.data

      localStorage.setItem('token', token)
      localStorage.setItem('user', JSON.stringify(user))

      setUser(user)
      setIsAuthenticated(true)
      router.push('/')
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
      const { token, user } = response.data

      localStorage.setItem('token', token)
      localStorage.setItem('user', JSON.stringify(user))

      setUser(user)
      setIsAuthenticated(true)
      router.push('/')
    } catch (error) {
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
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
