
"use client"

import {
    Popover,
    PopoverContent,
    PopoverTrigger
} from '@/components/ui/popover'
import React, { ReactNode } from 'react'
import EmojiPicker from 'emoji-picker-react';


interface EmojiProp {
    onChange: (icon: string) => void
    children: ReactNode
    asChild?: boolean
}

function Emoji({
    children,
    onChange,
    asChild
}: EmojiProp) {
    return (
        <Popover>
            <PopoverTrigger>
                {children}
            </PopoverTrigger>
            <PopoverContent className='bg-transparent border-none'>
                <EmojiPicker
                    height={350}
                    onEmojiClick={(data) => onChange(data.emoji)}
                    style={{
                        background:"#23384a"
                    }}
                />
            </PopoverContent>
        </Popover>
    )
}

export default Emoji