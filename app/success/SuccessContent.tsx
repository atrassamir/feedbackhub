'use client'

import { useSearchParams } from 'next/navigation'

const config = {
  contact: {
    icon: '✉️',
    title: 'پیام ارسال شد!',
    description: 'پیامت دریافت شد. در اولین فرصت جواب میدیم.',
    color: 'blue',
  },
  feedback: {
    icon: '🎉',
    title: 'بازخورد ثبت شد!',
    description: 'ممنون که وقت گذاشتی. نظرت برامون خیلی مهمه.',
    color: 'green',
  },
  default: {
    icon: '✅',
    title: 'با موفقیت انجام شد!',
    description: 'عملیات با موفقیت انجام شد.',
    color: 'indigo',
  },
}

export default function SuccessContent() {
  const searchParams = useSearchParams()
  const type = searchParams.get('type') as keyof typeof config | null
  const name = searchParams.get('name')

  const content = config[type ?? 'default'] ?? config.default

  return (
    <>
      <div className="text-7xl mb-6">{content.icon}</div>
      <h1 className="text-3xl font-bold mb-3">{content.title}</h1>
      { name && ( <p className="text-indigo-600 font-medium mb-2">سلام {name} عزیز!</p> )}
      <p className="text-gray-500 leading-relaxed">{content.description}</p>
    </>
  )
}