import type { PokemonInformation } from '$lib/types/information.type';
import type { PokemonProfile } from '$lib/types/pokemon.type';
import type { PokemonStat } from 'pokeapi-typescript';

export function generatePokemonInfo(pokemonProfile: PokemonProfile): PokemonInformation {
	const EXP_AT_LVL_100: Record<string, number> = {
		slow: 1_250_000,
		medium: 1_000_000,
		fast: 800_000,
		'medium-slow': 1_059_860,
		'slow-then-very-fast': 600_000,
		'fast-then-very-slow': 1_640_000
	};

	return {
		basic: {
			label: 'Basic information',
			data: [
				{
					label: 'National №',
					value: pokemonProfile.species.pokedex_numbers[0].entry_number,
					icon: 'Hash'
				},
				{
					label: 'Generation',
					value: pokemonProfile.species.generation.name.replace('generation-', ' ').toUpperCase(),
					icon: 'Calendar'
				},
				{
					label: 'Height',
					value: `${pokemonProfile.pokemon.height / 10} m`,
					icon: 'Ruler'
				},
				{
					label: 'Weight',
					value: `${pokemonProfile.pokemon.weight / 10} kg`,
					icon: 'Weight'
				},
				{
					label: 'Species',
					value:
						pokemonProfile.species.genera.find((value) => value.language.name === 'en')?.genus ??
						'Unknown',
					icon: 'Dna'
				},
				{
					label: 'Habitat',
					value: pokemonProfile.species.habitat ? pokemonProfile.species.habitat.name : 'None',
					icon: 'Trees'
				}
			]
		},
		training: {
			label: 'Training information',
			data: [
				{
					label: 'EV yield',
					value: getEV(pokemonProfile.pokemon.stats),
					icon: 'Gauge'
				},
				{
					label: 'Base Exp.',
					value: pokemonProfile.pokemon.base_experience,
					icon: 'GaugeCircle'
				},
				{
					label: 'Growth',
					value: pokemonProfile.species.growth_rate.name.replace('-', ' '),
					icon: 'TrendingUp'
				},
				{
					label: 'Exp. to 100',
					value: new Intl.NumberFormat().format(
						EXP_AT_LVL_100[pokemonProfile.species.growth_rate.name]
					),
					icon: 'Rocket'
				},
				{
					label: 'Cath rate',
					value: pokemonProfile.species.capture_rate,
					icon: 'Target'
				},
				{
					label: 'Happiness',
					value: pokemonProfile.species.base_happiness,
					icon: 'Smile'
				}
			]
		},
		breeding: {
			label: 'Breeding information',
			data: [
				{
					label: 'Egg groups',
					value: pokemonProfile.species.egg_groups.map((value) => value.name).join(', '),
					icon: 'Egg'
				},
				{
					label: 'Gender rate',
					value: getGenderDistribution(pokemonProfile.species.gender_rate),
					icon: 'VenetianMask'
				},
				{
					label: 'Hatch counter',
					value: pokemonProfile.species.hatch_counter,
					icon: 'TimerReset'
				},
				{
					label: 'Baby',
					value: pokemonProfile.species.is_baby ? 'Yes' : 'No',
					icon: 'Baby'
				},
				{
					label: 'Legendary',
					value: pokemonProfile.species.is_legendary ? 'Yes' : 'No',
					icon: 'Sparkles'
				},
				{
					label: 'Mythical',
					value: pokemonProfile.species.is_mythical ? 'Yes' : 'No',
					icon: 'MoonStar'
				}
			]
		}
	};
}

function getEV(stats: PokemonStat[]): string {
	return stats
		.filter((value) => value.effort !== 0)
		.map(
			(value) =>
				`${value.effort} ${value.stat.name.replace('special-', 'Sp. ').replace('attack', 'Atk').replace('defense', 'Def').replace('speed', 'spd')}`
		)
		.join('\r\n');
}

function getGenderDistribution(rate: number): string {
	if (rate === -1) return 'Genderless';
	return `${100 - (rate / 8) * 100}% male ${(rate / 8) * 100}% female`;
}
