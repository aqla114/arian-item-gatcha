export type Item = {
	id: number;
	name: string;
	possibility: number;
};

export function getItems(): Item[] {
	const items: Item[] = [
		{ id: 0, name: 'うに', possibility: 10 },
		{ id: 1, name: 'ぷにぷに玉', possibility: 20 },
		{ id: 2, name: '木炭', possibility: 20 },
		{ id: 3, name: '魔法の草', possibility: 20 },
	];

	return items;
}
