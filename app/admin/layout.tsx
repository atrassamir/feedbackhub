import Link from "next/link"
import type { Metadata } from "next"


export const metadata: Metadata = {
    title: {
        default: 'پنل ادمین',
        template: '%s | پنل ادمین'
    }
}


export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen bg-gray-50">

            {/* Admin Navbar */}
            <nav className="bg-gray-900 text-white px-6 py-4">
                <div className="max-w-5xl mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <span className="text-lg font-bold text-orange-400">
                            FeedbackHub
                        </span>
                        <span className="text-gray-500 text-sm">/</span>
                        <span className="text-sm text-gray-300">پنل مدیریت</span>
                    </div>

                    <div className="flex gap-8 text-sm">
                        <Link
                            href="/admin"
                            className="text-gray-300 hover:text-white transition-colors"
                        >
                            پیشخوان
                        </Link>
                        <Link
                            href="/admin/contacts"
                            className="text-gray-300 hover:text-white transition-colors"
                        >
                            پیام‌ها
                        </Link>
                        <Link
                            href="/admin/feedbacks"
                            className="text-gray-300 hover:text-white transition-colors"
                        >
                            بازخوردها
                        </Link>
                        <Link
                            href="/"
                            className="text-gray-300 hover:text-white transition-colors"
                        >
                            بازگشت به سایت
                        </Link>
                    </div>
                </div>
            </nav>


            {/* محتوا */}
            <div className="max-w-5xl mx-auto px-6 py-10">
                {children}
            </div>


        </div>
    )
}