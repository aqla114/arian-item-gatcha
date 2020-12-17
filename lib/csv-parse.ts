import parse from 'csv-parse/lib/sync';

export function parseCsv<T>(csvString: string, columns: string[]): T[] {
	const records = parse(csvString, {
		columns: columns,
		skip_empty_lines: true,
	});

	return records;
}
