import ContactForm from "./ContactForm"
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'تماس با ما',
  description: 'تماس با ما',
}

export default function ContactPage() {
  return (
    <div className="max-w-xl mx-auto px-6 py-12">

      {/* هدر */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">تماس با ما</h1>
        <p className="text-gray-500">
          سوال یا مشکلی داری؟ پیامت رو بفرست، زود جواب میدیم.
        </p>
      </div>

      {/* فرم */}
      <div className="bg-gray-50 rounded-2xl border border-gray-300 p-8">
        <ContactForm />
      </div>

    </div>
  );
}