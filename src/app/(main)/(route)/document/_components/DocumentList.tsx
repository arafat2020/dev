"use client"
import React, { useState } from 'react'
import { Doc, Id } from '../../../../../../convex/_generated/dataModel'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation'
import { useQuery } from 'convex/react'
import { api } from '../../../../../../convex/_generated/api'
import Item from './Item'
import { cn } from '@/lib/utils'
import { FileIcon } from 'lucide-react'

interface DocumentListProp {
    parentDocumentId?: Id<"document">
    level?: number,
    data?: Doc<"document">[]
}

function DocumentList({
    data,
    level = 0,
    parentDocumentId
}: DocumentListProp) {
    const params = useSearchParams();
    const router = useRouter();
    const [expended, setExpended] = useState<Record<string, boolean>>({})
    function onExpend(documentId: string) {
        setExpended(expended => ({
            ...expended,
            [documentId]: !expended[documentId]
        }))
    }
    function onRedirect(documentId: string) {
        router.push(`/document/${documentId}`)
    }
    const documents = useQuery(api.document.sideBarQuery, {
        parentDocument: parentDocumentId
    })
    if (documents === undefined) {
        return <>
            <Item.Skeleton level={level} />
            {
                level === 0 && (
                    <>
                        <Item.Skeleton level={level} />
                        <Item.Skeleton level={level} />
                    </>
                )
            }
        </>
    }
    return (
        <>
            <p
                className={cn('hidden text-sm font-medium',
                    expended && "last:block",
                    level === 0 && "hidden"
                )}
                style={{
                    paddingLeft: level ? `${(level * 12) + 12}px` : "12px"
                }}
            >
                No Pages Inside
            </p>
            {
                documents.map(doc => {
                    return <div key={doc._id}>
                        <Item
                            id={doc._id}
                            onClick={() => onRedirect(doc._id)}
                            Icon={FileIcon}
                            label={doc.title}
                            documentIcon={doc.icon}
                            active={params.get("documentId") === doc._id}
                            level={level}
                            onExpend={() => onExpend(doc._id)}
                            expended={expended[doc._id]}
                            type='item'
                        />
                        {
                            expended[doc._id] && (
                                <DocumentList
                                    parentDocumentId={doc._id}
                                    level={level + 1}
                                />
                            )
                        }
                    </div>
                })
            }
        </>
    )
}

export default DocumentList