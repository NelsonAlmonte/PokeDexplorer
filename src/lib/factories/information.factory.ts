import { expAtLevel100 } from '$lib/constants/pokemon/exp-to-100';
import type { PokemonInformation } from '$lib/types/information.type';
import type { PokemonProfile } from '$lib/types/pokemon.type';
import {
	Baby,
	Calendar,
	Dna,
	Egg,
	Gauge,
	GaugeCircle,
	Hash,
	MoonStar,
	Rocket,
	Ruler,
	Smile,
	Sparkles,
	Target,
	TimerReset,
	Trees,
	TrendingUp,
	VenetianMask,
	Weight
} from '@lucide/svelte';
import type { PokemonStat } from 'pokeapi-typescript';

export function generatePokemonInfo(pokemonProfile: PokemonProfile) {
	const ENGLISH_LANGUAGE_INDEX = 7;

	return {
		basic: {
			label: 'Basic information',
			data: [
				{
					label: 'National №',
					value: pokemonProfile['pokemon-species'].pokedex_numbers[0].entry_number,
					icon: Hash
				},
				{
					label: 'Generation',
					value: pokemonProfile['pokemon-species'].generation.name.replace('generation-', ' '),
					icon: Calendar
				},
				{
					label: 'Height',
					value: `${pokemonProfile.pokemon.height / 10} m`,
					icon: Ruler
				},
				{
					label: 'Weight',
					value: `${pokemonProfile.pokemon.weight / 10} kg`,
					icon: Weight
				},
				{
					label: 'Species',
					value: pokemonProfile['pokemon-species'].genera[ENGLISH_LANGUAGE_INDEX].genus,
					icon: Dna
				},
				{
					label: 'Habitat',
					value: pokemonProfile['pokemon-species'].habitat.name,
					icon: Trees
				}
			]
		},
		training: {
			label: 'Training information',
			data: [
				{
					label: 'EV yield',
					value: getEV(pokemonProfile.pokemon.stats),
					icon: Gauge
				},
				{
					label: 'Base Exp.',
					value: pokemonProfile.pokemon.base_experience,
					icon: GaugeCircle
				},
				{
					label: 'Growth',
					value: pokemonProfile['pokemon-species'].growth_rate.name.replace('-', ' '),
					icon: TrendingUp
				},
				{
					label: 'Exp. to 100',
					value: new Intl.NumberFormat().format(
						expAtLevel100[pokemonProfile['pokemon-species'].growth_rate.name]
					),
					icon: Rocket
				},
				{
					label: 'Cath rate',
					value: pokemonProfile['pokemon-species'].capture_rate,
					icon: Target
				},
				{
					label: 'Friendship',
					value: pokemonProfile['pokemon-species'].base_happiness,
					icon: Smile
				}
			]
		},
		breeding: {
			label: 'Breeding information',
			data: [
				{
					label: 'Egg groups',
					value: pokemonProfile['pokemon-species'].egg_groups.map((value) => value.name).join(', '),
					icon: Egg
				},
				{
					label: 'Gender rate',
					value: getGenderDistribution(pokemonProfile['pokemon-species'].gender_rate),
					icon: VenetianMask
				},
				{
					label: 'Hatch counter',
					value: pokemonProfile['pokemon-species'].hatch_counter,
					icon: TimerReset
				},
				{
					label: 'Baby',
					value: pokemonProfile['pokemon-species'].is_baby ? 'Yes' : 'No',
					icon: Baby
				},
				{
					label: 'Legendary',
					value: pokemonProfile['pokemon-species'].is_legendary ? 'Yes' : 'No',
					icon: Sparkles
				},
				{
					label: 'Mythical',
					value: pokemonProfile['pokemon-species'].is_mythical ? 'Yes' : 'No',
					icon: MoonStar
				}
			]
		}
	} as PokemonInformation;
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
