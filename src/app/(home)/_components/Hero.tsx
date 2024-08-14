import BoxReveal from '@/components/magicui/box-reveal'
import ShinyButton from '@/components/magicui/shiny-button'
import { Button } from '@/components/ui/button'
import { MoveRight } from 'lucide-react'
import React from 'react'

function Hero() {
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
          <Button className='bg-transparent border border-amber-600 mt-3'>
            Enter Dev_motion
          </Button>
        </BoxReveal>
      </div>
    </div>
  )
}

export default Hero