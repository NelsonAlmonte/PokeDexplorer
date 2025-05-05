import type { InfoItem } from '$lib/types/information.type';
import type { PokemonProfile, StatRange } from '$lib/types/pokemon.type';
import type { PokemonStat } from 'pokeapi-typescript';

export function generateStatItems(stats: PokemonStat[]): InfoItem[] {
	const icons = ['Heart', 'Swords', 'Shield', 'Zap', 'ShieldPlus', 'Wind'];

	return stats.map((stat, index) => ({
		label: stat.stat.name.replace('special-', 'Sp. '),
		value: stat.base_stat,
		icon: icons[index]
	})) as InfoItem[];
}

export function generateStatRange(pokemonProfile: PokemonProfile): StatRange[] {
	const HP_INDEX = 0;
	const ATTACK_INDEX = 1;
	const DEFENSE_INDEX = 2;
	const SPECIAL_ATTACK_INDEX = 3;
	const SPECIAL_DEFENSE_INDEX = 4;
	const SPEED_INDEX = 5;

	return [
		{
			label: 'Hp',
			value: calculateStatRange(pokemonProfile.pokemon.stats[HP_INDEX].base_stat, true),
			icon: 'Heart'
		},
		{
			label: 'Attack',
			value: calculateStatRange(pokemonProfile.pokemon.stats[ATTACK_INDEX].base_stat),
			icon: 'Swords'
		},
		{
			label: 'Defense',
			value: calculateStatRange(pokemonProfile.pokemon.stats[DEFENSE_INDEX].base_stat),
			icon: 'Shield'
		},
		{
			label: 'Sp. Attack',
			value: calculateStatRange(pokemonProfile.pokemon.stats[SPECIAL_ATTACK_INDEX].base_stat),
			icon: 'Zap'
		},
		{
			label: 'Sp. Defense',
			value: calculateStatRange(pokemonProfile.pokemon.stats[SPECIAL_DEFENSE_INDEX].base_stat),
			icon: 'ShieldPlus'
		},
		{
			label: 'Speed',
			value: calculateStatRange(pokemonProfile.pokemon.stats[SPEED_INDEX].base_stat),
			icon: 'Wind'
		}
	];
}

function calculateStatRange(stat: number, isHp: boolean = false) {
	const IV = { min: 0, max: 31 };
	const EV = { min: 0, max: 252 };
	const NATURE = { min: 0.9, max: 1.1 };
	const MAX_LEVEL = 100;

	if (isHp) {
		return {
			min: Math.floor(((2 * stat + IV.min + EV.min / 4) * MAX_LEVEL) / 100 + MAX_LEVEL + 10),
			max: Math.floor(((2 * stat + IV.max + EV.max / 4) * MAX_LEVEL) / 100 + MAX_LEVEL + 10)
		};
	} else {
		return {
			min: Math.floor((((2 * stat + IV.min + EV.min / 4) * MAX_LEVEL) / 100 + 5) * NATURE.min),
			max: Math.floor((((2 * stat + IV.max + EV.max / 4) * MAX_LEVEL) / 100 + 5) * NATURE.max)
		};
	}
}
