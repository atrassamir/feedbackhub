# FeedbackHub

یک پلتفرم ساده برای دریافت تماس و بازخورد از کاربران، ساخته شده با Next.js 15.

## ویژگی‌ها

- **فرم تماس**: با امکان ارسال پیام با استفاده از Server Actions
- **فرم بازخورد**: با امتیازدهی ستاره‌ای و آپلود فایل
- **اعتبارسنجی**: با استفاده از Zod و React Hook Form
- **طراحی مدرن**: با Tailwind CSS
- **TypeScript**: برای type safety

## تکنولوژی‌های استفاده شده

- **Next.js 15** (با App Router و Turbopack)
- **React 19**
- **TypeScript**
- **Tailwind CSS 4**
- **React Hook Form**
- **Zod**
- **Server Actions**

## شروع کار

ابتدا وابستگی‌ها را نصب کنید:

```bash
npm install
```

سپس سرور توسعه را اجرا کنید:

```bash
npm run dev
```

برای ساخت پروژه برای پروداکشن:

```bash
npm run build
```

برای اجرای نسخه پروداکشن:

```bash
npm start
```

## ساختار پروژه

```
app/
├── components/       # کامپوننت‌های عمومی (Navbar, Footer)
├── contact/          # صفحه و فرم تماس
│   ├── ContactForm.tsx
│   ├── actions.ts    # Server Actions
│   └── page.tsx
├── feedback/         # صفحه بازخورد
│   └── page.tsx
├── lib/              # انواع و اعتبارسنجی‌ها
│   ├── types.ts
│   └── validations.ts
├── success/          # صفحه موفقیت
│   └── page.tsx
├── layout.tsx        # Layout اصلی
└── page.tsx          # صفحه اصلی
```

## لایسنس

MIT
