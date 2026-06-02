import Link from "next/link"

export default function Navbar() {
    return (
        <nav className="bg-white border-b border-gray-200 px-6 py-4">
            <div className="max-w-3xl mx-auto flex items-center justify-between">

                <Link href="/" className="text-xl font-bold text-indigo-600">
                    FeedbackHub
                </Link>

                <div className="flex gap-6 text-sm">
                    <Link href="/" className="text-gray-600 hover:text-indigo-600 transition-colors">
                        خانه
                    </Link>
                    <Link href="/contact" className="text-gray-600 hover:text-indigo-600 transition-colors">
                        تماس با ما
                    </Link>
                    <Link href="/feedback" className="text-gray-600 hover:text-indigo-600 transition-colors">
                        ارسال بازخورد
                    </Link>
                </div>

            </div>
        </nav>
    )
}