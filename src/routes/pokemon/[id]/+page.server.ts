import type { PageServerLoad } from './$types';
import type { Move } from 'pokeapi-typescript';
import { getPokemon } from '$lib/api/pokemon.api';
import { generateMoveCollection } from '$lib/factories/move.factory';
import { generateTypeDefenses } from '$lib/factories/type-defense.factory';
import { generateEvolutionChain } from '$lib/factories/evolution.factory';
import { generateForms } from '$lib/factories/form.factory';
import { generateAbilities } from '$lib/factories/ability.factory';
import { generateEntries } from '$lib/factories/entry.factory';

export const load: PageServerLoad = async ({ params, parent, fetch }) => {
	const { results, profile } = await parent();
	const id = +params.id;
	const pokemons = results;
	const pokemon = await getPokemon(pokemons, id);
	const response = await fetch('/data/moves.json');
	const moves: Move[] = await response.json();
	const moveCollection = await generateMoveCollection(pokemon, moves, profile.generations);
	const typeDefenses = await generateTypeDefenses(profile.pokemon.types);
	const evolutionChain = await generateEvolutionChain(pokemons, profile.species);
	const forms = await generateForms(pokemons, profile.species);
	const abilities = await generateAbilities(pokemon);
	const entries = generateEntries(profile.species.flavor_text_entries);

	return { moveCollection, typeDefenses, evolutionChain, forms, abilities, entries };
};
