import { PureMarketDataType } from "@/types";
import { NextResponse } from "next/server";

export async function GET(request: Request, {params}: {params: {coinId: string}}) {
    try {
        const res = await fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=en")
        const data: PureMarketDataType = await res.json()
        const filteredItem = data.find(item => item.id === params.coinId)
        return Response.json(filteredItem)
    } catch (error) {
        return new NextResponse("Internal error", {status: 500})
    }
}