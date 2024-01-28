"use server"

import { currentUser } from "@/lib/auth"
import { db } from "@/lib/db"
import { revalidatePath } from "next/cache"

export const deletePortfolio = async(id: string) => {
    const user = await currentUser()

    if(!user) {
        throw new Error("User not found")
    }

    const deleteAuditLog = await db.auditLog.delete({
        where: {
            id
        }
    })

    revalidatePath("/")
   
    return deleteAuditLog
}