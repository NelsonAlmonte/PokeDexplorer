import type { Icon } from '@lucide/svelte';

export type PokemonInformation = {
	basic: InfoSection;
	training: InfoSection;
	breeding: InfoSection;
	stats: InfoSection;
};

export type InfoSection = {
	label: string;
	data: InfoItem[];
};

export type InfoItem = {
	label: string;
	value: string | number | Range;
	icon: typeof Icon;
};

export type Range = {
	min: number;
	max: number;
};
