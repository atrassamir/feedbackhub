'use server'


import { contactSchema } from "../lib/validations";
import { FormState } from "../lib/types";
import { redirect } from "next/navigation";
import { createContact } from "../lib/db/contact";


export async function submitContact(prevState: FormState, formData: FormData): Promise<FormState> {
    const rawData = {
        name: formData.get('name'),
        email: formData.get('email'),
        message: formData.get('message')
    };

    const result = contactSchema.safeParse(rawData);

    if(!result.success) {
        return {
            success: false,
            message: 'لطفا خطاها را برطرف کنید',
            errors: result.error.flatten().fieldErrors
        };
    };


    try {
        await createContact(result.data)
    } catch (error) {
        console.log('خطا در ذخیره پیام', error)
        return { success: false, message: 'خطا در ذخیره پیام. لطفا دوباره تلاش کنید'}
    }


    redirect(`/success?type=contact&name=${encodeURIComponent(result.data.name)}`)
}