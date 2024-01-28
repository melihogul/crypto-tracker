import { ACTION } from "@prisma/client";

export type PureMarketDataType = {
    id: string,
    symbol: string,
    name: string,
    image: string,
    current_price: number,
    market_cap: number,
    market_cap_rank: number,
    fully_diluted_valuation: number,
    total_volume: number,
    high_24h: number,
    low_24h: number,
    price_change_24h: number,
    price_change_percentage_24h: number,
    market_cap_change_24h: number,
    market_cap_change_percentage_24h: number,
    circulating_supply: number,
    total_supply: number,
    max_supply: number,
    ath: number,
    ath_change_percentage: number,
    ath_date: string,
    atl: number,
    atl_change_percentage: number,
    atl_date: string,
    roi: null,
    last_updated: string,
}[]

export type MarketDataType = {
    id: string,
    symbol: string,
    name: string,
    image: string,
    current_price: number,
    market_cap: number,
    market_cap_rank: number,
    fully_diluted_valuation: number,
    total_volume: number,
    high_24h: number,
    low_24h: number,
    price_change_24h: number,
    price_change_percentage_24h: number,
    market_cap_change_24h: number,
    market_cap_change_percentage_24h: number,
    circulating_supply: number,
    total_supply: number,
    max_supply: number,
    ath: number,
    ath_change_percentage: number,
    ath_date: string,
    atl: number,
    atl_change_percentage: number,
    atl_date: string,
    roi: null,
    last_updated: string,
}

export type AuditLogsType = {
    id: string;
    action: ACTION;
    quantity: number;
    price: number;
    userId: string;
    coinId: string;
    coinName: string;
    createdAt: Date;
    updatedAt: Date;
}[]

export type OneAuditLogType = {
    id: string;
    action: ACTION;
    quantity: number;
    price: number;
    userId: string;
    coinId: string;
    coinName: string;
    createdAt: Date;
    updatedAt: Date;
}

export type AssetsType = {
    id: string,
    symbol: string,
    name: string,
    image: string,
    current_price: number,
    market_cap: number,
    market_cap_rank: number,
    fully_diluted_valuation: number,
    total_volume: number,
    high_24h: number,
    low_24h: number,
    price_change_24h: number,
    price_change_percentage_24h: number,
    market_cap_change_24h: number,
    market_cap_change_percentage_24h: number,
    circulating_supply: number,
    total_supply: number,
    max_supply: number,
    ath: number,
    ath_change_percentage: number,
    ath_date: string,
    atl: number,
    atl_change_percentage: number,
    atl_date: string,
    roi: null,
    last_updated: string,
    auditLogs: {
        id: string,
        action: ACTION,
        quantity: number,
        price: number,
        userId: string,
        coinId: string,
        coinName: string,
        createdAt: Date,
        updatedAt: Date,
    }[]
}