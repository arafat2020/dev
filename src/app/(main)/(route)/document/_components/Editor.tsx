
"use client"

import React from 'react'
import { Doc, Id } from '../../../../../../convex/_generated/dataModel'
import "@blocknote/mantine/style.css";
import {
    BlockNoteEditor,
    PartialBlock
} from "@blocknote/core";
import {
    useBlockNoteEditor,
    useCreateBlockNote
} from "@blocknote/react";
import {
    BlockNoteView,
} from "@blocknote/mantine";
import { json } from 'stream/consumers';
import { useMutation } from 'convex/react';
import { api } from '../../../../../../convex/_generated/api';
import { useParams } from 'next/navigation';
import { useEdgeStore } from '@/hooks/edgestore';
import { useUser } from '@clerk/nextjs';

interface EditorProp {
    onChange: () => void,
    initialData?: string,
    editable?: boolean
}

function Editor({
    initialData,
    onChange,
    editable
}: EditorProp) {
    const { edgestore } = useEdgeStore()
    const { user } = useUser();
    const handleUpload = async (file:File)=>{
        const res = await edgestore.publicFiles.upload({file})
        return res.url
    }
    const editor: BlockNoteEditor = useCreateBlockNote({
        initialContent: initialData ? JSON.parse(initialData) as PartialBlock[] : undefined,
        uploadFile: handleUpload,
    })
    
    const params = useParams()
    const update = useMutation(api.document.update)
    return (
        <div>
            <BlockNoteView
            theme={"dark"}
            editor={editor}
            editable={editable}
            onChange={()=>{
                update({
                    id:params.id as Id<"document">,
                    content: JSON.stringify(editor.document)
                })
            }}
        />
        </div>
    )
}

export default Editor