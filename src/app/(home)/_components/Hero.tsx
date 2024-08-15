"use client"

import Loader from '@/common/compoment/Loader'
import BoxReveal from '@/components/magicui/box-reveal'
import { Button } from '@/components/ui/button'
import { SignInButton, UserButton } from '@clerk/nextjs'
import { useConvexAuth } from 'convex/react'
import { MoveRight } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

function Hero() {
  const { isAuthenticated, isLoading } = useConvexAuth();
  return (
    <div className='w-full flex-grow h-full flex justify-around items-center'>
      <div className='-mt-10'>
        <BoxReveal boxColor={"#8f7747"} duration={0.5}>
          <p className="text-[3.5rem] font-semibold text-amber-500">
            Dev Motion<span className="text-[#5046e6]">.</span>
          </p>
        </BoxReveal>
        <BoxReveal boxColor={"#8f7747"} duration={0.6}>
          <p className='text-[1.4rem] text-amber-600'>Start Your Vision For Next Empire</p>
        </BoxReveal>
        <BoxReveal boxColor={"#8f7747"} duration={0.8}>
          <div className='w-full mt-4'>
            <div className='text-[1rem] text-amber-600 flex items-center space-x-2'><MoveRight /><span className=' text-amber-600'>Brainstorm Your Idea</span></div>
            <div className='text-[1rem] text-amber-600 flex items-center space-x-2'><MoveRight /><span className=' text-amber-600'>Organize Your Daily Life</span></div>
            <div className='text-[1rem] text-amber-600 flex items-center space-x-2'><MoveRight /><span className=' text-amber-600'>Share Your Tasks</span></div>
          </div>
        </BoxReveal>
        <BoxReveal boxColor={"#8f7747"} duration={0.8}>
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
                  <Link href="/document">
                    <Button className='bg-transparent border shadow-lg border-amber-600'>Enter Dev Motion</Button>
                  </Link>
              )
            }
          </div>
        </BoxReveal>
      </div>
    </div>
  )
}

export default Hero