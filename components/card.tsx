import { Item } from '../lib/get-items';

export default function Card({ item, idx }: { item: Item; idx: number }) {
	console.log(idx);
	return (
		<div className="card-container">
			<div className="card-content">{item.name}</div>
			<style>
				{`
        .card-container {
          display: inline-block;
          width: 180px;
          height: 80px;
          margin: 10px;
          border: solid 1px black;
          border-radius: 8px;
          text-align: center;
        }

        .card-content {
          display: table-cell;
          vertical-align: middle;
          width: inherit;
          height: inherit
        }
      `}
			</style>
		</div>
	);
}
