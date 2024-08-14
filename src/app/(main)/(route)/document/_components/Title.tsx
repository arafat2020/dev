"use client"
import React, { ChangeEvent, KeyboardEvent, useRef, useState } from 'react'
import { Doc } from '../../../../../../convex/_generated/dataModel'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useMutation } from 'convex/react'
import { api } from '../../../../../../convex/_generated/api'
import { Skeleton } from '@/components/ui/skeleton'
interface TitleProp {
    initialData: Doc<"document">
}
function Title({
    initialData
}: TitleProp) {
    const [editing, setEditing] = useState<boolean>(false)
    const [title, setTitle] = useState<string>(initialData.title || "Untitled")
    const inputRef = useRef<HTMLInputElement>(null)
    const update = useMutation(api.document.update)
    const enableInput = () => {
        setTitle(initialData.title)
        setEditing(true);
        setTimeout(() => {
            inputRef.current?.focus();
            inputRef.current?.setSelectionRange(0, inputRef.current.value.length)
        }, 0);
    }
    const disableInput = () => {
        setEditing(false);
    }
    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value)
        update({
            id: initialData._id,
            title: e.target.value || "Untitled"
        })
    }
    const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            disableInput()
        }
    }
    return (
        <div className='flex items-center space-x-1 text-slate-100'>
            {!!initialData.icon && <p>{initialData.icon}</p>}
            {
                editing ? <input
                    ref={inputRef}
                    onClick={enableInput}
                    onBlur={disableInput}
                    onChange={onChange}
                    onKeyDown={onKeyDown}
                    value={title}
                    className='h-7 px-2 focus-visible:ring-transparent bg-cyan-900 outline-none rounded-md'
                /> : <Button
                    onClick={enableInput}
                    variant="ghost"
                    size="sm"
                    className='font-normal h-auto p-1'
                >
                    <span>{initialData.title}</span>
                </Button>
            }
        </div>
    )
}

Title.Skeleton = function TitleSkeleton(){
    return <Skeleton className='h-6 bg-cyan-300 w-16 rounded-md '/>
}

export default Title