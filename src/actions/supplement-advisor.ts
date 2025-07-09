'use server';

import { supplementAdvisor as supplementAdvisorFlow, type SupplementAdvisorInput, type SupplementAdvisorOutput } from '@/ai/flows/supplement-advisor';
import { z } from 'zod';

const formSchema = z.object({
  fitnessGoals: z.string().min(10, "Please describe your fitness goals in more detail."),
  dietaryRestrictions: z.string().min(3, "Please specify your dietary restrictions, or enter 'none'."),
  workoutRoutine: z.string().min(10, "Please describe your workout routine in more detail."),
});

export type AdvisorState = {
  success: boolean;
  message: string;
  data: SupplementAdvisorOutput | null;
  errors?: {
    fitnessGoals?: string[];
    dietaryRestrictions?: string[];
    workoutRoutine?: string[];
  } | null;
}

export async function getSupplementAdvice(
  prevState: AdvisorState,
  formData: FormData
): Promise<AdvisorState> {
  const validatedFields = formSchema.safeParse({
    fitnessGoals: formData.get('fitnessGoals'),
    dietaryRestrictions: formData.get('dietaryRestrictions'),
    workoutRoutine: formData.get('workoutRoutine'),
  });

  if (!validatedFields.success) {
    return {
      success: false,
      message: 'Invalid form data. Please check your entries.',
      errors: validatedFields.error.flatten().fieldErrors,
      data: null,
    };
  }
  
  try {
    const result = await supplementAdvisorFlow(validatedFields.data as SupplementAdvisorInput);
    return {
      success: true,
      message: 'Here is your personalized supplement advice!',
      data: result,
      errors: null,
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: 'An AI error occurred. Please try again later.',
      data: null,
      errors: null,
    };
  }
}
