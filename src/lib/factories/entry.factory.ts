import type { FlavorText } from 'pokeapi-typescript';

export function generateEntries(entries: FlavorText[]): FlavorText[] {
	const englishEntries = entries.filter((entry) => entry.language.name === 'en');
	const groupedEntries: FlavorText[] = [];

	for (let index = 0; index < englishEntries.length; index++) {
		const currentEntry = englishEntries[index];

		const existingFlavorText = groupedEntries.find(
			(entry) => entry.flavor_text === currentEntry.flavor_text
		);

		if (existingFlavorText) {
			existingFlavorText.version.name += ` / ${currentEntry.version.name.replaceAll('-', ' ')}`;
		} else {
			groupedEntries.push({
				...currentEntry,
				version: {
					...currentEntry.version,
					name: currentEntry.version.name.replaceAll('-', ' ')
				}
			});
		}
	}

	return groupedEntries;
}
