import type { IconKey } from '$lib/types/ui.type';

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
