"use client"
import Loader from '@/common/compoment/Loader'
import Logo from '@/common/compoment/Logo'
import { Button } from '@/components/ui/button'
import { SignInButton, UserButton } from '@clerk/nextjs'
import { useConvexAuth } from 'convex/react'
import Link from 'next/link'
import React from 'react'

function Header() {
    const { isLoading, isAuthenticated } = useConvexAuth()
    return (
        <div className='w-full flex justify-between items-center p-3'>
            <Logo width={80} height={80} color='rgb(242, 179, 53)' />
            <div className='flex space-x-2 items-center'>
                {
                    isLoading && <Loader />
                }
                {!isAuthenticated && !isLoading && (
                    <SignInButton mode='modal'>
                        <Button className='bg-transparent border shadow-lg border-amber-600'>Log In</Button>
                    </SignInButton>
                )}
                {
                    isAuthenticated && !isLoading && (
                        <>
                            <Link href="/document">
                                <Button className='bg-transparent border shadow-lg border-amber-600'>Enter Dev Motion</Button>
                            </Link>
                            <UserButton />
                        </>
                    )
                }
            </div>
        </div>
    )
}

export default Header