"use server"

import { currentUser } from "@/lib/auth"
import { db } from "@/lib/db"
import { AddPortfolioSchema } from "@/schemas"
import { ACTION } from "@prisma/client"
import * as z from "zod"

export const addPortfolio = async(values: z.infer<typeof AddPortfolioSchema>, coinId: string, action: ACTION) => {
    const user = await currentUser()

    if(!user) {
        return {error: "Unauthorized"}
    }
    
    const validatedFields = AddPortfolioSchema.safeParse(values)

    if(!validatedFields.success) {
        return {error: "Invalid fields"}
    }

    const {quantity, price} = validatedFields.data

    await db.auditLog.create({
        data: {
            action: action,
            price,
            quantity,
            userId: user.id,
            coinId: coinId
        }
    })
   
    return {success: "You have successfully added!"}
}