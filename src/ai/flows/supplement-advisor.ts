'use server'

/**
 * @fileOverview Luồng AI tư vấn thực phẩm bổ sung.
 *
 * Tệp này xác định một luồng Genkit đề xuất các chất bổ sung dựa trên
 * mục tiêu thể chất, hạn chế ăn kiêng và thói quen tập luyện của người dùng.
 *
 * @exports supplementAdvisor - Hàm chính để gọi luồng.
 * @exports SupplementAdvisorInput - Kiểu dữ liệu đầu vào cho hàm supplementAdvisor.
 * @exports SupplementAdvisorOutput - Kiểu dữ liệu trả về cho hàm supplementAdvisor.
 */

import { ai } from '@/ai/genkit'
import { z } from 'genkit'

const SupplementAdvisorInputSchema = z.object({
  fitnessGoals: z
    .string()
    .describe(
      'Mục tiêu thể chất của người dùng (ví dụ: xây dựng cơ bắp, giảm cân, tăng sức bền).',
    ),
  dietaryRestrictions: z
    .string()
    .describe(
      'Bất kỳ hạn chế nào về chế độ ăn uống của người dùng (ví dụ: ăn chay, thuần chay, không chứa gluten).',
    ),
  workoutRoutine: z
    .string()
    .describe(
      'Thói quen tập luyện điển hình của người dùng (ví dụ: cardio, cử tạ, crossfit).',
    ),
})

export type SupplementAdvisorInput = z.infer<
  typeof SupplementAdvisorInputSchema
>

const SupplementAdvisorOutputSchema = z.object({
  suggestedSupplements: z
    .string()
    .describe(
      'Danh sách các thực phẩm bổ sung được đề xuất dựa trên thông tin đầu vào của người dùng.',
    ),
  reasoning: z
    .string()
    .describe('Lý do đằng sau các đề xuất thực phẩm bổ sung.'),
})

export type SupplementAdvisorOutput = z.infer<
  typeof SupplementAdvisorOutputSchema
>

export async function supplementAdvisor(
  input: SupplementAdvisorInput,
): Promise<SupplementAdvisorOutput> {
  return supplementAdvisorFlow(input)
}

const prompt = ai.definePrompt({
  name: 'supplementAdvisorPrompt',
  input: { schema: SupplementAdvisorInputSchema },
  output: { schema: SupplementAdvisorOutputSchema },
  prompt: `Bạn là một nhà tư vấn thực phẩm bổ sung có kiến thức. Dựa trên mục tiêu thể chất, chế độ ăn kiêng và thói quen tập luyện của người dùng, bạn sẽ đề xuất các loại thực phẩm bổ sung phù hợp.

Mục tiêu Thể chất: {{{fitnessGoals}}}
Chế độ ăn kiêng: {{{dietaryRestrictions}}}
Thói quen tập luyện: {{{workoutRoutine}}}

Cung cấp danh sách các thực phẩm bổ sung được đề xuất và giải thích ngắn gọn lý do tại sao mỗi loại được khuyên dùng.
`,
})

const supplementAdvisorFlow = ai.defineFlow(
  {
    name: 'supplementAdvisorFlow',
    inputSchema: SupplementAdvisorInputSchema,
    outputSchema: SupplementAdvisorOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input)
    return output!
  },
)
