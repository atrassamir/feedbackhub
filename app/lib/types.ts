export type FormState = {
    success: boolean
    message: string
    errors?: Record<string, string[]>
}

export type FileValidationResult = {
    valid: boolean
    error?: string
}