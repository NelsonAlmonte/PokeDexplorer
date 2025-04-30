import { typeUIClasses } from '$lib/constants/type/type-ui';

export function getTypeClasses(typeName: keyof typeof typeUIClasses.text) {
	return {
		text: typeUIClasses.text[typeName],
		bgOpacity: typeUIClasses.bg_opacity[typeName],
		from: typeUIClasses.from[typeName],
		bg: typeUIClasses.bg[typeName],
		bgHover: typeUIClasses.bg_hover[typeName],
		icon: typeUIClasses.icon[typeName]
	};
}
