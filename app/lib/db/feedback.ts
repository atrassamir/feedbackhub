import { prisma } from "../prisma";


type CreateFeedbackInput = {
    name: string
    email: string
    rating: number
    category: string
    description: string
    screenshot?: string | null
}


export async function createFeedback(data: CreateFeedbackInput) {
    return prisma.feedback.create({
        data: {
            name: data.name,
            email: data.email,
            rating: data.rating,
            category: data.category,
            description: data.description,
            screenshot: data.screenshot ?? null,
        },
    })
}


export async function getAllFeedbacks() {
    return prisma.feedback.findMany({
        orderBy: { createdAt: 'desc' },
    })
}


export async function markFeedbackAsRead(id: number) {
    const feedback = await prisma.feedback.findUnique({ where: { id } })
    return prisma.feedback.update({
        where: { id },
        data: { isRead: !feedback?.isRead },
    })
}


export async function deleteFeedback(id: number) {
    return prisma.feedback.delete({
        where: { id },
    })
}