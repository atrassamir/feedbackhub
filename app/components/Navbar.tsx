'use client'


import Link from "next/link"
import { usePathname } from "next/navigation"


const links = [
  { href: '/', label: 'خانه' },
  { href: '/contact', label: 'تماس با ما' },
  { href: '/feedback', label: 'ارسال بازخورد' },
]


export default function Navbar() {
    const pathname = usePathname();


    return (
    <nav className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="max-w-3xl mx-auto flex items-center justify-between">

        <Link href="/" className="text-xl font-bold text-indigo-600">FeedbackHub</Link>

        <div className="flex gap-1">
          {links.map((link) => {
            const isActive = pathname === link.href
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                  isActive
                    ? 'bg-indigo-50 text-indigo-600 font-medium'
                    : 'text-gray-600 hover:text-indigo-600 hover:bg-gray-50'
                }`}
              >
                {link.label}
              </Link>
            )
          })}
        </div>

      </div>
    </nav>
    )
}