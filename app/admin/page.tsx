import Link from 'next/link'
import { getAllContacts } from '../lib/db/contact'
import { getAllFeedbacks } from '../lib/db/feedback'
import type { Metadata } from 'next'


export const metadata: Metadata = {
    title: 'داشبورد',
}


export default async function AdminPage() {
    const [contacts, feedbacks] = await Promise.all([
        getAllContacts(),
        getAllFeedbacks()
    ])



    const unreadContacts = contacts.filter(c => !c.isRead).length
    const unreadFeedbacks = feedbacks.filter(f => !f.isRead).length


    const avgRating = feedbacks.length ? (feedbacks.reduce((sum, f) => sum + f.rating, 0) / feedbacks.length).toFixed(1) : '_'

    const stats = [
        {
            label: 'کل پیام‌های تماس',
            value: contacts.length,
            sub: `${unreadContacts} خوانده نشده`,
            href: '/admin/contacts',
            color: 'bg-blue-50 border-blue-200',
            valueColor: 'text-blue-600',
        },
        {
            label: 'کل بازخوردها',
            value: feedbacks.length,
            sub: `${unreadFeedbacks} خوانده نشده`,
            href: '/admin/feedbacks',
            color: 'bg-purple-50 border-purple-200',
            valueColor: 'text-purple-600',
        },
        {
            label: 'میانگین امتیاز',
            value: avgRating,
            sub: `از ${feedbacks.length} بازخورد`,
            href: '/admin/feedbacks',
            color: 'bg-yellow-50 border-yellow-200',
            valueColor: 'text-yellow-600',
        },
    ]


    return (
        <div>
            <h1 className="text-2xl font-bold mb-8">داشبورد</h1>


            {/* آمار */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                {stats.map((stat) => (
                    <Link key={stat.label} href={stat.href}>
                        <div className={`border rounded-2xl p-6 hover:shadow-md transition-all ${stat.color}`}>
                            <p className="text-sm text-gray-500 mb-1">{stat.label}</p>
                            <p className={`text-4xl font-bold mb-1 ${stat.valueColor}`}>
                                {stat.value}
                            </p>
                            <p className="text-xs text-gray-400">{stat.sub}</p>
                        </div>
                    </Link>
                ))}
            </div>



            {/* آخرین پیام‌ها */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">


                {/* آخرین تماس‌ها */}
                <div className="bg-white rounded-2xl border border-gray-200 p-6">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="font-bold">آخرین پیام‌های تماس</h2>
                        <Link
                            href="/admin/contacts"
                            className="text-xs text-indigo-600 hover:underline"
                        >
                            همه ←
                        </Link>
                    </div>

                    {contacts.length === 0 ? (
                        <p className="text-gray-400 text-sm text-center py-4">
                            هنوز پیامی دریافت نشده
                        </p>
                    ) : (
                        <div className="flex flex-col gap-3">
                            {contacts.slice(0, 3).map((contact) => (
                                <div
                                    key={contact.id}
                                    className="flex items-start gap-3 pb-3 border-b border-gray-100 last:border-0"
                                >
                                    <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${contact.isRead ? 'bg-gray-300' : 'bg-blue-500'
                                        }`} />
                                    <div className="min-w-0">
                                        <p className="text-sm font-medium">{contact.name}</p>
                                        <p className="text-xs text-gray-400 truncate">
                                            {contact.message}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>


                {/* آخرین بازخوردها */}
                <div className="bg-white rounded-2xl border border-gray-200 p-6">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="font-bold">آخرین بازخوردها</h2>
                        <Link
                            href="/admin/feedbacks"
                            className="text-xs text-indigo-600 hover:underline"
                        >
                            همه ←
                        </Link>
                    </div>

                    {feedbacks.length === 0 ? (
                        <p className="text-gray-400 text-sm text-center py-4">
                            هنوز بازخوردی دریافت نشده
                        </p>
                    ) : (
                        <div className="flex flex-col gap-3">
                            {feedbacks.slice(0, 3).map((feedback) => (
                                <div
                                    key={feedback.id}
                                    className="flex items-start gap-3 pb-3 border-b border-gray-100 last:border-0"
                                >
                                    <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${feedback.isRead ? 'bg-gray-300' : 'bg-purple-500'
                                        }`} />
                                    <div className="min-w-0 flex-1">
                                        <div className="flex items-center justify-between">
                                            <p className="text-sm font-medium">{feedback.name}</p>
                                            <span className="text-xs">
                                                {'⭐'.repeat(feedback.rating)}
                                            </span>
                                        </div>
                                        <p className="text-xs text-gray-400 truncate">
                                            {feedback.description}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>


            </div>

        </div>
    )
}