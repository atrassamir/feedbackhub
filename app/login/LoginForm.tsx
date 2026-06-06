'use client'


import { useActionState } from "react";
import { loginAction } from "./actions";


const initialState = { error: null }


export default function LoginForm() {
    const [state, action, isPending] = useActionState(loginAction, initialState);


    return (
        <form action={action} className="flex flex-col gap-5">

            {/* خطای کلی */}
            {state.error && (
                <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-xl flex items-center gap-2">
                    <span>⚠️</span>
                    <span>{state.error}</span>
                </div>
            )}


            {/* ایمیل */}
            <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-700">
                    ایمیل
                </label>
                <input
                    name="email"
                    type="email"
                    placeholder="admin@feedbackhub.com"
                    disabled={isPending}
                    required
                    className="border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-50"
                />
            </div>


            {/* پسورد */}
            <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-700">
                    پسورد
                </label>
                <input
                    name="password"
                    type="password"
                    placeholder="••••••••"
                    disabled={isPending}
                    required
                    className="border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-50"
                />
            </div>


            {/* دکمه */}
            <button
                type="submit"
                disabled={isPending}
                className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white py-3 rounded-xl font-medium transition-colors flex items-center justify-center gap-2 mt-2"
            >
                {isPending ? (
                    <>
                        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        در حال ورود...
                    </>
                ) : (
                    'ورود به پنل'
                )}
            </button>

        </form>
    )
}
