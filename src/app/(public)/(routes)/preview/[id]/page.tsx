"use client"
import React from 'react'
import { Id } from '../../../../../../convex/_generated/dataModel'
import { useQuery } from 'convex/react'
import { api } from '../../../../../../convex/_generated/api'
import { Skeleton } from '@/components/ui/skeleton'
import Cover from '@/app/(main)/(route)/document/_components/Cover'
import ToolBar from '@/app/(main)/(route)/document/_components/ToolBar'
import Editor from '@/app/(main)/(route)/document/_components/Editor'

interface DocPageProp {
    params: {
        id: Id<"document">
    }
}

function DocPage({
    params
}: DocPageProp) {
    const document = useQuery(api.document.getById, {
        id: params.id
    })
    if (document === undefined) {
        return <div className='p-4'>
            <Cover.skelton />
            <div className='md:max-w-3xl lg:max-w-4xl mx-auto mt-10'>
                <div className='space-y-4 pl-8 pt-4'>
                    <Skeleton className='h-14 w-1/2 bg-cyan-700' />
                    <Skeleton className='h-4 w-4/3 bg-cyan-700' />
                    <Skeleton className='h-4 w-[40%] bg-cyan-700' />
                    <Skeleton className='h-4 w-[60%] bg-cyan-700' />
                </div>
            </div>
        </div>
    }
    if (document === null) {
        return null
    }
    return (
        <div className='pb-40 bg-slate-900'>
            <Cover preview url={document.coverImage} />
            <div className='md:max-w-3xl lg:max-w-4xl mx-auto'>
                <ToolBar preview document={document} />
                <Editor
                    editable={false}
                    onChange={() => { }}
                    initialData={document.content}
                />
            </div>
        </div>
    )
}

export default DocPage