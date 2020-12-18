import { NextApiRequest, NextApiResponse } from 'next';

// 使用済みの Recipe IDs
let currentItemIds: number[] = [];

export function isNumberList(x: unknown): x is number[] {
	return Array.isArray(x) && (x.length === 0 || typeof x[0] === 'number');
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method === 'GET') {
		res.setHeader('Content-Type', 'application/json');
		res.status(200).json({ ids: currentItemIds });
	} else if (req.method === 'POST') {
		try {
			const itemIds = JSON.parse(req.body['ids']);
			if (!isNumberList(itemIds)) {
				res.status(400);
				return;
			}

			currentItemIds.push(...itemIds);
			currentItemIds.sort();

			console.log(itemIds, 'pushed', currentItemIds);

			res.status(200);
		} catch {
			res.status(400);
		}
	} else if (req.method === 'DELETE') {
		currentItemIds = [];
		res.status(200);
	}

	res.end();
}
