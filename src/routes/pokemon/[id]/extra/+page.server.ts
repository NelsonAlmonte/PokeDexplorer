import type { PageServerLoad } from './$types';
import { generateEntries } from '$lib/factories/entry.factory';
import { generateSprites } from '$lib/factories/sprite.factory';

export const load: PageServerLoad = async ({ parent }) => {
	const { profile } = await parent();
	const entries = generateEntries(profile.species.flavor_text_entries);
	const sprites = generateSprites(profile.pokemon.sprites);

	return { entries, sprites };
};
