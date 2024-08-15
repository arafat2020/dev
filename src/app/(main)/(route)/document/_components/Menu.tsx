"use client"
import React, { MouseEvent } from 'react'
import { Id } from '../../../../../../convex/_generated/dataModel'
import { useRouter } from 'next/navigation'
import { useUser } from '@clerk/nextjs'
import { useMutation } from 'convex/react'
import { api } from '../../../../../../convex/_generated/api'
import { toast } from 'sonner'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from '@/components/ui/button'
import { MoreHorizontalIcon, Trash } from 'lucide-react'
interface MenuProp {
    id: Id<"document">
}
function Menu({
    id
}: MenuProp) {
    const router = useRouter();
    const { user } = useUser();
    const archive = useMutation(api.document.archive);
    const onArchive = (e: MouseEvent) => {
        e.stopPropagation();
        if (!id) return
        const promise = archive({ id })
        toast.promise(promise, {
            loading: "Archiving Note",
            success: "Note Archived",
            error: "Failed To Archive"
        })
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button size="sm" variant="ghost">
                    <MoreHorizontalIcon />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                align='end'
                alignOffset={10}
                forceMount
                className='bg-cyan-950 border-none text-slate-100'
            >
                <DropdownMenuItem className='flex space-x-2 items-center' onClick={onArchive}>
                    <Trash className='w-6 h-6 stroke-cyan-500' />
                    <span>Delete</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator className='bg-cyan-800' />
                <DropdownMenuItem>
                    <div className='text-sm p-2'>
                        Last Edited By: {user?.username}
                    </div>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default Menu