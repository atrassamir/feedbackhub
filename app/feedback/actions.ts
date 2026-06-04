'use server'

import { writeFile } from "fs/promises";
import { join } from "path";
import { feedbackSchema, FeedbackFormData } from "../lib/validations";
import { FormState } from "../lib/types";
import { validateFile, getFileExtension } from "../lib/fileHelpers";
import { redirect } from "next/navigation";
import { createFeedback } from "../lib/db/feedback";


export async function submitFeedback(data:FeedbackFormData, formData: FormData): Promise<FormState> {
    const result = feedbackSchema.safeParse(data)

    if(!result.success) return {
        success: false,
        message: 'داده وارد شده نامعتبر است.',
        errors: result.error.flatten().fieldErrors
    }


    let screenshotPath: string | null = null
    const file = formData.get('screenshot') as File | null


    if ( file && file.size > 0 ){
        const validation = validateFile(file)

        if(!validation.valid) return {
            success: false,
            message: validation.error ?? 'فایل نامعتبر'
        }

        const bytes = await file.arrayBuffer()
        const buffer = Buffer.from(bytes)

        const ext = getFileExtension(file.name);
        const fileName = `feedback=${Date.now()}.${ext}`;
        const filePath = join(process.cwd(), 'public/uploads', fileName);

        await writeFile(filePath, buffer);
        screenshotPath = `/uploads/${fileName}`;
    }


    try {
        await createFeedback({
            name: result.data.name,
            email: result.data.email,
            rating: result.data.rating,
            category: result.data.category,
            description: result.data.description,
            screenshot: screenshotPath,
        })
    } catch (error) {
        console.error('خطا در ذخیره بازخورد:', error)
        return { success: false, message: 'خطا در ذخیره بازخورد. لطفاً دوباره تلاش کنید.' }
    }


    redirect(`/success?type=feedback&name=${encodeURIComponent(result.data.name)}`);
}