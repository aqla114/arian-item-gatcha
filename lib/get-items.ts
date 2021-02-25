import { Recipe } from '../types/recipe';
import { getRandomValues, getSumOfDice } from './dice-roll';

export function getItems(itemPool: Recipe[], diceCount: number): Recipe[] {
	const itemCount = getSumOfDice(diceCount);

	const itemIndices: number[] = getRandomValues(
		itemCount,
		itemPool.length,
		itemPool.map((item) => item.dropRate / 5)
	);

	const items = itemIndices
		.map((idx) => itemPool[idx])
		.sort((a, b) => a.id - b.id);

	return items;
}
