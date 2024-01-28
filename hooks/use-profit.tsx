import {create} from "zustand"

type StoreProps = {
    totalProfit: number,
    increment: (profit: number) => void
}

export const useProfit = create<StoreProps>((set) => ({
    totalProfit: 0,
    increment: (profit) => set((state) => ({totalProfit: state.totalProfit + profit})),
}))