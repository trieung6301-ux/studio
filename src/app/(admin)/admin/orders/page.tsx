'use client'

import { useState, useMemo } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { getOrders, Order, deleteOrder } from '@/lib/api/orders.api'
import { Edit, Trash2, Eye, Plus, Search, AlertCircle, RefreshCw } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Alert, AlertDescription } from '@/components/ui/alert'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import AddOrderForm from '@/components/forms/AddOrderForm'
import EditOrderForm from '@/components/forms/EditOrderForm'

export default function AdminOrdersPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [isAddOrderOpen, setIsAddOrderOpen] = useState(false)
  const [isEditOrderOpen, setIsEditOrderOpen] = useState(false)
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [orderToDelete, setOrderToDelete] = useState<Order | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)
  const queryClient = useQueryClient()

  // Use React Query to fetch orders
  const {
    data: ordersData,
    isLoading,
    isError,
    error,
    refetch
  } = useQuery({
    queryKey: ['orders'],
    queryFn: () => getOrders(),
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 3,
  })

  const orders = ordersData?.orders || []

  // Filter orders based on search term
  const filteredOrders = useMemo(() => {
    if (!searchTerm) return orders
    
    return orders.filter((order: Order) =>
      order.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.phoneNumber.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }, [orders, searchTerm])

  const handleEdit = (order: Order) => {
    setSelectedOrder(order)
    setIsEditOrderOpen(true)
  }

  const handleDelete = (order: Order) => {
    setOrderToDelete(order)
    setIsDeleteDialogOpen(true)
  }

  const handleConfirmDelete = async () => {
    if (!orderToDelete) return

    setIsDeleting(true)
    try {
      await deleteOrder(orderToDelete.id)
      // Invalidate and refetch orders after successful deletion
      queryClient.invalidateQueries({ queryKey: ['orders'] })
      setIsDeleteDialogOpen(false)
      setOrderToDelete(null)
    } catch (error) {
      console.error('Error deleting order:', error)
      // You could add a toast notification here for error handling
    } finally {
      setIsDeleting(false)
    }
  }

  const handleCancelDelete = () => {
    setIsDeleteDialogOpen(false)
    setOrderToDelete(null)
  }

  const handleView = (order: Order) => {
    console.log('View order:', order)
    // TODO: Implement view functionality
  }

  const handleRefresh = () => {
    refetch()
  }

  const handleAddOrderSuccess = () => {
    // Invalidate and refetch orders after successful creation
    queryClient.invalidateQueries({ queryKey: ['orders'] })
  }

  const handleEditOrderSuccess = () => {
    // Invalidate and refetch orders after successful update
    queryClient.invalidateQueries({ queryKey: ['orders'] })
    setSelectedOrder(null)
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Quản lý đơn hàng</h1>
          <p className="text-gray-600">Quản lý danh sách đơn hàng của bạn</p>
        </div>
        <Card>
          <CardContent>
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
              <p className="mt-2 text-gray-500">Đang tải đơn hàng...</p>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (isError) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Quản lý đơn hàng</h1>
          <p className="text-gray-600">Quản lý danh sách đơn hàng của bạn</p>
        </div>
        <Card>
          <CardContent>
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Không thể tải đơn hàng. {error?.message || 'Vui lòng thử lại.'}
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => refetch()}
                  className="ml-2"
                >
                  Thử lại
                </Button>
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Quản lý đơn hàng</h1>
        <p className="text-gray-600">Quản lý danh sách đơn hàng của bạn</p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between flex-wrap gap-2">
            <CardTitle>Tất cả đơn hàng ({filteredOrders.length})</CardTitle>
            <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={handleRefresh}
                disabled={isLoading}
                className="flex items-center gap-2"
              >
                <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
                Làm mới
              </Button>
              <Button 
                className="flex items-center gap-2"
                onClick={() => setIsAddOrderOpen(true)}
              >
                <Plus className="h-4 w-4" />
                Thêm đơn hàng
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2 mb-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Tìm kiếm đơn hàng..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
          </div>

          {filteredOrders.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <p>Không tìm thấy đơn hàng nào. Nhấn "Thêm đơn hàng" để bắt đầu.</p>
            </div>
          ) : (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Khách hàng</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Số điện thoại</TableHead>
                    <TableHead>Địa chỉ</TableHead>
                    <TableHead>Trạng thái</TableHead>
                    <TableHead className="text-right">Thao tác</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredOrders.map((order: Order) => (
                    <TableRow key={order.id}>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <Avatar className="h-10 w-10">
                            <AvatarFallback>
                              {order.name.charAt(0).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{order.name}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">{order.email}</div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">{order.phoneNumber}</div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm text-muted-foreground truncate max-w-[200px]">
                          {order.address}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="default">
                          {order.status || "Mới"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleEdit(order)}
                            title="Chỉnh sửa đơn hàng"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDelete(order)}
                            title="Xóa đơn hàng"
                            className="text-destructive hover:text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Add Order Dialog */}
      <AddOrderForm
        open={isAddOrderOpen}
        onOpenChange={setIsAddOrderOpen}
        onSuccess={handleAddOrderSuccess}
      />

      {/* Edit Order Dialog */}
      <EditOrderForm
        open={isEditOrderOpen}
        onOpenChange={setIsEditOrderOpen}
        onSuccess={handleEditOrderSuccess}
        order={selectedOrder}
      />

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Xác nhận xóa đơn hàng</AlertDialogTitle>
            <AlertDialogDescription>
              Bạn có chắc chắn muốn xóa đơn hàng của "{orderToDelete?.name}"? 
              Hành động này không thể hoàn tác.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleCancelDelete} disabled={isDeleting}>
              Hủy
            </AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleConfirmDelete}
              disabled={isDeleting}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {isDeleting ? 'Đang xóa...' : 'Xóa'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
