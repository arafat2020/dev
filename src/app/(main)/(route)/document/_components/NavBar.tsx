"use client"

import { useQuery } from 'convex/react'
import { useParams } from 'next/navigation'
import React, { Fragment } from 'react'
import { api } from '../../../../../../convex/_generated/api'
import { Id } from '../../../../../../convex/_generated/dataModel'
import { MenuIcon } from 'lucide-react'
import Title from './Title'
import ArchiveBanner from './ArchiveBanner'
import Menu from './Menu'
import Publish from './Publish'

interface NavBarProp {
  isCollapsed: boolean,
  onResetWidth: () => void
}

function NavBar({
  isCollapsed,
  onResetWidth
}: NavBarProp) {
  const params = useParams();
  const document = useQuery(api.document.getById, {
    id: params.id as Id<"document">
  })
  if (document === undefined) {
    return <div className='w-full p-3'>
      <Title.Skeleton/>
    </div>
  }
  return (
    <Fragment>
      <nav className='text-slate-100 px-3 py-2 w-full items-center space-x-3 flex'>
        {
          isCollapsed && (<MenuIcon
            role='button'
            onClick={onResetWidth}
            className='w-6 h-6 stroke-cyan-500'
          />)
        }
        <div className='w-full flex items-center justify-between'>
          <Title initialData={document} />
          <Publish initialDocument={document}/>
          <Menu id={params.id as Id<"document">}/>
        </div>
      </nav>
      {
        document.isArchived && <ArchiveBanner/>
      }
    </Fragment>
  )
}

export default NavBar