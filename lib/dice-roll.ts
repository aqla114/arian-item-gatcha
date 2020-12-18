/**
 * return 1..6 randomly
 */
export function diceRoll() {
	return Math.floor(Math.random() * 6) + 1;
}

export function getSumOfDice(diceCount: number): number {
	return [...new Array(diceCount)]
		.map((_) => diceRoll())
		.reduce((sum, v) => sum + v);
}

// 0..max
export function getRandomValues(length: number, max: number): number[] {
	return [...new Array(length)].map((_) => Math.floor(Math.random() * max));
}

// 0..max
export function getUniqueRandomValues(length: number, max: number): number[] {
	// [0,1,2,3] (max=3) みたいな配列から重複許さずにlength=10個取り出すの無理だよね
	if (length > max) {
		return [...new Array(max)].map((_, idx) => idx);
	}

	// [0, 1, .., max]
	let idxArray = [...new Array(max)].map((_, idx) => idx);

	let response = [];
	for (let i = 0; i < length; i++) {
		let idx = Math.floor(Math.random() * idxArray.length);
		response.push(idxArray[idx]);
		idxArray = idxArray.filter((_, i) => i !== idx);
	}

	return response;
}
