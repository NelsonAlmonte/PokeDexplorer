import type { TitleProps } from '$lib/types/ui.type';

export function createTitle(title: string, shadowColor: string): TitleProps {
	return { title, shadow_color: shadowColor };
}
