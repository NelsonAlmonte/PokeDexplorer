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
			version.game_version.push({
				name: gameName,
				sprites: sprites
			});
		}
		groupedSprites.push(version);
	}

	return groupedSprites;
}
