'use client'


import { useForm } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod'
import { useRef, useState } from 'react'
import { feedbackSchema, FeedbackFormData } from '../lib/validations'
import { submitFeedback } from './actions'
import { FormState } from '../lib/types'
import FileUpload from "../components/FileUpload"


const categories = [
    { value: 'bug', label: '🐛 گزارش باگ' },
    { value: 'suggestion', label: '💡 پیشنهاد' },
    { value: 'question', label: '❓ سوال' },
    { value: 'other', label: '📝 سایر' },
]


export default function FeedbackForm() {
    const [formState, setFormState] = useState<FormState | null>(null);
    const fileRef = useRef<File | null>(null)

    const { register, handleSubmit, watch, setValue, formState: { errors, isSubmitting } } = useForm<FeedbackFormData>(
        {
            resolver: zodResolver(feedbackSchema),
            defaultValues: {
                name: '',
                email: '',
                rating: 0,
                description: '',
                agree: false,
            }
        }
    );


    const currentRating = watch('rating')
    const descriptionValue = watch('description')


    async function onSubmit(data: FeedbackFormData) {
        const formData = new FormData();
        if(fileRef.current) {
            formData.append('screenshot', fileRef.current)
        }

        const result = await submitFeedback(data, formData);
        setFormState(result);
    }


    if (formState?.success) return (
        <div className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center">
            <div className="text-5xl mb-4">🎉</div>
            <h2 className="text-xl font-bold text-green-800 mb-2"> بازخورد ثبت شد! </h2>
            <p className="text-green-600">{formState.message}</p>
            <button onClick={() => setFormState(null)} className="mt-6 text-sm text-indigo-600 hover:underline">
                ارسال بازخورد جدید
            </button>
        </div>
    )


    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">

            {/* ── نام و ایمیل ── */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-gray-700"> نام <span className="text-red-500">*</span></label>
                    <input
                        {...register('name')}
                        placeholder="علی محمدی"
                        disabled={isSubmitting}
                        className="border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-50"
                    />
                    {errors.name && (<p className="text-red-500 text-xs">{errors.name.message}</p>)}
                </div>

                <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-gray-700"> ایمیل <span className="text-red-500">*</span></label>
                    <input
                        {...register('email')}
                        type="email"
                        placeholder="ali@example.com"
                        disabled={isSubmitting}
                        className="border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-50"
                    />
                    {errors.email && (<p className="text-red-500 text-xs">{errors.email.message}</p>)}
                </div>

            </div>



            {/* ── امتیازدهی ── */}
            <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-gray-700"> امتیاز <span className="text-red-500">*</span></label>
                <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <button
                            key={star}
                            type="button"
                            disabled={isSubmitting}
                            onClick={() => setValue('rating', star, { shouldValidate: true })}
                            className={`text-3xl transition-transform cursor-pointer hover:scale-110 disabled:opacity-50 ${star <= currentRating ? 'opacity-100' : 'opacity-30'
                                }`}>⭐</button>
                    ))}
                </div>
                {errors.rating && (<p className="text-red-500 text-xs">{errors.rating.message}</p>)}
            </div>


            {/* ── دسته‌بندی ── */}
            <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-gray-700"> دسته‌بندی <span className="text-red-500">*</span></label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {categories.map((cat) => {
                        const currentCategory = watch('category')
                        return (
                            <button
                                key={cat.value}
                                type="button"
                                disabled={isSubmitting}
                                onClick={() =>
                                    setValue('category', cat.value as FeedbackFormData['category'], { shouldValidate: true, })
                                }
                                className={`border rounded-xl py-3 px-2 text-sm cursor-pointer transition-all disabled:opacity-50 ${currentCategory === cat.value
                                        ? 'border-indigo-500 bg-indigo-50 text-indigo-700 font-medium' : 'border-gray-200 hover:border-indigo-400'
                                    }`}>
                                {cat.label}
                            </button>
                        )
                    })}
                </div>
                {errors.category && (<p className="text-red-500 text-xs">{errors.category.message}</p>)}
            </div>


            {/* ── توضیحات ── */}
            <div className="flex flex-col gap-1">
                <div className="flex justify-between">
                    <label className="text-sm font-medium text-gray-700"> توضیحات <span className="text-red-500">*</span></label>
                    <span className="text-xs text-gray-400">
                        {descriptionValue?.length ?? 0} / 1000
                    </span>
                </div>
                <textarea
                    {...register('description')}
                    rows={5}
                    placeholder="توضیحات کامل بازخورد خود را بنویسید..."
                    disabled={isSubmitting}
                    className="border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-50 resize-none"
                />
                {errors.description && (<p className="text-red-500 text-xs">{errors.description.message}</p>)}
            </div>


            <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-700">
                    تصویر (اختیاری)
                </label>
                <FileUpload
                    onChange={(file) => { fileRef.current = file }}
                    disabled={isSubmitting}
                />
            </div>


            {/* ── checkbox ── */}
            <div className="flex flex-col gap-1">
                <label className="flex items-start gap-3 cursor-pointer">
                    <input
                        {...register('agree')}
                        type="checkbox"
                        disabled={isSubmitting}
                        className="mt-1 w-4 h-4 accent-indigo-600"
                    />
                    <span className="text-sm text-gray-600"> قوانین و مقررات را خوانده‌ام و با ارسال این بازخورد موافقم.</span>
                </label>
                {errors.agree && (<p className="text-red-500 text-xs">{errors.agree.message}</p>)}
            </div>


            {/* ── دکمه ارسال ── */}
            <button
                type="submit"
                disabled={isSubmitting}
                className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white py-3 rounded-xl font-medium transition-colors flex items-center justify-center gap-2"
            >
                {isSubmitting ? (
                    <>
                        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        در حال ارسال...
                    </>
                ) : ('ارسال بازخورد')}
            </button>



        </form>
    )
}