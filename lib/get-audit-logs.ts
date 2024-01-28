import { AuditLogsType } from "@/types"
import { currentUser } from "./auth"
import { db } from "./db"

export const getAuditLogs = async(userId: string | undefined) => {
    const asd = await db.auditLog.findMany({
        where: {
            userId: userId
        },
        orderBy: {
          createdAt: "desc"
        }
    })

    return asd
}

export const getAuditLogsById = async(coinId: string) => {
    const user = await currentUser()

    if(!user) {
        return "User not found"
    }

    const auditLogs = await db.auditLog.findMany({
        where: {
            userId: user?.id,
            coinId: coinId
        }
    })

    return auditLogs
}

export const getProfitPerCoin = (auditLogs: AuditLogsType, currentPrice: number) => {
    const profit = auditLogs.map((item) => ({
      id: item.id,
      quantity: item.quantity,
      price: item.price,
      action: item.action,
      profit: item.quantity * (item.action === "BUY" ? (currentPrice - item.price) : (item.price - currentPrice))
    })).map((item) => item.profit).reduce((accumulator, currentValue) => accumulator + currentValue, 0)

    return profit

    // const buyProfit = auditLogs.filter((item) => item.action === "BUY").map((item) => ({
    //   id: item.id,
    //   quantity: item.quantity,
    //   price: item.price,
    //   action: item.action,
    //   profit: item.quantity * (currentPrice - item.price)
    // })).map((item) => item.profit).reduce((accumulator, currentValue) => accumulator + currentValue, 0)

    // const sellProfit = auditLogs.filter((item) => item.action === "SELL").map((item) => ({
    //   id: item.id,
    //   quantity: item.quantity,
    //   price: item.price,
    //   action: item.action,
    //   profit: item.quantity * (item.price - currentPrice)
    // })).map((item) => item.profit).reduce((accumulator, currentValue) => accumulator + currentValue, 0)

    // const totalProfit = buyProfit + sellProfit
    
    // return totalProfit
}
