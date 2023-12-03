'use server';
import prisma from '@/lib/prisma';
import { taskSchemaType } from '@/schemas/tasksSchema';
import { currentUser } from '@clerk/nextjs';

export async function createTask(data: taskSchemaType) {
	const user = await currentUser();

	if (!user) {
		throw new Error('User not found');
	}

	const { content, expiresAt, collectionId } = data;

	return await prisma.task.create({
		data: {
			userId: user.id,
			content,
			expiresAt,
			Collection: {
				connect: {
					id: collectionId,
				},
			},
		},
	});
}

export async function setTaskToDone(id: number) {
	const user = await currentUser();

	if (!user) {
		throw new Error('User not found');
	}

	return await prisma.task.update({
		where: {
			id: id,
			userId: user.id,
		},
		data: {
			done: true,
		},
	});
}
