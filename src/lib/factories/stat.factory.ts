import type { InfoItem } from '$lib/types/information.type';
import { Heart, Shield, ShieldPlus, Swords, Wind, Zap } from '@lucide/svelte';
import type { PokemonStat } from 'pokeapi-typescript';

export function generateStatItems(stats: PokemonStat[]): InfoItem[] {
	const icons = [Heart, Swords, Shield, Zap, ShieldPlus, Wind];

	return stats.map((stat, index) => ({
		label: stat.stat.name.replace('special-', 'Sp. '),
		value: stat.base_stat,
		icon: icons[index]
	}));
}
