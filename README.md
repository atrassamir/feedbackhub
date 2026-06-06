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

فایل environment بساز
```bash
cp .env.example .env
```
فایل `.env` رو باز کن و مقادیر رو پر کن.


دیتابیس رو بساز
```bash
npx prisma migrate dev
npx prisma generate
```

پوشه uploads بساز
```bash
mkdir -p public/uploads
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

## لایسنس

MIT
