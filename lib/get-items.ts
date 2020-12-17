import { Recipe } from '../types/recipe';

/**
 * return 1..6 randomly
 */
function diceRoll() {
	return Math.floor(Math.random() * 6) + 1;
}

export function getItems(itemPool: Recipe[], diceCount: number): Recipe[] {
	const itemCount = [...new Array(diceCount)]
		.map((_) => diceRoll())
		.reduce((sum, v) => sum + v);

	const itemIndices: number[] = [...new Array(itemCount)].map((_) =>
		Math.floor(Math.random() * itemPool.length)
	);

	const items = itemIndices.map((idx) => itemPool[idx]);

	return items;
}
