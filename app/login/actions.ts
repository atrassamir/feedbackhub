'use server'


import { signIn } from "@/auth"
import { error } from "console"
import { AuthError } from "next-auth"


export async function loginAction(prevState: { error: string | null }, formData: FormData) {
    try {
        await signIn('credentials', {
            email: formData.get('email'),
            password: formData.get('password'),
            redirectTo: '/admin'
        })
    } catch (error) {
        if(error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                    return { error: 'ایمیل یا پسورد اشتباه است'}
                default:
                    return { error: 'خطایی رخ داد. دوباره تلاش کنید.' }
            }
        }
        throw error
    }
    return { error: null }
}