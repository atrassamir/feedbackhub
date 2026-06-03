'use server'

import { contactSchema } from "../lib/validations";
import { FormState } from "../lib/types";
import { redirect } from "next/navigation";


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


    // ── ۳. پردازش داده‌ها ──────────────────────────
    // اینجا میتونی:
    // - به دیتابیس ذخیره کنی
    // - ایمیل بفرستی
    // - هر کار دیگه‌ای بکنی
    // فعلاً یه تاخیر مصنوعی میذاریم:
    await new Promise((resolve) => setTimeout(resolve, 1000));

    console.log('داده دریافتی : ', result.data);

    redirect(`/success?type=contact&name=${encodeURIComponent(result.data.name)}`)
}