import { z } from 'zod';

export const TaskSchema = z.object({
	collectionId: z.number().nonnegative(),
	content: z.string().min(8, {
		message: 'El contenido de la tarea debe tener al menos 8 caracteres',
	}),
	expiresAt: z.date().optional(),
});

export type taskSchemaType = z.infer<typeof TaskSchema>;
