import { createCollection } from '@/actions/collection';
import { CollectionColor, CollectionColors } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { CollectionSchema, CollectionsSchemaType } from '@/schemas/collectionsSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { ReloadIcon } from '@radix-ui/react-icons';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useForm } from 'react-hook-form';
import { Button } from './ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from './ui/form';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Separator } from './ui/separator';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from './ui/sheet';
import { toast } from './ui/use-toast';

interface Props {
  open: boolean,
  onOpenChange: (open: boolean) => void;
}

function SideBar({ open, onOpenChange }: Props) {
  const form = useForm<CollectionsSchemaType>({
        defaultValues: {},
        resolver: zodResolver(CollectionSchema)
      })

      const router = useRouter()

      const onSubmit = async(data: CollectionsSchemaType) => {
        try {
          await createCollection(data)

          openChangeWrapper(false)

          router.refresh()

          toast({
            title: "Exito",
            description: "La coleccion fue creada con exito", 
          })
        } catch (e:any) {
          //Show a toast
          toast({
            title: "Error",
            description: "Algo ocurrio mal, por favor intenta de nuevo",
            variant: "destructive"
            
          })
          console.log('Error while creating a collection', e)
        }
      }

      const openChangeWrapper = (open: boolean) => {
        form.reset()
        onOpenChange(open)
      }

  return (
      <Sheet open={open} onOpenChange={openChangeWrapper}>
        <SheetContent className='bg-purple-600 dark:bg-neutral-900 text-white'>
          <SheetHeader>
            <SheetTitle className='text-white'>Agregar una nueva categoria</SheetTitle>
            <SheetDescription className='text-slate-200'>
              Las categorias son una forma de agrupar tus tareas.
            </SheetDescription>
          </SheetHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4 flex flex-col'>
              <FormField 
                control={form.control}
                name='name'
                render={({field}) => (
                  <FormItem>
                    <FormLabel className='text-slate-200'>Nombre</FormLabel>
                    <FormControl>
                      <Input className='bg-neutral-200 dark:bg-transparent text-black dark:text-white' placeholder='Personal' {...field} ></Input>
                    </FormControl>
                    <FormDescription className='text-slate-200'>Nombre de la categoria</FormDescription>
                    <FormMessage></FormMessage>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control} 
                name='color'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-slate-200'>Color</FormLabel>
                    <FormControl>
                      <Select onValueChange={(color) => field.onChange(color)}>
                        <SelectTrigger className={cn(`w-full h-8 bg-neutral-200 dark:bg-transparent text-black dark:text-white`, CollectionColors[field.value as CollectionColor])}>
                          <SelectValue placeholder='Color' className='w-full h-8' />
                        </SelectTrigger>
                        <SelectContent className='w-full dark:bg-neutral-900 bg-purple-600'>
                          {Object.keys(CollectionColors).map(color => (
                            <SelectItem
                            key={color} 
                            value={color}
                            className={
                              cn(`w-full h-8 rounded-md my-1 dark:text-white dark:focus:text-white focus:font-bold focus:ring-2 ring-white dark:focus:ring-white focus:ring-inset focus:px-8 transition duration-200`,
                              CollectionColors[color as CollectionColor]
                              )}
                            >
                              {color}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormDescription className='text-slate-200'>Escoge un color para tu coleccion</FormDescription>
                    <FormMessage></FormMessage>
                  </FormItem>
                )}
              />
            </form>
          </Form>
          <div className='flex flex-col gap-3 mt-4'>
            <Separator />
            <Button 
            disabled={form.formState.isSubmitting}
            variant={'outline'}
            onClick={form.handleSubmit(onSubmit)} className={cn(`transition duration-300`,
              form.watch("color") && CollectionColors[form.getValues("color") as CollectionColor])}>Confirmar
              {form.formState.isSubmitting && (
                <ReloadIcon className="ml-2 h-4  w-4 animate-spin" />
              )}
              </Button>  
          </div>
        </SheetContent>
      </Sheet>
    )
}

export default SideBar
