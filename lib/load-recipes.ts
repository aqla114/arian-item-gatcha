import path from 'path';
import fs from 'fs';
import { parseCsv } from './csv-parse';
import { Recipe } from '../types/recipe';

export function loadRecipes() {
	const filename = path.join(process.cwd(), 'data', 'recipe.csv');

	const csv = fs.readFileSync(filename, 'utf8');

	const parsedCsv = parseCsv<Recipe>(csv, [
		'id',
		'name',
		'ingridients',
		'tools',
		'getWay',
		'price',
		'detail',
	]);

	return parsedCsv.map((x) => ({ ...x, id: parseInt(x.id.toString()) }));
}
