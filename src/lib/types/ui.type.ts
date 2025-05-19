import type { icons } from '$lib/constants/ui/icons';
import type { PokemonType } from 'pokeapi-typescript';

export type AlertProps = {
	title: string;
	content: string;
	subcontent: string;
	classes: string[];
};

export type TitleProps = {
	title: string;
	shadow_color: string;
};

export type NavTabProps = {
	title: string;
	base_url: string;
	route: string;
	icon: IconKey;
};

export type IconKey = keyof typeof icons;

export type CardProps = {
	title?: string;
	type: PokemonType;
};
