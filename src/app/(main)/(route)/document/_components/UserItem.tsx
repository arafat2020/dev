"use client"
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SignOutButton, useUser } from '@clerk/nextjs';
import { ChevronsLeftRight } from 'lucide-react';
import { Button } from '@/components/ui/button';


function UserItem() {
    const { user } = useUser()

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <div role='button' className='flex items-center text-sm p-3 w-full'>
                    <div className='gap-x-2 flex items-center max-w-[150px]'>
                        <Avatar className='h-5 w-5'>
                            <AvatarImage src={user?.imageUrl} />
                        </Avatar>
                        <span className='text-start font-medium line-clamp-1'>{user?.username}&apos;s Motion</span>
                    </div>
                    <ChevronsLeftRight className='rotate-90 ml-2 w-4 h-4' />
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                className='w-80 bg-slate-900 text-slate-100 border-zinc-800'
                align='start'
                alignOffset={11}
                forceMount
            >
                <div className='flex flex-col space-y-4 p-2'>
                    <p className='text-xs font-medium leading-none'>
                        {user?.emailAddresses[0].emailAddress}
                    </p>
                    <div className='flex items-center gap-x-2'>
                        <div className='rounded-md p-1'>
                            <Avatar className='h-8 w-8'>
                                <AvatarImage src={user?.imageUrl} />
                            </Avatar>
                        </div>
                        <div className='space-y-1'>
                            <p className='text-start font-medium line-clamp-1'>{user?.username}&apos;s Motion</p>
                        </div>
                    </div>
                </div>
                <DropdownMenuSeparator/>
                <div className='bg-slate-900 p-3'>
                    <SignOutButton>
                       <Button className='bg-transparent border border-amber-900'>
                       Sign Out
                       </Button>
                    </SignOutButton>
                </div>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default UserItem