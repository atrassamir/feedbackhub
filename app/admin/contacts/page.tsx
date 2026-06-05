import { getAllContacts } from '../../lib/db/contact'
import ContactActions from '../components/ContactActions';
import type { Metadata } from 'next'


export const metadata: Metadata = {
    title: 'پیام‌های تماس',
}


export default async function AdminContactPage() {
    const contacts = await getAllContacts();

    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-2xl font-bold">پیام‌های تماس</h1>
                <span className="bg-blue-100 text-blue-700 text-sm px-3 py-1 rounded-full">
                    {contacts.length} پیام
                </span>
            </div>



            {contacts.length === 0 ? (
                <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center">
                    <div className="text-5xl mb-4">📭</div>
                    <p className="text-gray-400">هنوز هیچ پیامی دریافت نشده</p>
                </div>
            ) : (
                <div className="flex flex-col gap-4">
                    {contacts.map((contact) => (
                        <div
                            key={contact.id}
                            className={`bg-white rounded-2xl border p-6 transition-all ${contact.isRead
                                ? 'border-gray-200'
                                : 'border-blue-200 shadow-sm'
                                }`}
                        >
                            <div className="flex items-start justify-between gap-4">

                                {/* اطلاعات */}
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-1">
                                        {!contact.isRead && (
                                            <span className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0" />
                                        )}
                                        <h3 className="font-bold">{contact.name}</h3>
                                        <span className="text-gray-400 text-sm">{contact.email}</span>
                                    </div>
                                    <p className="text-gray-600 text-sm leading-relaxed">
                                        {contact.message}
                                    </p>
                                    <p className="text-xs text-gray-400 mt-3">
                                        {new Date(contact.createdAt).toLocaleDateString('fa-IR', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric',
                                            hour: '2-digit',
                                            minute: '2-digit',
                                        })}
                                    </p>
                                </div>

                                {/* وضعیت */}
                                <ContactActions id={contact.id} isRead={contact.isRead} />

                            </div>
                        </div>
                    ))}
                </div>
            )}



        </div>
    )
}