"use client"
import { createTask } from '@/actions/task'
import { CollectionColor, CollectionColors } from '@/lib/constants'
import { cn } from '@/lib/utils'
import { TaskSchema, taskSchemaType } from '@/schemas/tasksSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { Collection } from '@prisma/client'
import { CalendarIcon, ReloadIcon } from '@radix-ui/react-icons'
import { format } from 'date-fns'
import { useRouter } from 'next/navigation'
import React from 'react'
import { useForm } from 'react-hook-form'
import { Button } from './ui/button'
import { Calendar } from './ui/calendar'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from './ui/form'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import { Textarea } from './ui/textarea'
import { toast } from './ui/use-toast'

interface Props {
  open: boolean
  collection: Collection
  setOpen: (open: boolean) => void
}

function CreateTaskDialog({open, collection, setOpen}: Props) {

  const form = useForm<taskSchemaType>({
    resolver: zodResolver(TaskSchema),
    defaultValues: {
      collectionId: collection.id
    }
  })

  const router = useRouter()

  const openChangeWrapper = (value: boolean) => {
    setOpen(value)
    form.reset()
  }

  const onSubmit = async(data: taskSchemaType) => {
    try {
      await createTask(data)

      toast({
        title: "Exito",
        description: "Se ha creado la tarea exitosamente",
      })
      
      openChangeWrapper(false)
      router.refresh()

    } catch(e) {
      toast({
        title: "Error",
        description: "No se pudo crear la tarea",
        variant: "destructive"
      })
    }
  }

  return (
   <Dialog open={open} onOpenChange={openChangeWrapper}>
    <DialogContent className='sm:mx-w-[425px]'>
      <DialogHeader>
        <DialogTitle className='flex gap-2'>Agregar nueva tarea a categoria:{" "} 
          <span 
          className={cn(
            "p-[1px] bg-clip-text text-transparent", 
            CollectionColors[collection.color as CollectionColor]
            )}>
            {collection.name}
          </span>
        </DialogTitle>
        <DialogDescription>
          Agrega una tarea a tu categoria. Puedes agregar tantas como quieras.
        </DialogDescription>
      </DialogHeader>
      <div className='gap-4 py-4'>
        <Form {...form}>
          <form className='space-y-4 flex flex-col' onSubmit={form.handleSubmit(onSubmit)}>
            <FormField 
              control={form.control}
              name='content'
              render={({field}) => (
                <FormItem>
                  <FormLabel>Contenido</FormLabel>
                  <FormControl>
                    <Textarea rows={5} placeholder='El contenido de la tarea va aqui' {...field} /> 
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
              <FormField 
              control={form.control}
              name='expiresAt'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Expira en:</FormLabel>
                  <FormDescription>Cuando deberia expirar esta tarea?</FormDescription>
                  <FormControl>
                   <Popover>
                    <PopoverTrigger asChild>
                      <Button 
                      variant={'outline'} 
                      className={
                        cn(
                          "justify-start text-left font-normal w-full",
                          !field.value && "text-muted-foreground"
                        )}>
                        <CalendarIcon className='mr-2 h-4 w-4' />
                        {field.value && format(field.value, "PPP")}
                        {!field.value && <span>Sin fecha</span>}
                      </Button>
                    </PopoverTrigger>  
                    <PopoverContent>
                      <Calendar 
                        mode='single'
                        selected={field.value}
                        onSelect={field.onChange}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover> 
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
      </div>
      <DialogFooter>
        <Button 
        disabled={form.formState.isSubmitting}
        onClick={form.handleSubmit(onSubmit)}
        className={cn(
          "w-full dark:text-white text-white",
          CollectionColors[collection.color as CollectionColor]
        )}>
          Confirmar
        {form.formState.isSubmitting && (
          <ReloadIcon className='animate-spin h-4 w-4 ml-2' />
        )}
        </Button>
      </DialogFooter>
    </DialogContent>
   </Dialog> 
  )
}

export default CreateTaskDialog
