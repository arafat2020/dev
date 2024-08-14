"use client"
import Logo from '@/common/compoment/Logo'
import BoxReveal from '@/components/magicui/box-reveal';
import { Button } from '@/components/ui/button';
import { useUser } from '@clerk/nextjs';
import { useMutation } from 'convex/react';
import { PlusCircle } from 'lucide-react';
import React from 'react'
import { api } from '../../../../../convex/_generated/api';
import { toast } from 'sonner';

function Document() {
  const { user } = useUser();
  const create = useMutation(api.document.create)
  const handleCreate = () => {
    const promise = create({
        title: "Untitled",
    })
    toast.promise(promise, {
        loading: "Creating New Note",
        success: "New Note Created Successfully",
        error: "Failed To create New Note"
    })
}
  return (
    <div className='h-full flex flex-col items-center justify-center'>
      <Logo width={350} height={350} color='#3a4e5e' />
      <BoxReveal boxColor='#3a4e5e' duration={.5}>
        <h2 className='text-cyan-600 font-sans text-[1rem] font-bold my-4 capitalize'>
          Welcome To {user?.username}&apos; Motion
        </h2>
      </BoxReveal>
      <Button onClick={handleCreate} className='bg-transparent border border-cyan-600 text-cyan-600 hover:text-cyan-700'>
        <PlusCircle className='mr-2 h-4 w-4'/> Create A Note
      </Button>
    </div>
  )
}

export default Document 