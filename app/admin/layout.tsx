import { auth } from "@/auth"
import { redirect } from "next/navigation"
import LogoutButton from "../components/LogoutButton"
import type { Metadata } from "next"
import AdminNav from './components/AdminNav'


export const metadata: Metadata = {
    title: {
        default: 'پنل ادمین',
        template: '%s | پنل ادمین'
    }
}


export default async function AdminLayout({ children }: { children: React.ReactNode }) {
    const session = await auth()
    if(!session) redirect('/login')

    return (
        <div className="min-h-screen bg-gray-50">

            {/* Admin Navbar */}
            <nav className="bg-gray-900 text-white px-6 py-4">
                <div className="max-w-5xl mx-auto flex items-center justify-between">


                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-3">
                            <span className="text-lg font-bold text-orange-400">
                                FeedbackHub
                            </span>
                            <span className="text-gray-500 text-sm">/</span>
                            <span className="text-sm text-gray-300">پنل مدیریت</span>
                        </div>
                        <AdminNav />
                    </div>


                    {/* سمت چپ — اطلاعات ادمین و logout */}
                    <div className="flex items-center gap-3">
                        <div className="text-left">
                            <p className="text-sm font-medium text-white">
                                {session.user?.name}
                            </p>
                            <p className="text-xs text-gray-400">
                                {session.user?.email}
                            </p>
                        </div>

                        {/* آواتار */}
                        <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                            {session.user?.name?.[0] ?? 'A'}
                        </div>

                        <LogoutButton />
                    </div>
                </div>
            </nav>


            {/* محتوا */}
            <div className="max-w-5xl mx-auto px-2 py-10">
                {children}
            </div>

        </div>
    )
}