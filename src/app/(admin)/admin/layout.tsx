import type { Metadata } from 'next'
import { AdminSidebar } from '@/components/admin/AdminSidebar'
import { AdminProvider } from '@/components/provider/admin-provider'
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar'
import { cn } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'MuscleUp Quản trị',
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
              <div className="flex items-center mb-4">
                <h1 className="text-xl font-bold">Bảng điều khiển quản trị</h1>
              </div>
              <div className="mt-6">{children}</div>
            </div>
          </main>
        </div>
      </SidebarProvider>
    </AdminProvider>
  )
}
