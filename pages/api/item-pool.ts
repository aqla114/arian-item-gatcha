import { NextApiRequest, NextApiResponse } from 'next';

// 使用済みの Recipe IDs
let currentItemIds: Set<number> = new Set();

export function isNumberList(x: unknown): x is number[] {
	return Array.isArray(x) && (x.length === 0 || typeof x[0] === 'number');
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
	// console.log(req);
	if (req.method === 'GET') {
		res.setHeader('Content-Type', 'application/json');
		res.status(200).json({ ids: Array.from(currentItemIds) });
	} else if (req.method === 'POST') {
		try {
			const itemIds = req.body['ids'];
			const currentPlace = req.body['currentPlace'];
			if (!isNumberList(itemIds)) {
				res.status(400);
				return;
			}

			if (currentPlace === 'Library') {
				itemIds.forEach((x) => currentItemIds.add(x));

				console.log(itemIds, 'pushed', currentItemIds);
			}

			res.setHeader('Content-Type', 'application/json');
			res.status(200).json({ ids: Array.from(currentItemIds) });
		} catch {
			res.status(400);
		}
	} else if (req.method === 'DELETE') {
		currentItemIds = new Set();
		res.status(200);
	}

	res.end();
}
