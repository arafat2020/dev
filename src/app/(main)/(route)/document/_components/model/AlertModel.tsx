"use client"
import React, { ReactNode } from 'react'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
  

  interface AlertDialogProp {
    children: ReactNode,
    onConfirm: ()=> void
  }

function AlertModel({children,onConfirm}:AlertDialogProp) {
  return (
    <AlertDialog>
        <AlertDialogTrigger onClick={e=>e.stopPropagation()}>
            {children}
        </AlertDialogTrigger>
        <AlertDialogContent className='bg-[#23384a]'>
            <AlertDialogHeader>
                <AlertDialogTitle className='text-slate-100'>
                    Are You Sure?
                </AlertDialogTitle>
                <AlertDialogDescription className='text-slate-50'>
                    This action cannot be undone
                </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
                <AlertDialogCancel onClick={e=>e.stopPropagation()}>
                    Cancel
                </AlertDialogCancel>
                <AlertDialogAction onClick={e=>{
                    e.stopPropagation()
                    onConfirm()
                }}>
                    Confirm
                </AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
    </AlertDialog>
  )
}

export default AlertModel