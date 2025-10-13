'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { createOrder, CreateOrderData } from '@/lib/api/orders.api'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Loader2 } from 'lucide-react'

// Form validation schema
const orderSchema = z.object({
  name: z.string().min(1, 'Tên khách hàng là bắt buộc').max(100, 'Tên phải ít hơn 100 ký tự'),
  address: z.string().min(1, 'Địa chỉ là bắt buộc').max(500, 'Địa chỉ phải ít hơn 500 ký tự'),
  phoneNumber: z.string().min(1, 'Số điện thoại là bắt buộc').regex(/^[0-9+\-\s()]+$/, 'Số điện thoại không hợp lệ'),
  email: z.string().min(1, 'Email là bắt buộc').email('Email không hợp lệ'),
})

type OrderFormData = z.infer<typeof orderSchema>

interface AddOrderFormProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSuccess?: () => void
}

export default function AddOrderForm({ open, onOpenChange, onSuccess }: AddOrderFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<OrderFormData>({
    resolver: zodResolver(orderSchema),
    defaultValues: {
      name: '',
      address: '',
      phoneNumber: '',
      email: '',
    },
  })

  const onSubmit = async (data: OrderFormData) => {
    try {
      setIsSubmitting(true)
      
      // Transform form data to API format
      const orderData: CreateOrderData = {
        name: data.name,
        address: data.address,
        phone_number: data.phoneNumber,
        email: data.email,
      }
      
      // Create order via API
      await createOrder(orderData)
      
      // Reset form and close dialog
      form.reset()
      onOpenChange(false)
      onSuccess?.()
      
    } catch (error) {
      console.error('Error creating order:', error)
      // TODO: Add toast notification for error
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleClose = () => {
    if (!isSubmitting) {
      form.reset()
      onOpenChange(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Thêm đơn hàng mới</DialogTitle>
          <DialogDescription>
            Tạo đơn hàng mới cho khách hàng. Điền vào tất cả thông tin bắt buộc.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tên khách hàng</FormLabel>
                  <FormControl>
                    <Input placeholder="Nhập tên khách hàng" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input 
                      type="email" 
                      placeholder="Nhập email khách hàng" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Số điện thoại</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Nhập số điện thoại" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Địa chỉ</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Nhập địa chỉ giao hàng" 
                      className="min-h-[80px]"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button 
                type="button" 
                variant="outline" 
                onClick={handleClose}
                disabled={isSubmitting}
              >
                Hủy
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isSubmitting ? 'Đang tạo...' : 'Tạo đơn hàng'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
