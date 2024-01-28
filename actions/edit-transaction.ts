"use server"

import { currentUser } from "@/lib/auth"
import { db } from "@/lib/db"
import { AddPortfolioSchema, EditTransactionSchema } from "@/schemas"
import { ACTION } from "@prisma/client"
import { revalidatePath } from "next/cache"
import * as z from "zod"

export const editTransaction = async(values: z.infer<typeof EditTransactionSchema>, id: string, action: ACTION) => {
    const user = await currentUser()

    if(!user) {
        throw new Error("User not found")
    }
    
    const validatedFields = EditTransactionSchema.safeParse(values)

    if(!validatedFields.success) {
        return {error: "Invalid fields"}
    }

    const {quantity, price} = validatedFields.data

    const updateAuditLog = await db.auditLog.update({
        where: {
            id
        },
        data: {
            action: action,
            price,
            quantity,
        }
    })

    revalidatePath("/")
   
    return updateAuditLog
}