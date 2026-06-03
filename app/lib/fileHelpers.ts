export const ACCEPTED_TYPES = ['image/jpeg', 'image/png', 'image/webp']
export const MAX_FILE_SIE = 2 * 1024 * 1024 // 2MB

export function validateFile(file: File) {
    if (!ACCEPTED_TYPES.includes(file.type)) return {
        valid: false,
        error: 'فقط فایل‌های JPG، PNG و WebP قابل قبول است'
    }

    if (file.size > MAX_FILE_SIE) return {
        valid: false,
        error: 'حجم فایل نباید بیشتر از ۲ مگابایت باشد',
    }

    return { valid: true }
}

export function getFileExtension(filename: string): string {
    return filename.split('.').pop() ?? 'jpg'
}