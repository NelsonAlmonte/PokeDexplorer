import { doFetch } from '$lib/api/pokemon.api';
import { expAtLevel100 } from '$lib/constants/pokemon/exp-to-100';
import type { DamageRelation, PokemonInformation } from '$lib/types/information.type';
import type { PokemonProfile } from '$lib/types/pokemon.type';
import type { PokemonStat, PokemonType, Type, TypeRelations } from 'pokeapi-typescript';

export async function generatePokemonInfo(
	pokemonProfile: PokemonProfile
): Promise<PokemonInformation> {
	const ENGLISH_LANGUAGE_INDEX = 7;
	const HP_INDEX = 0;
	const ATTACK_INDEX = 1;
	const DEFENSE_INDEX = 2;
	const SPECIAL_ATTACK_INDEX = 3;
	const SPECIAL_DEFENSE_INDEX = 4;
	const SPEED_INDEX = 5;
	const typeDefenses = await getTypeDefenses(pokemonProfile.pokemon.types);

	return {
		basic: {
			label: 'Basic information',
			data: [
				{
					label: 'National №',
					value: pokemonProfile['pokemon-species'].pokedex_numbers[0].entry_number,
					icon: 'Hash'
				},
				{
					label: 'Generation',
					value: pokemonProfile['pokemon-species'].generation.name.replace('generation-', ' '),
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
					value: pokemonProfile['pokemon-species'].genera[ENGLISH_LANGUAGE_INDEX].genus,
					icon: 'Dna'
				},
				{
					label: 'Habitat',
					value: pokemonProfile['pokemon-species'].habitat
						? pokemonProfile['pokemon-species'].habitat.name
						: 'None',
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
					value: pokemonProfile['pokemon-species'].growth_rate.name.replace('-', ' '),
					icon: 'TrendingUp'
				},
				{
					label: 'Exp. to 100',
					value: new Intl.NumberFormat().format(
						expAtLevel100[pokemonProfile['pokemon-species'].growth_rate.name]
					),
					icon: 'Rocket'
				},
				{
					label: 'Cath rate',
					value: pokemonProfile['pokemon-species'].capture_rate,
					icon: 'Target'
				},
				{
					label: 'Friendship',
					value: pokemonProfile['pokemon-species'].base_happiness,
					icon: 'Smile'
				}
			]
		},
		breeding: {
			label: 'Breeding information',
			data: [
				{
					label: 'Egg groups',
					value: pokemonProfile['pokemon-species'].egg_groups.map((value) => value.name).join(', '),
					icon: 'Egg'
				},
				{
					label: 'Gender rate',
					value: getGenderDistribution(pokemonProfile['pokemon-species'].gender_rate),
					icon: 'VenetianMask'
				},
				{
					label: 'Hatch counter',
					value: pokemonProfile['pokemon-species'].hatch_counter,
					icon: 'TimerReset'
				},
				{
					label: 'Baby',
					value: pokemonProfile['pokemon-species'].is_baby ? 'Yes' : 'No',
					icon: 'Baby'
				},
				{
					label: 'Legendary',
					value: pokemonProfile['pokemon-species'].is_legendary ? 'Yes' : 'No',
					icon: 'Sparkles'
				},
				{
					label: 'Mythical',
					value: pokemonProfile['pokemon-species'].is_mythical ? 'Yes' : 'No',
					icon: 'MoonStar'
				}
			]
		},
		stats: {
			label: 'Base stats',
			data: [
				{
					label: 'Hp',
					value: calculateStatRange(pokemonProfile.pokemon.stats[HP_INDEX].base_stat, true),
					icon: 'Heart'
				},
				{
					label: 'Attack',
					value: calculateStatRange(pokemonProfile.pokemon.stats[ATTACK_INDEX].base_stat),
					icon: 'Swords'
				},
				{
					label: 'Defense',
					value: calculateStatRange(pokemonProfile.pokemon.stats[DEFENSE_INDEX].base_stat),
					icon: 'Shield'
				},
				{
					label: 'Sp. Attack',
					value: calculateStatRange(pokemonProfile.pokemon.stats[SPECIAL_ATTACK_INDEX].base_stat),
					icon: 'Zap'
				},
				{
					label: 'Sp. Defense',
					value: calculateStatRange(pokemonProfile.pokemon.stats[SPECIAL_DEFENSE_INDEX].base_stat),
					icon: 'ShieldPlus'
				},
				{
					label: 'Speed',
					value: calculateStatRange(pokemonProfile.pokemon.stats[SPEED_INDEX].base_stat),
					icon: 'Wind'
				}
			]
		},
		defenses: {
			label: 'Type defenses',
			data: [
				{
					label: 'Weak to',
					value: typeDefenses.double_damage_from
				},
				{
					label: 'Resistant to',
					value: typeDefenses.half_damage_from
				},
				{
					label: 'Immune to',
					value: typeDefenses.no_damage_from
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

function calculateStatRange(stat: number, isHp: boolean = false) {
	const IV = { min: 0, max: 31 };
	const EV = { min: 0, max: 252 };
	const NATURE = { min: 0.9, max: 1.1 };
	const MAX_LEVEL = 100;

	if (isHp) {
		return {
			min: Math.floor(((2 * stat + IV.min + EV.min / 4) * MAX_LEVEL) / 100 + MAX_LEVEL + 10),
			max: Math.floor(((2 * stat + IV.max + EV.max / 4) * MAX_LEVEL) / 100 + MAX_LEVEL + 10)
		};
	} else {
		return {
			min: Math.floor((((2 * stat + IV.min + EV.min / 4) * MAX_LEVEL) / 100 + 5) * NATURE.min),
			max: Math.floor((((2 * stat + IV.max + EV.max / 4) * MAX_LEVEL) / 100 + 5) * NATURE.max)
		};
	}
}

async function fetchTypesInfo(types: PokemonType[]): Promise<Type[]> {
	const typesInfo: Type[] = [];
	for (const type of types) {
		typesInfo.push((await doFetch('type', type.type.name)) as Type);
	}
	return typesInfo;
}

async function getTypeDefenses(types: PokemonType[]): Promise<Record<string, DamageRelation[]>> {
	const typesInfo = await fetchTypesInfo(types);
	const damageRelation: Record<string, DamageRelation[]> = {
		double_damage_from: [],
		half_damage_from: [],
		no_damage_from: []
	};
	const damageRelationKeys = [
		{
			key: 'double_damage_from',
			product: 2
		},
		{
			key: 'half_damage_from',
			product: 0.5
		},
		{
			key: 'no_damage_from',
			product: 0
		}
	];

	for (const type of typesInfo) {
		for (const relationKey of damageRelationKeys) {
			const currentRelationKey = relationKey.key as keyof TypeRelations;
			for (const relationType of type.damage_relations[currentRelationKey]) {
				const name = relationType.name;

				const existing = damageRelation[currentRelationKey].find((item) => item.type === name);

				if (existing) {
					existing.value *= relationKey.product;
				} else {
					damageRelation[currentRelationKey].push({
						type: name,
						value: relationKey.product
					});
				}
			}
		}
	}

	return damageRelation;
}
