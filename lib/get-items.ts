import { Place } from '../types/Place';

export type Item = {
	id: number;
	name: string;
	possibility: number;
};

const dropItemList: { [k in Place]: Item[] } = {
	Farm: [
		{ id: 6, name: '国宝虫の糸', possibility: 1 },
		{ id: 12, name: '四つ葉の詰め草', possibility: 1 },
		{ id: 13, name: '魔法の草', possibility: 1 },
		{ id: 16, name: 'ヤドクタケ', possibility: 1 },
		{ id: 17, name: 'ミスティカの葉', possibility: 1 },
		{ id: 18, name: 'ハウレン草', possibility: 1 },
	],
	Pond: [
		{ id: 1, name: 'ムッシェル', possibility: 1 },
		{ id: 67, name: 'ローレライの鱗', possibility: 1 },
	],
	Cave: [
		{ id: 5, name: 'グラビ石', possibility: 1 },
		{ id: 26, name: 'カノーネ岩', possibility: 1 },
		{ id: 50, name: 'フェスト', possibility: 1 },
		{ id: 63, name: 'レジエン石', possibility: 1 },
	],
	Forest: [
		{ id: 2, name: 'うに', possibility: 1 },
		{ id: 3, name: 'ガッシュの枝', possibility: 1 },
		{ id: 14, name: 'オニワライタケ', possibility: 1 },
		{ id: 15, name: 'ハチの巣', possibility: 1 },
	],
};

/**
 * return 1..6 randomly
 */
function diceRoll() {
	return Math.floor(Math.random() * 6) + 1;
}

export function getItems(place: Place, diceCount: number): Item[] {
	const itemPool: Item[] = dropItemList[place];

	const itemCount = [...new Array(diceCount)]
		.map((_) => diceRoll())
		.reduce((sum, v) => sum + v);

	const itemIndices: number[] = [...new Array(itemCount)].map((_) =>
		Math.floor(Math.random() * itemPool.length)
	);

	const items = itemIndices.map((idx) => itemPool[idx]);

	return items;
}
