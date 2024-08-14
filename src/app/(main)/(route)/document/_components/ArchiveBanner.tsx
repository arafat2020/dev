"use client"

import { useMutation } from 'convex/react'
import React from 'react'
import { api } from '../../../../../../convex/_generated/api'
import { Id } from '../../../../../../convex/_generated/dataModel'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { useParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { AlertDialog } from '@/components/ui/alert-dialog'
import AlertModel from './model/AlertModel'

function ArchiveBanner() {
    const router = useRouter();
    const params = useParams();
    const restore = useMutation(api.document.reStore)
    const remove = useMutation(api.document.remove)
    const onRestore = (id: Id<"document">) => {
        const promise = restore({
            id
        })
        toast.promise(promise, {
            loading: "Restoring Note...",
            success: "Note Restored",
            error: "Failed to restore"
        })
    }
    const onRemove = async (id: Id<"document">) => {
        if (id === params.id) await router.push("/document")
        const promise = remove({
            id
        })
        toast.promise(promise, {
            loading: "Deleting Note...",
            success: "Note Deleted",
            error: "Failed to Delete Note"
        })
    }
    return (
        <div className='w-full bg-cyan-400 text-center justify-center items-center flex text-sm text-slate-100 space-x-3 py-2'>
            <p>This Page Is Trash</p>
            <Button onClick={() => onRestore(params.id as Id<"document">)} variant="ghost" className='shadow-lg'>
                Restore
            </Button>
            <AlertModel
                onConfirm={() => onRemove(params.id as Id<"document">)}
            >
                <Button variant="ghost" className='shadow-lg'>
                    Delete
                </Button>
            </AlertModel>
        </div>
    )
}

export default ArchiveBanner