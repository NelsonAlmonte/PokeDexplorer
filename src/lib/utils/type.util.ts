import { typeUIClasses } from '$lib/constants/ui/type';

export function getTypeClasses(typeName: string) {
	return {
		text: `${typeUIClasses.light.text[typeName]} ${typeUIClasses.dark.text[typeName]}`,
		bgOpacity: `${typeUIClasses.light.bg_opacity[typeName]} ${typeUIClasses.dark.bg_opacity[typeName]}`,
		from: `${typeUIClasses.light.from[typeName]} ${typeUIClasses.dark.from[typeName]}`,
		bg: `${typeUIClasses.light.bg[typeName]} ${typeUIClasses.dark.bg[typeName]}`,
		bgHover: `${typeUIClasses.light.bg_hover[typeName]} ${typeUIClasses.dark.bg_hover[typeName]}`,
		icon: `${typeUIClasses.light.icon[typeName]}`
	};
}
