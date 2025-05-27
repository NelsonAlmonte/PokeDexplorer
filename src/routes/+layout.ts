import type { Generation, NamedApiResource, NamedApiResourceList } from 'pokeapi-typescript';
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async ({ fetch }) => {
	const res = await fetch('https://pokeapi.co/api/v2/generation');
	const generationsJson: NamedApiResourceList<NamedApiResource<Generation>> = await res.json();
	const generations = generationsJson.results.map((generation) => generation.name);

	return { generations };
};
