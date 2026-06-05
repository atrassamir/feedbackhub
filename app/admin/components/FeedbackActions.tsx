'use client'

import { useState } from 'react'
import { toggleFeedbackRead, removeFeedback } from '../actions'


type Props = {
    id: number
    isRead: boolean
}


export default function FeedbackActions({ id, isRead }: Props) {
    const [loading, setLoading] = useState<'read' | 'delete' | null>(null)

    async function handleToggleRead() {
        setLoading('read')
        try {
            await toggleFeedbackRead(id, isRead)
        } finally {
            setLoading(null)
        }
    }

    async function handleDelete() {
        if (!confirm('آیا مطمئنی؟ این عمل قابل بازگشت نیست.')) return
        setLoading('delete')
        try {
            await removeFeedback(id)
        } finally {
            setLoading(null)
        }
    }

    return (
        <div className="flex flex-col gap-2">

            <button
                onClick={handleToggleRead}
                disabled={loading !== null}
                className={`text-xs px-3 py-1.5 rounded-lg transition-colors disabled:opacity-50 ${isRead
                        ? 'bg-gray-100 hover:bg-gray-200 text-gray-600'
                        : 'bg-purple-50 hover:bg-purple-100 text-purple-600'
                    }`}
            >
                {loading === 'read' ? (
                    <span className="flex items-center gap-1">
                        <span className="w-3 h-3 border border-current border-t-transparent rounded-full animate-spin" />
                        ...
                    </span>
                ) : isRead ? (
                    'نخوانده'
                ) : (
                    'خوانده شد'
                )}
            </button>

            <button
                onClick={handleDelete}
                disabled={loading !== null}
                className="text-xs px-3 py-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 transition-colors disabled:opacity-50"
            >
                {loading === 'delete' ? (
                    <span className="flex items-center gap-1">
                        <span className="w-3 h-3 border border-current border-t-transparent rounded-full animate-spin" />
                        ...
                    </span>
                ) : (
                    'حذف'
                )}
            </button>

        </div>
    )
}