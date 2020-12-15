import React, { useState } from 'react';
import Card from '../components/card';
import { getItems, Item } from '../lib/get-items';
import { Place } from '../types/place';

export default function Home() {
	const [items, setItems] = useState<Item[]>([]);
	const [currentPlace, setCurrentPlace] = useState<Place>('Farm');
	const [diceCount, setDiceCount] = useState<number>(1);

	return (
		<div className="container">
			<div className="gatcha">
				<select
					className="gatcha-type-selector"
					onChange={(e) => setCurrentPlace(e.target.value as Place)}
				>
					<option value="Farm">農園</option>
					<option value="Pond">いけす</option>
					<option value="Cave">洞窟</option>
					<option value="Forest">旧校舎裏の林</option>
				</select>
				<select
					className="gatcha-dice-count-selector"
					onChange={(e) => setDiceCount(parseInt(e.target.value))}
				>
					<option value={1}>1D6</option>
					<option value={2}>2D6</option>
					<option value={3}>3D6</option>
					<option value={4}>4D6</option>
				</select>
				<input
					type="button"
					className="gatcha-button"
					value="回す"
					onClick={() => setItems(getItems(currentPlace, diceCount))}
				/>
			</div>
			<div className="items-container">
				{items.map((item, idx) => (
					<Card key={`${item.id}${idx}`} item={item} />
				))}
			</div>

			<style>{`
          .gatcha-type-selector {
            margin: 8px;
          }

          .gatcha-dice-count-selector {
            margin: 8px;
          }

          .gatcha-button {
            margin: 8px;
          }

          .items-container {
            back-ground-color: cornsilk;
            width: 1214px;
            margin: 20px;
          }
        `}</style>
		</div>
	);
}
