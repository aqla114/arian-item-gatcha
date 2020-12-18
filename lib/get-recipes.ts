import { Recipe } from '../types/recipe';
import { getSumOfDice, getUniqueRandomValues } from './dice-roll';

export function getRecipes(recipePool: Recipe[], diceCount: number): Recipe[] {
	const recipeCount = getSumOfDice(diceCount);

	const recipeIndices: number[] = getUniqueRandomValues(
		recipeCount,
		recipePool.length
	);

	const recipes = recipeIndices.map((idx) => recipePool[idx]);

	console.log(recipes);

	return recipes;
}
