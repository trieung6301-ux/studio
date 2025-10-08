import z from 'zod'

export const loginFormSchema = z.object({
  username: z.string().email({ message: 'Tên đăng nhập không hợp lệ' }),
  password: z
    .string()
    .min(6, { message: 'Mật khẩu phải có ít nhất 6 ký tự.' }),
})

export type LoginFormValues = z.infer<typeof loginFormSchema>

export const registerFormSchema = z.object({
  username: z.string().min(3, { message: 'Tên đăng nhập phải có ít nhất 3 ký tự.' }),
  first_name: z.string().min(2, { message: 'Tên phải có ít nhất 2 ký tự.' }),
  last_name: z.string().min(2, { message: 'Họ phải có ít nhất 2 ký tự.' }),
  email: z.string().email({
    message: 'Vui lòng nhập một địa chỉ email hợp lệ.',
  }),
  password: z.string().min(6, {
    message: 'Mật khẩu phải có ít nhất 6 ký tự.',
  }),
  phone: z
    .string()
    .min(10, { message: 'Số điện thoại phải có ít nhất 10 ký tự.' }),
})

export type RegisterFormValues = z.infer<typeof registerFormSchema>
