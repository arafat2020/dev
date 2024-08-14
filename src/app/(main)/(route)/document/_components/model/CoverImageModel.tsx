"use client"
import React, { ReactNode, useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { SingleImageDropzone } from '../ImageDropZone'
import { useParams } from 'next/navigation'
import { useMutation } from 'convex/react'
import { api } from '../../../../../../../convex/_generated/api'
import { useCoverImage } from '@/hooks/useCoverImage'
import { useEdgeStore } from '@/hooks/edgestore'
import { Id } from '../../../../../../../convex/_generated/dataModel'
import { Button } from '@/components/ui/button'
interface CoverImageModelProp {
    children: ReactNode
}
function CoverImageModel({ children }: CoverImageModelProp) {
    const params = useParams();
    const update = useMutation(api.document.update);
    const coverImage = useCoverImage();
    const { edgestore } = useEdgeStore();
    const [file, setFile] = useState<File>();
    const [submitting, setSubmitting] = useState<boolean>(false)
    const onclose = () => {
        setFile(undefined);
        setSubmitting(false);
        coverImage.onclose()
    }
    const onChange = async (file?: File) => {
        if (file) {
            setSubmitting(true);
            setFile(file)

            const res = await edgestore.publicFiles.upload({
                file,
                options: {
                    replaceTargetUrl: coverImage.url
                }
            })

            await update({
                id: params.id as Id<"document">,
                coverImage: res.url
            })
            onclose()
        }
    }
    console.log(coverImage.isOpen);

    return (
        <Dialog open={coverImage.isOpen} onOpenChange={open => !open}>
            <DialogTrigger onClick={coverImage.onOpen}>
                {children}
            </DialogTrigger>
            <DialogContent className='bg-cyan-950 text-slate-100'>
                <DialogHeader>
                    <h2 className='text-center text-lg font-semibold'>
                        Cover Image
                    </h2>
                    <Button onClick={coverImage.onclose}>
                        Close
                    </Button>
                </DialogHeader>
                <SingleImageDropzone
                    value={file}
                    onChange={onChange}
                    disabled={submitting}
                />
            </DialogContent>
        </Dialog>
    )
}

export default CoverImageModel