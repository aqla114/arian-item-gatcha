import { Item } from '../lib/get-items';

export default function Card({ item }: { item: Item }) {
	return (
		<div className="card-container">
			<div className="card-content">{item.name}</div>
			<style>
				{`
        .card-container {
          display: inline-block;
          margin: 10px;
          border: solid 1px black;
          border-radius: 8px;
        }

        .card-content {
          width: 180px;
          height: 80px;
          text-align: center;
          vertical-align: middle;
        }
      `}
			</style>
		</div>
	);
}
