import type { icons } from '$lib/constants/ui/icons';

export type PokemonInformation = {
	basic: InfoSection;
	training: InfoSection;
	breeding: InfoSection;
};

export type InfoSection = {
	label: string;
	data: InfoItem[];
};

export type InfoItem = {
	label: string;
	value: string | number;
	icon: IconKey;
};

export type IconKey = keyof typeof icons;
