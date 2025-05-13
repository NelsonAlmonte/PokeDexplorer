export type SpriteGroup = {
	generation: string;
	game_version: VersionSprites[];
};

type VersionSprites = {
	name: string;
	sprites: SpriteVariant;
};

export type SpriteVariant = {
	back_default: string | null;
	back_female: string | null;
	back_gray: string | null;
	back_shiny: string | null;
	back_shiny_female: string | null;
	front_default: string | null;
	front_female: string | null;
	front_gray: string | null;
	front_shiny: string | null;
	front_shiny_female: string | null;
};
