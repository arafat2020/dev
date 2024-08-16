"use client"

import React, { useEffect, useState } from 'react'
import {
    Command,
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation';
import { useQuery } from 'convex/react';
import { api } from '../../../../../../convex/_generated/api';
import { useSearch } from '@/hooks/useSearch';
import { File } from 'lucide-react';


function SearchCommand() {
    const { user } = useUser();
    const router = useRouter();
    const documents = useQuery(api.document.getSearch);
    const isOpen = useSearch(store => store.isOpen);
    const onClose = useSearch(store => store.onclose);
    const toggle = useSearch(store => store.toggle);
    const [mounted, setMounted] = useState<boolean>(false);
    useEffect(() => {
        setMounted(true)
    }, []);
    useEffect(() => {
      const down = (e:KeyboardEvent)=>{
        if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
            e.preventDefault();
            toggle()
        }
      }
      document.addEventListener("keydown", down)
      return () => {
        document.removeEventListener("keydown", down)
      }
    }, [toggle])
    
    if (!mounted) {
        return null
    }
    const onSelect = (id:string) => {
        router.push(`/document/${id}`)
        onClose()
    }
    return (
        <CommandDialog open={isOpen} onOpenChange={onClose}>
            <CommandInput
                placeholder={`Search ${user?.username}'s Motion...`}
            />
            <CommandList>
                <CommandEmpty>
                    No Result Found...
                </CommandEmpty>
                <CommandGroup heading='Document'>
                    {
                        documents?.map(doc => {
                            return <CommandItem
                                key={doc._id}
                                value={`${doc._id}-${doc.title}`}
                                title={doc.title}
                                onSelect={()=>onSelect(doc._id)}
                            >
                                {
                                    doc.icon ? (
                                        <p className='mr-2 text-[18px]'>
                                            {doc.icon}
                                        </p>
                                    ) : (
                                        <File className='mr-2 h-4 w-4' />
                                    )
                                }
                                <span>{doc.title}</span>
                            </CommandItem>
                        })
                    }
                </CommandGroup>
            </CommandList>
        </CommandDialog>
    )
}

export default SearchCommand