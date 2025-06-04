import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import type { Move } from 'pokeapi-typescript';
import { generateMoveCollection } from '$lib/factories/move.factory';

export const load: PageServerLoad = async ({ params, parent, fetch }) => {
	const { profile } = await parent();
	const generation = `generation-${params.generation}`;

	try {
		const response = await fetch('/data/moves.json');
		const moves: Move[] = await response.json();
		const moveCollection = await generateMoveCollection(profile.pokemon, moves, generation);

		return { moveCollection, generation };
	} catch {
		error(500, { message: 'error' });
	}
};
