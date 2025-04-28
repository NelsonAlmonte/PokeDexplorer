import type { icons } from '$lib/constants/ui/icons';

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
	icon?: IconKey;
};

type IconKey = keyof typeof icons;

export type Range = {
	min: number;
	max: number;
};
