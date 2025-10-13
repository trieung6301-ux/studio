import api from '@/lib/axios'

/**
 * Định nghĩa cấu trúc dữ liệu đơn hàng từ API
 */
export interface OrderResponse {
  id: number
  name: string
  address: string
  phone_number: string
  email: string
  created_at?: string
  updated_at?: string
  status?: string
}

/**
 * Định nghĩa cấu trúc dữ liệu đơn hàng đã xử lý để hiển thị
 */
export interface Order {
  id: number
  name: string
  address: string
  phoneNumber: string
  email: string
  createdAt?: string
  updatedAt?: string
  status?: string
}

/**
 * Chuyển đổi dữ liệu đơn hàng từ API sang định dạng hiển thị
 * @param order Dữ liệu đơn hàng từ API
 * @returns Dữ liệu đơn hàng đã xử lý
 */
export function transformOrder(order: OrderResponse): Order {
  return {
    id: order.id,
    name: order.name,
    address: order.address,
    phoneNumber: order.phone_number,
    email: order.email,
    createdAt: order.created_at,
    updatedAt: order.updated_at,
    status: order.status
  }
}

/**
 * Lấy danh sách đơn hàng từ API
 * @param params Tham số tùy chọn để lọc đơn hàng
 * @returns Promise chứa danh sách đơn hàng đã xử lý
 */
export async function getOrders(params?: {
  status?: string
  limit?: number
  page?: number
}): Promise<{ orders: Order[]; total: number }> {
  try {
    const response = await api.get('/orders', { params })
    const ordersData = response.data
        
    // Chuyển đổi dữ liệu đơn hàng
    const transformedOrders = Array.isArray(ordersData) 
      ? ordersData.map(transformOrder)
      : []
    
    return {
      orders: transformedOrders,
      total: ordersData.total || transformedOrders.length
    }
  } catch (error) {
    console.error('Error fetching orders:', error)
    throw error
  }
}

/**
 * Lấy thông tin chi tiết của một đơn hàng theo ID
 * @param id ID của đơn hàng
 * @returns Promise chứa thông tin chi tiết đơn hàng đã xử lý
 */
export async function getOrderById(id: number | string): Promise<Order> {
  try {
    const response = await api.get(`/orders/${id}`)
    return transformOrder(response.data)
  } catch (error) {
    console.error(`Error fetching order with id ${id}:`, error)
    throw error
  }
}

/**
 * Định nghĩa dữ liệu tạo đơn hàng mới
 */
export interface CreateOrderData {
  name: string
  address: string
  phone_number: string
  email: string
  items?: Array<{
    product_id: string | number
    quantity: number
    price: number
  }>
  total_amount?: number
}

/**
 * Tạo đơn hàng mới
 * @param orderData Dữ liệu đơn hàng mới
 * @returns Promise chứa đơn hàng đã tạo
 */
export async function createOrder(orderData: CreateOrderData): Promise<Order> {
  try {
    const response = await api.post('/orders', orderData)
    return transformOrder(response.data)
  } catch (error) {
    console.error('Error creating order:', error)
    throw error
  }
}

/**
 * Cập nhật đơn hàng
 * @param id ID của đơn hàng cần cập nhật
 * @param orderData Dữ liệu đơn hàng mới
 * @returns Promise chứa đơn hàng đã cập nhật
 */
export async function updateOrder(id: number, orderData: CreateOrderData): Promise<Order> {
  try {
    const response = await api.put(`/orders/${id}`, orderData)
    return transformOrder(response.data)
  } catch (error) {
    console.error('Error updating order:', error)
    throw error
  }
}

/**
 * Xóa đơn hàng
 * @param id ID của đơn hàng cần xóa
 * @returns Promise chứa kết quả xóa
 */
export async function deleteOrder(id: number): Promise<{ success: boolean; message: string }> {
  try {
    const response = await api.delete(`/orders/${id}`)
    return {
      success: true,
      message: 'Order deleted successfully'
    }
  } catch (error) {
    console.error('Error deleting order:', error)
    throw error
  }
}
