import { AdminProvider } from '@/components/provider/admin-provider'
import { AdminSidebar } from '@/components/admin/AdminSidebar'
import { SidebarInset, SidebarTrigger, SidebarProvider } from '@/components/ui/sidebar'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'MuscleUp Admin',
  icons: [{ rel: 'icon', url: '/favicon.ico' }],
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    // <AdminProvider>
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AdminSidebar />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
            <SidebarTrigger className="-ml-1" />
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-semibold">Admin Dashboard</h1>
            </div>
          </header>
          <div className="flex-1 p-4">{children}</div>
        </SidebarInset>
      </div>
    </SidebarProvider>
    // </AdminProvider>
  )
}
