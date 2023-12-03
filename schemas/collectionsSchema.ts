import { CollectionColors } from '@/lib/constants';
import z from 'zod';

export const CollectionSchema = z.object({
	name: z.string().min(4, {
		message: 'El nombre de la coleccion debe ser de al menos 4 caracteres',
	}),
	color: z
		.string()
		.refine((color) => Object.keys(CollectionColors).includes(color)),
});

export type CollectionsSchemaType = z.infer<typeof CollectionSchema>;
