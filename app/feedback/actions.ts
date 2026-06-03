'use server'

import { feedbackSchema, FeedbackFormData } from "../lib/validations";
import { FormState } from "../lib/types";


export async function submitFeedback(data:FeedbackFormData): Promise<FormState> {
    const result = feedbackSchema.safeParse(data)

    if(!result.success) return {
        success: false,
        message: 'داده وارد شده نامعتبر است.',
        errors: result.error.flatten().fieldErrors
    }

    
    await new Promise((resolve) => setTimeout(resolve, 1200))
    console.log('بازخورد دریافتی : ',result.data)

    return {
        success: true,
        message: `ممنون ${result.data.name}! بازخوردت ثبت شد.`,
    }
}