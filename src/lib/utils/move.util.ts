import { moveUIClasses } from '$lib/constants/ui/move';

export function getMoveCategoryClasses(typeName: keyof typeof moveUIClasses.text) {
	return {
		text: moveUIClasses.text[typeName],
		bgOpacity: moveUIClasses['bg-opacity'][typeName],
		from: moveUIClasses.from[typeName],
		bg: moveUIClasses.bg[typeName],
		icon: moveUIClasses.icon[typeName]
	};
}
