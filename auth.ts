import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { authConfig } from "./auth.config";
import { z } from "zod";


const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(4)
})


export const { auth, signIn, signOut, handlers } = NextAuth({
    ...authConfig,
    providers: [
        Credentials({
            async authorize(credentials) {

                const parsed = loginSchema.safeParse(credentials);
                if(!parsed.success) return null

                const { email, password } = parsed.data

                if(email !== process.env.ADMIN_EMAIL) return null

                const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD!, 10)

                const passwordMatch = await bcrypt.compare(password, hashedPassword)
                if(!passwordMatch) return null

                return {
                    id: '1',
                    email: email,
                    name: 'Admin'
                }
            }
        })
    ]
})



