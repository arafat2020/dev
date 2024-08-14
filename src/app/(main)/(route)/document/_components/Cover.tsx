"use client"
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { ImageIcon, X } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import CoverImageModel from './model/CoverImageModel'
import { useEdgeStore } from '@/hooks/edgestore'
import { useMutation } from 'convex/react'
import { api } from '../../../../../../convex/_generated/api'
import { useParams } from 'next/navigation'
import { Id } from '../../../../../../convex/_generated/dataModel'
import { useCoverImage } from '@/hooks/useCoverImage'
import { Skeleton } from '@/components/ui/skeleton'

interface CoverProp {
    url?: string,
    preview?: string
}

function Cover({
    preview,
    url
}: CoverProp) {
    const { edgestore } = useEdgeStore();
    const removeCover = useMutation(api.document.removeCoverImage);
    const params = useParams()
    const coverImage = useCoverImage()
    const onremove = async () => {
        if (url) {
            await edgestore.publicFiles.delete({
                url
            })
            removeCover({
                id: params.id as Id<"document">
            })
        }
    }
    return (
        <div
            className={cn("relative w-full h-[35vh] group/cover",
                !url && "h-[12vh]",
                url && "bg-slate-700"
            )}
        >{
                !!url && (
                    <Image
                        src={url}
                        alt='cover'
                        fill
                        className='object-cover'
                    />
                )
            }
            {
                url && !preview && (
                    <div className='absolute opacity-0 group-hover/cover:opacity-100 bottom-5 right-5 flex space-x-2'>
                        <CoverImageModel>
                            <Button
                                onClick={() => coverImage.orePlace(url)}
                                size="sm"
                                variant="outline"
                                className='border border-cyan-800 bg-transparent shadow-lg text-slate-100 hover:bg-cyan-300 gap-x-2'
                            >
                                <ImageIcon className='w-5 h-5' />
                                <span>Change Cover Image</span>
                            </Button>
                        </CoverImageModel>
                        <Button
                            onClick={onremove}
                            size="sm"
                            variant="outline"
                            className='border border-cyan-800 bg-transparent shadow-lg text-slate-100 hover:bg-cyan-300 gap-x-2'
                        >
                            <X className='w-5 h-5' />
                            <span>Remove Cover Image</span>
                        </Button>
                    </div>
                )
            }
        </div>
    )
}
Cover.skelton = function CoverSkeleton(){
    return <Skeleton className='w-full h-[12vh] bg-cyan-700'/>
}
export default Cover