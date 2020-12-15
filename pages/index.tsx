import React, { useState } from 'react';
import Card from '../components/card';
import { getItems, Item } from '../lib/get-items';

export default function Home() {
	const [items, setItems] = useState<Item[]>([]);

	return (
		<div className="container">
			<input
				type="button"
				className="gatcha-button"
				value="回す"
				onClick={() => setItems(getItems())}
			/>
			<div className="items-container">
				{items.map((item) => (
					<Card key={item.id} item={item} />
				))}
			</div>
		</div>
	);
}
