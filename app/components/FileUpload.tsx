'use client'


import { useState, useRef } from "react";
import { ACCEPTED_TYPES, MAX_FILE_SIE } from "../lib/fileHelpers";


type Props = {
    onChange: (file: File | null) => void
    disabled?: boolean
    error?: string
}


export default function FileUpload({ onChange, disabled, error }: Props) {
    const [preview, setPreview] = useState<string | null>(null)
    const [fileName, setFileName] = useState<string | null>(null)
    const [fileError, setFileError] = useState<string | null>(null)
    const inputRef = useRef<HTMLInputElement>(null)


    function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0] ?? null;
        setFileError(null);

        if (!file) {
            setPreview(null)
            setFileName(null)
            onChange(null)
            return
        };

        // validate
        if (!ACCEPTED_TYPES.includes(file.type)) {
            setFileError('فقط JPG، PNG و WebP قابل قبول است')
            return
        };

        if (file.size > MAX_FILE_SIE) {
            setFileError('حجم فایل نباید بیشتر از ۲ مگابایت باشد')
            return
        };

        const reader = new FileReader();
        reader.onload = () => setPreview(reader.result as string);
        reader.readAsDataURL(file);

        setFileName(file.name);
        onChange(file);
    };


    function handleRemove() {
        setPreview(null);
        setFileName(null);
        setFileError(null);
        onChange(null);
        if (inputRef.current) inputRef.current.value = '';
    };


    return (
        <div className="flex flex-col gap-2">

            {/* label آپلود */}
            {!preview ? (
                <label
                    className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-colors ${disabled
                            ? 'border-gray-200 bg-gray-50 cursor-not-allowed'
                            : 'border-gray-300 hover:border-indigo-400 hover:bg-indigo-50'
                        }`}
                >
                    <input
                        ref={inputRef}
                        type="file"
                        accept={ACCEPTED_TYPES.join(',')}
                        onChange={handleFileChange}
                        disabled={disabled}
                        className="hidden"
                    />

                    <div className="text-3xl mb-2">📎</div>

                    <p className="text-sm text-gray-600 font-medium"> کلیک کن یا فایل رو اینجا بکش</p>
                    <p className="text-xs text-gray-400 mt-1">JPG، PNG، WebP — حداکثر ۲ مگابایت</p>
                </label>
            ) : (
                // پیش‌نمایش فایل انتخاب شده
                <div className="border border-gray-200 rounded-xl p-4 flex items-center gap-4">
                    <img
                        src={preview}
                        alt="پیش‌نمایش"
                        className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-700 truncate"> {fileName} </p>
                        <p className="text-xs text-green-600 mt-1">✓ فایل آماده آپلود</p>
                    </div>
                    <button
                        type="button"
                        onClick={handleRemove}
                        disabled={disabled}
                        className="text-gray-400 hover:text-red-500 transition-colors disabled:opacity-50"
                    >
                        ✕
                    </button>
                </div>
            )}

            {/* خطا */}
            {(fileError || error) && (<p className="text-red-500 text-xs">{fileError ?? error}</p>)}

        </div>
    )

}