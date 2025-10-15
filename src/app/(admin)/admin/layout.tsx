import type { Metadata } from 'next'
import { AdminSidebar } from '@/components/admin/AdminSidebar'
import { AdminProvider } from '@/components/provider/admin-provider'
import {
  SidebarProvider,
} from '@/components/ui/sidebar'

export const metadata: Metadata = {
  title: 'MuscleUp Admin',
  icons: [{ rel: 'icon', url: '/favicon.ico' }],
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AdminProvider>
      <SidebarProvider defaultOpen={true}>
        <div className="flex min-h-screen w-full">
          <AdminSidebar />
          <main className="flex-1 overflow-auto">
            <div className="container mx-auto p-6">
              <div className="mt-6">{children}</div>
            </div>
          </main>
        </div>
      </SidebarProvider>
    </AdminProvider>
  )
}
