import type { Icon } from '@lucide/svelte';
import type { PokemonType } from 'pokeapi-typescript';

export type PokemonInformation = {
	basic: InfoSection;
	training: InfoSection;
	breeding: InfoSection;
	stats: InfoSection;
	defenses: InfoSection;
};

export type InfoSection = {
	label: string;
	data: InfoItem[];
};

export type InfoItem = {
	label: string;
	value: string | number | Range | PokemonType[];
	icon: typeof Icon;
};

export type Range = {
	min: number;
	max: number;
};
