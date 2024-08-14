"use client"
import { cn } from '@/lib/utils';
import { ChevronsLeft, MenuIcon, PlusCircle, Search, Settings, Trash } from 'lucide-react';
import { useParams, usePathname } from 'next/navigation';
import React, { ElementRef, useEffect, useRef, useState } from 'react';
import { useMediaQuery } from 'usehooks-ts';
import UserItem from './UserItem';
import Item from './Item';
import DocumentList from './DocumentList';
import { Popover, PopoverTrigger } from '@radix-ui/react-popover';
import { PopoverContent } from '@/components/ui/popover';
import TrashBox from './TrashBox';
import NavBar from './NavBar';

function Navigation() {
    const pathName = usePathname();
    const isMobile = useMediaQuery("(max-width: 700px)")
    const isResizingRef = useRef(false);
    const isSideBareRef = useRef<ElementRef<"aside">>(null);
    const navBarRef = useRef<ElementRef<"div">>(null);
    const [isResetting, setIsResetting] = useState(false);
    const [isCollapsed, setIsCollapsed] = useState(isMobile);
    const params = useParams();

    const handleMouseDown = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        event.preventDefault();
        event.stopPropagation();
        isResizingRef.current = true
        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
    }
    const handleMouseMove = (e: MouseEvent) => {
        if (!isResizingRef.current) return;
        let newWidth = e.clientX;
        if (newWidth < 240) newWidth = 240
        if (newWidth > 480) newWidth = 480
        if (isSideBareRef.current && navBarRef.current) {
            isSideBareRef.current.style.width = `${newWidth}px`
            navBarRef.current.style.setProperty("left", `${newWidth}px`)
            navBarRef.current.style.setProperty("width", `calc(100% - ${newWidth}px)`)
        }
    }
    const handleMouseUp = (e: MouseEvent) => {
        isResizingRef.current = false
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
    }
    const reSetWidth = () => {
        if (isSideBareRef.current && navBarRef.current) {
            setIsCollapsed(false);
            setIsResetting(true)
            isSideBareRef.current.style.width = isMobile ? "100%" : "240px"
            navBarRef.current.style.setProperty("left", isMobile ? "100%" : "240px")
            navBarRef.current.style.setProperty("width", isMobile ? "0" : "calc(100% - 240px)")
            setTimeout(() => {
                setIsResetting(false)
            }, 300);
        }
    }
    useEffect(() => {
        if (isMobile) {
            collapse()
        } else {
            reSetWidth()
        }
    }, [isMobile])
    useEffect(() => {
        if (isMobile) {
            collapse()
        }
    }, [isMobile, pathName])
    const collapse = () => {
        if (isSideBareRef.current && navBarRef.current) {
            setIsCollapsed(true);
            setIsResetting(true)
            isSideBareRef.current.style.width = "0"
            navBarRef.current.style.setProperty("left", "0")
            navBarRef.current.style.setProperty("width", "100%")
            setTimeout(() => {
                setIsResetting(false)
            }, 300);
        }
    }
    return (
        <>
            <aside ref={isSideBareRef} className={cn(
                'group/sidebar w-60 flex flex-col bg-slate-800 h-full relative overflow-y-auto text-slate-100',
                isResetting && "transition-all ease-out duration-300",
                isMobile && "w-0"
            )}>
                <div role='button'
                    onClick={collapse}
                    className={cn('h-6 w-6 rounded-sm hover:bg-amber-100 absolute top-3 right-2 opacity-0 group-hover/sidebar:opacity-100 transition',
                        isMobile && "opacity-100"
                    )}
                >
                    <ChevronsLeft className='w-6 h-6 text-rose-500' />
                </div>
                <div>
                    <UserItem />
                    <Item
                        label='Search'
                        Icon={Search}
                        onClick={() => { }}
                        isSearch
                    />
                    <Item
                        label='Settings'
                        Icon={Settings}
                        onClick={() => { }}
                    />
                    <Item
                        label='New Page'
                        Icon={PlusCircle}
                        onClick={() => { }}
                    />
                    <Popover>
                        <PopoverTrigger className=' mt-4 flex space-x-2 items-center font-sans w-[100px] font-medium  ml-3'>
                            <Trash className='w-5 h-5 stroke-cyan-500 stroke-[2.5px]' /> <span className='text-slate-600 bg-gradient-to-tl hover:bg-gradient-to-tr transition duration-300 from-cyan-100 via-sky-100 to-slate-100 px-2 py-1 rounded-md'>Trash</span>
                        </PopoverTrigger>
                        <PopoverContent
                            className='p-0 w-72 bg-slate-700 border-0'
                            side={isMobile ? "bottom" : "right"}
                        >
                            <TrashBox />
                        </PopoverContent>
                    </Popover>
                </div>
                <div className='mt-5'>
                    <DocumentList />
                </div>
                <div
                    onMouseDown={handleMouseDown}
                    onClick={reSetWidth}
                    className='opacity-0 group-hover/sidebar:opacity-100 transition cursor-e-resize absolute h-full w-1 bg-cyan-900 right-0 top-0' />
            </aside>
            <div ref={navBarRef}
                className={cn("absolute top-0 z-[99999] left-60 w-[calc(100%-240px)]",
                    isResetting && "transition-all ease-out duration-300",
                    isMobile && "left-0 w-full"
                )}
            >
                {
                    !!params.id ? (
                        <NavBar
                        isCollapsed={isCollapsed}
                        onResetWidth={reSetWidth} 
                        />
                    ) : (<nav className='bg-transparent px-3 py-2 w-full'>
                        {
                            isCollapsed && <MenuIcon onClick={reSetWidth} role='button' className='h-6 w-6 text-cyan-500' />
                        }
                    </nav>)
                }
            </div>
        </>
    )
}

export default Navigation