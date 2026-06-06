'use server'

import { revalidatePath } from "next/cache"
import { markContactAsRead, deleteContact } from "../lib/db/contact"
import { markFeedbackAsRead, deleteFeedback } from "../lib/db/feedback"
import { signOut } from "@/auth"

export async function toggleContactRead(id: number, isRead: boolean) {
    try {
        await markContactAsRead(id);
        revalidatePath('/admin');
        revalidatePath('/admin/contact');
    } catch (error) {
        console.log('خطا: ', error);
        throw new Error('خطا در آپدیت وضعیت');
    }
};


export async function removeContact(id: number) {
    try {
        await deleteContact(id);
        revalidatePath('/admin');
        revalidatePath('/admin/contact');
    } catch (error) {
        console.log('خطا: ', error);
        throw new Error('خطا در حذف پیام');
    }
};


export async function toggleFeedbackRead(id: number, isRead: boolean) {
    try {
        await markFeedbackAsRead(id)
        revalidatePath('/admin')
        revalidatePath('/admin/feedbacks')
    } catch (error) {
        console.error('خطا:', error)
        throw new Error('خطا در آپدیت وضعیت')
    }
};


export async function removeFeedback(id: number) {
    try {
        await deleteFeedback(id)
        revalidatePath('/admin')
        revalidatePath('/admin/feedbacks')
    } catch (error) {
        console.error('خطا:', error)
        throw new Error('خطا در حذف بازخورد')
    }
};


export async function logoutAction() {
    await signOut({ redirectTo: '/login' })
}