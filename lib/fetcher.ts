import { PureMarketDataType } from "@/types";

export const fetcher = (key: string) => fetch(key).then((res) => res.json() as Promise<PureMarketDataType | null>)
