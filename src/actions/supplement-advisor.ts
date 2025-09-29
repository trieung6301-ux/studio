'use server'

import {
  supplementAdvisor as supplementAdvisorFlow,
  type SupplementAdvisorInput,
  type SupplementAdvisorOutput,
} from '@/ai/flows/supplement-advisor'
import { z } from 'zod'

const formSchema = z.object({
  fitnessGoals: z
    .string()
    .min(10, 'Vui lòng mô tả chi tiết hơn về mục tiêu thể chất của bạn.'),
  dietaryRestrictions: z
    .string()
    .min(
      3,
      "Vui lòng ghi rõ các hạn chế về chế độ ăn uống của bạn, hoặc nhập 'không có'.",
    ),
  workoutRoutine: z
    .string()
    .min(10, 'Vui lòng mô tả chi tiết hơn về thói quen tập luyện của bạn.'),
})

export type AdvisorState = {
  success: boolean
  message: string
  data: SupplementAdvisorOutput | null
  errors?: {
    fitnessGoals?: string[]
    dietaryRestrictions?: string[]
    workoutRoutine?: string[]
  } | null
}

export async function getSupplementAdvice(
  prevState: AdvisorState,
  formData: FormData,
): Promise<AdvisorState> {
  const validatedFields = formSchema.safeParse({
    fitnessGoals: formData.get('fitnessGoals'),
    dietaryRestrictions: formData.get('dietaryRestrictions'),
    workoutRoutine: formData.get('workoutRoutine'),
  })

  if (!validatedFields.success) {
    return {
      success: false,
      message:
        'Dữ liệu biểu mẫu không hợp lệ. Vui lòng kiểm tra lại thông tin đã nhập.',
      errors: validatedFields.error.flatten().fieldErrors,
      data: null,
    }
  }

  try {
    const result = await supplementAdvisorFlow(
      validatedFields.data as SupplementAdvisorInput,
    )
    return {
      success: true,
      message: 'Đây là lời khuyên về thực phẩm bổ sung dành riêng cho bạn!',
      data: result,
      errors: null,
    }
  } catch (error) {
    console.error(error)
    return {
      success: false,
      message: 'Đã xảy ra lỗi AI. Vui lòng thử lại sau.',
      data: null,
      errors: null,
    }
  }
}
