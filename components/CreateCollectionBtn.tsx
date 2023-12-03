"use client";
import React, { useState } from 'react';
import SideBar from './SideBar';
import { Button } from './ui/button';

function CreateCollectionBtn() {
  const [open, setOpen] = useState(false)
  const handleOpenChange = (open: boolean) => setOpen(open)

  return <div className='w-full rounded-md dark:bg-gradient-to-r from-purple-600 to-purple-400 p-[1px]'>
    <Button variant={"outline"} className=' w-full dark:bg-neutral-950 bg-purple-600 hover:bg-purple-700' 
    onClick={() => setOpen(true)}> 
    <span className='dark:bg-gradient-to-r from-purple-600 to-purple-400 bg-white bg-clip-text text-transparent'>Crear Categoria</span>
    </Button>
    <SideBar open={open} onOpenChange={handleOpenChange} />
    </div>
}

export default CreateCollectionBtn
