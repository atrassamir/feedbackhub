import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import LoginForm from './LoginForm';
import type { Metadata } from 'next';


export const metadata: Metadata = {
    title: 'ورود به پنل مدیریت | FeedbackHub',
}


export default async function LoginPage() {
    const session = await auth()
    if(session) redirect('/admin')


    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6">
            <div className="w-full max-w-sm mb-24">

                {/* هدر */}
                <div className="text-center mb-8">
                    <h1 className="text-2xl font-bold text-indigo-600 mb-1">
                        FeedbackHub
                    </h1>
                    <p className="text-gray-500 text-sm">
                        برای دسترسی به پنل مدیریت وارد شوید
                    </p>
                </div>

                {/* کارت فرم */}
                <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
                    <h2 className="text-lg font-bold mb-6 text-center">ورود به حساب</h2>
                    <LoginForm />
                </div>


            </div>
        </div>
    )
}