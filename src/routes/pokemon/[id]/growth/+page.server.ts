import type { PageServerLoad } from './$types';
import { generateEvolutionChain } from '$lib/factories/evolution.factory';
import { generateForms } from '$lib/factories/form.factory';

export const load: PageServerLoad = async ({ parent }) => {
	const { pokemons, profile } = await parent();
	const evolutionChain = await generateEvolutionChain(pokemons, profile.species);
	const forms = await generateForms(pokemons, profile.species);

	return { evolutionChain, forms };
};
