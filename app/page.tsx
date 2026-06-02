import Image from "next/image";
import type { Metadata } from "next";
import Link from "next/link";


export const metadata: Metadata = {
  title: 'خانه',
  description: 'فرم تماس و بازخورد',
}


export default function HomePage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-16">

      {/* Hero */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4"> به FeedbackHub خوش آمدید </h1>
        <p className="text-gray-500 text-lg">
          با ما در تماس باش یا بازخوردت رو با ما به اشتراک بذار
        </p>
      </div>

      {/* کارت‌ها */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* کارت تماس */}
        <div className="bg-white rounded-2xl p-8 border border-gray-200 hover:border-indigo-300 hover:shadow-md transition-all">
          <div className="text-4xl mb-4">✉️</div>
          <h2 className="text-xl font-bold mb-2">فرم تماس</h2>
          <p className="text-gray-500 text-sm mb-6">
            سوال یا مشکلی داری؟ مستقیم باهامون در تماس باش.
          </p>
          <ul className="text-sm text-gray-400 mb-6 flex flex-col gap-1">
            <li>✓ فرم ساده</li>
            <li>✓ Server Actions</li>
            <li>✓ Validation با Zod</li>
          </ul>
          <Link
            href="/contact"
            className="block text-center bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl transition-colors"
          >
            رفتن به فرم تماس
          </Link>
        </div>


        {/* کارت بازخورد */}
        <div className="bg-white rounded-2xl p-8 border border-gray-200 hover:border-indigo-300 hover:shadow-md transition-all">
          <div className="text-4xl mb-4">⭐</div>
          <h2 className="text-xl font-bold mb-2">فرم بازخورد</h2>
          <p className="text-gray-500 text-sm mb-6">
            نظرت برامون مهمه. بازخوردت رو با جزئیات بفرست.
          </p>
          <ul className="text-sm text-gray-400 mb-6 flex flex-col gap-1">
            <li>✓ امتیازدهی با ستاره</li>
            <li>✓ React Hook Form</li>
            <li>✓ آپلود فایل</li>
          </ul>
          <Link
            href="/feedback"
            className="block text-center bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl transition-colors"
          >
            رفتن به فرم بازخورد
          </Link>
        </div>


      </div>
    </div>
  );
}
