import { generateEvolutionChain } from '$lib/factories/evolution.factory';
import { generateForms } from '$lib/factories/form.factory';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ parent }) => {
	const { results, profile } = await parent();
	const pokemons = results;
	const evolutionChain = await generateEvolutionChain(pokemons, profile.species);
	const forms = await generateForms(pokemons, profile.species);

	return { evolutionChain, forms };
};
