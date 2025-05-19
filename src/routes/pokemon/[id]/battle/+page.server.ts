import type { PageServerLoad } from './$types';
import { generateTypeDefenses } from '$lib/factories/type-defense.factory';
import { generateAbilities } from '$lib/factories/ability.factory';
import { generateStatRange } from '$lib/factories/stat.factory';

export const load: PageServerLoad = async ({ parent }) => {
	const { profile } = await parent();
	const statRange = generateStatRange(profile.pokemon);
	const typeDefenses = await generateTypeDefenses(profile.pokemon.types);
	const abilities = await generateAbilities(profile.pokemon);

	return { statRange, typeDefenses, abilities };
};
