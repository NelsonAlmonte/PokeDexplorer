import type { Icon } from '@lucide/svelte';

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
	value: string | number | Range | DamageRelation[];
	icon?: typeof Icon;
};

export type Range = {
	min: number;
	max: number;
};

export type DamageRelation = {
	type: string;
	value: number;
};
