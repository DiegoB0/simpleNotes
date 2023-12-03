"use client"
import { deleteCollection } from '@/actions/collection'
import { CollectionColor, CollectionColors } from '@/lib/constants'
import { cn } from '@/lib/utils'
import { Collection, Task } from '@prisma/client'
import { CaretDownIcon, CaretUpIcon, TrashIcon } from '@radix-ui/react-icons'
import { useRouter } from 'next/navigation'
import React, { useMemo, useState, useTransition } from 'react'
import CreateTaskDialog from './CreateTaskDialog'
import TaskCard from './TaskCard'
import PlusIcon from './icons/PlusIcon'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogTitle, AlertDialogTrigger } from './ui/alert-dialog'
import { Button } from './ui/button'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './ui/collapsible'
import { Progress } from './ui/progress'
import { Separator } from './ui/separator'
import { toast } from './ui/use-toast'

interface Props {
  collection: Collection & {
    tasks: Task[]
  }
}

function CollectionCard({collection}: Props) {
  const [isOpen, setIsOpen] = useState(true)
  const router = useRouter()

  const [showCreateModal, setShowCreateModal] = useState(false)

  const tasks = collection.tasks

  const [isLoading, startTransition] = useTransition()

  const removeCollection = async () => {
   try {
    await deleteCollection(collection.id)
    toast({
      title: "Exito",
      description: "Categoria eliminada con exito"
    })

    router.refresh()

   } catch(e) {
    toast({
      title: "Error",
      description: "Ha ocurrido un error",
      variant: "destructive"
    })
   } 
  }
  const taskDone = useMemo(() => {
    return collection.tasks.filter((task) => task.done).length
  }, [collection.tasks])

  const totalTasks = collection.tasks.length
  const progress = totalTasks === 0 ? 0 : (taskDone / totalTasks) * 100

  return (
    <>
    <CreateTaskDialog 
    open={showCreateModal} 
    setOpen={setShowCreateModal}
    collection={collection}
    />
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <CollapsibleTrigger asChild>
        <Button variant={"ghost"} className={cn(`flex w-full justify-between p-6`, isOpen && "rounded-none", CollectionColors[collection.color as CollectionColor])}>
          <span className='text-white font-bold'>{collection.name}</span>
          {!isOpen && <CaretDownIcon className='h-6 w-6' />}
          {isOpen && <CaretUpIcon className='h-6 w-6' />}
          </Button>
      </CollapsibleTrigger>
      <CollapsibleContent className='flex rounded-b-md flex-col dark:bg-neutral-900 shadow-lg'>
        {tasks.length === 0 && 
        <Button
          variant={"ghost"}
          className='flex items-center justify-center gap-1 p-8 py-12 rounded-none'
          onClick={() => setShowCreateModal(true)}
        >
          <p>No hay tareas aun. </p>
          <span className={cn(
            "text-sm bg-clip-text text-transparent",
            CollectionColors[collection.color as CollectionColor]
          )}>Crear una</span>  
        </Button>
        }
        {tasks.length > 0 && (
          <>
            <Progress className='rounded-none' value={progress}/>
            <div className='p-4 gap-3 flex flex-col'>
              {tasks.map((task) => (
                <TaskCard key={task.id} task={task} />
              ))}
            </div>
          </>
        )}
        <Separator />
        <footer className='h-[40px] px-4 p-[2px] text-xs flex justify-between items-center dark:text-neutral-500'>
                <p>Created at {collection.createdAt.toDateString()}</p>
                {isLoading && <div>Eliminando...</div>}
                {!isLoading && (
                <div>
                  <Button size={"icon"} variant={"ghost"} className='text-purple-500 dark:text-neutral-500' onClick={() => {
                    setShowCreateModal(true)
                  }}>
                    <PlusIcon /> 
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button size={"icon"} variant={"ghost"} className='text-purple-500 dark:text-neutral-500'>
                        <TrashIcon />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                    <AlertDialogTitle>
                      Estas seguro de querer eliminar la categoria?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      Esta accion no se podra deshacer.
                    </AlertDialogDescription>
                    <AlertDialogFooter>
                      <AlertDialogCancel>
                        Cancelar
                      </AlertDialogCancel>
                      <AlertDialogAction onClick={() => { 
                       startTransition(removeCollection) 
                      }}>Continuar</AlertDialogAction>
                    </AlertDialogFooter>
                    </AlertDialogContent>
                    
                  </AlertDialog>
                  
                </div>
                )}
                
        </footer>
      </CollapsibleContent>
    </Collapsible>
    </>
    
  )
}

export default CollectionCard
