import {create} from "zustand"

type DetailsStore = {
    id?: string
    isOpen: boolean
    onOpen: (id: string) => void
    onClose: () => void
}

export const UseDetails = create<DetailsStore>((set) => ({
    id: undefined, 
    isOpen: false,
    onOpen: (id: string) => set({isOpen: true, id}),
    onClose: () => set({isOpen: false})
}))