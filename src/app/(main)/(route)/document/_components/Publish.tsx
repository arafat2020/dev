
"use client"

import React, { useState } from 'react'
import { Doc } from '../../../../../../convex/_generated/dataModel';
import useOrigin from '@/hooks/useOrigin';
import { useMutation } from 'convex/react';
import { api } from '../../../../../../convex/_generated/api';
import { toast } from 'sonner';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Check, Copy, Globe } from 'lucide-react';

interface PublishProp {
  initialDocument: Doc<"document">
}

function Publish({ initialDocument }: PublishProp) {
  const origin = useOrigin();
  const update = useMutation(api.document.update);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [selected, setSelected] = useState<boolean>(false);
  const url = `${origin}/preview/${initialDocument._id}`
  const onPublish = () => {
    setSubmitting(true)
    const promise = update({
      id: initialDocument._id,
      isPublished: true
    }).finally(() => setSubmitting(false));
    toast.promise(promise, {
      loading: "Publishing...",
      success: "Successfully Published",
      error: "Failed to publish"
    })
  }
  const onUnPublish = () => {
    setSubmitting(true)
    const promise = update({
      id: initialDocument._id,
      isPublished: false
    }).finally(() => setSubmitting(false));
    toast.promise(promise, {
      loading: "Unpublishing...",
      success: "Successfully Unpublished",
      error: "Failed to Unpublish"
    })
  }
  const onCopy = () => {
    navigator.clipboard.writeText(url);
    setSelected(true);
    setTimeout(() => {
      setSelected(false)
    }, 1000);
  }
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className='gap-x-2 bg-cyan-500'>
          <span>Published</span>
          {
            initialDocument.isPublished && (<Globe className='w-5 h-5 text-slate-500' />)
          }
        </Button>
      </PopoverTrigger>
      <PopoverContent align='end' alignOffset={8} className='w-auto bg-cyan-950 text-slate-100'>
        {
          initialDocument.isPublished ? (<div className='gap-y-4'>
            <div className='flex items-center gap-x-2 mb-1'>
              <Globe className='text-sky-500 w-4 h-4 animate-ping' />
              <p className='text-xs- text-sky-500 font-medium'>This live on web</p>
            </div>
            <div className='flex items-center'>
              <input value={url} disabled className='p-1'/>
              <Button
                onClick={onCopy}
                disabled={selected}
                className='h-8 rounded-none'
              >
                {
                  selected ? <Check className='w-5 h-5' /> : <Copy className='w-5 h-5' />
                }
              </Button>
            </div>
            <Button className='text-sm w-full mt-2 bg-cyan-500' disabled={submitting} onClick={onUnPublish}>
              Unpublish
            </Button>
          </div>)
            : (<div className='flex flex-col justify-center items-center'>
              <Globe className='h-8 w-8 mb-2' />
              <p className='text-sm font-medium mb-2'>Publish this note</p>
              <span className='text-sm font-medium mb-2'>
                Share your work with others
              </span>
              <Button
                disabled={submitting}
                onClick={onPublish}
                className='w-full text-xs bg-cyan-500'
                size="sm"
              >
                Publish
              </Button>
            </div>)
        }
      </PopoverContent>
    </Popover>
  )
}

export default Publish