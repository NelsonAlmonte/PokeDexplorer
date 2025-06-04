import { error } from '@sveltejs/kit';
import type { Generation, Move, NamedApiResource, NamedApiResourceList } from 'pokeapi-typescript';
import { doFetch } from '$lib/api/pokemon.api';
import { writeFile } from 'fs/promises';
import path from 'path';

const { data, err } = await doFetch<NamedApiResourceList<NamedApiResource<Generation>>>(
	'move',
	'?offset=0&limit=100000'
);

if (err) error(500, { message: 'error' });

const movesResourceList = data!;
const moveNames: string[] = movesResourceList.results.map((move) => move.name);
const movesInfo: Pick<
	Move,
	'name' | 'power' | 'accuracy' | 'damage_class' | 'type' | 'machines'
>[] = [];

for (const moveName of moveNames) {
	const { data, err } = await doFetch<Move>('move', moveName);

	if (err) error(500, { message: 'error' });

	const move = data!;

	movesInfo.push({
		name: move.name,
		power: move.power,
		accuracy: move.accuracy,
		damage_class: move.damage_class,
		type: move.type,
		machines: move.machines
	});
}

const outputPath = path.resolve('static', 'data', 'moves.json');
await writeFile(outputPath, JSON.stringify(movesInfo, null, 2), 'utf-8');

console.log('file generated successfully');
