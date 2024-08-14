import Logo from '@/common/compoment/Logo'
import { Button } from '@/components/ui/button'
import React from 'react'

function Footer() {
  return (
    <div className='p-3 w-full flex justify-between'>
      <div className='flex space-x-1 font-semibold text-amber-500 items-center'><Logo width={30} height={30} color='rgb(242, 179, 53)'/> <span>Dev Motion</span></div>
      <div className='flex space-x-3'>
        <Button className='bg-transparent shadow-lg border border-amber-400'>Terms And Condition</Button>
        <Button className='bg-transparent shadow-lg border border-amber-400'>Privacy Policy</Button>
      </div>
    </div>
  )
}

export default Footer