'use server'

import { writeFile } from "fs/promises";
import { join } from "path";
import { feedbackSchema, FeedbackFormData } from "../lib/validations";
import { FormState } from "../lib/types";
import { validateFile, getFileExtension } from "../lib/fileHelpers";
import { redirect } from "next/navigation";


export async function submitFeedback(data:FeedbackFormData, formData: FormData): Promise<FormState> {
    const result = feedbackSchema.safeParse(data)

    if(!result.success) return {
        success: false,
        message: 'داده وارد شده نامعتبر است.',
        errors: result.error.flatten().fieldErrors
    }


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
        console.log('فایل ذخیره شده : ', fileName)
    }


    await new Promise((resolve) => setTimeout(resolve, 1200))


    redirect(`/success?type=feedback&name=${encodeURIComponent(result.data.name)}`);
}