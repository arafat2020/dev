"use client"
import Loading2 from '@/common/compoment/Loader2'
import { useConvexAuth } from 'convex/react'
import { redirect } from 'next/navigation'
import React, { ReactNode, useEffect } from 'react'
import Navigation from './(route)/document/_components/Navigation'
import SearchCommand from './(route)/document/_components/SearchCommand'

function MainLayout({ children }: { children: ReactNode }) {
    const { isLoading, isAuthenticated } = useConvexAuth()
    useEffect(() => {
      
        if (!isAuthenticated && !isLoading) {
            redirect("/")
        }
      
    }, [isAuthenticated,isLoading])
    if (isLoading) {
        return <Loading2 />
    }
    
    return (
        <div className='h-full flex bg-slate-900'>
            <Navigation />
            <main className='flex-1 h-full overflow-y-auto'>
                <SearchCommand/>
                {children}
            </main>
        </div>
    )
}

export default MainLayout