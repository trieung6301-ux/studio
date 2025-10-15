'use client'

import { useCart } from '@/hooks/use-cart'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import Image from 'next/image'
import { CreditCard, MapPin, Phone, Mail, User, Loader2, CheckCircle, XCircle, ArrowLeft, ShoppingBag } from 'lucide-react'
import { useState, useEffect } from 'react'
import { createOrder } from '@/lib/api/orders.api'
import { useToast } from '@/hooks/use-toast'
import { useRouter, useSearchParams } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { checkoutSchema, type CheckoutFormData } from '@/lib/schemas/checkoutSchema'
import Link from 'next/link'

export default function CheckoutPage() {
  const { items, cartTotal, clearCart } = useCart()
  const { toast } = useToast()
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isLoading, setIsLoading] = useState(false)
  const [orderId, setOrderId] = useState<string | null>(null)
  
  const confirmation = searchParams.get('confirmation')

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      name: '',
      address: '',
      phone: '',
      email: '',
    },
  })

  const onSubmit = async (data: CheckoutFormData) => {
    if (items.length === 0) {
      toast({
        title: "Giỏ hàng trống",
        description: "Vui lòng thêm sản phẩm vào giỏ hàng trước khi thanh toán.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)
    
    try {
      const orderData = {
        name: data.name,
        address: data.address,
        phone_number: data.phone,
        email: data.email,
        items: items.map(item => ({
          product_id: item.id,
          quantity: item.quantity,
          price: item.price
        })),
        total_amount: cartTotal
      }

      const order = await createOrder(orderData)
      
      // Clear cart after successful order
      clearCart()
      
      // Reset form
      reset()
      
      // Set order ID for confirmation screen
      setOrderId(order.id.toString())
      
      // Redirect to confirmation success page
      router.push('/checkout?confirmation=success')
      
    } catch (error) {
      console.error('Error creating order:', error)
      
      // Redirect to confirmation failure page
      router.push('/checkout?confirmation=fail')
    } finally {
      setIsLoading(false)
    }
  }

  // Show confirmation screen if confirmation parameter exists
  if (confirmation === 'success') {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto text-center">
          <div className="inline-flex items-center justify-center bg-green-100 text-green-600 rounded-full w-20 h-20 mb-6">
            <CheckCircle className="w-10 h-10" />
          </div>
          
          <h1 className="text-4xl font-bold text-green-600 mb-4">
            Đặt hàng thành công!
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8">
            Cảm ơn bạn đã đặt hàng. Đơn hàng của bạn đã được xử lý thành công.
          </p>
          
          {orderId && (
            <Card className="mb-8">
              <CardContent className="pt-6">
                <p className="text-lg font-semibold mb-2">Mã đơn hàng</p>
                <p className="text-2xl font-bold text-primary">#{orderId}</p>
              </CardContent>
            </Card>
          )}
          
          <div className="space-y-4">
            <p className="text-muted-foreground">
              Chúng tôi sẽ gửi email xác nhận đến địa chỉ email của bạn.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg">
                <Link href="/shop">
                  <ShoppingBag className="w-4 h-4 mr-2" />
                  Tiếp tục mua sắm
                </Link>
              </Button>
              
              <Button asChild variant="outline" size="lg">
                <Link href="/">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Về trang chủ
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (confirmation === 'fail') {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto text-center">
          <div className="inline-flex items-center justify-center bg-red-100 text-red-600 rounded-full w-20 h-20 mb-6">
            <XCircle className="w-10 h-10" />
          </div>
          
          <h1 className="text-4xl font-bold text-red-600 mb-4">
            Đặt hàng thất bại
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8">
            Có lỗi xảy ra khi xử lý đơn hàng của bạn. Vui lòng thử lại.
          </p>
          
          <div className="space-y-4">
            <p className="text-muted-foreground">
              Nếu vấn đề vẫn tiếp tục, vui lòng liên hệ với chúng tôi để được hỗ trợ.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg">
                <Link href="/checkout">
                  <CreditCard className="w-4 h-4 mr-2" />
                  Thử lại
                </Link>
              </Button>
              
              <Button asChild variant="outline" size="lg">
                <Link href="/cart">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Quay lại giỏ hàng
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center bg-primary text-primary-foreground rounded-full w-16 h-16 mb-4">
          <CreditCard className="w-8 h-8" />
        </div>
        <h1 className="text-4xl font-bold font-headline text-primary">
          Thanh toán
        </h1>
        <p className="text-muted-foreground mt-2">
          Hoàn tất đơn hàng của bạn
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Checkout Form */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5" />
                Thông tin giao hàng
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Họ và tên *</Label>
                    <Input
                      id="name"
                      {...register('name')}
                      placeholder="Nhập họ và tên"
                      className={errors.name ? 'border-red-500' : ''}
                    />
                    {errors.name && (
                      <p className="text-sm text-red-500">{errors.name.message}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Số điện thoại *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      {...register('phone')}
                      placeholder="Nhập số điện thoại"
                      className={errors.phone ? 'border-red-500' : ''}
                    />
                    {errors.phone && (
                      <p className="text-sm text-red-500">{errors.phone.message}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    {...register('email')}
                    placeholder="Nhập địa chỉ email"
                    className={errors.email ? 'border-red-500' : ''}
                  />
                  {errors.email && (
                    <p className="text-sm text-red-500">{errors.email.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Địa chỉ giao hàng *</Label>
                  <Textarea
                    id="address"
                    {...register('address')}
                    placeholder="Nhập địa chỉ giao hàng chi tiết"
                    rows={3}
                    className={errors.address ? 'border-red-500' : ''}
                  />
                  {errors.address && (
                    <p className="text-sm text-red-500">{errors.address.message}</p>
                  )}
                </div>

                <div className="pt-4">
                  <Button 
                    type="submit" 
                    className="w-full" 
                    size="lg"
                    disabled={isLoading || isSubmitting}
                  >
                    {isLoading || isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Đang xử lý...
                      </>
                    ) : (
                      <>
                        <CreditCard className="w-4 h-4 mr-2" />
                        Thanh toán ngay
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Order Summary */}
        <div>
          <Card className="sticky top-20">
            <CardHeader>
              <CardTitle>Tóm tắt đơn hàng</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Cart Items */}
                <div className="space-y-3">
                  {items.map((item) => (
                    <div key={item.id} className="flex items-center gap-3">
                      <div className="relative h-12 w-12">
                        <Image
                          src={item.imageUrl}
                          alt={item.name}
                          fill
                          className="object-cover rounded-md"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{item.name}</p>
                        <p className="text-xs text-muted-foreground">
                          Số lượng: {item.quantity}
                        </p>
                      </div>
                      <p className="text-sm font-semibold">
                        {new Intl.NumberFormat('vi-VN', {
                          style: 'currency',
                          currency: 'VND',
                        }).format(item.price * item.quantity)}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Summary */}
                <div className="border-t pt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Tạm tính</span>
                    <span>
                      {new Intl.NumberFormat('vi-VN', {
                        style: 'currency',
                        currency: 'VND',
                      }).format(cartTotal)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Vận chuyển</span>
                    <span className="text-green-600">Miễn phí</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg border-t pt-2">
                    <span>Tổng cộng</span>
                    <span className="text-primary">
                      {new Intl.NumberFormat('vi-VN', {
                        style: 'currency',
                        currency: 'VND',
                      }).format(cartTotal)}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="bg-muted/50">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4" />
                <span>Giao hàng miễn phí toàn quốc</span>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}
