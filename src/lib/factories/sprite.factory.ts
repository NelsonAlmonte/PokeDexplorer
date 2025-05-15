import type { PokemonSprites } from 'pokeapi-typescript';
import type { SpriteGroup } from '$lib/types/sprite.type';

export function generateSprites(sprites: PokemonSprites): SpriteGroup[] {
	const groupedSprites: SpriteGroup[] = [];

	for (const [generationName, games] of Object.entries(sprites.versions)) {
		const version: SpriteGroup = {
			generation: generationName,
			game_version: []
		};

		for (const [gameName, sprites] of Object.entries(games)) {
			const isEmpty = Object.entries(sprites)
				.filter(([, value]) => typeof value !== 'object' || value === null)
				.every(([, value]) => value === null || value === '');

			if (isEmpty) continue;

			version.game_version.push({
				name: gameName.replaceAll('-', ' '),
				sprites: sprites
			});
		}

		if (version.game_version.length > 0) groupedSprites.push(version);
	}

	return groupedSprites;
}
