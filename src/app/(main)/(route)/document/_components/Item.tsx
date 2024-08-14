import { ChevronDown, ChevronRight, Command, LucideIcon, MoreHorizontal, Plus, Trash } from 'lucide-react'
import React, { MouseEvent } from 'react'
import { Id } from '../../../../../../convex/_generated/dataModel'
import { cn } from '@/lib/utils'
import { Skeleton } from '@/components/ui/skeleton'
import { useMutation } from 'convex/react'
import { api } from '../../../../../../convex/_generated/api'
import { toast } from 'sonner';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useUser } from '@clerk/nextjs'

interface ItemProp {
    id?: Id<"document">
    documentIcon?: string,
    active?: boolean,
    expended?: boolean,
    isSearch?: boolean,
    level?: number,
    onExpend?: () => void
    label: string,
    onClick: () => void,
    Icon: LucideIcon,
    type?:"item"|"btn"
}

function Item({
    Icon,
    label,
    onClick,
    active,
    documentIcon,
    expended,
    id,
    isSearch,
    level,
    onExpend,
    type
}: ItemProp) {
    const ChevronIcon = expended ? ChevronDown : ChevronRight
    const create = useMutation(api.document.create);
    const archive = useMutation(api.document.archive);
    const { user } = useUser();
    const handleExpend = (event: MouseEvent) => {
        event.stopPropagation()
        onExpend?.()
    }
    const onArchive = (e: MouseEvent) => {
        e.stopPropagation();
        if (!id) return
        const promise = archive({ id })
        toast.promise(promise,{
            loading:"Archiving Note",
            success:"Note Archived",
            error:"Failed To Archive"
        })
    }
    const onCreate = (event: MouseEvent) => {
        event.stopPropagation();
        if (!id) return
        const promise = create({
            title: "Untitled",
            parentDocument: id
        })
            .then(doc => {
                if (!expended) {
                    onExpend?.()
                }
            })
        toast.promise(promise, {
            loading: "Crating New Note",
            success: "New Note Created",
            error: "Failed To create New Note"
        })
    }
    return (
        <div
            role='button'
            onClick={onClick}
            style={{
                paddingLeft: level ? `${(level * 12) + 12}px` : "12px"
            }}
            className={cn('min-h-[27px] group/item text-sm py-1 pr-3 w-fit flex items-center space-x-2 font-medium',
                active && "bg-slate-400"
            )}
        >
            {!!id && (
                <div role='button' className='shrink-0 h-[18px] mr-2' onClick={handleExpend}>
                    <ChevronIcon className='w-4 h-4 shrink-0' />
                </div>
            )}
            {
                documentIcon ? (
                    <div className='shrink-0 mr-2 text-[18px]'>
                        {documentIcon}
                    </div>
                ) : (
                    <Icon className='shrink-0 mr-2 text-[18px]' />
                )
            }
            <span className={cn('bg-cyan-900 px-3 py-1 rounded-md',
                isSearch && "bg-transparent",
                type === "item" && "line-clamp-1"
            )}>{label}</span>
            {
                isSearch && (
                    <kbd className='ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border px-1.5 font-mono text-[10px] font-medium opacity-100'>
                        <span><Command className='w-4 h-4' /></span>k
                    </kbd>
                )
            }
            {
                !!id && (
                    <div className='ml-auto flex items-center gap-x-2'>
                        <DropdownMenu>
                            <DropdownMenuTrigger onClick={e => e.stopPropagation()}>
                                <div role='button'  className='opacity-0 group-hover/item:opacity-100 h-full ml-auto rounded-sm hover:bg-slate-600'>
                                    <MoreHorizontal />
                                </div>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                                align='start'
                                side='right'
                                forceMount
                                className='bg-cyan-950 border border-cyan-800 text-slate-100 font-sans'>
                                <DropdownMenuItem role='button' onClick={onArchive} className='flex space-x-2'>
                                    <Trash className='w-4 h-4' /> <span>Delete</span>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator className='bg-sky-900' />
                                <DropdownMenuItem className='capitalize'>
                                    Last Edited By {user?.username}
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                        <div role='button' onClick={onCreate} className='opacity-0 group-hover/item:opacity-100 h-full ml-auto rounded-sm hover:bg-slate-600'>
                            <Plus className='w-4 h-4' />
                        </div>
                    </div>
                )
            }
        </div>
    )
}

Item.Skeleton = function ItemSkeleton({ level }: { level?: number }) {
    return <div
        className='flex gap-y-2 my-2 space-x-2 py-[3px]'
        style={{
            paddingLeft: level ? `${(level * 12) + 12}px` : "12px"
        }}
    >
        <Skeleton className='h-4 w-4' />
        <Skeleton className='h-4 w-[30%]' />
    </div>
}

export default Item