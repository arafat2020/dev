"use client"

import { create } from "zustand"

type CoverImage = {
    url?: string;
    isOpen: boolean,
    onOpen: () => void,
    onclose: () => void,
    orePlace: (url: string) => void
}

export const useCoverImage = create<CoverImage>((set) => ({
    url: undefined,
    isOpen: false,
    onOpen: () => set({ isOpen: true , url: undefined}),
    onclose: () => set({ isOpen: false, url: undefined }),
    orePlace: (url: string) => set({ isOpen: true, url })
}))