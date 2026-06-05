import { getAllFeedbacks } from '../../lib/db/feedback'
import Image from 'next/image'
import type { Metadata } from 'next'


export const metadata: Metadata = {
    title: 'بازخوردها',
}


const categoryLabels: Record<string, string> = {
    bug: '🐛 گزارش باگ',
    suggestion: '💡 پیشنهاد',
    question: '❓ سوال',
    other: '📝 سایر',
}


export default async function AdminFeedbacksPage() {
    const feedbacks = await getAllFeedbacks();


    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-2xl font-bold">بازخوردها</h1>
                <span className="bg-purple-100 text-purple-700 text-sm px-3 py-1 rounded-full">
                    {feedbacks.length} بازخورد
                </span>
            </div>


            {feedbacks.length === 0 ? (
                <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center">
                    <div className="text-5xl mb-4">📭</div>
                    <p className="text-gray-400">هنوز هیچ بازخوردی دریافت نشده</p>
                </div>
            ) : (
                <div className="flex flex-col gap-4">
                    {feedbacks.map((feedback) => (
                        <div
                            key={feedback.id}
                            className={`bg-white rounded-2xl border p-6 transition-all ${feedback.isRead
                                    ? 'border-gray-200'
                                    : 'border-purple-200 shadow-sm'
                                }`}
                        >
                            <div className="flex items-start gap-4">

                                {/* محتوا */}
                                <div className="flex-1 min-w-0">

                                    {/* هدر */}
                                    <div className="flex items-center gap-2 mb-3 flex-wrap">
                                        {!feedback.isRead && (
                                            <span className="w-2 h-2 bg-purple-500 rounded-full flex-shrink-0" />
                                        )}
                                        <h3 className="font-bold">{feedback.name}</h3>
                                        <span className="text-gray-400 text-sm">{feedback.email}</span>
                                        <span className="text-xs bg-gray-100 px-2 py-1 rounded-full">
                                            {categoryLabels[feedback.category] ?? feedback.category}
                                        </span>
                                        <span className="text-sm">
                                            {'⭐'.repeat(feedback.rating)}
                                        </span>
                                    </div>

                                    {/* توضیحات */}
                                    <p className="text-gray-600 text-sm leading-relaxed mb-3">
                                        {feedback.description}
                                    </p>

                                    {/* تصویر */}
                                    {feedback.screenshot && (
                                        <div className="mb-3">
                                            <Image
                                                src={feedback.screenshot}
                                                alt="تصویر بازخورد"
                                                width={200}
                                                height={120}
                                                className="rounded-lg object-cover border border-gray-200"
                                            />
                                        </div>
                                    )}

                                    {/* تاریخ */}
                                    <p className="text-xs text-gray-400">
                                        {new Date(feedback.createdAt).toLocaleDateString('fa-IR', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric',
                                            hour: '2-digit',
                                            minute: '2-digit',
                                        })}
                                    </p>
                                </div>

                                {/* وضعیت */}
                                <div className="flex-shrink-0">
                                    {feedback.isRead ? (
                                        <span className="text-xs text-gray-400 bg-gray-100 px-3 py-1 rounded-full">
                                            خوانده شده
                                        </span>
                                    ) : (
                                        <span className="text-xs text-purple-600 bg-purple-50 px-3 py-1 rounded-full">
                                            جدید
                                        </span>
                                    )}
                                </div>

                            </div>
                        </div>
                    ))}
                </div>
            )}


        </div>
    )
}