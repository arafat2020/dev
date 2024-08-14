"use client"
import { useMutation, useQuery } from 'convex/react';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/navigation'
import React, { MouseEvent, useState } from 'react'
import { api } from '../../../../../../convex/_generated/api';
import { Input } from '@/components/ui/input';
import { Loader2, Search, Trash, Undo } from 'lucide-react';
import { Id } from '../../../../../../convex/_generated/dataModel';
import { toast } from 'sonner';
import AlertModel from './model/AlertModel';

function TrashBox() {
  const router = useRouter();
  const params = useParams();
  const documents = useQuery(api.document.getArchived)
  const restore = useMutation(api.document.reStore)
  const remove = useMutation(api.document.remove)
  const [search, setSearch] = useState<string>("")
  const filterDocument = documents?.filter(doc => {
    return doc.title.toLowerCase().includes(search.toUpperCase())
  })
  const onRestore = (e: MouseEvent, id: Id<"document">) => {
    e.stopPropagation()
    const promise = restore({
      id
    })
    toast.promise(promise, {
      loading: "Restoring Note...",
      success: "Note Restored",
      error: "Failed to restore"
    })
  }
  const onRemove = async ( id: Id<"document">) => {
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
  if (documents === undefined) {
    return <div className='w-full flex justify-around py-3'>
      <Loader2 className='w-6 h-6 stroke-cyan-400 animate-spin' />
    </div>
  }
  return (
    <div className='w-full 
    text-sm text-slate-100'>
      <div className='flex space-x-2 items-center p-2 '>
        <Search className='w-5 h-5 stroke-zinc-100' />
        <Input
          value={search}
          onChange={e => setSearch(e.target.value)}
          className='h-7 my-2 bg-sky-950 focus-visible:ring-transparent outline-none border-none '
        />
      </div>
      <div className='w-full max-h-[200px] overflow-y-auto'>
        {
          filterDocument?.length === 0 && (
            <div className=' px-1 pb-1'>
              <p className='hidden last:block text-center'>No Document Found...</p>
            </div>
          )
        }
        {
          filterDocument?.map(doc => {
            return <div
              className='text-sm rounded-sm w-full hover:bg-sky-900 items-center justify-between my-1 flex px-1'
              key={doc._id}
            >
              <span>{doc.title}</span>
              <div className='flex items-center space-x-2'>
                <div role='button' onClick={(e) => onRestore(e, doc._id)}>
                  <Undo
                    className='w-5 h-5 stroke-slate-400'
                  />
                </div>
                <div role='button'>
                  <AlertModel onConfirm={()=>onRemove(doc._id)}>
                    <Trash
                      className='w-5 h-5 stroke-slate-400'
                    />
                  </AlertModel>
                </div>
              </div>
            </div>
          })
        }
      </div>
    </div>
  )
}

export default TrashBox