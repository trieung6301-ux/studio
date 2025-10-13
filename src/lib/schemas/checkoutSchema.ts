import { z } from 'zod'

export const checkoutSchema = z.object({
  name: z
    .string()
    .min(2, 'Họ và tên phải có ít nhất 2 ký tự')
    .max(100, 'Họ và tên không được vượt quá 100 ký tự')
    .regex(/^[a-zA-ZÀ-ỹ\s]+$/, 'Họ và tên chỉ được chứa chữ cái và khoảng trắng'),
  
  phone: z
    .string()
    .min(10, 'Số điện thoại phải có ít nhất 10 số')
    .max(15, 'Số điện thoại không được vượt quá 15 số')
    .regex(/^[0-9+\-\s()]+$/, 'Số điện thoại chỉ được chứa số, dấu +, -, khoảng trắng và dấu ngoặc'),
  
  email: z
    .string()
    .min(1, 'Email là bắt buộc')
    .email('Địa chỉ email không hợp lệ')
    .max(255, 'Email không được vượt quá 255 ký tự'),
  
  address: z
    .string()
    .min(10, 'Địa chỉ phải có ít nhất 10 ký tự')
    .max(500, 'Địa chỉ không được vượt quá 500 ký tự')
    .regex(/^[a-zA-ZÀ-ỹ0-9\s,.-/]+$/, 'Địa chỉ chứa ký tự không hợp lệ'),
})

export type CheckoutFormData = z.infer<typeof checkoutSchema>
