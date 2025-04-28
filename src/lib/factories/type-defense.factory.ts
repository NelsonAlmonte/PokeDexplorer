import type { DamageRelation, TypeDefense } from '$lib/types/pokemon.type';
import type { PokemonType, Type, TypeRelations } from 'pokeapi-typescript';
import { doFetch } from '$lib/api/pokemon.api';

export async function generateTypeDefenses(types: PokemonType[]): Promise<TypeDefense[]> {
	const typeDefenses: TypeDefense[] = [];
	const damageRelation = await generateDamageRelation(types);
	for (const key in damageRelation) {
		typeDefenses.push({
			label: key.replaceAll('_', ' '),
			value: damageRelation[key]
		});
	}
	return typeDefenses;
}

async function generateDamageRelation(
	types: PokemonType[]
): Promise<Record<string, DamageRelation[]>> {
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

async function fetchTypesInfo(types: PokemonType[]): Promise<Type[]> {
	const typesInfo: Type[] = [];
	for (const type of types) {
		typesInfo.push((await doFetch('type', type.type.name)) as Type);
	}
	return typesInfo;
}
