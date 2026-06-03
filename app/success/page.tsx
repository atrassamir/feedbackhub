import Link from 'next/link'
import type { Metadata } from 'next'
import { Suspense } from 'react'
import SuccessContent from './SuccessContent'

export const metadata: Metadata = {
  title: 'ارسال موفق',
}

export default function SuccessPage() {
  return (
    <div className="max-w-lg mx-auto px-6 py-20 text-center">
      <Suspense fallback={<div className="text-gray-400">در حال بارگذاری...</div>}>
        <SuccessContent />
      </Suspense>

      <div className="flex gap-4 justify-center mt-8">
        <Link
          href="/"
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl transition-colors"
        >
          برگشت به خانه
        </Link>
        <Link
          href="/feedback"
          className="border border-gray-200 hover:border-indigo-300 px-6 py-3 rounded-xl transition-colors"
        >
          ارسال بازخورد جدید
        </Link>
      </div>
    </div>
  )
}