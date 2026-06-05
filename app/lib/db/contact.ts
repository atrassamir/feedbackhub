import { prisma } from './../prisma';

type CreateContactInput = {
    name: string
    email: string
    message: string
}


export async function createContact(data: CreateContactInput) {
    return prisma.contact.create({
        data: {
            name: data.name,
            email: data.email,
            message: data.message
        }
    })
}


export async function getAllContacts() {
    return prisma.contact.findMany({
        orderBy: { createdAt: 'desc' }
    })
}


export async function makeContactAsRead(id: number) {
    return prisma.contact.update({
        where: { id },
        data: { isRead: true }
    })
}


export async function deleteContact(id: number) {
    return prisma.contact.delete({
        where: { id }
    })
}