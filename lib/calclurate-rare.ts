enum Rare {
	R = 1,
	SR,
	SSR,
}

export function calcRare(dropRate: number): Rare {
	if (dropRate <= 10) {
		return Rare.SSR;
	} else if (dropRate <= 30) {
		return Rare.SR;
	} else {
		return Rare.R;
	}
}
