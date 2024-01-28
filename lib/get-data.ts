import { PureMarketDataType } from "@/types"
import useSWR from "swr"

async function fetcher(key: string) {
    return fetch(key).then((res) => res.json() as Promise<PureMarketDataType | null>)
}

export const GetMarketData = () => {
    const { data, isLoading, error } = useSWR('/api/market-data/', fetcher)
    return {data, isLoading, error}
}