import z from 'zod'

export const loginFormSchema = z.object({
  email: z.string().email({ message: 'Email inválido' }),
  password: z
    .string()
    .min(6, { message: 'A senha deve ter pelo menos 6 caracteres' }),
})

export type LoginFormValues = z.infer<typeof loginFormSchema>

export const registerFormSchema = z.object({
  name: z.string().min(2, { message: 'Tên phải có ít nhất 2 ký tự.' }),
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
