import { z } from "zod";

export const contactSchema = z.object({
    name: z
        .string()
        .min(2, 'نام باید حداقل ۲ کاراکتر باشد')
        .max(50, 'نام نباید بیشتر از ۵۰ کاراکتر باشد'),
    email: z
        .string()
        .email("ایمیل معتبر نیست"),
    message: z
        .string()
        .min(10, 'پیام باید حداقل ۱۰ کاراکتر باشد')
        .max(500, 'پیام نباید بیشتر از ۵۰۰ کاراکتر باشد'),
})

export type ContactFormData = z.infer<typeof contactSchema>