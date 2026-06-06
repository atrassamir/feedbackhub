'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const links = [
  { href: '/admin', label: 'داشبورد', exact: true },
  { href: '/admin/contacts', label: 'پیام‌ها', exact: false },
  { href: '/admin/feedbacks', label: 'بازخوردها', exact: false },
  { href: '/', label: 'سایت ←', exact: true },
]

export default function AdminNav() {
  const pathname = usePathname()

  return (
    <div className="flex gap-1">
      {links.map((link) => {
        const isActive = link.exact
          ? pathname === link.href
          : pathname.startsWith(link.href)

        return (
          <Link
            key={link.href}
            href={link.href}
            className={`px-3 py-2 rounded-lg text-sm transition-colors ${
              isActive
                ? 'bg-indigo-600 text-white'
                : 'text-gray-300 hover:text-white hover:bg-gray-800'
            }`}
          >
            {link.label}
          </Link>
        )
      })}
    </div>
  )
}