'use client'

import { useActionState } from "react"
import { submitContact } from "./actions"
import { FormState } from "../lib/types"


const initalState: FormState = {
    success: false,
    message: '',
}


export default function ContactForm() {
    const [state, action, isPending] = useActionState(submitContact, initalState)


    if (state.success) {
        return (
            <div className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center">
                <div className="text-5xl mb-4">✅</div>
                <h2 className="text-xl font-bold text-green-800 mb-2">پیام ارسال شد!</h2>
                <p className="text-green-600">{state.message}</p>
                <button onClick={() => window.location.reload()} className="mt-6 text-sm text-indigo-600 hover:underline">
                    ارسال پیام جدید
                </button>
            </div>
        )
    }

    return (
        <form action={action} className="flex flex-col gap-5">

            {/* خطای کلی */}
            {state.message && !state.success && (
                <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-xl">
                    {state.message}
                </div>
            )}


            {/* نام */}
            <div className="flex flex-col gap-1">
                <label htmlFor="name" className="text-sm font-medium text-gray-700">
                    نام <span className="text-red-500">*</span>
                </label>
                <input type="text" id="name" name="name" placeholder="نام را وارد کنید" disabled={isPending} className="bg-white border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-50 disabled:text-gray-400" />
                {state.errors?.name && (
                    <p className="text-red-500 text-xs">{state.errors.name[0]}</p>
                )}
            </div>


            {/* ایمیل */}
            <div className="flex flex-col gap-1">
                <label htmlFor="email" className="text-sm font-medium text-gray-700">
                    ایمیل <span className="text-red-500">*</span>
                </label>
                <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="ali@example.com"
                    disabled={isPending}
                    className="bg-white border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-50 disabled:text-gray-400"
                />
                {state.errors?.email && (
                    <p className="text-red-500 text-xs">{state.errors.email[0]}</p>
                )}
            </div>


            {/* پیام */}
            <div className="flex flex-col gap-1">
                <label htmlFor="message" className="text-sm font-medium text-gray-700">
                    پیام <span className="text-red-500">*</span>
                </label>
                <textarea
                    id="message"
                    name="message"
                    rows={5}
                    placeholder="پیام خود را بنویسید..."
                    disabled={isPending}
                    className="bg-white border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-50 disabled:text-gray-400 resize-none"
                />
                {state.errors?.message && (
                    <p className="text-red-500 text-xs">{state.errors.message[0]}</p>
                )}
            </div>


            {/* دکمه ارسال */}
            <button
                type="submit"
                disabled={isPending}
                className="bg-gray-800 hover:bg-indigo-700 disabled:bg-indigo-400 text-white py-3 rounded-xl font-medium transition-colors flex items-center justify-center gap-2"
            >
                {isPending ? (
                    <>
                        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        در حال ارسال...
                    </>
                ) : (
                    'ارسال پیام'
                )}
            </button>


        </form>
    )
}