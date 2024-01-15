"use client"

import { useEffect, useState } from "react"
import { DetailsModal } from "../modals/details-modal"

export const ModalProvider = () => {
    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        setIsMounted(true)
    }, [])
    
    if(!isMounted) {
        return null
    }

    return(
        <>
            <DetailsModal />
        </>
    )
}