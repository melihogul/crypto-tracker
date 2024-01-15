"use server"

import bcrypt from "bcryptjs"
import { signIn } from "@/auth"
import { getUserByEmail } from "@/data/user"
import { sendVerificationEmail } from "@/lib/mail"
import { generateVerificationToken } from "@/lib/tokens"
import { DEFAULT_LOGIN_REDIRECT } from "@/routes"
import { LoginSchema } from "@/schemas"
import { AuthError } from "next-auth"
import * as z from "zod"

export const login = async(
    values: z.infer<typeof LoginSchema>,
    callbackUrl: string | null
    ) => {
    const validatedFields = LoginSchema.safeParse(values)

    if(!validatedFields.success) {
        return {error: "Invalid fields"}
    }

    const {email, password} = validatedFields.data

    const existingUser = await getUserByEmail(email)

    if(!existingUser || !existingUser?.email || !existingUser.password) {
        return {error: "Email does not exist!"}
    }

    // // Solution for: Redirection to two-factor authentication even if password is wrong
    // const passwordMatch = await bcrypt.compare(
    //     password,
    //     existingUser.password
    // )
  
    // if(!passwordMatch) return {error: "Invalid fields"}
    // //

    if(!existingUser.emailVerified) {
        const verificationToken = await generateVerificationToken(existingUser.email)

        await sendVerificationEmail(
            verificationToken.email,
            verificationToken.token
        )
        
        return {success: "Confirmation email sent!"}
    }

    try {
        await signIn("credentials", {
            email, password, redirectTo: callbackUrl || DEFAULT_LOGIN_REDIRECT
        })
    } catch (error) {
        if(error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin": return {error: "Invalid credentials"}
                default: return {error: "Something went wrong"}
            }
        }

        throw error
    }
}