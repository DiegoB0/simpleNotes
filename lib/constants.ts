export enum CollectionColors {
	Lima = 'bg-gradient-to-r from-emerald-500 to-lime-300',
	Candy = 'bg-gradient-to-r from-red-400 to-pink-400',
	Violeta = 'bg-gradient-to-r from-violet-500 to-indigo-300  focus:bg-violet-500',
}

export type CollectionColor = keyof typeof CollectionColors;
