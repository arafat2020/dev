
"use client"

import React, { ElementRef, KeyboardEvent, useRef, useState } from 'react'
import { Doc } from '../../../../../../convex/_generated/dataModel'
import Emoji from './Emoji'
import { Button } from '@/components/ui/button'
import { ImageIcon, Smile, X } from 'lucide-react'
import { useMutation } from 'convex/react';
import { api } from '../../../../../../convex/_generated/api';
import TextareaAutosize from 'react-textarea-autosize';
import CoverImageModel from './model/CoverImageModel'

interface ToolBarProp {
    document: Doc<"document">
    preview?: boolean
}

function ToolBar({
    document,
    preview
}: ToolBarProp) {
    const inputRef = useRef<ElementRef<"textarea">>(null);
    const [editing, setEditing] = useState<boolean>(false);
    const [value, setValue] = useState(document.title);
    const update = useMutation(api.document.update);
    const removeIcon = useMutation(api.document.removeIcon);
    const enableInput = () => {
        if (preview) return
        setEditing(true);
        setTimeout(() => {
            setValue(document.title);
            inputRef.current?.focus();
        }, 0);
    }
    const onInput = (value: string) => {
        setValue(value)
        update({
            id: document._id,
            title: value || "Untitled"
        })
    }
    const disableInput = () => setEditing(false);
    const onKeyDown = (
        event: KeyboardEvent<HTMLTextAreaElement>
    ) => {
        if (event.key === "Enter") {
            event.preventDefault();
            disableInput()
        }
    }
    const onIconSelect = (icon: string) => {
        update({
            id: document._id,
            icon
        })
    }
    const onRemoveIcon = () => {
        removeIcon({
            id: document._id,
        })
    }
    return (
        <div className='pl-[54px] group relative'>
            {
                !!document.icon && !preview && (
                    <div className='flex items-center group/icon pt-6'>
                        <Emoji onChange={onIconSelect}>
                            <p className='text-6xl hover:opacity-75 transition'>
                                {document.icon}
                            </p>
                        </Emoji>
                        <Button
                            onClick={onRemoveIcon}
                            variant="ghost"
                            size="icon"
                            className='rounded-full group-hover/icon:opacity-100 transition'
                        >
                            <X className='w-6 h-6 stroke-cyan-600' />
                        </Button>
                    </div>
                )
            }
            {
                !!document.icon && preview && (
                    <p className='text-6xl pt-6'>
                        {document.icon}
                    </p>
                )
            }
            <div className='opacity-0 group-hover:opacity-100 flex items-center space-x-1'>
                {
                    !document.icon && !preview && (
                        <Emoji
                            onChange={onIconSelect}
                        >
                            <Button
                                variant="outline"
                                size="sm"
                                className='bg-slate-700 hover:bg-cyan-600 hover:text-slate-50 text-slate-100'
                            >
                                <Smile className='h-5 w-5' />
                                <span>Add</span>
                            </Button>
                        </Emoji>
                    )
                }
                {
                    !document.coverImage && !preview && (
                        <CoverImageModel>
                            <Button
                                variant="outline"
                                size="sm"
                                className='bg-slate-700 hover:bg-cyan-600 hover:text-slate-50 text-slate-100'
                            >
                                <ImageIcon className='h-5 w-5' />
                            </Button>
                        </CoverImageModel>
                    )
                }

            </div>
            {
                editing && !preview ? (
                    <TextareaAutosize
                        ref={inputRef}
                        onBlur={disableInput}
                        onKeyDown={onKeyDown}
                        value={value}
                        onChange={(e) => onInput(e.target.value)}
                        className="text-5xl bg-transparent font-bold break-words outline-none text-slate-100 resize-none"
                    />

                ) : (
                    <div role='button' onClick={enableInput} className='pb-[11.5px] text-5xl break-words outline-none text-slate-100'>
                        {
                            document.title
                        }
                    </div>
                )
            }
        </div>
    )
}

export default ToolBar