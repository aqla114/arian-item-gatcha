import { Recipe } from '../types/recipe';
import { getRandomValues, getSumOfDice } from './dice-roll';

export function getItems(itemPool: Recipe[], diceCount: number): Recipe[] {
	const itemCount = getSumOfDice(diceCount);

	const itemIndices: number[] = getRandomValues(itemCount, itemPool.length);

	const items = itemIndices.map((idx) => itemPool[idx]);

	return items;
}
