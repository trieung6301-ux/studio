import { ProtectedRoute } from '@/components/auth/AuthGuard'
import { UserProfile } from '@/components/auth/UserProfile'

export default function AccountPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <UserProfile />
    </div>
  )
}
