import FeedbackForm from "./FeedbackForm";
import type { Metadata } from "next";


export const metadata: Metadata = {
  title: 'ارسال بازخورد',
  description: 'فرم بازخورد پیشرفته'
}


export default function FeedbackPage() {
  return (
    <div className="max-w-xl mx-auto px-6 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">ارسال بازخورد</h1>
        <p className="text-gray-500">
          نظرت برامون مهمه. با جزئیات بنویس تا بهتر بتونیم کمک کنیم.
        </p>
      </div>
      <div className="bg-white rounded-2xl border border-gray-200 p-8">
        <FeedbackForm />
      </div>
    </div>
  );
}