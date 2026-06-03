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


export const feedbackSchema = z.object({
    name: z
        .string()
        .min(2, 'نام باید حداقل ۲ کاراکتر باشد'),

    email: z
        .string()
        .email("ایمیل معتبر نیست"),

    rating: z
        .number({ invalid_type_error: 'امتیاز را انتخاب کنید' })
        .min(1, 'امتیاز باید حداقل ۱ بشد')
        .max(5),

    category: z.enum(['bug', 'suggestion', 'question', 'other'], {
        error: 'دسته بندی را انتخاب کنید'
        // errorMap: () => ({ message: 'دسته بندی را انتخاب کنید' })
    }),

    description: z.string().min(20, 'توضیحات باید حداقل ۲۰ کاراکتر باشد').max(1000, 'توضیحات نباید بیشتر از ۱۰۰۰ کاراکتر باشد'),

    agree: z.boolean().refine((val) => val === true, { message: 'تایید قوانین الزامی است' })

});

export type FeedbackFormData = z.infer<typeof feedbackSchema>