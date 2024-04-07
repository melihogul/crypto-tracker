import {create} from "zustand"

type Item = {
    profit: number
}

type StoreProps = {
    items: Item[]
    updateItems: (profit: Item) => void
    totalProfit: number
    addProfit: () => void
    deleteEverything: () => void
}

export const useProfit = create<StoreProps>((set) => ({
    items: [],
    updateItems: (profit) => set(state => ({items: [...state.items, profit]})),
    totalProfit: 0,
    addProfit: () => set(state => ({totalProfit: state.items.reduce((sum, item) => sum + item.profit, 0) / 2})),
    deleteEverything: () => set({items: []}),
}))