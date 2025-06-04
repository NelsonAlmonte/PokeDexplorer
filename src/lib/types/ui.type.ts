import type { icons } from '$lib/constants/ui/icons';
import type { PokemonType } from 'pokeapi-typescript';

export type AlertTypes = {
	error: AlertProps;
	no_data: AlertProps;
	empty: AlertProps;
};

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
	classes: string[];
};

export type TypeClass = {
	light: Class;
	dark: Class;
};

type Class = {
	text: Record<string, string>;
	bg_opacity: Record<string, string>;
	from: Record<string, string>;
	bg: Record<string, string>;
	bg_hover: Record<string, string>;
	icon: Record<string, string>;
};
