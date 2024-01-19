import { currentUser } from "./auth"
import { db } from "./db"

export const getPortfolio = async() => {
        const user = await currentUser()

        if(!user) return false

        const portfolio = await db.auditLog.findMany({
            where: {
                userId: user.id
            }
        })
}