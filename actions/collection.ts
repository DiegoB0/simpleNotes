'use server';
import prisma from '@/lib/prisma';
import { wait } from '@/lib/wait';
import { CollectionsSchemaType } from '@/schemas/collectionsSchema';
import { currentUser } from '@clerk/nextjs';

export async function createCollection(form: CollectionsSchemaType) {
	const user = await currentUser();

	if (!user) {
		throw new Error('User not found');
	}

	return await prisma.collection.create({
		data: {
			userId: user.id,
			color: form.color,
			name: form.name,
		},
	});
}

export async function deleteCollection(id: number) {
	const user = await currentUser();
	if (!user) {
		throw new Error('User not found');
	}

	return await prisma.collection.delete({
		where: {
			id: id,
			userId: user.id,
		},
	});
}
